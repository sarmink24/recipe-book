import React, { useState } from "react";
import "./RecipeForm.css"; // Import the CSS file for styling
import { Modal } from "react-bootstrap";

const RecipeForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [servings, setServings] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, preparationTime, servings });
    setName("");
    setDescription("");
    setPreparationTime("");
    setServings("");
  };

  return (
    <Modal>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="recipe-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Preparation Time"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
          />
          <input
            type="number"
            placeholder="Servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="submit">Add Recipe</button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeForm;
