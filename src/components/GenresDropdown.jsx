import React from "react";
import useFetchSolution from "../hook/useFetchSolution";
import { Link } from "react-router";
import { IoMdArrowDropright } from "react-icons/io";

function GenresDropdown() {
  const { data, error } = useFetchSolution(
    `https://api.rawg.io/api/genres?key=9ca1f1c570a64e2aac287f86910378f8`
  );

  return (
    <div className="dropdown-button relative p-2 rounded">
      <div className="flex items-center justify-center">
        <IoMdArrowDropright className="arrow-icon text-2xl me-1" />
        <span className="font-bold"> Categories </span>
      </div>
      <div className="dropdown-bridge"></div>
      <div className="dropdown-group rounded absolute w-48 bg-light shadow-lg ">
        {error && <p className="px-4 py-2 text-red-600 text-sm">{error}</p>}
        <ul className="max-h-64 overflow-y-auto">
          {data &&
            data.results.map((genre) => (
              <li key={genre.id}>
                <Link
                  to={`/games/${genre.slug}`}
                  className="dropdown-item block px-4 py-2"
                >
                  {genre.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default GenresDropdown;
