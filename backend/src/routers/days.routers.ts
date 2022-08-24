import express from "express"
import { DaysController } from "../controllers/days.controller";

const daysRouter =express.Router();

daysRouter.route('/get').get(
    (req,res)=>new DaysController().get(req,res)
)

daysRouter.route('/update').post(
    (req,res)=>new DaysController().update(req,res)
)

export default daysRouter;