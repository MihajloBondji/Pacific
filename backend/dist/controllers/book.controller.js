"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_1 = __importDefault(require("../model/book"));
class BookController {
    constructor() {
        this.getAllBooks = (req, res) => {
            book_1.default.find({}, (err, books) => {
                if (err)
                    console.log(err);
                else
                    res.json(books);
            });
        };
        this.delete = (req, res) => {
            let id = req.body.id;
            book_1.default.deleteOne({ 'id': id }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.add = (req, res) => {
            let book = new book_1.default({
                id: req.body.id,
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publisher: req.body.publisher,
                year: req.body.year,
                language: req.body.language,
                cover: req.body.cover,
                score: [0, 0],
                reservations: [],
                count: 1
            });
            book.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.add2 = (req, res) => {
            let book = new book_1.default({
                id: req.body.id,
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                publisher: req.body.publisher,
                year: req.body.year,
                language: req.body.language,
                cover: req.body.cover,
                score: [0, 0],
                count: 1,
                reservations: [],
                username: req.body.username
            });
            book.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getBook = (req, res) => {
            let id = req.body.id;
            book_1.default.findOne({ 'id': id }, (err, book) => {
                if (err)
                    console.log(err);
                else
                    res.json(book);
            });
        };
        this.getIt = (req, res) => {
            let id = req.body.id;
            book_1.default.updateOne({ 'id': id }, { $inc: { 'count': -1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.returnIt = (req, res) => {
            let id = req.body.id;
            book_1.default.updateOne({ 'id': id }, { $inc: { 'count': 1 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.update = (req, res) => {
            let id = req.body.id;
            let title = req.body.title;
            let author = req.body.author;
            let genre = req.body.genre;
            let year = req.body.year;
            let publisher = req.body.publisher;
            let language = req.body.language;
            let cover = req.body.cover;
            let available = req.body.available;
            book_1.default.updateOne({ 'id': id }, { $set: { 'title': title, 'author': author, 'genre': genre, 'year': year, 'publisher': publisher, 'language': language, 'cover': cover, 'count': available } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.reserve = (req, res) => {
            let id = req.body.id;
            let username = req.body.username;
            book_1.default.updateOne({ 'id': id }, { $push: { 'reservations': username } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateId = (req, res) => {
            let id = req.body.id;
            book_1.default.updateOne({ 'id': id }, { $set: { 'id': -id } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateRes = (req, res) => {
            let id = req.body.id;
            let username = req.body.username;
            book_1.default.updateOne({ 'id': id }, { $pull: { 'reservations': username } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateScore = (req, res) => {
            let id = req.body.id;
            let score = req.body.score;
            book_1.default.updateOne({ 'id': id }, { $set: { 'score': score } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map