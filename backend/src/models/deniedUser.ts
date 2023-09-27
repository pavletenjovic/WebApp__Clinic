
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let DeniedUser = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    }
})

export default mongoose.model('DeniedUser', DeniedUser, 'deniedUsers');