const knex = require("../database");

//-----------------------------------------------
const getAllReservations = async (req, res) => {
  console.log(req);
  try {
    const allReservations = await knex("reservation").select(
      "id",
      "created_date"
    );
    console.log(allReservations);
    res.status(200).json(allReservations);
  } catch (error) {
    res.status(500).json(error);
  }
};

//-----------------------------------------------
const addReservation = async (req, res) => {
  try {
   await knex('reservation').insert({
        number_of_guests: req.body.number_of_guests,
        meal_id: req.body.meal_id,
        created_date: req.body.created_date,
        contact_phonenumber: req.body.contact_phonenumber,
        contact_email: req.body.contact_email,
      });
    res.send('the new reservation added successfully.')

  } catch (error) {
    res.status(500).json(error);
  }
};

//-------------------------------------------------
const getReservationById = async (req, res) => {
    const idNumber = req.params.id;
    try {
        const result = await knex(`reservation`)
        .where({id : idNumber});

        result.length === 0
        ? res.status(404).json("Oops! the reservation does not exist")
        : res.status(200).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
}

//--------------------------------------------
const updateReservationById = async (req, res) => {
    const idNumber = req.params.id
    try {
        const result = await knex(`reservation`)
        .where({id: idNumber})
        .update({
        number_of_guests: req.body.number_of_guests,
        meal_id: req.body.meal_id,
        created_date: req.body.created_date,
        contact_phonenumber: req.body.contact_phonenumber,
        contact_email: req.body.contact_email,
        })

        result === 0
        ? res.status(404).json("Oops! the reservation does not exist")
        : res.status(200).json('The reservation updated successfully.')

    } catch (error) {
        res.status(500).json(error)
    }
}

//--------------------------------------------
const deleteReservationById = async (req, res) => {
    const idNumber = req.params.id
    try {
        // res.send(idNumber)
        const result = await knex("reservation")
        .where({id: idNumber})
        .del()

        result === 0
        ? res.status(404).json("Oops! the reservation does not exist")
        : res.status(200).json('The reservation deleted successfully.')

    } catch (error) {
        res.status(500).json(error)
    }
}

//---------------------------------------------
module.exports = {
  getAllReservations,
  addReservation,
  getReservationById,
  updateReservationById,
  deleteReservationById
};
