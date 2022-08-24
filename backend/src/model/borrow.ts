import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Borrow = new Schema({
    id: {
        type: Number
    },
    bookId: {
        type: Number
    },
    user:{
        type: String
    },
    cover:{
        type: String
    },
    title:{
        type: String
    },
    author:{
        type: Array<String>
    },
    genre:{
        type: Array<String>
    },
    extend: {
        type: Number
    },
    dateTake: {
        type: Number
    },
    dateBack:{
        type: Number
    }
});

export default mongoose.model('BorrowModel', Borrow, 'borrows');
