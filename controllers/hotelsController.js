import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"
import fs from "fs";
import cloudinary from "../utils/cloudinary.js"
// import { createError } from "../utils/createError.js";

export const createHotel = async(req, res, next) => {
  //upload image to cloudnaryconst
   
  try {
      if(req.body.photos){
        const img = await cloudinary.uploader.upload(req.body.photos, {
          upload_preset: "hotel-images"
      })
  
      if(img){
        const newHotel = new Hotel({
          ...req.body,
          photos: img.url
        })
        const savedHotel = await newHotel.save();
        res.status(200).json({hotel: savedHotel, message: "Hotel has been created successfully"})
      }
    } 
  
    
  } catch (error) {
   next(error)
  }  
}

export const updatedHotel = async(req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
    res.status(200).json({hotel:updatedHotel, message: "Hotel has been updated successfully"})
  } catch (error) {
    next(error)
  }  
}

export const deleteHotel = async(req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id)
    await Room.deleteMany({hotel: req.params.id})
    
    res.status(200).json("Hotel has been deleted")
  } catch (error) {
    next(error)
  }  
}

export const getHotel = async(req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id).populate("rooms");
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }  
}

export const getAllHotels = async(req, res, next) => {
  let filter = req.query
  let query

  if(filter){
    if("name" in filter){
      query = { $text: { $search: filter.name } }
    }else if("city" in filter){
      query = { "city": { $eq: filter.city }  }
    }
  }
  
  try {
    const allHotels = await Hotel.find(query);    
    res.status(200).json(allHotels)
    
  } catch (error) {
    next(error)
  }  
}