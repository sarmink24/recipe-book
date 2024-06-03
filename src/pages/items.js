import React, { useState, useEffect } from "react";
import "../App.css";
import RecipeList from "../components/lists/RecipeList";
import SearchBar from "../components/search/SearchBar";

const Items = () => {
  return (
    <div className="App">
      <SearchBar />
      <RecipeList />
    </div>
  );
};

export default Items;
