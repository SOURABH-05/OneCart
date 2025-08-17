import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './Pages/Registration'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Nav from './components/Nav'
import { userDataContext } from './context/userContext'

const App = () => {
  const {userData} = useContext(userDataContext)
  return (
   <>
   {
    userData && <Nav />
   }
   
   <Routes>
    <Route path="/signup" element={<Registration/>} />
    <Route path="/" element={<Home/>} />
    <Route path="/login" element={<Login/>} />

   </Routes>
   
   </>
  )
}

export default App