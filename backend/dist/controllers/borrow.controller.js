"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowController = void 0;
const borrow_1 = __importDefault(require("../model/borrow"));
class BorrowController {
    constructor() {
        this.getBorrowsUser = (req, res) => {
            let username = req.body.username;
            borrow_1.default.find({ 'user': username }, (err, borrows) => {
                if (err)
                    console.log(err);
                else
                    res.json(borrows);
            });
        };
        this.getBorrowsUserTake = (req, res) => {
            let username = req.body.username;
            borrow_1.default.find({ 'user': username, 'dateBack': 0 }, (err, borrows) => {
                if (err)
                    console.log(err);
                else
                    res.json(borrows);
            });
        };
        this.getBorrowsBookTaken = (req, res) => {
            let bookId = req.body.bookId;
            borrow_1.default.find({ 'bookId': bookId, 'dateBack': 0 }, (err, borrows) => {
                if (err)
                    console.log(err);
                else
                    res.json(borrows);
            });
        };
        this.return = (req, res) => {
            let id = req.body.id;
            borrow_1.default.updateOne({ 'id': id }, { $set: { 'dateBack': Date.now() } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.extend = (req, res) => {
            let id = req.body.id;
            borrow_1.default.updateOne({ 'id': id, 'extend': 0 }, { $set: { 'extend': 1 } }, (err, resp) => {
                if (err)
                    res.json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.takenow = (req, res) => {
            let id = req.body.id;
            borrow_1.default.updateOne({ 'id': id }, { $set: { 'dateTake': Date.now() } }, (err, resp) => {
                if (err)
                    res.json({ "message": "error" });
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllBorrows = (req, res) => {
            borrow_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.add = (req, res) => {
            let borrow = new borrow_1.default({
                id: req.body.id,
                bookId: req.body.bookId,
                user: req.body.user,
                cover: req.body.cover,
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre,
                extend: req.body.extend,
                dateTake: req.body.dateTake,
                dateBack: req.body.dateBack
            });
            borrow.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.BorrowController = BorrowController;
//# sourceMappingURL=borrow.controller.js.map