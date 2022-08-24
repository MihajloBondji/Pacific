"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Borrow = new Schema({
    id: {
        type: Number
    },
    bookId: {
        type: Number
    },
    user: {
        type: String
    },
    cover: {
        type: String
    },
    title: {
        type: String
    },
    author: {
        type: (Array)
    },
    genre: {
        type: (Array)
    },
    extend: {
        type: Number
    },
    dateTake: {
        type: Number
    },
    dateBack: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('BorrowModel', Borrow, 'borrows');
//# sourceMappingURL=borrow.js.map