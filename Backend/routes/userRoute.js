import express from "express";
import { getAdmin, getCurrentUser } from "../controller/userController.js";
import isAuth from "../middleware/isAuth.js";
import { adminAuth } from "../middleware/adminAuth.js";

const userRoute = express.Router();

userRoute.get("/getcurrentuser", isAuth,getCurrentUser)
userRoute.get("/getadmin", adminAuth,getAdmin)


export default userRoute

