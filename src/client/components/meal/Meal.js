import React from "react";
import "./Meal.css";

const Meal = ({title, price}) => {
  return (
    <div className="meal-container">
      <div className="img-container">
        <img src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium" />
      </div>
      <div className="meal-info">
        <h5>{title}</h5>
        <div className="price-and-btn">
          <h6>Price: {price}</h6>
          <button className="btn">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Meal;
