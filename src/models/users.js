import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    name_user: String,
    email: String,
    passw: Number
});

const User = mongoose.model('User', userSchema);

