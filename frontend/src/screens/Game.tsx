import React, { useEffect, useState } from 'react'
import { Chessboard } from '../components/Chessboard'
import { Button } from '../components/Button'
import { useSocket } from '../hooks/useSocket'
import { Chess } from 'chess.js'


export const Game = () => {
  const socket=useSocket();
  const [chess, setChess] = useState(new Chess())
  const [board, setBoard] = useState(chess.board())
  const [color, setColor] = useState<"white"|"black"|null>(null)
  const [connnecting, setConnnecting] = useState<"connecting"|null>(null)
  const [started, setStarted] = useState<'started'|null>(null)
//repetation of code is seen here
 const INIT_GAME='init_game'
 const MOVE='move'
 const GAME_OVER='game_over'
 const CONNECTING="connecting"
 const STARTED="started"


 useEffect(() => {
   if(!socket){
    return
   }
   socket.onmessage=(event) => {
    const message=JSON.parse(event.data)
    // console.log(message);
    
    switch(message.type){
      case INIT_GAME:
        // console.log('game initilized');
        setChess(new Chess())
        setBoard(chess.board())
        setColor(message.payload.color)
        setConnnecting(null)
        setStarted(null)
        break;
      case MOVE:
        const move=message.payload;
        chess.move(move)
        setBoard(chess.board())
        // console.log("move made");
        break;
      case GAME_OVER:
        // console.log('Game over');
        break  
      case CONNECTING:
        setConnnecting(message.payload.connecting) 
        break  
      case STARTED:
        setStarted(message.payload.started)
        break
    }
   }
 }, [socket])
 

 if(!socket) return <div className=' w-full  text-center pt-[44vh]'>...connecting</div>
 console.log(socket);
 
  return (<>
  <div className=" w-[full] h-20 flex justify-center items-center">
    {color&& <h1 className='uppercase text-4xl tracking-tighter font-medium font-sans'>your color is {color}</h1> }
  </div>
    <div className='flex justify-center'>
      <div className='pt-8 max-w-screen-lg'>
        <div className={`grid ${!started&&'grid-cols-1 gap-4 md:grid-cols-2'}`}>
          <div>
            <Chessboard userColor={color} socket={socket} board={board}/>
          </div>
          <div>
            {!started&&<Button  onClick={()=>{
              socket.send(JSON.stringify({
                type:INIT_GAME
              }))
            }}>{!connnecting?"Play Game":"Connecting to user"}</Button>}
          </div>
        </div>

      </div>

    </div>
    </>
  )
}

