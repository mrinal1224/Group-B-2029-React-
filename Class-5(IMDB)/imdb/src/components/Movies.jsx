import React, { useEffect, useState, useSyncExternalStore } from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard.jsx";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({watchlist , handleAddToWatchList}) {
  const [movies, setMovies] = useState([]);

  const [pageNo, setPageNo] = useState(1);



  function movePageAhead() {
    setPageNo(pageNo + 1);
  }

  function movePageBehind() {
    setPageNo(pageNo - 1);
  }


  console.log(movies);

 

  useEffect(() => {
    async function getData() {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=${pageNo}`
      );

      setMovies(response.data.results);
      console.log(response.data)
    }
    getData();
  }, [pageNo]);

  return (
    <div>
      <Banner />
      <div className="flex flex-wrap justify-around mt-8 gap-8  ">
        {movies.map(function (movieObj) {
          return <MovieCard movieObject={movieObj} watchlist={watchlist} title={movieObj.original_title} posterUrl={movieObj.poster_path} handleAddtoWatchList={handleAddToWatchList} />;
        })}

        <Pagination pageAhead={movePageAhead} pageBehind={movePageBehind}  pageNo={pageNo}/>
      </div>
    </div>
  );
}

export default Movies;
