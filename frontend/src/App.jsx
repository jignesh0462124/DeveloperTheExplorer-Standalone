import { useState } from "react";
import "./App.css";
import EventPoster from "./EventPoster";
import Checkout from "./Checkout";
import LandingPage from "./components/LandingPage";
import Signup from "./dashboard/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Signup />
    </>
  );
}

export default App;
