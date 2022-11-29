import express from "express";
import { getAllRooms, getRoom, createRoom, updateRoom, deleteRoom } from "../controllers/roomsController.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})




const router = express.Router();
//READ
router.get("/", getAllRooms)
router.get("/:id", getRoom)
//CREATE
router.post("/:hotelId", verifyAdmin, upload.single("photos"),createRoom);
//UPDATE
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)


export default router;