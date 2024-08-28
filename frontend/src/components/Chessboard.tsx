import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
// import { Form } from "react-router-dom";

export const Chessboard = ({ board,socket,userColor}: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket:WebSocket;userColor:any
}) => {
    const [from, setFrom] = useState<Square|null>(null)
    const [to, setTo] = useState<Square|null>(null)

    const handelClick=(i:number,j:number) => {
        const square = String.fromCharCode(96 + j + 1) + (8 - i) as Square;

        if (from === null) {
            setFrom(square);
        } else {
            setTo(square);
            socket.send(JSON.stringify({
                type: "move",
                move:{
                      from, to: square  // Use the updated `square` directly

                }
            }));
            setFrom(null); // Reset `from` after sending the move
            setTo(null); // Reset `to` after sending the move
        }
    }
    

    return (<>
        <div className="text-white">
            {

                board.map((row, i) => {
                    return <div key={i} className="flex">
                        {row.map((square, j) => {
                            // console.log(square);
                            
                            return <div key={j} 
                            onClick={() =>{handelClick(i,j)
                            }}
                             className={`w-16 h-16 ${(i + j) % 2 === 0 ? `bg-[#739552]`: 'bg-[#ebecd0]'} flex justify-center items-center`}>{square ? square.color==='w'? <img src={`/pieces/w${square.type}.png`} alt="" /> : <img src={`/pieces/${square.type}.png`} alt="" />:""}</div>
                        }
                        )}
                    </div>

                }
                )

            }
        </div>
        </>
    )
}