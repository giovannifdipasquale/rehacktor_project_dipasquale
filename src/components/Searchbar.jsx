import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
function Searchbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();

    if (typeof search === "string" && search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
      setAriaInvalid(false);
    } else {
      setAriaInvalid(true);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center w-full">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className={`flex bg-white px-2 py-2 border border-double w-full rounded-md focus:outline-none focus:ring-1 ${
          ariaInvalid
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-900 focus:ring-gray-900"
        }`}
        aria-invalid={ariaInvalid}
        placeholder={
          ariaInvalid ? "Please type something" : "Search for a game..."
        }
      />
      <button
        type="submit"
        className="search-button bg-dark text-xl p-1 rounded absolute right-2"
      >
        <FaSearch></FaSearch>
      </button>
    </form>
  );
}

export default Searchbar;
