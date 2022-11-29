import express from "express";
import { createHotel, deleteHotel, getAllHotels, getHotel, updatedHotel } from "../controllers/hotelsController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
// import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import multer from "multer"
const router = express.Router();

//Handle image upload to mongoDB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})


//CREATE
router.post("/", verifyAdmin, upload.single("photos"), createHotel)
//UPDATE
router.put("/:id", verifyAdmin, updatedHotel)
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel)
//GET
router.get("/:id", getHotel)
//GET ALL

router.get("/", getAllHotels)

export default router;