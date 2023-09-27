"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('Pregled', Pregled, 'pregledi');
//# sourceMappingURL=pregled.js.map