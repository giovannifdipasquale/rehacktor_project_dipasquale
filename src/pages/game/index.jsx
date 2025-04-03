import React from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";
function GamePage() {
  // 9ca1f1c570a64e2aac287f86910378f8

  const { id } = useParams();

  const { data, error } = useFetchSolution(
    `https://api.rawg.io/api/games/${id}?key=9ca1f1c570a64e2aac287f86910378f8`
  );

  return (
    <div>
      <h1> Game Page </h1>
      {error && <p>{error}</p>}
      {data && (
        <div className="style-gamepage">
          <div className="style-game-info">
            <p>{data.released}</p>
            <h1>{data.name}</h1>
            <p>Rating: {data.rating}</p>
            <p>About:</p>
            <p>{data.description_raw}</p>
          </div>
          <div className="style-game-image">
            <img src={data.background_image} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}
export default GamePage;
