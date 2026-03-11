import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import WatchList from "./components/WatchList";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [watchlist, setWatchList] = useState([]);

  function addToWatchList(movieObj) {
    // if the id already exists 
     // -> do nothing
    watchlist.push(movieObj);
    console.log(watchlist)

    localStorage.setItem('movies' , JSON.stringify(watchlist))
  }

  

  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Movies watchlist={watchlist} handleAddToWatchList={addToWatchList} />} />
          <Route
            path="/watchlist"
            element={<WatchList watchList={watchlist}  setWatchList={setWatchList} />}
          />
          <Route path="/mood" element={<MoodSelector />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
