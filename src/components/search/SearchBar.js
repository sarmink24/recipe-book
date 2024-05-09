import React, { useState } from "react";
import "./SearchBar.css"; // Import the CSS file for styling
import { CgAdd } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import RecipeForm from "../form/RecipeForm";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search Recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
      <div className="add">
        <button onClick={openModal}>
          <CgAdd className="add-icon" />
          Add
        </button>
        {isModalOpen && <RecipeForm onClose={closeModal} />}
      </div>
    </>
  );
};

export default SearchBar;
