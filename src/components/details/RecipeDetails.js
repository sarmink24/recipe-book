import React from "react";
import "./RecipeDetails.css"; // Import the CSS file for styling

const RecipeDetails = ({ recipe }) => {
  return (
    <div className="recipe-details">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <p>Preparation Time: {recipe.preparationTime}</p>
      <p>Servings: {recipe.servings}</p>
    </div>
  );
};

export default RecipeDetails;
