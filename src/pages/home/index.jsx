import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
function HomePage() {
  // 9ca1f1c570a64e2aac287f86910378f8

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=9ca1f1c570a64e2aac287f86910378f8&dates=2024-01-01,2024-12-31&page=1`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };
  useEffect(() => {
    load();
  }, []);
  return (
    <div>
      <h1> Homepage</h1>
      {error && <p>{error}</p>}
      {data &&
        data.results.map((game) => (
          <p key={game.id}>
            <Card game={game}></Card>
          </p>
        ))}
    </div>
  );
}
export default HomePage;
