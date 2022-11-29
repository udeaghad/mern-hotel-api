import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import reservationsRoute from "./routes/reservation.js"
import cookieParser from 'cookie-parser';
// import multer from 'multer';

const app = express();
dotenv.config();
app.use(cors( {credentials: true, origin: "http://localhost:3000"} ));
app.use(express.json());

//connect to database
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
   
  } catch (error) {
    console.error(error.message)
  }
}

//Check connection to MongoDB
mongoose.connection.on("disconnected", ()=>{
  console.log("Disconnected from mongoDB")
})

mongoose.connection.on("connected", ()=>{
  console.log("mongoDB connected")
})

//cookie parser
app.use(cookieParser())

//add route entry point

// app.get('/api/v1/', (req,res) => {
//   res.send("Hello world")
// })


app.use("/api/v1/auths", authRoute);
app.use("/api/v1/users", usersRoute)
app.use("/api/v1/hotels", hotelsRoute)
app.use("/api/v1/rooms", roomsRoute)
app.use("/api/v1/reservations", reservationsRoute)

//Error handler
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Sorry, something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack
  })
})


app.listen(5000, () =>{
  connect();
  console.log("Server is running on port 5000");
})