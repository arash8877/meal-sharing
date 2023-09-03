import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./components/mealsList/MealsList";
import AllMeals from "./components/allMeals/AllMeals";
import Details from "./components/details/Details";
import Header from "./components/header/Header";
import ReserveForm from "./components/book/ReserveForm";
import { MealsProvider } from "./components/context/MealsContext";
import { ReservationsProvider } from "./components/context/ReservationContext";

function App() {
  return (
    <MealsProvider>
      <ReservationsProvider>
        <Router>
          <Header />
          <Route exact path="/">
            <MealsList />
          </Route>
          <Route exact path="/allmeals">
            <AllMeals />
          </Route>
          <Route exact path="/allmeals/:id">
            <Details />
          </Route>
          <Route exact path="/book/:id">
            <ReserveForm />
          </Route>
          <Route exact path="/test-component">
            <TestComponent />
          </Route>
        </Router>
      </ReservationsProvider>
    </MealsProvider>
  );
}

export default App;
