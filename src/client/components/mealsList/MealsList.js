import "./MealsList.css";
import React, { useState, useEffect } from "react";
import Meal from "../meal/Meal";

const MealsList = () => {
  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/meals");
        const meals = await res.json();
        setMealsList(meals);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="meals-container">
      <h1>List of the meals</h1>
      <div className="meals-cards">
        {mealsList.map((meal) => {
          return (
            <div key={meal.title}>
              <Meal title={meal.title} price={meal.price} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MealsList;
