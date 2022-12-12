import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import reservationsRoute from "./routes/reservation.js";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
// import swaggerJSDoc from "swagger-jsdoc";


const app = express();
dotenv.config();
// app.use(cors( {credentials: true, origin: "https://booooka-hotel-app.netlify.app"} ));
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
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

app.get('/api/v1/', (req,res) => {
  res.send("Hello world")
})


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

// swagger
// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Booooka Hotel API',
//     version: '1.0.0',
//     description: "Booooka Hotel API Documentation",
//     licence: {
//       name: 'MIT',
//       url: 'https://opensource.org/licenses/MIT'
//     },

//     contact: {
//       name: 'Booooka Hotel',
//       url: 'https://booooka-hotel-app.netlify.app',
//     }
//   },
//   servers: [
//     {
//       url: 'http://localhost:5000/api/v1',
//       description: 'Local server'
//     },
//     {
//       url: 'https://booooka-api.onrender.com/api/v1',
//       description: 'Production server'
//     }
//   ]
// };

// const options= {
//   swaggerDefinition,
//   apis: ['./routes/*.js']
// }

// const swaggerDocs = swaggerJSDoc(options);
const swaggerDocument = YAML.load('./swagger.yaml');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(5000, () =>{
  connect();
  console.log("Server is running on port 5000");
})