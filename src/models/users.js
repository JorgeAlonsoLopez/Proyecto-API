import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
const { Schema } = mongoose;
import validator from 'validator';



const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        minlength: [3, 'La cantidad mínima de caracteres es 3'],
        validate: [validator.isAlpha, 'El nombre solo debe tener caracteres alfabeticos']
        },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: [true, 'No puede registrar un email que ya existe'],
        validate: [validator.isEmail, 'El formato debe ser el correcto']
        },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
        }
});

const User = mongoose.model('User', userSchema);

function toDto(user){
    
    let dto = {
        nombre: user.nombre,
        email: user.email,
        id: user._id
    }
    
    return dto;
    
}

const emailExists = async (email) => {
    const result = await User.countDocuments({ email: email }).exec();
    return result;

}

const userRepository = {

    async create(nombre, email, passw) {
        const theUser = new User({
            nombre: nombre,
            email: email,
            password: passw
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
    },

    async findByEmail(email) {
        const result = await User.find({ email: email }).exec();
        return result != null ? result[0] : undefined;
     }

}


export  {
    User,
    userRepository,
    emailExists,
    toDto
}