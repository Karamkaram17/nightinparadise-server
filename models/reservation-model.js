const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "must provide a number"],
    trim: true,
    maxlength: [1, "bungalow number cannot be more than 1 characters"],
  },
  bookedDate: {
    type: String,
    required: [true, "must provide a bookedDate"],
    trim: true,
  },
  person: {
    name: { type: String, required: [true, "must provide a name"], trim: true },
    contact: {
      type: String,
      required: [true, "must provide contact info"],
      trim: true,
    },
  },
  modificationUser: {
    type: String,
    required: [true, "must provide a bookedDate"],
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    trim: true,
    required: [true, "must provide a price"],
  },
});

const Reservation = mongoose.model("reservations", ReservationSchema);

module.exports = Reservation;
