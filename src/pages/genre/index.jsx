import React, { useEffect } from "react";
import Card from "../../components/Card";

import { useParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
function GenrePage() {
  console.log("componente GenrePage ri-renderizzato");

  const { genre } = useParams();

  const { data, error, setUrl } = useFetchSolution(
    `https://api.rawg.io/api/games?key=9ca1f1c570a64e2aac287f86910378f8&genres=${genre}&page=1`
  );

  useEffect(() => {
    setUrl(
      `https://api.rawg.io/api/games?key=9ca1f1c570a64e2aac287f86910378f8&genres=${genre}&page=1`
    );
  }, [genre]);
  return (
    <>
      <h1> Welcome to {genre}</h1>
      {error && <article> {error}</article>}
      {data && (
        <div>
          {data.results.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
      )}
    </>
  );
}
export default GenrePage;
