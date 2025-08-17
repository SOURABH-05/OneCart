import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import cors from "cors"
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:["http://localhost:5173", "http://localhost:5174"],
  credentials: true
  
}))



app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)

app.listen(Port,()=>{
  console.log(`Your server is running on http://localhost:${Port}`)
   connectDB()

})
