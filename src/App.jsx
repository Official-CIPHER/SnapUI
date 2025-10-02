import React from 'react'
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import LandingPage from './pages/LandingPage'

const App = () => {
  return (
    <>
     <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='*' element={<NoPage/>}/>
      </Routes>
    

     </BrowserRouter> 
    </>
  )
}

export default App