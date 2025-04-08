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
    <button onClick={() => ToggleFavorite()}>
      {isFavorite() ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
