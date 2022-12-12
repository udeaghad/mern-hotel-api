import dotenv from "dotenv";
import cloudinaryModule from "cloudinary";

dotenv.config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY

});

// cloudinary.config({ 
//   cloud_name: 'dozie-cloud-images', 
//   api_key: '175875789255482', 
//   api_secret: 'HkBzSPTYH7lryhIwyHIZiYC1n1o' 
// });

export default cloudinary;