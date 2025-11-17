import { useState } from "react";
import "./App.css";
import EventPoster from "./EventPoster";
import Checkout from "./Checkout";
import LandingPage from "./components/LandingPage";
import Signup from "./dashboard/signup";
import { Routes, Route, BrowserRouter } from "react-router";
import Event from "./dashboard/Event";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/event" element={<Event />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
