import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";

dotenv.config();

// Restore beautiful Unsplash images - user confirmed they load fine
const updates = [
    { name: "Premium Cotton T-Shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600" },
    { name: "Classic Denim Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600" },
    { name: "Running Sneakers", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600" },
    { name: "Organic Farm Fresh Milk", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600" },
    { name: "Rich Creamy Butter", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600" },
    { name: "Fresh Paneer (Cottage Cheese)", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600" },
    { name: "Whole Wheat Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600" },
    { name: "Premium Basmati Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=600" },
    { name: "Fresh Farm Eggs (12 pcs)", image: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600" },
    { name: "Premium Leather Loafers", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600" },
    { name: "Organic Honey 500g", image: "https://images.unsplash.com/photo-1587049352847-4d4b12e14149?auto=format&fit=crop&q=80&w=600" },
    { name: "Women's Floral Maxi Dress", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600" },
    { name: "Fresh Mozzarella Cheese", image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&q=80&w=600" },
    { name: "Casual Slip-on Sneakers", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600" },
    { name: "Almond Milk 1L", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600" },
    { name: "Extra Virgin Olive Oil 500ml", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600" }
];

const restoreImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB...");

        for (const { name, image } of updates) {
            const result = await Product.updateMany(
                { name },
                { $set: { image1: image, image2: image, image3: image, image4: image } }
            );
            console.log(`Restored ${result.modifiedCount} product(s) for: ${name}`);
        }

        console.log("✅ All product images restored to beautiful Unsplash photos!");

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
};

restoreImages();
