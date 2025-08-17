import User from "../model/userModel.js"

export const getCurrentUser = async(req,res) => {
try {

let user = await User.findById(req.userId).select("-password")
if(!user) {
    return res.status(404).json({message : ' user not found'})
}
return res.status(200).json(user)

} catch (error) {
   console.log(error) 
    return res.status(500).json({message : 'getcurrentuser erorr '})
}
}


export const getAdmin = async(req,res) =>{
    
    try {
        
        const adminEmail = req.adminEmail;
        if(!adminEmail){
         return res.status(404).json({ message: "admin is not found" });   
        }
    
        return res.status(201).json({
            email:adminEmail,
            role: 'admin'
        })
    } catch (error) {
        console.log(error)
       
    }
}
