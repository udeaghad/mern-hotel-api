import express from 'express';
import { verifyUser } from '../utils/verifyToken.js';
import { createReservation, getAllReservations, updateReservation, deleteReservation } from '../controllers/reserveController.js';

const router = express.Router();

//CREATE
router.post("/", verifyUser, createReservation);
//READ
router.get("/:user_id", verifyUser, getAllReservations);
//UPDATE
router.put("/:id", verifyUser, updateReservation)
//DELETE
router.delete("/:id", verifyUser, deleteReservation)

export default router
