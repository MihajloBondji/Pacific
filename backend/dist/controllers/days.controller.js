"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaysController = void 0;
const days_1 = __importDefault(require("../model/days"));
class DaysController {
    constructor() {
        this.get = (req, res) => {
            days_1.default.findOne({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.update = (req, res) => {
            let days = req.body.days;
            days_1.default.updateOne({ 'id': 1 }, { $set: { 'days': days } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.DaysController = DaysController;
//# sourceMappingURL=days.controller.js.map