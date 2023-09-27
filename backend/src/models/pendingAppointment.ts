import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let pendingAppointment = new Schema({
    specialization: {
        type: String
    },
    name: {
        type: String
    },
    cena: {
        type: Number
    },
    trajanje: {
        type: Number
    }
})

export default mongoose.model('pendingAppointment', pendingAppointment, 'pendingAppointment');