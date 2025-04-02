import React, { useState, useEffect } from "react";
import { Link } from "react-router";
function GenresDropdown() {
  const [genres, setGenres] = useState(null);
  const [error, setError] = useState(null);
  const load = async () => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/genres?key=9ca1f1c570a64e2aac287f86910378f8`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setGenres(json);
    } catch (error) {
      setError(error.message);
      setGenres(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <details>
        <summary>Genres</summary>
        {error && <p>{error}</p>}
        <ul>
          {genres &&
            genres.results.map((genre) => (
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
