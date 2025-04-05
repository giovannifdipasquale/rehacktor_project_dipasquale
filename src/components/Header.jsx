import React, { useState, useEffect } from "react";
import Searchbar from "./Searchbar";
import { Link } from "react-router";
import supabase from "../supabase/supabase-client";

function Header() {
  const [session, setSession] = useState(null);
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      setSession(data);
      console.log(data);
    } else {
      setSession(null);
      console.log(error);
    }
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    alert("Signed out");
    setSession(null);
  };
  useEffect(() => {
    getSession();
  }, []);
  return (
    <nav className="border m-4 p-2 flex">
      {session ? (
        <ul>
          <li>
            <details className="dropdown">
              <summary>Account pippo </summary>
              <ul dir="rtl">
                <li>
                  <Link to="/"> Home </Link>
                </li>

                <li>
                  <a onClick={signOut} href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <details className="dropdown">
              <summary>Account </summary>
              <ul dir="rtl">
                <li>
                  <Link to="/"> Home </Link>
                </li>
                <li>
                  <Link to="/register"> Register </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      )}
      <div className="flex ml-auto mr-auto items-center gap-4 border p-2">
        <Searchbar />
      </div>
      {!session ? (
        <div className="flex ml-auto  items-center gap-4 border p-2">
          {" "}
          <Link to="/login" className="secondary">
            Login
          </Link>{" "}
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Header;
