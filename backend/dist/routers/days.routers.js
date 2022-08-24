"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const days_controller_1 = require("../controllers/days.controller");
const daysRouter = express_1.default.Router();
daysRouter.route('/get').get((req, res) => new days_controller_1.DaysController().get(req, res));
daysRouter.route('/update').post((req, res) => new days_controller_1.DaysController().update(req, res));
exports.default = daysRouter;
//# sourceMappingURL=days.routers.js.map