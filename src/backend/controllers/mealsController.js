const knex = require("../database");

//-----------------------------------------------

const getAllMeals = async (req, res) => {
  const hasQuery = req.query;
  try {

    if ('maxPrice' in hasQuery) {
      const maxPrice = hasQuery.maxPrice;
      const cheapMeals = await knex
        .select("*")
        .from("meal")
        .where("price", "<", maxPrice);
      res.status(200).json(cheapMeals);

    } if ('availableReservations' in hasQuery) {
      const reservation = hasQuery.availableReservations;
      const freeSpots = await knex("meal")
        .select("title", "max_reservations", knex.raw("SUM(number_of_guests)"))
        .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
        .groupBy("title", "max_reservations")
        .havingRaw("max_reservations - IFNULL(SUM(number_of_guests), 0) > 0");

      const noSpots = await knex("meal")
        .select("title", "max_reservations", knex.raw("SUM(number_of_guests)"))
        .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
        .groupBy("title", "max_reservations")
        .havingRaw("max_reservations - IFNULL(SUM(number_of_guests), 0) <= 0");

      reservation === "true"
        ? res.status(200).json(freeSpots)
        : res.status(200).json(noSpots);

    } if ('title' in hasQuery) {
      const match = hasQuery.title;
      const matchMeal = await knex("meal")
        .where("title", "like", `%${match}%`);
        res.status(200).json(matchMeal)
    }

     if ('dateAfter' in hasQuery) {
      const dateAfter = hasQuery.dateAfter;
      console.log(dateAfter)
      const dateAfterMeals = await knex("meal")
        .where("when", ">", dateAfter);
        res.status(200).json(dateAfterMeals);
    }

     if ('dateBefore' in hasQuery) {
      const dateBefore = hasQuery.dateBefore;
      console.log(dateBefore)
      const dateBeforeMeals = await knex("meal")
        .where("when", "<", dateBefore);
        res.status(200).json(dateBeforeMeals);
    }

     if ('limit' in hasQuery) {
      const limitedNumber = hasQuery.limit;
      const limitedMeals = await knex("meal")
        .limit(limitedNumber);
        res.status(200).json(limitedMeals);
    }

     if ('sortKey' in hasQuery && !('sortDir' in hasQuery)) {
      const sortKey = hasQuery.sortKey;
      const sortedMeals = await knex("meal")
        .orderBy(`${sortKey}`, 'asc');
        
      sortKey === 'when' || sortKey === 'price' || sortKey === 'max_reservations'
        ? res.status(200).json(sortedMeals)
        : res.status(404).json(`not possible to sort by ${sortKey}`)
    }

     if ('sortKey' in hasQuery && 'sortDir' in hasQuery) {
      const column = hasQuery.sortKey;
      const direction = hasQuery.sortDir;
      const sortedMeals = await knex("meal").
         orderBy(`${column}`, `${direction}`)

      res.status(200).json(sortedMeals)
    }

    // else if (req.params.id && req.params[0]) {
    //   const mealId = req.params.id;
    //   const mealReviews = await knex("review")
    //   .select("*");
    //   console.log(req.params)
    //   res.status(200).json(mealReviews);
    // }


    else {
      const allMeals = await knex("meal").select("title", "price");
      res.status(200).json(allMeals);
    }

  } catch (error) {
    res.status(500).json(error);
  }
};


//-----------------------------------------------
const addMeal = async (req, res) => {
  try {
    await knex("meal").insert({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      when: req.body.when,
      max_reservations: req.body.max_reservations,
      price: req.body.price,
      created_date: req.body.created_date,
    });
    res.send("the new meal added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};

//-------------------------------------------------
const getMealById = async (req, res) => {
  const idNumber = req.params.id;
  try {
    const result = await knex(`meal`).where({ id: idNumber });

    result.length === 0
      ? res.status(404).json("Oops! the meal does not exist")
      : res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

//--------------------------------------------
const updateMealById = async (req, res) => {
  const idNumber = req.params.id;
  try {
    const result = await knex(`meal`).where({ id: idNumber }).update({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      when: req.body.when,
      max_reservations: req.body.max_reservations,
      price: req.body.price,
      created_date: req.body.created_date,
    });
    
    result.length === 0
      ? res.status(404).json("Oops! the meal does not exist")
      : res.status(200).json("The meal updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};

//--------------------------------------------
const deleteMealById = async (req, res) => {
  const idNumber = req.params.id;
  try {
    const result = await knex(`meal`).where({ id: idNumber }).del();

    result === 0
      ? res.status(404).json("Oops! the meal does not exist")
      : res.status(200).json("The meal deleted successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};






module.exports = {
  getAllMeals,
  addMeal,
  getMealById,
  updateMealById,
  deleteMealById,
};
