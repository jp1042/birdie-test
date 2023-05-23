import { FaSearch } from "react-icons/fa";

import "./search-input.scss";

const SearchInput = ({ inputRef, handleSearch, dataLoaded }) => {
  if (dataLoaded) return null;

  return (
    <div className="input-wrapper">
      <input
        ref={inputRef}
        className="id-input"
        placeholder="Search care recipient id"
        value={"df50cac5-293c-490d-a06c-ee26796f850d"}
      ></input>
      <button className="search-button" onClick={handleSearch}>
        <FaSearch size={20} />
      </button>
    </div>
  );
};

export { SearchInput };
