import mongoose from 'mongoose';
const { Schema } = mongoose;
import Song from './songs';

const { Schema } = mongoose;

const listSchema = new Schema({
    title: String,
    description: String,
    user_id: mongoose.ObjectId,
    songs: [{
        type: mongoose.ObjectId,
        ref: 'Song'
      }]
});

const List = mongoose.model('List', listSchema);

