import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./details.css";
import RecipeDetails from "../components/details/RecipeDetails";
import RecipeForm from "../components/form/RecipeForm";
import Modal from "../components/Modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Details = () => {
  const location = useLocation();
  const { recipe } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  // Function to display success toast message
  const notifySuccess = (message) => toast.success(message);

  // Function to display error toast message
  const notifyError = (message) => toast.error(message);

  const handleEdit = (recipe) => {
    setCurrentRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:3000/desserts/${currentRecipe.id}`);
      notifySuccess("Recipe deleted successfully!");
      navigate("/desserts");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      notifyError("Error deleting recipe. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const saveRecipe = async (recipe) => {
    try {
      if (recipe.id) {
        const response = await axios.put(
          `http://localhost:3000/desserts/${recipe.id}`,
          recipe
        );
        setCurrentRecipe(response.data);
        setIsModalOpen(false);
        notifySuccess("Recipe updated successfully!"); // Display success toast for edit
      } else {
        const response = await axios.post(
          "http://localhost:3000/desserts",
          recipe
        );
        setCurrentRecipe(response.data);
        setIsModalOpen(false);
        notifySuccess("Recipe added successfully!");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      notifyError("Error saving recipe. Please try again.");
    }
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <>
      <div className="details-page">
        <RecipeDetails
          recipe={currentRecipe}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm onSave={saveRecipe} initialRecipe={currentRecipe} />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={handleDeleteCancel}>
        <div className="delete-modal">
          <h3>Are you sure you want to delete this recipe?</h3>
          <div className="button-group">
            <button onClick={handleDeleteConfirm}>Yes</button>
            <button onClick={handleDeleteCancel}>No</button>
          </div>
        </div>
      </Modal>
      <ToastContainer  style={{ zIndex: "9999"}}/> {/* ToastContainer must be placed at a higher level */}
    </>
  );
};

export default Details;




