import { useContext, createContext } from "react";

// Create the context
export const SessionContext = createContext(); // <-- Export this context
export const useSession = () => useContext(SessionContext);
