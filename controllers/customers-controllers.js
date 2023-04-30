const Reservation = require("../models/reservation-model");

const getAllCustomers = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    if (!reservations) {
      return res.status(204).json({ message: "no reservations found" });
    }

    const result = [];
    const groupedReservations = reservations.reduce((groups, reservation) => {
      const { name, contact } = reservation.person;
      lowerCaseName = name.toLowerCase();
      if (!groups[lowerCaseName]) {
        groups[lowerCaseName] = {
          lowerCaseName,
          count: 0,
          bookings: [],
        };
      }

      groups[lowerCaseName].count++;
      groups[lowerCaseName].bookings.push({
        contact,
        bookedDate: reservation.bookedDate,
        price: reservation.price,
      });

      return groups;
    }, {});

    // Transform grouped reservations into the desired format
    for (const name in groupedReservations) {
      const { count, bookings } = groupedReservations[name];

      result.push({ name, count, bookings });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllCustomers,
};
