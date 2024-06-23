
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecipeList.css";
import { BiDetail } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../Modal";
import EditRecipe from "../form/EditReceipe";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const alertMessage = location.state?.alertMessage;
  const searchResults = location.state?.searchResults;


  const navigateToRecipe = (recipe) => {
    navigate(`/desserts/${recipe.id}`, { state: { recipe } });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/desserts");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setItems(searchResults);
    } else {
      setItems(recipes);
    }
  }, [searchResults, recipes]);

  const handleDeleteClick = (recipe) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this recipe?</p>
          <button
            onClick={() => {
              handleDeleteConfirmation(recipe);
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

  const handleDeleteConfirmation = async (recipe) => {
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
  
      // Update items state by filtering out the deleted recipe
      setItems(prevItems => prevItems.filter(item => item.id !== recipe.id));
  
      toast.success("Recipe deleted successfully!", {
        onClose: () => navigate("/desserts"),
      });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe. Please try again.");
    }
  };
  

  const toggleDescription = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const handleGoBack = () => {
    navigate("/desserts", { state: { alertMessage: null } });
  };

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="RecipeList">
      {alertMessage ? (
        <>
          <p>{alertMessage}</p>
          <div className="go-back">
          <button  className="goback-button" onClick={handleGoBack}> {"<<"} Go Back</button>
        </div>
        </>
      ) : (
        <>
          {items.map((recipe) => (
            <div key={recipe.id} className="recipe">
              <div className="recipe-photo" onClick={() => navigateToRecipe(recipe)}>
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
              <div className="actions-button">
                <button onClick={() => navigateToRecipe(recipe)} className="edit-b">
                  <BiDetail className="detail-icon" />
                  Details
                </button>
                <button onClick={() => handleEditClick(recipe)} className="edit-b">
                  <CiEdit className="edit-i" />
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(recipe)} className="delete-b">
                  <RiDeleteBin6Line className="delete-i" />
                  Delete
                </button>
              </div>
            </div>
          ))}
          {searchResults && <div className="go-back">
          <button className="goback-button" onClick={handleGoBack}> {"<<"} Go Back</button>
        </div>}

          <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        {selectedRecipe && <EditRecipe recipe={selectedRecipe} />}
      </Modal>

      <ToastContainer />
        </>
      )}
    </div>
  );
};

export default RecipeList;
