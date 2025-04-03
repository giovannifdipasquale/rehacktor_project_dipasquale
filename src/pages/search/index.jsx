import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import Card from "../../components/Card";
function SearchPage() {
  const [searchParams] = useSearchParams();
  const game = searchParams.get("query");
  const initialUrl = `https://api.rawg.io/api/games?key=9ca1f1c570a64e2aac287f86910378f8&search=${game}`;
  const { loading, data, error, setUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl, setUrl]);
  return (
    <div className="style-searchpage">
      <h1>Search Page</h1>
      {error && <p>{error}</p>}
      {data && (
        <div>
          {data.results.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
