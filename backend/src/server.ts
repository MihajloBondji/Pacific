import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routers/user.routers';
import bookRouter from './routers/books.routers';
import borrowRouter from './routers/borrow.routers';
import reviewRouter from './routers/review.routers';
import daysRouter from './routers/days.routers';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pacific');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();
router.use('/users',userRouter);
router.use('/books',bookRouter);
router.use('/borrow',borrowRouter);
router.use('/review',reviewRouter);
router.use('/days',daysRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));