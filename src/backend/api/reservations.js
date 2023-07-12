const express = require("express");
const router = express.Router();
const knex = require("../database");
const { getAllReservations, addReservation, getReservationById, updateReservationById, deleteReservationById } = require("../controllers/reservationsController");

router.get("/", async (request, response) => {
  try {
    const result = await knex("reservation").select(
      "id",
      "number_of_guests",
      "contact_email"
    );
    response.json(result);
  } catch (error) {
    throw error;
  }
});

// Returns all Reservations
router.get("/", getAllReservations);

// Adds a new reservation to the database
router.post("/", addReservation)

// Returns the reservation by id
router.get("/:id", getReservationById)

// Updates the reservation by id
router.put("/:id", updateReservationById)

// Deletes the reservation by id
router.delete("/:id", deleteReservationById)



module.exports = router;
