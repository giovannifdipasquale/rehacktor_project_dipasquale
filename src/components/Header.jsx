import React from "react";
import Searchbar from "./Searchbar";
import { Link, useNavigate } from "react-router";
import supabase from "../supabase/supabase-client";
import { useSession } from "../context/session/SessionContext";
import { FaUser } from "react-icons/fa";

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
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo / Home Link */}
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-xl font-semibold text-blue-600 hover:text-blue-800"
        >
          Home
        </Link>
      </div>

      {/* Center: Searchbar */}
      <div className="flex-1 flex justify-center">
        <Searchbar />
      </div>

      {/* Right: Account Dropdown & Login */}
      <div className="flex items-center bg-red-200 gap-4">
        <ul className="flex h-10 items-center">
          {session ? (
            <>
              <li className="flex align-center justify-bet px-5 py-2 hover:bg-gray-100 ">
                <FaUser className="relative top-1 right-2" />
                <Link to="/profile">
                  {" "}
                  {session.user.user_metadata.username}
                </Link>
              </li>
              <li className="block px-4 py-2  hover:bg-gray-100">
                <Link to="/account"> Account Settings</Link>
              </li>

              <li>
                <a
                  onClick={signOut}
                  href="#"
                  className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Register
              </Link>
            </li>
          )}
        </ul>

        {!session && (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <span> -or- </span>
            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
