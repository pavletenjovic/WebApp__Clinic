"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('Report', Report, 'reports');
//# sourceMappingURL=report.js.map