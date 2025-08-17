import React, { useContext, useState } from 'react'
import logo from "../assets/logo.png"
import { IoSearchCircle, IoSearchCircleOutline } from "react-icons/io5";
import { FaUserCircle } from 'react-icons/fa';
import { MdContacts, MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import { HiOutlineCollection } from "react-icons/hi";
import axios from 'axios';
import { IoMdHome } from 'react-icons/io';

const Nav = () => {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      // ✅ correctly send credentials
      const result = await axios.post(
        serverUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(result.data);
      setUserData(null);
      setShowProfile(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>

      {/* Logo */}
      <div className='w-[20%] lg:w-[30%]  flex items-center justify-start gap-[10px]'>
        <img src={logo} alt="logo" className='w-[30px]' />
        <h1 className='text-[25px] text-[black] font-sans'>OneCart</h1>
      </div>

      {/* Nav Links */}
      <div className='w-[50%] lg:w-[40%] hidden md:flex'>
        <ul className='flex items-center justify-center gap-[10px] text-[white]'>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'>HOME</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'>COLLECTIONS</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'>ABOUT</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'>CONTACT</li>
        </ul>
      </div>

      {/* Icons */}
      <div className='w-[30%] flex items-center justify-end gap-[20px]'>

        {/* Search Toggle */}
        {!showSearch ? (
          <IoSearchCircleOutline
            className='w-[39px] h-[39px] text-[#000000] cursor-pointer'
            onClick={() => setShowSearch(true)}
          />
        ) : (
          <IoSearchCircle
            className='w-[39px] h-[39px] text-[#000000] cursor-pointer'
            onClick={() => setShowSearch(false)}
          />
        )}

        {/* User / Profile */}
        {!userData ? (
          <FaUserCircle
            className='w-[29px] h-[29px] text-[#000000] cursor-pointer'
            onClick={() => setShowProfile(prev => !prev)}
          />
        ) : (
          <div
            className='w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer'
            onClick={() => setShowProfile(prev => !prev)}
          >
            {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </div>
        )}

        {/* Cart */}
        <div className='relative'>
          <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block'  />
         <p className="absolute w-[18px] h-[18px] hidden md:flex items-center justify-center bg-black text-white rounded-full text-[9px] top-[-5px] right-[-5px]">
  10
</p>

        </div>
      </div>

      {/* Search Input */}
      {showSearch && (
        <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center'>
          <input
            type="text"
            className='w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]'
            placeholder='Search here'
          />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border border-[#aaa9a9] rounded-[10px] z-10'>
          <ul className='w-full h-full flex items-start justify-around flex-col text-[17px] py-[10px] text-white'>

            {!userData && (
              <li
                className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={() => { navigate("/login"); setShowProfile(false); }}
              >
                Login
              </li>
            )}

            {userData && (
              <li
                className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'
                onClick={handleLogOut}
              >
                LogOut
              </li>
            )}

            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>Orders</li>
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>About</li>
          </ul>
        </div>
      )}

      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-white flex items-center justify-center flex-col gap-[2px] ' >
          <IoMdHome  className='w-[25px] h-[25px] text-[white] md:hidden'/>  Home
        </button>

         <button className='text-white flex items-center justify-center flex-col gap-[2px] ' >
          <HiOutlineCollection   className='w-[25px] h-[25px] text-[white] md:hidden'/>  Collections
        </button>

         <button className='text-white flex items-center justify-center flex-col gap-[2px] ' >
          <MdContacts className='w-[25px] h-[25px] text-[white] md:hidden'/>  Contact
        </button>

         <button className='text-white flex items-center justify-center flex-col gap-[2px] ' >
          <MdOutlineShoppingCart  className='w-[25px] h-[25px] text-[white] md:hidden'/>  Cart
        </button>

      </div>

    </div>
  )
}

export default Nav
