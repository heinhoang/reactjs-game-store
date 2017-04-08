import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
require('dotenv').config();

import Game from './app/models/game';
import {getGames, getGame, postGame, deleteGame} from './app/routes/game';

const app = express();
const port = process.env.PORT || 8080;

// Mongodb Settings
const mongoDbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodejs-game-library';
const mongoOptions = {
    server: { socketOptions: {keepAlive: 1, connectTimeOutMS: 3000} },
    replset: {socketOptions: {keepAlive: 1, connectTimeOutMS: 3000}}
};
mongoose.Promise = global.Promise;
mongoose.connect(mongoDbURI, mongoOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));

// Body parser and Morgan middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// We tell express where to find static assets
app.use(express.static(__dirname + '/client/dist'));

// Enable CORS so that we can make HTTP request from webpack-dev-server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API routes
app.route('/api/games')
    .post(postGame)
    .get(getGames);

app.route('/api/games/:id')
    .get(getGame)
    .delete(deleteGame);

app.route("/api/*").get((req, res) => {
    res.sendFile('./client/dist/index.html', {root: __dirname});
});

app.listen(port);
console.log(`Listening on port ${port}` );