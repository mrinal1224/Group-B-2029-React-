import { useContext } from "react";
import { MovieContext } from "./MovieContext";




function MovieCard({ posterUrl, title, movieObject , handleAddtoWatchList }) {
   const {addToWatchList} = useContext(MovieContext)
  
  return (
    <div
      className="relative w-64 h-100 bg-cover bg-center rounded-2xl shadow-lg group overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:scale-105"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${posterUrl})`,
      }}
    >
      {/* IMDb Style Watchlist Button */}
      <button className="absolute top-0 left-0 m-2 flex items-center justify-center h-10 w-8 bg-black/60 text-white clip-path-ribbon hover:bg-yellow-400 hover:text-black transition-colors duration-200 cursor-pointer">
        <span
          onClick={() => addToWatchList(movieObject)}
          className="text-2xl font-bold mb-1"
        >
          +
        </span>
      </button>

      {/* Title Overlay with Gradient for Readability */}
      <div className="mt-auto w-full from-black/90 to-transparent p-4">
        <h4 className="text-white text-lg font-semibold text-center truncate">
          {title}
        </h4>
      </div>
    </div>
  );
}

export default MovieCard;
