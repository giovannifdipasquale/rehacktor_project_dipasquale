import React, { useState } from "react";
import { useNavigate } from "react-router";
function Searchbar() {
  // usiamo hook useNavigate
  const navigate = useNavigate();

  // state hooks
  const [search, setSearch] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(null);

  // method to handle the search
  const handleSearch = (event) => {
    // preveniamo comportamento di default del form: ovvero ricaricameto della pagina
    event.preventDefault();
    // validiamo valore in search: stringa non vuota
    if (typeof search === "string" || search.trim() !== "") {
      navigate(`/search?query=${search}`);
      setSearch("");
    } else {
      setAriaInvalid(true);
    }
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        aria-invalid={ariaInvalid}
        placeholder={ariaInvalid ? "Please type something" : "Search..."}
      />
      <button type="submit"> Search </button>
    </form>
  );
}
export default Searchbar;
