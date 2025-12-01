import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // adjust path as needed

export const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // console.log(token);
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user by ID
    const user = await User.findById(decoded.id) // exclude password
   // console.log(decoded);
    if (!user) {
      return res.status(401).json({ success: false, message: "Not authorized, user not found" });
    }

    // Attach user to request
    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};
