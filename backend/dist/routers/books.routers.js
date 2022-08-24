"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = express_1.default.Router();
bookRouter.route('/getAllBooks').get((req, res) => new book_controller_1.BookController().getAllBooks(req, res));
bookRouter.route('/delete').post((req, res) => new book_controller_1.BookController().delete(req, res));
bookRouter.route('/add').post((req, res) => new book_controller_1.BookController().add(req, res));
bookRouter.route('/reserve').post((req, res) => new book_controller_1.BookController().reserve(req, res));
bookRouter.route('/add2').post((req, res) => new book_controller_1.BookController().add2(req, res));
bookRouter.route('/getBook').post((req, res) => new book_controller_1.BookController().getBook(req, res));
bookRouter.route('/getIt').post((req, res) => new book_controller_1.BookController().getIt(req, res));
bookRouter.route('/updateScore').post((req, res) => new book_controller_1.BookController().updateScore(req, res));
bookRouter.route('/returnIt').post((req, res) => new book_controller_1.BookController().returnIt(req, res));
bookRouter.route('/update').post((req, res) => new book_controller_1.BookController().update(req, res));
bookRouter.route('/updateId').post((req, res) => new book_controller_1.BookController().updateId(req, res));
bookRouter.route('/updateRes').post((req, res) => new book_controller_1.BookController().updateRes(req, res));
exports.default = bookRouter;
//# sourceMappingURL=books.routers.js.map