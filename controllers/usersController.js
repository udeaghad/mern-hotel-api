import User from "../models/User.js";

export const updateUser = async(req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    const {password, ...others} = updatedUser._doc;
    res.status(200).json(others)
  } catch (error) {
    next(error)
  }  
}

export const deleteUser = async(req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("User has been deleted")
  } catch (error) {
    next(error)
  }  
}

export const getUser = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc;
    res.status(200).json(others)
  } catch (error) {
    next(error)
  }  
}

export const getAllUsers = async(req, res, next) => {
  // const failed = true;

  // if (failed){
  //   return next(createError(401, "You are not authorized to access this page"))
  // }
  try {
    const allUsers = await User.find();

    const allUserDetails = allUsers.map(user => {  
      const {password, ...others} = user._doc;
      return others
    })

    res.status(200).json(allUserDetails)
  } catch (error) {
    next(error)
  }  
}