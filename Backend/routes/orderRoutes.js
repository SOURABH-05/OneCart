import express from 'express'
import isAuth from '../middleware/isAuth.js'
import {  allOrders, placeOrder, updateStatus, userOrders, placeOrderRazorpay, verifyRazorpay, cancelOrder } from '../controller/orderController.js'
import { adminAuth } from '../middleware/adminAuth.js'

const orderRoutes = express.Router()

//for User
orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.post("/userorder",isAuth,userOrders)
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay)
orderRoutes.post("/verifyRazorpay", isAuth, verifyRazorpay)
orderRoutes.post("/cancel", isAuth, cancelOrder)


//for Admin
orderRoutes.post("/list",adminAuth,allOrders)
orderRoutes.post("/status",adminAuth,updateStatus)


export default orderRoutes