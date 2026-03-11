import React, { useEffect, useState } from "react";
import { genreids } from "../genres";

console.log(genreids);

function WatchList({ watchList, setWatchList }) {
  const [genreList, setGenreList] = useState([]);
  const [currentGenre, setCurrentGenre] = useState("All Genres");

  useEffect(() => {
    console.log(watchList);
    let temp = watchList.map((movieObj) => genreids[movieObj.genre_ids[0]]);
    temp = new Set(temp);

    setGenreList(["All Genres", ...temp]);

    console.log(genreList);

    console.log(temp);
  }, [watchList]);

  useEffect(() => {
    let moviesFromLS = localStorage.getItem("movies");
    if (!moviesFromLS) {
      return;
    }

    setWatchList(JSON.parse(moviesFromLS));
  }, []);

  return (
    <div className="m-8 overflow-hidden rounded-lg border border-gray-200 shadow-md">
      {/* {Genre Filter} */}

      <div className="flex m-8">
        {genreList.map((genre) => (
          <div
            onClick={() => setCurrentGenre(genre)}
            className={
              currentGenre == genre
                ? "mx-4 flex justify-center items-center bg-blue-400 h-12 w-[9rem] text-white font-bold border rounded-xl"
                : "flex justify-center items-center h-12 w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4"
            }
          >
            {genre}
          </div>
        ))}
      </div>

      {/* {Search Bar} */}

      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Poster
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Ratings
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Popularity
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Genre
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {watchList.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <img
                  className="h-25 w-17.5 object-cover rounded-md shadow-sm"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.name}
                />
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {movie.original_title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>{" "}
                  {movie.vote_average}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  {movie.popularity}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                  {genreids[movie.genre_ids[0]]}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="font-medium text-red-600 hover:text-red-800 hover:underline">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WatchList;
