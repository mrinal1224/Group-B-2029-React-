import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import WatchList from "./components/WatchList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext } from "./components/MovieContext";

function App() {
  const [watchlist, setWatchList] = useState([]);

  function addToWatchList(movieObj) {
    // if the id already exists
    // -> do nothing
    watchlist.push(movieObj);
    console.log(watchlist);

    localStorage.setItem("movies", JSON.stringify(watchlist));
  }

  return (
    <>
      <MovieContext.Provider value={{ watchlist, addToWatchList }}>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<Movies />} />
            <Route
              path="/watchlist"
              element={
                <WatchList watchList={watchlist} setWatchList={setWatchList} />
              }
            />
            <Route path="/mood" element={<MoodSelector />} />
          </Routes>
        </BrowserRouter>
      </MovieContext.Provider>
    </>
  );
}

export default App;
