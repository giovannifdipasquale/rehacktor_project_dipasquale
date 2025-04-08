import { useContext, createContext } from "react";

// Create the context
export const FavoritesContext = createContext(); // <-- Export this context
export const useFavorites = () => useContext(FavoritesContext);
