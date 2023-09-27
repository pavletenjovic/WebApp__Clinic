import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Report = new Schema({
    pacient: {
        type: String
    },
    doctor: {
        type: String
    },
    specialization: {
        type: String
    },
    dijagnoza: {
        type: String
    },
    terapija: {
        type: String
    },
    datumKontrole: {
        type: Date
    }, 
    datum: {
        type: Date
    },
    branch: {
        type: String
    },
    razlog: {
        type: String
    }
})

export default mongoose.model('Report', Report, 'reports');