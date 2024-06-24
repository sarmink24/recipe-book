import React, { useState, useEffect } from "react";
import RecipeList from "../components/lists/RecipeList";
import SearchBar from "../components/search/SearchBar";
import Modal from "../components/Modal";
import RecipeForm from "../components/form/RecipeForm" ;
import axios from "axios";
import { CgAdd } from "react-icons/cg";
import "./items.css";

const Items = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/desserts");
      setRecipes(response.data);
      setFilteredRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(query.toLowerCase()) || // Optional chaining
      recipe.price?.toString().includes(query) // Optional chaining
    );
    setFilteredRecipes(filtered);
  };

  const handleAdd = () => {
    setCurrentRecipe(null); // Reset current recipe
    setIsModalOpen(true);
  };

  const handleEdit = (recipe) => {
    setCurrentRecipe(recipe); // Set current recipe to the one being edited
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/desserts/${id}`);
      setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe.id !== id));
      setFilteredRecipes((prevFilteredRecipes) => prevFilteredRecipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const saveRecipe = async (recipe) => {
    if (recipe.id) {
      // Edit existing recipe
      try {
        const response = await axios.put(`http://localhost:3000/desserts/${recipe.id}`, recipe);
        setRecipes((prevRecipes) => prevRecipes.map(r => r.id === recipe.id ? response.data : r));
        setFilteredRecipes((prevFilteredRecipes) => prevFilteredRecipes.map(r => r.id === recipe.id ? response.data : r));
      } catch (error) {
        console.error("Error updating recipe:", error);
      }
    } else {
      // Add new recipe
      try {
        const response = await axios.post("http://localhost:3000/desserts", recipe);
        setRecipes((prevRecipes) => [...prevRecipes, response.data]);
        setFilteredRecipes((prevFilteredRecipes) => [...prevFilteredRecipes, response.data]);
      } catch (error) {
        console.error("Error adding recipe:", error);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="items">
        <div className="header">
          <div className="search-div">
        <SearchBar onSearch={handleSearch} />
        </div>
        <div className="add-button">
        <button onClick={handleAdd}>
          <CgAdd className="add-icon" />
          Add
        </button>
        </div>
        </div>
        <RecipeList recipes={filteredRecipes} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <RecipeForm onSave={saveRecipe} initialRecipe={currentRecipe} />
      </Modal>
    </>
  );
};

export default Items;

