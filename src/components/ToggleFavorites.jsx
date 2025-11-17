import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavorites } from "../context/favorites/FavoritesContext";

export default function ToggleFavorite({ game }) {
  const { favorites, addFavorites, removeFavorites } = useFavorites();

  const isFavorite = () => favorites.find((el) => +el.game_id === game.id);
  const ToggleFavorite = () => {
    if (isFavorite()) {
      removeFavorites(game.id);
    } else {
      addFavorites(game);
    }
  };
  return (
    <button
      className="text-3xl text-accent cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
      onClick={() => ToggleFavorite()}
    >
      {isFavorite() ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
