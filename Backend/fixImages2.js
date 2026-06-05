import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";

dotenv.config();

const updates = {
    "Premium Cotton T-Shirt": "https://placehold.co/600x600?text=Cotton+T-Shirt",
    "Classic Denim Jeans": "https://placehold.co/600x600?text=Denim+Jeans",
    "Running Sneakers": "https://placehold.co/600x600?text=Sneakers",
    "Organic Farm Fresh Milk": "https://placehold.co/600x600?text=Fresh+Milk",
    "Rich Creamy Butter": "https://placehold.co/600x600?text=Butter",
    "Fresh Paneer (Cottage Cheese)": "https://placehold.co/600x600?text=Paneer",
    "Whole Wheat Bread": "https://placehold.co/600x600?text=Wheat+Bread",
    "Premium Basmati Rice": "https://placehold.co/600x600?text=Basmati+Rice",
    "Fresh Farm Eggs (12 pcs)": "https://placehold.co/600x600?text=Eggs",
    "Premium Leather Loafers": "https://placehold.co/600x600?text=Loafers",
    "Organic Honey 500g": "https://placehold.co/600x600?text=Honey",
    "Women's Floral Maxi Dress": "https://placehold.co/600x600?text=Maxi+Dress",
    "Fresh Mozzarella Cheese": "https://placehold.co/600x600?text=Mozzarella",
    "Casual Slip-on Sneakers": "https://placehold.co/600x600?text=Slip-ons",
    "Almond Milk 1L": "https://placehold.co/600x600?text=Almond+Milk",
    "Extra Virgin Olive Oil 500ml": "https://placehold.co/600x600?text=Olive+Oil"
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

        console.log("Successfully fixed product images to generic placeholders!");

    } catch (err) {
        console.error("Error updating database:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

fixDB();
