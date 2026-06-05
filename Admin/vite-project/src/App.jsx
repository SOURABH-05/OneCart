import React from 'react'
import Home from './pages/Home'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './pages/Login'
import {Routes, Route} from "react-router-dom"
import { useContext } from 'react'
import { adminDataContext } from './context/AdminContext'

  import { ToastContainer} from 'react-toastify';

const App = () => {
  const {adminData} = useContext(adminDataContext)
  return (
    <>
    <ToastContainer />
    {
      !adminData ? <Login/>:
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/lists" element={<List />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/login" element={<Login />} />

      </Routes>

    </>
    }
    </>
  )
}

export default App