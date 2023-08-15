import React, { useState, useEffect, createContext } from "react";

export const MealsContext = createContext();

export const MealsProvider = (props) => {
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

  const value = {
    mealsList: [mealsList, setMealsList],
  };

  
  return (
    <MealsContext.Provider value={value}>
      {props.children}
    </MealsContext.Provider>
  );



};
