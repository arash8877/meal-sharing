const express = require("express");
const router = express.Router();
const { getAllReviews, getReviewsOfMeal, addReview, getReviewById, updateReviewById, deleteReviewById } = require("../controllers/reviewsController")
// const { getAllMeals } = require("../controllers/mealsController")



// Returns all reviews
router.get("/", getAllReviews)

// Returns all reviews for a specific meal.
router.get("/:meal_id/reviews", getReviewsOfMeal)

// Adds a new review to the database
router.post("/", addReview)

// Returns a review by id
router.get("/:id", getReviewById)

// Updates the review by id
router.put("/:id", updateReviewById )

// Deletes the review by id
router.delete("/:id", deleteReviewById)

module.exports = router;