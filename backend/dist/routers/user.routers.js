"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/findUsername').post((req, res) => new user_controller_1.UserController().findUsername(req, res));
userRouter.route('/findMail').post((req, res) => new user_controller_1.UserController().findMail(req, res));
userRouter.route('/update').post((req, res) => new user_controller_1.UserController().update(req, res));
userRouter.route('/updateInfo').post((req, res) => new user_controller_1.UserController().updateInfo(req, res));
userRouter.route('/getAllUsers').get((req, res) => new user_controller_1.UserController().getAllUsers(req, res));
userRouter.route('/delete').post((req, res) => new user_controller_1.UserController().delete(req, res));
userRouter.route('/changePass').post((req, res) => new user_controller_1.UserController().changePass(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routers.js.map