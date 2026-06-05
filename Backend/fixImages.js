import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";

dotenv.config();

const updates = {
    "Premium Cotton T-Shirt": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600",
    "Classic Denim Jeans": "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
    "Fresh Paneer (Cottage Cheese)": "https://images.unsplash.com/photo-1551881192-002e02ab3dce?auto=format&fit=crop&q=80&w=600"
};

const fixDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB...");

        for (const [name, imageUrl] of Object.entries(updates)) {
            await Product.updateMany(
                { name }, 
                { $set: { image1: imageUrl, image2: imageUrl, image3: imageUrl, image4: imageUrl } }
            );
            console.log(`Fixed images for: ${name}`);
        }

        console.log("Successfully fixed product images!");

    } catch (err) {
        console.error("Error updating database:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

fixDB();
