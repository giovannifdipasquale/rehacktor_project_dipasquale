import React from "react";
import { useSession } from "../../context/session/SessionContext";
import { useFavorites } from "../../context/favorites/FavoritesContext";

function ProfilePage() {
  const { session } = useSession();
  const { favorites, removeFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">
          Hey{" "}
          <span className="text-indigo-400">
            {session?.user.user_metadata.username}
          </span>
        </h2>

        <details className="bg-slate-700 rounded-xl p-4 shadow-lg">
          <summary className="cursor-pointer text-lg font-semibold text-indigo-300 mb-4">
            Favorites
          </summary>

          {favorites.length > 0 ? (
            <ul className="mt-4 space-y-6">
              {favorites.map((game) => (
                <li
                  key={game.game_id}
                  className="bg-slate-800 rounded-lg p-4 flex items-center space-x-4 shadow-md hover:shadow-xl transition duration-300"
                >
                  <img
                    src={game.game_image}
                    alt={game.game_name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{game.game_name}</h2>
                    <button
                      onClick={() => removeFavorites(game.game_id)}
                      className="mt-2 px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 mt-4">No favorites yet</p>
          )}
        </details>
      </div>
    </div>
  );
}

export default ProfilePage;
