import React, { Component } from "react";
import { Modal, GamesListManager } from '../components';

export default class GamesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            searchBar: "",
            selectedGame: {}
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.setSearchBar = this.setSearchBar.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
    }

    componentDidMount() {
        this.getGame();
    }

    getGame() {
        fetch('/api/games', {
            headers: new Headers({"Content-Type": "application/json"})
        })
        .then(res => res.json())
        .then(data => this.setState({games: data}));
    }

    setSearchBar(event) {
        this.setState({searchBar: event.target.value.toLowerCase()});
    }

    toggleModal(index) {
        this.setState({ selectedGame: this.state.games[index] });
        $('#game-modal').modal();
    }

    deleteGame(id) {
        fetch('/api/game/:id', {
            headers: new Headers({"Content-Type": "application/json"}),
            method: "DELETE"
        })
        .then(res => res.json)
        .then(res => {
            this.setState({ games: this.state.games.filter( game => game._id != id ) });
            console.log(res.message);
        });
    }

    render() {
        const { games, selectedGame, searchBar } = this.state;
        return (
            <div>
                <Modal game={selectedGame}></Modal>
                <GamesListManager
                    games={games}
                    toggleModal={this.toggleModal}
                    setSearchBar={this.setSearchBar}
                    searchBar={searchBar}
                    deleteGame={this.deleteGame}
                />
            </div>
        );
    }
}