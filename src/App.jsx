import Router from "./routing/Router";
import SessionContextProvider from "./context/SessionProvider";
function App() {
  return (
    <>
      <SessionContextProvider>
        <Router />
      </SessionContextProvider>
    </>
  );
}

export default App;
