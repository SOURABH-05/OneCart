

import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);

    // Get token from either 'jwt' or 'token'
    const token = req.cookies?.jwt || req.cookies?.token;

    if (!token || typeof token !== "string") {
      return res.status(401).json({ message: "No valid token found" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");

    // Your token payload has { id: userId }
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export default isAuth;
