import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const handleDeleteClick = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this recipe?</p>
          <button
            onClick={() => {
              handleDeleteConfirmation();
              closeToast();
            }}
            className="toast-button"
          >
            Yes
          </button>
          <button onClick={closeToast} className="toast-button">
            No
          </button>
        </div>
      ),
      {
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/desserts/${recipe.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the recipe");
      }

      toast.success("Recipe deleted successfully!", {
        onClose: () => navigate("/desserts"),
      });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe. Please try again.");
    }
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
          <button onClick={handleEditClick} className="edit-button">
            <CiEdit className="edit-icon" />
            Edit
          </button>
          <button onClick={handleDeleteClick} className="delete-button">
            <RiDeleteBin6Line className="delete-icon" />
            Delete
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecipeDetails;
