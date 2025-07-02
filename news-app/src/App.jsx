import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from 'react-router-dom'
//import './App.css'
import Login from './login.jsx'
import Home from './home.jsx'
import Profile from './profile.jsx'
import News from './news.jsx'
import Register from './register.jsx'

function App() {
  return(
     <Routes>
       <Route path='/' element={<Register/>} />
       <Route path='/login' element={<Login/>} />
        <Route path='/home' element={<Home/>} />
         <Route path='/news' element={<News/>} />
         <Route path='/profile' element={<Profile/>} />
    </Routes>
  )


}
export default App
