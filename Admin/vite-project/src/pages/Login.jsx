import React from 'react'

import Logo from "../assets/logo.png"


import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from "axios"
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const Login = () => {
    const [loading,setLoading] = useState(false)
    const [email , setEmail] = useState("")
            const [password , setPassword] = useState("")
            const[show , setShow] = useState(false)
            const {serverUrl} = useContext(authDataContext)
            const {adminData,getAdmin} = useContext(adminDataContext)

            const navigate = useNavigate()


            const AdminLogin =  async(e) =>{
                setLoading(true)
                try {
                    e.preventDefault()
                    const result =  await axios.post( serverUrl + "/api/auth/adminlogin",{email,password},
                        {withCredentials:true}
                    )
                    setLoading(false)
                    console.log(result)
                    toast.success("Admin login Successfully")
                    getAdmin();
                    navigate("/")
                    
                } catch (error) {
                    console.log(error)
                    toast.error("Admin login failed")
                }


            }
  return (
   <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
               <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                   <img className='w-[40px]' src={Logo} alt="" />
                   <h1 className='text-[22px] font-sans'>OneCart</h1>
               </div>
               <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[px]'>
                   <span className='text-[25px] font-semibold'>Login Page</span>
                   <span className='text-[16px] font-semibold'>Wellcome to OneCart, Login for Admin</span>
               </div>
               <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg flex items-center justify-center'>
                   <form action="" onSubmit={AdminLogin}  className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                       
   
                       
                       <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative space-y-3'>
                          
                           <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder="Email" required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                           <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} value={password} />
                           {
                               show &&
                               <FaEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[47%]' onClick={()=>setShow( prev=> !prev)} />
                           }
                           {
                              !show && 
                               < IoMdEyeOff className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[47%] ' onClick={()=>setShow( prev=> !prev)} />
                           }
   
                       <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>{loading ? <Loading/>: "Login"}</button>
                       
                       </div>
   
   
                   </form>
               </div>
           </div>
  )
}

export default Login