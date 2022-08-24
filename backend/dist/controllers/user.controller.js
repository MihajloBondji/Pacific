"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../model/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.findUsername = (req, res) => {
            let user = new user_1.default({
                username: req.body.username
            });
            user_1.default.findOne({ 'username': user.username }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user != null) {
                    res.json({ "message": "Username taken" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.findMail = (req, res) => {
            let user = new user_1.default({
                mail: req.body.mail
            });
            user_1.default.findOne({ 'mail': user.mail }, (err, user) => {
                if (err)
                    console.log(err);
                else if (user != null) {
                    res.json({ "message": "Email taken" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default({
                username: req.body.username,
                password: req.body.password,
                fullname: req.body.fullname,
                address: req.body.address,
                phone: req.body.phone,
                mail: req.body.mail,
                photo: req.body.photo,
                type: 0
            });
            user.save((err, user) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "message": "error" });
                }
                else
                    res.json({ "message": "ok" });
            });
        };
        this.getAllUsers = (req, res) => {
            user_1.default.find({}, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.update = (req, res) => {
            let username = req.body.username;
            let type = req.body.type;
            user_1.default.updateOne({ 'username': username }, { $set: { 'type': type } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.updateInfo = (req, res) => {
            let oldusername = req.body.oldusername;
            let username = req.body.username;
            let fullname = req.body.fullname;
            let address = req.body.address;
            let phone = req.body.phone;
            let mail = req.body.mail;
            let photo = req.body.photo;
            user_1.default.updateOne({ 'username': oldusername }, { $set: { 'username': username, 'fullname': fullname, 'address': address, 'phone': phone, 'mail': mail, 'photo': photo } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.delete = (req, res) => {
            let username = req.body.username;
            user_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
        this.changePass = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.updateOne({ 'username': username }, { $set: { 'password': password } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "ok" });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map