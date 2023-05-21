const Reservation = require("../models/reservation-model");

const getAllReservations = async (req, res) => {
  try {
    const roles = req.roles;
    let sentReservations = [];
    const reservations = await Reservation.find();
    if (!reservations) {
      return res.status(204).json({ message: "no reservations found" });
    }
    if (roles.includes(5150) || roles.includes(2001)) {
      sentReservations = reservations;
    } else {
      reservations.forEach((r) => {
        sentReservations.push({
          number: r.number,
          bookedDate: r.bookedDate,
          person: { name: r.person.name },
          price: r.price,
        });
      });
    }
    res.status(200).json({ reservations: sentReservations });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addReservation = async (req, res) => {
  const user = req.user;
  const number = req.body.number;
  const bookedDate = req.body.bookedDate;
  const person = req.body.person;
  const price = req.body.price;
  if (!number || !bookedDate || !person || price === undefined) {
    return res.status(400).json({ message: "more info is required" });
  }
  const duplicate = await Reservation.findOne({ number, bookedDate }).exec();
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const result = await Reservation.create({
      ...req.body,
      createdBy: user,
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const reservation = await Reservation.findOne({
      _id: id,
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
  const user = req.user;
  const id = req.params.id;
  const response = req.body;
  if (response.bookedDate) {
    delete response.bookedDate;
  }
  try {
    const reservation = await Reservation.findOneAndUpdate(
      { _id: id },
      { ...response, updatedBy: user },
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
    const id = req.params.id;
    const reservation = await Reservation.findOneAndDelete({
      _id: id,
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
