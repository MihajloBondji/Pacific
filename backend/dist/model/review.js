"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Review = new Schema({
    id: {
        type: Number
    },
    bookId: {
        type: Number
    },
    score: {
        type: Number
    },
    text: {
        type: String
    },
    user: {
        type: String
    },
    date: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('ReviewModel', Review, 'reviews');
//# sourceMappingURL=review.js.map