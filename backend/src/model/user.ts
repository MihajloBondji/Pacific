import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password:{
        type: String
    },
    fullname:{
        type: String
    },
    address:{
        type: String
    },
    phone:{
        type: String
    },
    mail: {
        type: String
    },
    photo: {
        type: String
    },
    type:{
        type: Number
    }
});

export default mongoose.model('UserModel', User, 'users');
