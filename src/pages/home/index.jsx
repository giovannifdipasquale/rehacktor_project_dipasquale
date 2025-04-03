import React from "react";
import useFetchSolution from "../../hook/useFetchSolution";
import Card from "../../components/Card";
function HomePage() {
  const { data, error } = useFetchSolution(
    `https://api.rawg.io/api/games?key=9ca1f1c570a64e2aac287f86910378f8&dates=2024-01-01,2024-12-31&page=1`
  );

  return (
    <div>
      <h1> Homepage</h1>
      {error && <p>{error}</p>}
      {data &&
        data.results.map((game) => (
          <div key={game.id}>
            <Card game={game}></Card>
          </div>
        ))}
    </div>
  );
}
export default HomePage;
