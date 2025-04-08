import React, { useCallback, useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import supabase from "../../supabase/supabase-client";
import { useSession } from "../session/SessionContext";
function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { session } = useSession();
  // ottenere array favs e metterlo dentro state favorites
  const getFavorites = useCallback(async () => {
    if (!session) return;
    let { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", session?.user.id);
    if (error) {
      console.log(error);
      console.log("Errore in console");
    } else {
      setFavorites(favourites);
      console.log("favorites set: ");
      console.log(favourites);
    }
  }, [session]);

  // aggiungere game ai favs
  const addFavorites = async (game) => {
    await supabase
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();
  };
  //  rimuovere game dai favs
  const removeFavorites = async (gameId) => {
    await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", session?.user.id);
  };
  useEffect(() => {
    if (session) {
      getFavorites();
    }

    const favorites = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {
      if (favorites) {
        supabase.removeChannel(favorites);
      }
      favorites.unsubscribe();
    };
  }, [getFavorites, session]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, getFavorites, removeFavorites, addFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
