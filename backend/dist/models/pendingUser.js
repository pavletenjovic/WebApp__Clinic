"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('PendingUser', PendingUser, 'pendingUsers');
//# sourceMappingURL=pendingUser.js.map