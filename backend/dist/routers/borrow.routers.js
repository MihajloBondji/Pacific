"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("../controllers/borrow.controller");
const borrowRouter = express_1.default.Router();
borrowRouter.route('/getBorrowsUser').post((req, res) => new borrow_controller_1.BorrowController().getBorrowsUser(req, res));
borrowRouter.route('/getBorrowsUserTake').post((req, res) => new borrow_controller_1.BorrowController().getBorrowsUserTake(req, res));
borrowRouter.route('/getBorrowsBookTaken').post((req, res) => new borrow_controller_1.BorrowController().getBorrowsBookTaken(req, res));
borrowRouter.route('/return').post((req, res) => new borrow_controller_1.BorrowController().return(req, res));
borrowRouter.route('/extend').post((req, res) => new borrow_controller_1.BorrowController().extend(req, res));
borrowRouter.route('/takenow').post((req, res) => new borrow_controller_1.BorrowController().takenow(req, res));
borrowRouter.route('/getAllBorrows').get((req, res) => new borrow_controller_1.BorrowController().getAllBorrows(req, res));
borrowRouter.route('/add').post((req, res) => new borrow_controller_1.BorrowController().add(req, res));
exports.default = borrowRouter;
//# sourceMappingURL=borrow.routers.js.map