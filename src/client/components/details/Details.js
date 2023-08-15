import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MealsContext } from "../context/MealsContext";
import "./Details.css";
import { Link } from "react-router-dom";

const Details = () => {
  const value = useContext(MealsContext);
  const [mealsList, setMealsList] = value.mealsList;
  const { id } = useParams();

  const details = mealsList.filter((item) => {
    return String(item.id) === id;
    console.log(item);
  });

  return (
    <>
      {details.map((item) => (
        <div className="details" key={item.id}>
          <div className="img-container">
            <img src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium" />
          </div>
          <div className="box-details">
            <h2>{item.title}</h2>
            <h3>price: {item.price}</h3>
            <p>Description: {item.description}</p>
            <Link to="/book" className="link-to-book">
              Book a seat
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Details;
