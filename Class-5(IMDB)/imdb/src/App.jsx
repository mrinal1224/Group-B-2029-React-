import { useEffect, useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import WatchList from "./components/WatchList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext } from "./components/MovieContext";

function App() {
  const [watchlist, setWatchList] = useState([]);

  useEffect(() => {
    const moviesFromLS = localStorage.getItem("movies");
    if (!moviesFromLS) return;
    try {
      setWatchList(JSON.parse(moviesFromLS));
    } catch {
      // ignore invalid localStorage value
    }
  }, []);

  function addToWatchList(movieObj) {
    setWatchList((prev) => {
      if (prev.some((m) => m.id === movieObj.id)) return prev;
      const next = [...prev, movieObj];
      localStorage.setItem("movies", JSON.stringify(next));
      return next;
    });
  }

  return (
    <>
      <MovieContext.Provider value={{ watchlist, addToWatchList, setWatchList }}>
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
