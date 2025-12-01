import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
// Genarate json web token
const generateToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
   })
}


// API TO register user
export const registerUser = async (req, res) => {
   const { name, email, password } = req.body;

   try {
      const userExists = await User.findOne({ email });

      if (userExists) {
         return res.json({ success: false, message: "User already exists" });
      }

      const user = await User.create({ name, email, password });
      const token = generateToken(user._id);


      return res.status(201).json({ success: true, token });

   } catch (error) {
      console.error(error);

      return res.json({
         success: false,
         message: error.message,
      });
   }
}

// API to login user
export const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email })

      if (user) {
         const isMatch = await bcrypt.compare(password, user.password)

         if (isMatch) {
            const token = generateToken(user._id);
            return res.json({
               success: true, token
            })
         }
      }
      return res.json({
         success: false, message: "Invalid email or password"
      })
   } catch (error) {
      return res.json({ success: false, message: error.message })
   }
}

// API to get user data
export const getUser = async (req, res) => {
   try {
      const user = req.user;
      return res.json({ success: true, user })

   } catch (error) {
      console.error(message.error);
      return res.json({
         success: false, message: error.message
      })

   }

}