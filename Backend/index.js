import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import cors from "cors"
import userRoute from "./routes/userRoute.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
// Build allowed origins from env vars + local dev fallbacks
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(",").map(u => u.trim()) : []),
  ...(process.env.ADMIN_URL    ? process.env.ADMIN_URL.split(",").map(u => u.trim())    : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true
}))



app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)


app.listen(Port,()=>{
  console.log(`Your server is running on http://localhost:${Port}`)
   connectDB()

})
