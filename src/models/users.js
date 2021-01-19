import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    passw: Number
});

const User = mongoose.model('User', userSchema);

function toDto(user){
    
    let dto = {
        name: user.name,
        email: user.email
    }
    
    return dto;
    
}

const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result > 0;

}

const userRepository = {
    async create(name, email, passw) {
        const theUser = new User({
            name: name,
            email: email,
            passw: passw
        });
        const result = await theUser.save();
        return toDto(result);
    },
    async findAll() {
        const result =  await User.find({}).exec();
        return result;
    },
    async findById(id) {
       const result = await User.findById(id).exec();
       return result != null ? result : undefined;
    }

}


export  {
    User,
    userRepository,
    emailExists
}