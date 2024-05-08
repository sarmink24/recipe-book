import React, { useState } from "react";
import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleDescription = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  return (
    <div className="RecipeList">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe">
          <div className="recipe-photo">
            <img src={recipe.imageUrl} alt={recipe.name} />
          </div>
          <div className="recipe-details">
            <div className="title-price">
              <h3 className="price">
                <mark>${recipe.price}</mark>
              </h3>
              <h3 className="title">{recipe.name}</h3>
            </div>
            <p>
              {expandedId === recipe.id
                ? recipe.description
                : `${recipe.description.slice(0, 40)}... `}
              <button onClick={() => toggleDescription(recipe.id)}>
                {expandedId === recipe.id ? "Read Less" : "Read More"}
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
