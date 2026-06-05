import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/productModel.js";

dotenv.config();

// Category → curated Unsplash image pools
const categoryImages = {
    "Clothing": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=600"
    ],
    "Men": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600"
    ],
    "Women": [
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600"
    ],
    "Kids": [
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80&w=600"
    ],
    "Shoes": [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=600"
    ],
    "Dairy": [
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&q=80&w=600"
    ],
    "Milk": [
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1600456899121-68eda5b33ef7?auto=format&fit=crop&q=80&w=600"
    ],
    "Grocery": [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1587049352847-4d4b12e14149?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&q=80&w=600"
    ],
    "Butter": [
        "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=600"
    ]
};

const fallbackImage = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600";

const isMissingImage = (img) => {
    return !img || img.includes("placehold.co") || img === "" || img === undefined;
};

let categoryCounters = {};

const getImageForCategory = (category) => {
    const pool = categoryImages[category] || categoryImages["Grocery"];
    if (!categoryCounters[category]) categoryCounters[category] = 0;
    const img = pool[categoryCounters[category] % pool.length];
    categoryCounters[category]++;
    return img;
};

const fixMissingImages = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB...");

        const allProducts = await Product.find({});
        console.log(`Found ${allProducts.length} total products.`);

        let fixed = 0;
        for (const product of allProducts) {
            if (isMissingImage(product.image1)) {
                const newImage = getImageForCategory(product.category);
                await Product.findByIdAndUpdate(product._id, {
                    $set: {
                        image1: newImage,
                        image2: newImage,
                        image3: newImage,
                        image4: newImage
                    }
                });
                console.log(`✅ Fixed: "${product.name}" (${product.category}) → new image assigned`);
                fixed++;
            }
        }

        if (fixed === 0) {
            console.log("✅ All products already have images! No fixes needed.");
        } else {
            console.log(`\n🎉 Fixed ${fixed} product(s) with missing images.`);
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
};

fixMissingImages();
