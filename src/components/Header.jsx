import React from "react";
import Searchbar from "./Searchbar";
import { Link } from "react-router";
function Header() {
  return (
    <nav>
      <ul>
        <li>
          <strong className="bg-blue-500"> Header </strong>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#" className="secondary">
            {" "}
            Services{" "}
          </a>
        </li>
        <li>
          <details className="dropdown">
            <summary>Account </summary>
            <ul dir="rtl">
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
              <li>
                <a href="#">Logout</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      <ul>
        <Searchbar />
      </ul>
    </nav>
  );
}

export default Header;
