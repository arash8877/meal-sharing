const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);


//Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async(req, res)=> {
  try {
    const futureMeals = await knex.raw("SELECT * FROM `meal` WHERE `when` > now()");
    console.log(futureMeals)
    res.status(200).json(futureMeals[0]);
  } catch (error) {
    res.status(500).json(error)
  }
})

//Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async(req, res)=> {
  try {
    const pastMeals = await knex.raw("SELECT * FROM `meal` WHERE `when` < now()");
    console.log(pastMeals)
    res.status(200).json(pastMeals[0])
  } catch (error) {
    res.status(500).json(error);
  }
})

//Respond with all meals sorted by ID
app.get("/all-meals", async(req, res)=> {
  try {
    const allMeals = await knex.raw("SELECT * FROM `meal` ORDER BY `id` ASC ");
    res.status(200).json(allMeals[0]);
  } catch (error) {
    res.status(500).json(error);
  }
})

//Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async(req, res)=> {
  try {
    const firstMeal = await knex.raw("SELECT * FROM `meal` ORDER BY `id` ASC LIMIT 1");
    firstMeal[0].length === 0
    ? res.status(404).json("There are no meals")
    : res.status(200).json(firstMeal[0])
  } catch (error) {
    res.status(500).json(error);
  }
})

//Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async(req, res)=> {
  try {
    const lastMeal = await knex.raw("SELECT * FROM `meal` ORDER BY `id` DESC LIMIT 1 ");
    lastMeal[0].length === 0
    ? res.status(404).json("There are no meals")
    : res.status(200).json(lastMeal[0])
  } catch (error) {
    res.status(500).json(error);
  }
})

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
