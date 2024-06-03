import React, { useState, useEffect } from "react";
import "./SearchBar.css"; // Import the CSS file for styling
import { CgAdd } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/desserts");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const results = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        recipe.description.toLowerCase().includes(query.toLowerCase()) ||
        recipe.price.toString().includes(query)
    );
    setFilteredRecipes(results);
    console.log("search resuls: ", filteredRecipes);
  }, [query, recipes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery("");
    if (filteredRecipes.length == 0) {
      // No matching results, set the alert message
      navigate("/desserts", {
        state: { alertMessage: "No matching results found!" },
      });
    } else {
      // Results found, navigate to the MembersList page with the filtered results
      navigate("/desserts", { state: { searchResults: filteredRecipes } });
    }
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
        <button>
          <CgAdd className="add-icon" />
          Add
        </button>
      </div>
    </>
  );
};

export default SearchBar;
