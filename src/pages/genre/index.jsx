import Card from "../../components/Card";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
function GenrePage() {
  // 9ca1f1c570a64e2aac287f86910378f8
  // 'https://api.rawg.io/api/games?key=9269195f491e44539d7a2d10ce87ab15&genres=${genre}&page=1*;
  const { genre } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const load = async () => {
    try {
      const result = await fetch(
        `https://api.rawg.io/api/games?key=9ca1f1c570a64e2aac287f86910378f8&genres=${genre}&page=1`
      );
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      const json = await result.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };
  useEffect(() => {
    load();
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
