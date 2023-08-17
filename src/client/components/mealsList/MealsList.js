import "./MealsList.css";
import React, { useContext } from "react";
import Cart from "../cart/Cart";
import { Link } from "react-router-dom";
import { MealsContext } from "../context/MealsContext";

const MealsList = () => {
  const value = useContext(MealsContext);
  const [mealsList, setMealsList] = value.mealsList;
  const firstThreeMeals = mealsList.slice(0, 3);
  console.log(mealsList)
  return (
    <div className="meals-container">
      <h1>Some of the meals</h1>
      <div className="meals-cards">
        {firstThreeMeals.map((meal, index) => (
          <div key={index}>
            <Cart title={meal.title} price={meal.price} />
          </div>
        ))}
      </div>
      <Link to="/allmeals" className="link-to-details">
        See all meals
      </Link>
    </div>
  );
};

export default MealsList;
