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
      ></input>
      <button className="search-button" onClick={handleSearch}>
        <FaSearch size={20} />
      </button>
    </div>
  );
};

export { SearchInput };
