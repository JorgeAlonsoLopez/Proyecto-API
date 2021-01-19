import 'dotenv/config';
import { User, userRepository } from '../models/users';
import bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt';

const AuthController = {

    register: async (req, res, next) => {
        let usuarioCreado = await userRepository.create(req.body.nombre, req.body.email, 
                        bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS)));

        res.status(201).json(usuarioCreado);
    },

    login: async (req, res, next) => {
        //let user = userRepository.findById(req.body.id);
        const token = JwtService.sign(req.user);
        res.status(201).json({
            nombre: req.user.nombre,
            email: req.user.email,
            token: token
        });
    }

}


export {AuthController}