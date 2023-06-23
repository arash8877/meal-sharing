const knex = require("../database");

const getAllReviews = async (req, res) => {
  try {
    const allReviews = await knex("review").select("*");
    console.log(allReviews);
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getReviewsOfMeal = async (req, res) => {
    const MealId = req.params.meal_id;
  try {
    const result = await knex("review")
      .select(
        "review.title",
        "review.description",
        "review.stars",
        "review.created_date",
        "meal.title AS meal",
      )
      .leftJoin("meal", { "meal.id": "meal_id" })
      .where({ meal_id: MealId });

    const reviews = {
      meal: result.length === 0 
      ?  "No review found for this meal"
      : result[0].meal,
      
      reviews: result.map((item) => ({
        title: item.title,
        description: item.description,
        stars: item.stars,
        posted: item.created_date,
      })),
    };

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addReview = async (req, res) => {
  try {
    await knex("review").insert({
      title: req.body.title,
      description: req.body.description,
      meal_id: req.body.meal_id,
      stars: req.body.stars,
      created_date: req.body.created_date,
    });
    res.status(200).json("the review added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getReviewById = async (req, res) => {
  const idNumber = req.params.id;
  try {
    const result = await knex("review").where({ id: idNumber });

    result.length === 0
      ? res.status(404).json("Oops! this id doest exist")
      : res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateReviewById = async (req, res) => {
  const idNumber = req.params.id;
  try {
    const result = await knex("review").where({ id: idNumber }).update({
      title: req.body.title,
      description: req.body.description,
      meal_id: req.body.meal_id,
      stars: req.body.stars,
      created_date: req.body.created_date,
    });

    result.length === 0
      ? res.status(404).json("Oops! the review does not exist")
      : res.status(200).json("The review updated successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteReviewById = async (req, res) => {
  const idNumber = req.params.id;
  try {
    const result = await knex("review").where({ id: idNumber }).del();

    result === 0
      ? res.status(404).json("Oops! the id does not exist")
      : res.status(200).json("The review deleted successfully.");
  } catch (error) {
    res.send(500).json(error);
  }
};

module.exports = {
  getAllReviews,
  getReviewsOfMeal,
  addReview,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
