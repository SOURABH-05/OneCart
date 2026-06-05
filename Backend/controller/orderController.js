import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from 'razorpay';
import crypto from 'crypto';

// Global variables
const currency = "INR";
const deliveryCharge = 40;

export const placeOrder = async(req,res)=>{
       
    try {
        const {items,amount,address} = req.body;
          const userId = req.userId
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
         }
         const newOrder = new Order(orderData)
         await newOrder.save()

         await User.findByIdAndUpdate(userId,{cartData:{}})
         return res.status(201).json({message:'Order Place'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Order Place error'})
    }

}

export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency: currency,
            receipt: newOrder._id.toString()
        };

        const razorpayInstance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const order = await razorpayInstance.orders.create(options);
        
        // Don't clear cart here yet, we'll do it on verify or let frontend handle it
        await User.findByIdAndUpdate(userId,{cartData:{}})

        res.status(201).json({ success: true, order, dbOrderId: newOrder._id });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Successful" });
        } else {
            res.json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default placeOrder;

export const userOrders = async (req,res) => {
      try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"userOrders error"})
    }
    
}

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.userId;

        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.userId.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        if (order.status !== 'Order Placed' && order.status !== 'Packing') {
            return res.status(400).json({ success: false, message: "Order cannot be cancelled at this stage" });
        }

        await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' });
        
        res.json({ success: true, message: "Order cancelled successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//for Admin
export const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders error"})
        
    }
    
}
    
export const updateStatus = async (req,res) => {
    
try {
    const {orderId , status} = req.body

    await Order.findByIdAndUpdate(orderId , { status })
    return res.status(201).json({message:'Status Updated'})
} catch (error) {
     return res.status(500).json({message:error.message
            })
}
}