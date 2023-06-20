const express = require("express");
const router = express.Router();
const knex = require("../database");
const { getAllMeals, addMeal, getMealById, updateMealById, deleteMealById} = require("../controllers/mealsController")


router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

//Respond with all meals in the future (relative to the when datetime)
router.get("/future-meals", async (req, res) => {
  try {
    const futureMeals = await knex.raw("SELECT * FROM `meal` WHERE `when` > now()");
    console.log(futureMeals)
    res.status(200).json(futureMeals[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Respond with all meals in the past (relative to the when datetime)
router.get("/past-meals", async (req, res) => {
  try {
    const pastMeals = await knex.raw(
      "SELECT * FROM `meal` WHERE `when` < now()"
    );
    console.log(pastMeals);
    res.json(pastMeals[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Respond with all meals sorted by ID
router.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await knex.raw("SELECT * FROM `meal` ORDER BY `id` ASC ");
    res.status(200).json(allMeals[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Respond with the first meal (meaning with the minimum id)
router.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex.raw(
      "SELECT * FROM `meal` ORDER BY `id` ASC LIMIT 1"
    );
    firstMeal[0].length === 0
      ? res.status(404).json("There are no meals")
      : res.status(200).json(firstMeal[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Respond with the last meal (meaning with the maximum id)
router.get("/last-meal", async (req, res) => {
  try {
    const lastMeal = await knex.raw(
      "SELECT * FROM `meal` ORDER BY `id` DESC LIMIT 1 "
    );
    lastMeal[0].length === 0
      ? res.status(404).json("There are no meals")
      : res.status(200).json(lastMeal[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});


//---------- nodejs-week2----------

// Returns all meals
router.get("/", getAllMeals)

// Adds a new meal to the database
router.post("/", addMeal)

// Returns the meal by id
router.get("/:id", getMealById)

// Updates the meal by id
router.put("/:id", updateMealById)

// Deletes the meal by id
router.delete("/:id", deleteMealById)








module.exports = router;
