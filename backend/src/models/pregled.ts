
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Pregled = new Schema({
    pacient: {
        type: String
    },
    doctor: {
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
    }, 
    datum: {
        type: Date
    },
    branch: {
        type: String
    },
    report: {
        type: Boolean
    }
})

export default mongoose.model('Pregled', Pregled, 'pregledi');