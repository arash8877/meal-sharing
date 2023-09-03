import React, { useState, useEffect, createContext } from "react";

export const ReservationContext = createContext();

export const ReservationsProvider = (props) => {
  const [reservationsList, setReservationsList] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/reservations");
        const reservations = await res.json();
        setReservationsList(reservations);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReservation();
  }, []);

  const value = {
    reservationsList: [reservationsList, setReservationsList],
  };

  
  return (
    <ReservationContext.Provider value={value}>
      {props.children}
    </ReservationContext.Provider>
  );



};
