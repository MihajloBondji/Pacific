"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_1 = __importDefault(require("../model/review"));
class ReviewController {
    constructor() {
        this.add = (req, res) => {
            let review = new review_1.default({
                id: req.body.id,
                bookId: req.body.bookId,
                score: req.body.score,
                text: req.body.text,
                user: req.body.user,
                date: req.body.date
            });
            review.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.update = (req, res) => {
            let id = req.body.id;
            let bookId = req.body.bookId;
            let score = req.body.score;
            let text = req.body.text;
            let user = req.body.user;
            let date = req.body.date;
            review_1.default.updateOne({ 'id': id }, { $set: { 'bookId': bookId, 'score': score, 'text': text, 'date': date } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getReviewsBook = (req, res) => {
            let bookId = req.body.bookId;
            review_1.default.find({ 'bookId': bookId }, (err, reviews) => {
                if (err)
                    console.log(err);
                else
                    res.json(reviews);
            });
        };
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map