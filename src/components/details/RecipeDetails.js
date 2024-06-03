import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./RecipeDetails.css"; // Import the CSS file for styling
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const RecipeDetails = ({ recipe }) => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit-dessert/${recipe.id}`, { state: { recipe } });
  };

  const toggleDescription = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  return (
  
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
  <div>
        {/* <button className="edit-button">
          <CiEdit className="edit-icon" />
          Edit
        </button> */}
        <button onClick={handleEditClick} className="edit-button">
            <CiEdit className="edit-icon" />
            Edit
          </button>
        <button className="delete-button">
          <RiDeleteBin6Line className="delete-icon" />
          Delete
        </button>
      </div>
</div>
</div>
  );
};

export default RecipeDetails;
