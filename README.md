# 🛒 OneCart — Multi-Category E-Commerce Platform

OneCart is a full-stack e-commerce web application built with React (Vite), Node.js, Express, and MongoDB. It supports multiple product categories including Clothing, Shoes, Grocery, Dairy, Milk, and Butter — making it a complete one-stop online shopping experience.

---

## 🌟 Features

### 🛍️ Shopping Experience
- **Multi-Category Marketplace** — Browse Clothing, Shoes, Grocery, Dairy, Milk, Butter & more
- **Hero Banner Slider** — Auto-cycling banner showcasing different categories
- **Mixed Latest Collections** — Home page shows a balanced mix of products across all categories
- **Best Sellers** — Curated top-picked products from across the catalog
- **Product Detail Page** — Image gallery, size selector, star ratings, discount badge, and trust badges
- **Related Products** — Shows similar items on the product detail page

### 🔍 Browse & Filter
- **Category Filter Sidebar** — Filter by Clothing, Men, Women, Kids, Shoes, Dairy, Grocery, Milk, Butter
- **Sort Options** — Sort by Relevance, Price (Low–High), Price (High–Low), or Newest First
- **Live Search** — Instant search bar filters products as you type
- **Skeleton Loading** — Product cards show a shimmer effect while data loads

### 🛒 Cart & Checkout
- **Add to Cart / Quick Add** — Add from card directly (no-size categories) or from detail page
- **Buy Now** — Skip cart and go directly to checkout
- **Cart Persists** — Cart data stored in localStorage and survives page refresh
- **Quantity Controls** — Increase or decrease quantity in cart
- **Billing & Shipping** — Separate billing address toggle at checkout
- **Payment Methods** — Cash on Delivery (COD) + Razorpay online payment

### 📦 Orders
- **Order Confirmation** — Detailed receipt with Order ID, items, pricing breakdown, shipping & billing address
- **My Orders** — View all past orders with current status (Order Placed, Packing, Shipped, Out for Delivery, Delivered, Cancelled)
- **Cancel Order** — Cancel orders that are still in early stages (Order Placed / Packing)

### 🤖 AI Voice Assistant
- Built-in voice command assistant for hands-free shopping
- Commands like "go to grocery", "open cart", "place order"

### 🔐 Authentication
- JWT-based login & registration with cookie sessions
- Google OAuth support
- Protected routes — redirect to login if not authenticated

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS v4 + Custom CSS Animations |
| State | React Context API |
| Backend | Node.js + Express.js |
| Database | MongoDB (Mongoose) |
| Payments | Razorpay |
| Auth | JWT + HTTP-only Cookies |
| Image Hosting | Cloudinary / Unsplash |

---

## 📁 Project Structure

```
OneCart/
├── Frontend/
│   └── vite-project/          # React frontend (Vite + Tailwind)
│       ├── src/
│       │   ├── Pages/         # Route pages (Home, Collections, Cart, etc.)
│       │   ├── components/    # Reusable UI components
│       │   └── context/       # ShopContext, AuthContext, UserContext
│       └── .env               # VITE_SERVER_URL
│
├── Backend/
│   ├── controller/            # Business logic (order, product, cart, auth)
│   ├── model/                 # Mongoose schemas
│   ├── routes/                # Express route definitions
│   ├── middleware/            # Auth, admin, file upload
│   ├── config/                # DB, Cloudinary, env
│   └── .env                   # Secrets (Mongo, JWT, Razorpay)
│
└── Admin/
    └── vite-project/          # Admin dashboard (React + Vite)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Razorpay test account

### 1. Clone the repository
```bash
git clone https://github.com/SOURABH-05/OneCart.git
cd OneCart
```

### 2. Set up the Backend
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:
```env
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/onecart
JWT_SECRET=your_super_secret_key
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
PORT=4000
```

Start the backend:
```bash
node index.js
```

### 3. Set up the Frontend
```bash
cd ../Frontend/vite-project
npm install
```

Create a `.env` file in `Frontend/vite-project/`:
```env
VITE_SERVER_URL=http://localhost:4000
```

Start the frontend:
```bash
npm run dev
```

### 4. Set up the Admin (Optional)
```bash
cd ../../Admin/vite-project
npm install
npm run dev
```

---

## 🌱 Seed the Database (Optional)

To populate your database with sample products:
```bash
cd Backend
node seed.js    # Seeds initial products
node seed2.js   # Seeds more products across all categories
```

---

## 🚀 Deployment

### Backend → Render
1. Push to GitHub
2. Create a **Web Service** on [render.com](https://render.com)
3. Set root directory to `Backend`
4. Set Start Command: `node index.js`
5. Add all environment variables from your `.env`

### Frontend → Vercel
1. Import repo on [vercel.com](https://vercel.com)
2. Set root directory to `Frontend/vite-project`
3. Add environment variable: `VITE_SERVER_URL=https://your-render-backend-url`
4. Deploy

### Admin → Vercel (same steps, root = `Admin/vite-project`)

---

## 🧪 Test Credentials (Development Only)

You can register a new account on the `/signup` page. No pre-seeded test users.

For Razorpay test payments, use:
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

---

## 📸 Screenshots

> Homepage with multi-category hero banner, Latest Collections (mixed categories), and Best Sellers.

---

## 🗂️ API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET  | `/api/product/list` | Get all products |
| POST | `/api/cart/add` | Add to cart |
| POST | `/api/cart/get` | Get cart |
| POST | `/api/order/placeorder` | Place COD order |
| POST | `/api/order/razorpay` | Create Razorpay order |
| POST | `/api/order/verifyRazorpay` | Verify payment |
| POST | `/api/order/userorder` | Get user orders |
| POST | `/api/order/cancel` | Cancel an order |
| POST | `/api/order/list` | Admin: Get all orders |
| POST | `/api/order/status` | Admin: Update order status |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Sourabh** — [@SOURABH-05](https://github.com/SOURABH-05)

Built with ❤️ using React, Node.js, and MongoDB.
