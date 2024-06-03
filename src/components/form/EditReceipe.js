import React, { useState, useEffect } from "react";
import "./EditRecipe.css"; // Import the CSS file for styling

const EditRecipe = ({ recipe }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // Set initial form values based on the recipe prop when it changes
  useEffect(() => {
    if (recipe) {
      setId(recipe.id || "");
      setName(recipe.name || "");
      setDescription(recipe.description || "");
      setPrice(recipe.price || "");
    }
  }, [recipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your update logic here
    console.log("Updated recipe:", { id, name, description, price });
    // Clear form fields after submission
    setId("");
    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <div className="edit-div">
      <h5 className="modal-header">Edit Recipe</h5>
      <div className="modal-body">
        <form onSubmit={handleSubmit} className="recipe-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="submit-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
