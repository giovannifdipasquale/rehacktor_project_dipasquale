import React from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/supabase-client";
import { useSession } from "../context/SessionContext";
function Header() {
  const navigate = useNavigate();
  const { session } = useSession();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    alert("Signed out");
    navigate("/");
  };

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
