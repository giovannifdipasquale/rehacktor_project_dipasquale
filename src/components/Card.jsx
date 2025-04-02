import React from "react";
import LazyLoadingGameImage from "./LazyLoadingGameImage";
import { Link } from "react-router";

function Card({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");
  return (
    <div className="card m-6 max-width-sm  shadow-md rounded-xl bg-blue-400 overflow-hidden">
      <LazyLoadingGameImage
        image={game.background_image}
      ></LazyLoadingGameImage>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
        <small>{genres}</small>
        <p className="text-gray-600 mb-4">{game.released}</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          <Link to={`/games/${game.slug}/${game.id}`}> Discover </Link>
        </button>
      </div>
    </div>
  );
}

export default Card;
