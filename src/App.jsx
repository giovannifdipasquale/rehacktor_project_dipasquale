import Router from "./routing/Router";
import SessionProvider from "./context/session/SessionProvider";
import FavoritesProvider from "./context/favorites/FavoritesProvider";
function App() {
  return (
    <>
      <SessionProvider>
        <FavoritesProvider>
          <Router />
        </FavoritesProvider>
      </SessionProvider>
    </>
  );
}

export default App;
