
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ParkContext } from "./components/ParkContext";

const parkInfo = {
  parkName: "Imagica Amusement park",

  rollerCoaster: "Must be taller than 48 inches",
  waterSlide: "You must know how to Swim",
  merryGoRound: "Children must have age less than 10",

  ticketForRollerCoaster: () => {
    return "RollerCoaster Started";
  },

  ticketforWaterSlide: () => {
    return "WaterSlide Started";
  },

  ticketForMerryGoRound: () => {
    return "Merry go Round Started";
  },
};

createRoot(document.getElementById("root")).render(
  <ParkContext.Provider value={parkInfo}>
    <App />
  </ParkContext.Provider>
);
