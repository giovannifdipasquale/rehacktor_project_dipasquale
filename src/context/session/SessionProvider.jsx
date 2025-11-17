import React, { useEffect, useState } from "react";
import { SessionContext } from "./SessionContext";
import supabase from "../../supabase/supabase-client";
function SessionContextProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carica la sessione iniziale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Ascolta i cambiamenti di stato
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log("session is:");
        console.log(session);
        setSession(session);
      } else if (event === "SIGNED_OUT") {
        console.log("SIGNED_OUT");
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
}

export default SessionContextProvider;
