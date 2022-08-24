import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Review = new Schema({
    id: {
        type: Number
    },
    bookId: {
        type: Number
    },
    score:{
        type: Number
    },
    text:{
        type: String
    },
    user:{
        type: String
    },
    date:{
        type: Number
    }
});

export default mongoose.model('ReviewModel', Review, 'reviews');
