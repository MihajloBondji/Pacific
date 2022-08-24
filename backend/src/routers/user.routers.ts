import express from "express"
import { UserController } from "../controllers/user.controller";

const userRouter =express.Router();

userRouter.route('/login').post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route('/register').post(
    (req,res)=>new UserController().register(req,res)
)

userRouter.route('/findUsername').post(
    (req,res)=>new UserController().findUsername(req,res)
)

userRouter.route('/findMail').post(
    (req,res)=>new UserController().findMail(req,res)
)

userRouter.route('/update').post(
    (req,res)=>new UserController().update(req,res)
)

userRouter.route('/updateInfo').post(
    (req,res)=>new UserController().updateInfo(req,res)
)

userRouter.route('/getAllUsers').get(
    (req,res)=>new UserController().getAllUsers(req,res)
)

userRouter.route('/delete').post(
    (req,res)=>new UserController().delete(req,res)
)

userRouter.route('/changePass').post(
    (req,res)=>new UserController().changePass(req,res)
)

export default userRouter;