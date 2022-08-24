import express from "express"
import { BookController } from "../controllers/book.controller";

const bookRouter =express.Router();


bookRouter.route('/getAllBooks').get(
    (req,res)=>new BookController().getAllBooks(req,res)
)

bookRouter.route('/delete').post(
    (req,res)=>new BookController().delete(req,res)
)

bookRouter.route('/add').post(
    (req,res)=>new BookController().add(req,res)
)

bookRouter.route('/reserve').post(
    (req,res)=>new BookController().reserve(req,res)
)

bookRouter.route('/add2').post(
    (req,res)=>new BookController().add2(req,res)
)

bookRouter.route('/getBook').post(
    (req,res)=>new BookController().getBook(req,res)
)

bookRouter.route('/getIt').post(
    (req,res)=>new BookController().getIt(req,res)
)

bookRouter.route('/updateScore').post(
    (req,res)=>new BookController().updateScore(req,res)
)

bookRouter.route('/returnIt').post(
    (req,res)=>new BookController().returnIt(req,res)
)

bookRouter.route('/update').post(
    (req,res)=>new BookController().update(req,res)
)

bookRouter.route('/updateId').post(
    (req,res)=>new BookController().updateId(req,res)
)

bookRouter.route('/updateRes').post(
    (req,res)=>new BookController().updateRes(req,res)
)
export default bookRouter;