import { User } from "../model/UserModel/model.user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {generateOTP,sendOTPEmail} from "../utils/authEmail.js"
 // Importing local-storage for local storage management

dotenv.config(); // Load environment variables

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('Received signup data:', req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      userName: username,
      userEmail: email,
      userPassword: hashedPassword,
    });

    await newUser.save();

    // Create JWT token (optional, for instant login)
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token valid for 7 days
    );
    console.log("hello",token);
    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: newUser._id,
        userName: newUser.userName,
        userEmail: newUser.userEmail,
      },
    });

  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const sendOtp = async (req,res)=>{
  try{
   const {email} = req.body;
   const otp =  generateOTP();
   await sendOTPEmail(email,otp);
   res.status(200).json({message:"Otp sent sucessfully!",
     otp:otp
   })

  }catch(err){
    res.status(500).json({err:err.message});
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received login data:', email, password);

    // Check if user exists
    const user = await User.findOne({ userEmail: email });
    console.log('User found:', user);

    if (!user) {
      
      return res.status(400).json({ error: "Invalid email or password." });
    }
      // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.userPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password." });
    }
   
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token valid for 7 days
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  //store the token to local storage
return res.status(200).json({
      message: "Login successful!",
      user: {
        id: user._id,
        userName: user.userName,
        userEmail: user.userEmail,
      },
    });

  }catch(error){
    console.error('Login error:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}
//api for cookies 

//check email exists or not
const checkEmailExistsOrNot = async (req,res)=>{
  const {email} = req.params;
  console.log(email);
  const user = await User.findOne({ userEmail: email });
  if(user){
    res.status(200).json({message:"emaill already exists"});
  }else{
   res.status(400).json({error:"Email not used"});
  }
  
}

export {sendOtp,signUp,login,checkEmailExistsOrNot};