import React from "react";
import { Link } from "react-router"; 
import logoWriting from "../assets/logo-writing.png";

function Footer() {
  return (
    <footer className="theme-dark p-8">
      {" "}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Sezione Logo */}
        <div className="mb-4 md:mb-0">
          <Link to="/" className="logo text-2xl font-bold">
            <img
              className="logo"
              src={logoWriting} // Stesso logo dell'Header
              width="130"
              height="130"
              alt="Game Cache Logo"
            />
          </Link>
        </div>

        {/* Copyright e Links */}
        <div className="text-light">
          {" "}
         
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Game Cache. Tutti i diritti
            riservati.
          </p>
          <p className="text-xs mt-1">
            Progetto finale Rehacktor di Giovanni Di Pasquale
          </p>
          <p className="text-xs mt-2">
            Powered by{" "}
            <a
              href="https://rawg.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline" 
            >
              RAWG.io
            </a>{" "}
            e{" "}
            <a
              href="https://supabase.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Supabase
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;