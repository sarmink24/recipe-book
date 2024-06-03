import React, { useState, useEffect } from "react";
import "./App.css";
import RecipeList from "./components/lists/RecipeList";
import dessertsData from "./components/database/desserts.json"; // Import desserts data
import SearchBar from "./components/search/SearchBar";

const Home = () => {
  const [showDesserts, setShowDesserts] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(dessertsData);
  }, []);

  const handleClick = () => {
    setShowDesserts(true);
  };

  return (
    <div className="App">
      {!showDesserts ? (
        <button className="button" onClick={handleClick}>
          Fetch Desserts
        </button>
      ) : (
        <>
          <SearchBar />
          <RecipeList recipes={recipes} />
        </>
      )}
    </div>
  );
};

export default Home;
