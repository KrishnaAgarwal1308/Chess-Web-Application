import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'

export const Landing = () => {
    const navigate=useNavigate()
  return (
    <div className='p-4 pt-10 h-screen flex justify-center'>
        <div className='flex gap-10'>
            <div className="image"> <img src="/chess_board.png" alt="" className='w-[40vw]' /></div>
            <div className="text_and_button">
                <h1 className='text-4xl font-medium text-center'>Play Chess Online <br /> on the #3 Site!</h1>
                <Button onClick={() => {
                    navigate("/game")
                }}>Play Online</Button>
            </div>
        </div>
    </div>
  )
}

