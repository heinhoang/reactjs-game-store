import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
    name: String,
    year: Number,
    description: String,
    picture: String,
    postDate: {type: Date, default: Date.now} // Timestamp
});

export default mongoose.model('Game', gameSchema);