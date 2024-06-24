
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./RecipeDetails.css";
import Modal from "../Modal";
import EditRecipe from "../form/EditReceipe";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const RecipeDetails = ({ recipe, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setExpandedId((prevExpandedId) =>
      prevExpandedId === recipe.id ? null : recipe.id
    );
  };

  const handleGoBack = () => {
    navigate("/desserts");
  };

  const handleEdit = () => {
    onEdit(recipe); // Trigger the parent component's onEdit function
    toast.info("Editing recipe...");
  };

  const handleDelete = () => {
    onDelete(recipe.id); // Trigger the parent component's onDelete function
    toast.warn("Deleting recipe...");
  };

  return (
    <div key={recipe.id} className="dessert">
      <div className="dessert-photo">
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
      <div className="dessert-details">
        <div className="title-price">
          <h3 className="price">
          <mark>${parseFloat(recipe.price).toFixed(2)}</mark>
          </h3>
          <h3 className="title">{recipe.name}</h3>
        </div>
        <p>
          {expandedId === recipe.id
            ? recipe.description
            : `${recipe.description.slice(0, 40)}... `}
          <button className="read-more" onClick={toggleDescription}>
            {expandedId === recipe.id ? "Read Less" : "Read More"}
          </button>
        </p>
        <div className="edit-delete">
          <button onClick={handleEdit} className="edit-b">
            <CiEdit className="edit-i" />
            Edit
          </button>
          <button onClick={handleDelete} className="delete-b">
            <RiDeleteBin6Line className="delete-i" />
            Delete
          </button>
        </div>
        <div className="go-back">
          <button className="goback-button" onClick={handleGoBack}>
            {"<<"} Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

