"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        // initilizing the players
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'White'
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: 'Black'
            }
        }));
        this.player1.send(JSON.stringify({
            type: messages_1.STARTED,
            payload: { started: "started" }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.STARTED,
            payload: { started: "started" }
        }));
    }
    makeMove(socket, move) {
        //validate the user 
        // is this the users move
        if (this.board.history().length % 2 == 0 && socket !== this.player1) {
            return;
        }
        if (this.board.history().length % 2 == 1 && socket !== this.player2) {
            return;
        }
        //update the board
        //is the move valid
        //push the move
        try {
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        //check if the game is over
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'White' : 'Black'
                }
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'White' : 'Black'
                }
            }));
            return;
        }
        //send the move to both the players.
        this.player1.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: move
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: move
        }));
    }
}
exports.Game = Game;
