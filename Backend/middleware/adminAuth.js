import jwt from "jsonwebtoken";

export const adminAuth = async(req, res, next) => {
   try {
        const token = req.cookies?.jwt || req.cookies?.token;

      if (!token) {
    return res.status(401).json({ message: "unAuthorised login again" });
      }

   const verifyToken = jwt.verify(token,process.env.JWT_SECRET)

   if(!verifyToken){
    return res.status(401).json({ message: "unAuthorised login again Invalid token" });
   }

   req.adminEmail = process.env.EMAIL
   next()
 
    
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: "Invalid token." });
  }
};
