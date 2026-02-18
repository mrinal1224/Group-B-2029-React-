import React from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard.jsx";

function Movies() {
  return (
    <div>
      <Banner />
      <div className="flex flex-wrap justify-around mt-8 gap-8 ">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}

export default Movies;
