import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "../App.css";
import RecipeDetails from "../components/details/RecipeDetails";

const Details = () => {
    const location = useLocation();
    const { recipe } = location.state || {};
  
    if (!recipe) {
      return <div>Recipe not found</div>;
    }
  
    return (
      <div className="App">
        <RecipeDetails recipe={recipe} />
      </div>
    );
};

export default Details;