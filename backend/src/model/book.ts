import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Book = new Schema({
    id: {
        type: Number
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
    publisher:{
        type: String
    },
    year: {
        type: Number
    },
    language: {
        type: String
    },
    cover:{
        type: String
    },
    score: {
        type: Array<Number>
    },
    reservations: {
        type: Array<String>
    },
    count: {
        type: Number
    },
    username: {
        type: String
    }
});

export default mongoose.model('BookModel', Book, 'books');
