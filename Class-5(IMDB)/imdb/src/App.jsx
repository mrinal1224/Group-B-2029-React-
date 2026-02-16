import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import WatchList from "./components/WatchList";


import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  


  return (
    <>
      <button onClick={increment}>Incremnt</button>
      <h1>{count}</h1>


      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/mood" element={<MoodSelector />} />
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
