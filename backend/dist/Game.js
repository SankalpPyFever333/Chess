"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Chess_1 = require("./ChessLogic/Chess");
class Game {
    // private whitesTurn = true
    constructor(whitePlayer, blackPlayer) {
        this.whitePlayer = whitePlayer; //whitePlayer is always white
        this.blackPlayer = blackPlayer;
        this.chessGame = new Chess_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        whitePlayer.send(JSON.stringify({
            type: 'init',
            board: 'connected'
            // board: (this.chessGame.board).flat().toString()
        }));
        blackPlayer.send(JSON.stringify({
            type: 'init',
            board: 'connected'
            // board: (this.chessGame.board).flat().toString()
        }));
    }
    index(position) {
        let x = position.charCodeAt(0) - 'a'.charCodeAt(0);
        let y = '8'.charCodeAt(0) - position.charCodeAt(1);
        return { y, x };
    }
    indexToNotation(position) {
        const letter = String.fromCharCode('a'.charCodeAt(0) + position.x);
        const number = (8 - position.y).toString();
        return letter + number;
    }
    currentState() {
        return this.chessGame.board;
    }
    pickPiece(position) {
        let index = this.index(position);
        console.log('games.ts:56', position, index);
        const validMoves = this.chessGame.pick(index);
        return validMoves.map(element => this.indexToNotation(element));
    }
    placePiece(position) {
        let index = this.index(position);
        console.log('game.ts:64 ', position, index);
        const move = this.chessGame.place(index);
        this.whitePlayer.turn = !this.whitePlayer.turn;
        this.blackPlayer.turn = !this.blackPlayer.turn;
        return { from: this.indexToNotation(move.from), to: this.indexToNotation(move.to) };
    }
    makeMove(socket, move) {
        // validation here
        // is it this user move
        // is the move valid
        // upodate the board
        //push the move
        //check if the game is over
        // send the updated board to both users
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map