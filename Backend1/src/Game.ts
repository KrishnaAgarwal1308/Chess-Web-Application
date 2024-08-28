import { WebSocket } from "ws"
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE,STARTED } from "./messages"

export class Game {
    public player1: WebSocket
    public player2: WebSocket
    private board: Chess
    private startTime: Date
    constructor(player1: WebSocket, player2: WebSocket) {
        // initilizing the players
        this.player1 = player1
        this.player2 = player2
        this.board = new Chess()
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'White'
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'Black'
            }
        }))
        this.player1.send(JSON.stringify({
            type:STARTED,
            payload: {started:"started"}
        }))
        this.player2.send(JSON.stringify({
            type:STARTED,
            payload: {started:"started"}
        }))
    }
    makeMove(socket: WebSocket, move: { from: string; to: string }) {
        //validate the user 
        
        // is this the users move
        
        if (this.board.history().length % 2 == 0 && socket !== this.player1) {
            return
        }
        if (this.board.history().length % 2 == 1 && socket !== this.player2) {
            return
        }
        
        //update the board
        //is the move valid
        //push the move
        try {
            this.board.move(move)
        } catch (e) {
            console.log(e);
            return
        }




        //check if the game is over

        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'White' : 'Black'
                }
            }))
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'White' : 'Black'
                }
            }))
            return
        }
        
        //send the move to both the players.
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        
        

    }
}