import React, { useState, useContext } from "react";
import "./ReserveForm.css";
import { useParams } from "react-router-dom";
import { MealsContext } from "../context/MealsContext";

const ReserveForm = () => {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    meal_id: id,
    number_of_guests: "2",
    contact_phonenumber: "",
    contact_email: "",
    created_date: "2023-08-016",
  });

  const value = useContext(MealsContext);
  const [mealsList, setMealsList] = value.mealsList;
  

  console.log(mealsList)

  const matchedMeal = mealsList.find((item) => item.id === id);
  const mealName = matchedMeal ? matchedMeal.title : null;

  const handleInputChange = (event) => { nmm
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Reservation added successfully!");
      } else {
        alert("Failed to add reservation.");
      }
    } catch (error) {
      res.status(500).json("Error adding reservation:", error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Book a Seat</h2>
      <h3>{mealName}</h3>
      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Reserve
        </button>
      </form>
    </div>
  );
};

export default ReserveForm;
