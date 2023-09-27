
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    email: {
        type: String
    },
    adress: {
        type: String
    },
    telephone: {
        type: String
    },
    specialization: {
        type: String
    },
    branch: {
        type: String
    },
    licence: {
        type: Number
    },
    url: {
        type: String
    },
    appointments:{
        type: Array
    }
})

export default mongoose.model('User', User, 'users');