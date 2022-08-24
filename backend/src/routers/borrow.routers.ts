import express from "express"
import { BorrowController } from "../controllers/borrow.controller";

const borrowRouter =express.Router();

borrowRouter.route('/getBorrowsUser').post(
    (req,res)=>new BorrowController().getBorrowsUser(req,res)
)

borrowRouter.route('/getBorrowsUserTake').post(
    (req,res)=>new BorrowController().getBorrowsUserTake(req,res)
)

borrowRouter.route('/getBorrowsBookTaken').post(
    (req,res)=>new BorrowController().getBorrowsBookTaken(req,res)
)

borrowRouter.route('/return').post(
    (req,res)=>new BorrowController().return(req,res)
)

borrowRouter.route('/extend').post(
    (req,res)=>new BorrowController().extend(req,res)
)

borrowRouter.route('/takenow').post(
    (req,res)=>new BorrowController().takenow(req,res)
)

borrowRouter.route('/getAllBorrows').get(
    (req,res)=>new BorrowController().getAllBorrows(req,res)
)

borrowRouter.route('/add').post(
    (req,res)=>new BorrowController().add(req,res)
)





export default borrowRouter;