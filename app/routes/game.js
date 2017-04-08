import Game from '../models/game';

// Read
const getGames = (req, res) => {
    Game.find({})
    .sort({ postDate: 1 })
    .exec((err, games) => {
        if(err) {
            res.send(err)
        }
        res.json(games);
    });
}

// Read endpoint
const getGame = (req, res) => {
    const { id } = req.params;
    Game.findById(id, (err, game) => {
        if(err) {
            res.send(err);
        }
        res.json(game);
    });
}

// Create & Update
const postGame = (req, res) => {
    let game = Object.assign( new Game(), req.body );
    game.save(err => {
        if(err) {
            res.send(err);
        }
        res.json({message : 'Game created'});
    });
}

// Delete endpoint
const deleteGame = (req, res) => {
    Game.remove(
        {_id: req.params.id},
        err => {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Game is deleted'});
        }
    );
}

export { getGames, getGame, postGame, deleteGame };