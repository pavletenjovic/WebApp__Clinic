"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('pendingAppointment', pendingAppointment, 'pendingAppointment');
//# sourceMappingURL=pendingAppointment.js.map