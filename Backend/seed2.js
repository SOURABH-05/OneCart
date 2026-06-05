import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";

dotenv.config();

const productsToSeed = [
    {
        name: "Fresh Farm Eggs (12 pcs)",
        description: "Farm fresh organic brown eggs, rich in protein.",
        price: 90,
        category: "Dairy",
        subCategory: "Eggs",
        sizes: [],
        image1: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Premium Leather Loafers",
        description: "Elegant handcrafted leather loafers for men.",
        price: 3499,
        category: "Shoes",
        subCategory: "Formal",
        sizes: ["7", "8", "9", "10"],
        image1: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: false
    },
    {
        name: "Organic Honey 500g",
        description: "100% pure, raw, and unfiltered forest honey.",
        price: 350,
        category: "Grocery",
        subCategory: "Pantry",
        sizes: [],
        image1: "https://images.unsplash.com/photo-1587049352847-4d4b12e14149?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1587049352847-4d4b12e14149?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1587049352847-4d4b12e14149?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1587049352847-4d4b12e14149?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Women's Floral Maxi Dress",
        description: "A breezy and beautiful floral maxi dress, perfect for summer.",
        price: 1899,
        category: "Clothing",
        subCategory: "Dresses",
        sizes: ["S", "M", "L"],
        image1: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Fresh Mozzarella Cheese",
        description: "Authentic Italian-style fresh mozzarella cheese.",
        price: 299,
        category: "Dairy",
        subCategory: "Cheese",
        sizes: [],
        image1: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: false
    },
    {
        name: "Casual Slip-on Sneakers",
        description: "Comfortable and stylish everyday slip-on sneakers for women.",
        price: 1499,
        category: "Shoes",
        subCategory: "Casual",
        sizes: ["5", "6", "7", "8"],
        image1: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: true
    },
    {
        name: "Almond Milk 1L",
        description: "Unsweetened plant-based almond milk, dairy-free alternative.",
        price: 250,
        category: "Milk",
        subCategory: "Beverages",
        sizes: [],
        image1: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: false
    },
    {
        name: "Extra Virgin Olive Oil 500ml",
        description: "Cold-pressed extra virgin olive oil for cooking and salads.",
        price: 750,
        category: "Grocery",
        subCategory: "Oils",
        sizes: [],
        image1: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        image2: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        image3: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        image4: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        date: Date.now(),
        bestseller: true
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB...");

        await Product.insertMany(productsToSeed);
        console.log("Successfully seeded database with more beautiful items!");

    } catch (err) {
        console.error("Error seeding database:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

seedDB();
