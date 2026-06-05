import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";

dotenv.config();

const dummyImage = "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600";

const productsToSeed = [
    {
        name: "Premium Cotton T-Shirt",
        description: "A comfortable and stylish cotton t-shirt for everyday wear.",
        price: 499,
        category: "Clothing",
        subCategory: "TopWear",
        sizes: ["S", "M", "L", "XL"],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Classic Denim Jeans",
        description: "Durable and fashionable denim jeans.",
        price: 1299,
        category: "Clothing",
        subCategory: "BottomWear",
        sizes: ["M", "L", "XL"],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: false
    },
    {
        name: "Running Sneakers",
        description: "Lightweight and breathable running shoes.",
        price: 2499,
        category: "Shoes",
        subCategory: "Sports",
        sizes: ["8", "9", "10", "11"],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Organic Farm Fresh Milk",
        description: "Pure and organic cow milk from local farms.",
        price: 70,
        category: "Milk",
        subCategory: "Beverages",
        sizes: [],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Rich Creamy Butter",
        description: "Smooth and creamy unsalted butter.",
        price: 250,
        category: "Butter",
        subCategory: "Dairy Products",
        sizes: [],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: false
    },
    {
        name: "Fresh Paneer (Cottage Cheese)",
        description: "Soft and fresh paneer made from pure cow milk.",
        price: 150,
        category: "Dairy",
        subCategory: "Dairy Products",
        sizes: [],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Whole Wheat Bread",
        description: "Healthy and nutritious whole wheat bread.",
        price: 45,
        category: "Grocery",
        subCategory: "Bakery",
        sizes: [],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: false
    },
    {
        name: "Premium Basmati Rice",
        description: "Long grain aromatic basmati rice.",
        price: 220,
        category: "Grocery",
        subCategory: "Grains",
        sizes: [],
        image1: dummyImage,
        image2: dummyImage,
        image3: dummyImage,
        image4: dummyImage,
        date: Date.now(),
        bestseller: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB...");

        await Product.insertMany(productsToSeed);
        console.log("Successfully seeded database with new products!");

    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

seedDB();
