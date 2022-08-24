"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routers_1 = __importDefault(require("./routers/user.routers"));
const books_routers_1 = __importDefault(require("./routers/books.routers"));
const borrow_routers_1 = __importDefault(require("./routers/borrow.routers"));
const review_routers_1 = __importDefault(require("./routers/review.routers"));
const days_routers_1 = __importDefault(require("./routers/days.routers"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/pacific');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
router.use('/users', user_routers_1.default);
router.use('/books', books_routers_1.default);
router.use('/borrow', borrow_routers_1.default);
router.use('/review', review_routers_1.default);
router.use('/days', days_routers_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map