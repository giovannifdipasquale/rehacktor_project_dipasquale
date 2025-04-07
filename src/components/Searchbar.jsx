import React, { useState } from "react";
import { useNavigate } from "react-router";

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
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        aria-invalid={ariaInvalid}
        placeholder={ariaInvalid ? "Please type something" : "Search..."}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          ariaInvalid
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}

export default Searchbar;
