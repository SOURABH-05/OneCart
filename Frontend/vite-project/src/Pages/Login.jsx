import React, { useState,useContext } from 'react'
import Logo from "../assets/Logo.png"
import { useNavigate } from 'react-router-dom'
import google from "../assets/google.png"
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { authDataContext } from '../context/AuthContext';
import axios from "axios"
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';
import { userDataContext } from '../context/userContext';

const login = () => {
    const navigate = useNavigate()
    const[show , setShow] = useState(false)

    const {serverUrl} = useContext(authDataContext)
    const {getCurrentUser} =useContext(userDataContext)
       
        const [email , setEmail] = useState("")
        const [password , setPassword] = useState("")
        
        const handleSingnUp = async(e)=>{
                try {
                    e.preventDefault();
                    const result = await axios.post(serverUrl + "/api/auth/login",{
                      email , password   
                    },{
                        withCredentials:true
                    })
                    console.log(result.data)
                    getCurrentUser()
                    navigate("/")

                    
                } catch (error) {
                    console.log(error)
                }
        
            }

            const googlelogin = async()=>{
        try {
           const response = await signInWithPopup(auth,provider) 
           let user = response.user
           let name = user.displayName;
           let email = user.email;

           const result = await axios.post(serverUrl + "/api/auth/googlelogin",{
            name , email
           },{withCredentials:true})
            getCurrentUser()
                    navigate("/")
        } catch (error) {
            console.log(error)
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
                <span className='text-[16px] font-semibold'>Wellcome to OneCart, Place your order</span>
            </div>
            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg flex items-center justify-center'>
                <form action="" onSubmit={handleSingnUp} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
                    <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[20px] py-[10px] cursor-pointer' onClick={googlelogin}>
                        <img src={google} alt="" className='w-[20px]' />
                        Login with Google
                    </div>

                    <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                        <div className='w-[40%] h-[1px] bg-[#96969635]'></div>Or <div className='w-[40%] h-[1px] bg-[#96969635]' ></div>
                    </div>
                    <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative space-y-3'>
                       
                        <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder="Email" required  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                        <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold' placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} value={password} />
                        {
                            show &&
                            <FaEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[54%]' onClick={()=>setShow( prev=> !prev)} />
                        }
                        {
                           !show && 
                            < IoMdEyeOff className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[54%] ' onClick={()=>setShow( prev=> !prev)} />
                        }

                    <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
                    <p className='flex gap-[10px]'>You haven't any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={()=>navigate("/signup")}>Create New Account</span></p>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default login