import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import { Game } from "./screens/Game";
import { Landing } from "./screens/Landing";

function App() {

  return (<div className="bg-zinc-700 text-white h-screen">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  </div>
    // <>
    //   <button className='bg-red-400'>join room</button>
    // </>
  )
}

export default App
