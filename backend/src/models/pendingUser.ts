
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let PendingUser = new Schema({
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
    url: {
        type: String
    }
})

export default mongoose.model('PendingUser', PendingUser, 'pendingUsers');