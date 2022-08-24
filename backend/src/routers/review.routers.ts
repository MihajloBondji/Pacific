import express from "express"
import { ReviewController } from "../controllers/review.controller";

const reviewRouter =express.Router();

reviewRouter.route('/getReviewsBook').post(
    (req,res)=>new ReviewController().getReviewsBook(req,res)
)

reviewRouter.route('/add').post(
    (req,res)=>new ReviewController().add(req,res)
)

reviewRouter.route('/update').post(
    (req,res)=>new ReviewController().update(req,res)
)

export default reviewRouter;