import "../mealsList/MealsList.css";
import React, { useContext } from "react";
import Cart from "../cart/Cart";
import { Link } from "react-router-dom";
import { MealsContext } from "../context/MealsContext";

const AllMeals = () => {
  const value = useContext(MealsContext);
  const [mealsList, setMealsList] = value.mealsList;

  return (
    <div className="meals-container">
      <h1>All meals</h1>
      <div className="meals-cards">
        {mealsList.map((meal) => (
          <Link key={meal.title} to={`/allmeals/${meal.id}`}>
            <Cart title={meal.title} price={meal.price} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllMeals;
