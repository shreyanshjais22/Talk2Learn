import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log("Cookies:", req.cookies);
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};