import mongoose from 'mongoose';
const { Schema } = mongoose;

const HotelSchema = new Schema({
  name:{
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  photos: {
    type: String,
    required: true    
  },
  
  cheapest_price: {
    type: Number,
  },

  rooms: {
    type: [{type:Schema.Types.ObjectId , ref: "Room", required: true}],
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },

  featured: {
    type: Boolean,
    default: false
  },
  city: {
    type: String
  },
   
  desc: {
    type: String,
   },
  
}, 
{timestamps: true});

export default mongoose.model("Hotel", HotelSchema);