import React from "react";
import LazyLoadingGameImage from "./LazyLoadingGameImage";
import { Link } from "react-router";

function Card({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(" • ");
  return (
    <div
      className="card card-content relative overflow-hidden h-full flex item-center cursor-pointer 
"
    >
      <LazyLoadingGameImage
        image={game.background_image}
      ></LazyLoadingGameImage>
      <div className="card-descr flex justify-center items-center">
        <div className="h-full p-6 text-center">
          <h1 className="text-xl font-semibold mb-4 py-4">{game.name}</h1>
          <small className="mb-4">{genres}</small>
          <p className="text-accent font-semibold mb-4">
            {" "}
            <span className="text-light"> Release: </span>
            {game.released}
          </p>
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <button className="discover-button flex items-center justify-center p-2  cursor-pointer rounded">
              <Link to={`/games/${game.slug}/${game.id}`}> Discover </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
