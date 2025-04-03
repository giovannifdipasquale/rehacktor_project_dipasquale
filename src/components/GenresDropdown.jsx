import React from "react";
import useFetchSolution from "../hook/useFetchSolution";
import { Link } from "react-router";
function GenresDropdown() {
  const { data, error } = useFetchSolution(
    `https://api.rawg.io/api/genres?key=9ca1f1c570a64e2aac287f86910378f8`
  );

  return (
    <div>
      <details>
        <summary>Genres</summary>
        {error && <p>{error}</p>}
        <ul>
          {data &&
            data.results.map((genre) => (
              <Link to={`/games/${genre.slug}`} key={genre.id}>
                {genre.name}
              </Link>
            ))}
        </ul>
      </details>
    </div>
  );
}

export default GenresDropdown;
