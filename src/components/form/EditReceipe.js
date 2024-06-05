import React, { useState, useEffect } from "react";
import "./EditRecipe.css"; // Import the CSS file for styling
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EditRecipe = ({ recipe }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // Set initial form values based on the recipe prop when it changes
  useEffect(() => {
    if (recipe) {
      setId(recipe.id || "");
      setName(recipe.name || "");
      setDescription(recipe.description || "");
      setPrice(recipe.price || "");
      setImageUrl(recipe.imageUrl || "");
    }
  }, [recipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = { id, name, description, price, imageUrl };

    try {
      const response = await fetch(`http://localhost:3000/desserts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        throw new Error("Failed to update the recipe");
      }
      const data = await response.json();
      console.log("Updated recipe:", data);
      toast.success("Recipe updated successfully!", {
        onClose: () => navigate(`/desserts/${id}`, { state: { recipe: data } }), // Pass updated recipe data
      });
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error updating recipe. Please try again.");
    }
  };

  return (
    // <div className="edit-div">
    //   <h5 className="modal-header">Edit Recipe</h5>
    //   <div className="modal-body">
    //     <form onSubmit={handleSubmit} className="recipe-form">
    //       <input
    //         type="text"
    //         placeholder="Name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         className="form-input"
    //       />
    //       <textarea
    //         placeholder="Description"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         className="form-input"
    //       />
    //       <input
    //         type="number"
    //         placeholder="Price"
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //         className="form-input"
    //       />
    //       <input
    //         type="text"
    //         placeholder="Image URL"
    //         value={imageUrl}
    //         onChange={(e) => setImageUrl(e.target.value)}
    //         className="form-input"
    //       />
    //       {imageUrl && (
    //         <div className="image-preview">
    //           <img src={imageUrl} alt="Recipe" />
    //         </div>
    //       )}
    //       <button type="submit" className="submit-button">
    //         Update
    //       </button>
    //     </form>
    //   </div>
    //   <ToastContainer
    //     position="top-center"
    //     hideProgressBar
    //     newestOnTop
    //     closeOnClick
    //     rtl={false}
    //     pauseOnFocusLoss
    //     draggable
    //     pauseOnHover
    //     className="toast-container"
    //     toastClassName="toast" // Custom class for toasts
    //   />
    // </div>

    <div className="edit-div">
      <h5 className="modal-header">Edit Recipe</h5>
      <div className="modal-body">
        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="form-input"
            />
          </div>
          {imageUrl && (
            <div className="form-group image-preview">
              <img src={imageUrl} alt="Recipe" />
            </div>
          )}
          <div className="form-group update-button">
            <button type="submit" className="submit-button">
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
        toastClassName="toast" // Custom class for toasts
      />
    </div>
  );
};

export default EditRecipe;
