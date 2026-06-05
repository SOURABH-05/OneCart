import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";

dotenv.config();

const imageMap = {
    "Premium Cotton T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600",
    "Classic Denim Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    "Running Sneakers": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    "Organic Farm Fresh Milk": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600",
    "Rich Creamy Butter": "https://images.unsplash.com/photo-1589132145347-1f6b86ce45f6?auto=format&fit=crop&q=80&w=600",
    "Fresh Paneer (Cottage Cheese)": "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600",
    "Whole Wheat Bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
    "Premium Basmati Rice": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600"
};

const updateDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB for update...");

        for (const [name, imageUrl] of Object.entries(imageMap)) {
            await Product.updateMany(
                { name }, 
                { $set: { image1: imageUrl, image2: imageUrl, image3: imageUrl, image4: imageUrl } }
            );
            console.log(`Updated images for: ${name}`);
        }

        console.log("Successfully updated product images!");

    } catch (err) {
        console.error("Error updating database:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

updateDB();
