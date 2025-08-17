import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import { useEffect } from 'react';
import axios from "axios"
export const adminDataContext = createContext();

const AdminContext = ({children}) => {
 
    const [adminData,setAdminData] = useState(null);
    const {serverUrl} = useContext(authDataContext)

    const getAdmin = async()=>{
        try {
            const result = await axios.get(serverUrl + "/api/user/getadmin",
                { withCredentials: true }
            )
            console.log(result.data)
            setAdminData(result.data)
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
getAdmin()
    },[])
    let value = {
        adminData,setAdminData,getAdmin
    }
  return (
   <>
    <adminDataContext.Provider value={value}>
        {children}
    </adminDataContext.Provider>

   </>
  )
}

export default AdminContext