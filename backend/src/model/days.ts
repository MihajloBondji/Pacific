import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Days = new Schema({
    id: {
        type: Number
    },
    days:{
        type: Number
    }
});

export default mongoose.model('DaysModel', Days, 'days');
