"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const reviewRouter = express_1.default.Router();
reviewRouter.route('/getReviewsBook').post((req, res) => new review_controller_1.ReviewController().getReviewsBook(req, res));
reviewRouter.route('/add').post((req, res) => new review_controller_1.ReviewController().add(req, res));
reviewRouter.route('/update').post((req, res) => new review_controller_1.ReviewController().update(req, res));
exports.default = reviewRouter;
//# sourceMappingURL=review.routers.js.map