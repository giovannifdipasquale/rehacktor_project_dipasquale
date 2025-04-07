import React from "react";
import useFetchSolution from "../hook/useFetchSolution";
import { Link } from "react-router";

function GenresDropdown() {
  const { data, error } = useFetchSolution(
    `https://api.rawg.io/api/genres?key=9ca1f1c570a64e2aac287f86910378f8`
  );

  return (
    <div className="relative">
      <details className="group">
        <summary className="cursor-pointer text-gray-700 font-medium hover:text-blue-600">
          Genres
        </summary>
        <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg z-10 hidden group-open:block">
          {error && <p className="px-4 py-2 text-red-600 text-sm">{error}</p>}
          <ul className="max-h-64 overflow-y-auto">
            {data &&
              data.results.map((genre) => (
                <li key={genre.id}>
                  <Link
                    to={`/games/${genre.slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    {genre.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </details>
    </div>
  );
}

export default GenresDropdown;
