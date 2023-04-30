const Reservation = require("../models/reservation-model");

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    if (!reservations) {
      return res.status(204).json({ message: "no reservations found" });
    }
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addReservation = async (req, res) => {
  const number = req.body.number;
  const bookedDate = req.body.bookedDate;
  const person = req.body.person;
  const modificationUser = req.body.modificationUser;
  const price = req.body.price;
  if (
    !number ||
    !bookedDate ||
    !person ||
    !modificationUser ||
    !price === undefined
  ) {
    return res.status(400).json({ message: "more info is required" });
  }
  const duplicate = await Reservation.findOne({ number, bookedDate }).exec();
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const result = await Reservation.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneReservation = async (req, res) => {
  try {
    const number = req.params.number;
    const bookedDate = req.params.date;
    const reservation = await Reservation.findOne({
      number,
      bookedDate,
    }).exec();
    if (!reservation) {
      return res.status(404).send(`no reservation found`);
    }
    res.status(200).json({ reservation });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateReservation = async (req, res) => {
  const number = req.params.number;
  const bookedDate = req.params.date;
  const response = req.body;
  if (response.bookedDate) {
    delete response.bookedDate;
  }
  try {
    const reservation = await Reservation.findOneAndUpdate(
      { number, bookedDate },
      response,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!reservation) {
      return res.status(404).send(`no reservation found`);
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteReservation = async (req, res) => {
  try {
    const number = req.params.number;
    const bookedDate = req.params.date;
    const reservation = await Reservation.findOneAndDelete({
      number,
      bookedDate,
    });
    if (!reservation) {
      return res.status(404).send(`no reservation found`);
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllReservations,
  addReservation,
  getOneReservation,
  updateReservation,
  deleteReservation,
};
