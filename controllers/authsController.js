import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const register = async(req, res, next) => {
  
  try {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash
    })

    await newUser.save();
    res.status(200).send("User has been created successfully")
  } catch (error) {
    next(error)
  }
}

export const login = async(req, res, next) => {
  
  try {
     const user = await User.findOne({username: req.body.username})
     if(!user) return next(createError(404, "User not found"))
     
     const validpassword = await bcrypt.compare(req.body.password, user.password)
     if(!validpassword) return next(createError(404, "Invalid pasword"))
     
     const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

     const {password, ...others} = user._doc;

     res
     .cookie("access_token", token, { httpOnly: true})
     .status(200).json(others)
     
  } catch (error) {
    next(error)
  }
}

export const logout = async(req, res, next) => {
  res.clearCookie("access_token")
  res.status(200).json({message: "User has been logged out"})
}