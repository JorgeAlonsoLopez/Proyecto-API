import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { toDto, userRepository } from '../../models/users';
import bcrypt from 'bcryptjs';



passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    session: false
}, async (email, password, done) => {
    const user = await userRepository.findByEmail(email);
    if (user == undefined){
        return done(null, false); 
    }else if (!bcrypt.compareSync(password, user.password)){
        return done(null, false);
    }else{
        console.log(toDto(user));
        return done(null, toDto(user));
    }
}));



const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    algorithms: [process.env.JWT_ALGORITHM]
};

passport.use('token', new JwtStrategy(opts, (jwt_payload, done) => {

    const user_id = jwt_payload.sub;

    const user = userRepository.findById(user_id);
    console.log(user);
    if (user == undefined)
        return done(null, false);
    else
        return done(null, user);

}));

export const password = () => (req, res, next) =>
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err){
            console.log("Fallo en localStrateg");
            return res.status(400).json(err)
        }else if (err || !user){
            return res.status(401).end()
        }

        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next);


export const token = () => (req, res, next) =>
    passport.authenticate('token', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).end()
        }
        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next);


export default passport;