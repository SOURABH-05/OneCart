import express from "express";
import { adminLogin, googleLogin, login, logout, Registration } from "../controller/authController.js";

const authRoute = express.Router();

authRoute.post("/registration",Registration)
authRoute.post("/login",login)
authRoute.post("/logout",logout)
authRoute.post("/googlelogin",googleLogin)
authRoute.post("/adminlogin",adminLogin)





export default authRoute

