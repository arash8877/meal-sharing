import "./MealsList.css";
import React, { useState, useEffect } from "react";

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
    <table>
      <thead>
        <tr>
          <th>title</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        {mealsList.map((meal) => {
          return (
            <tr key={meal.title}>
              <td>{meal.title}</td>
              <td>{meal.price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MealsList;
