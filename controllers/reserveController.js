import Reservation from "../models/Reservation.js";

export const createReservation = async(req, res, next) => {
  // const newReservation = new Reservation(req.body);
  const newReservation = new Reservation({
    ...req.body,
    user: req.user.id,
  });

  try {
    const savedReservation = await newReservation.save();
    res.status(200).json(savedReservation)
  } catch (error) {
    next(error);
  }
}

export const updateReservation = async(req, res, next) => {
  const reservationId = req.params.id;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, {$set: req.body}, {new:true});
    res.status(200).json(updatedReservation)
  } catch (error) {
    next(error);
  }
}

export const deleteReservation = async(req, res, next) => {
  const reservationId = req.params.id;

  try {
    await Reservation.findByIdAndDelete(reservationId)
    res.status(200).json({message: "Reservation deleted successfully"})
  } catch (error) {
    next(error);
  }
}

export const getAllReservations = async(req, res, next) => {
 
  try {
    const allReservations = await Reservation.find({user: req.params.user_id}).populate("hotel").populate("room");

    res.status(200).json(allReservations)
  } catch (error) {
    next(error)
  }
}