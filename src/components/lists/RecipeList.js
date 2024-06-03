import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [items, setItems] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const alertMessage = location.state && location.state.alertMessage;
  const searchResults = location.state && location.state.searchResults;

  const navigateToRecipe = (recipe) => {
    navigate(`/desserts/${recipe.id}`, { state: { recipe } });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/desserts");
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

  const toggleDescription = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const handleGoBack = () => {
    navigate("/desserts", { state: { alertMessage: null } });
  };


  return (
    <div className="RecipeList">
      {alertMessage ? (
        <>
          <p>{alertMessage}</p>
          <p onClick={handleGoBack}>Go back!</p>
        </>
      ) : (
        <>
          {items.map((recipe) => (
            <div key={recipe.id} className="recipe" onClick={() => navigateToRecipe(recipe)}>
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
          <p onClick={handleGoBack}>Go back!</p>
        </>
      )}
      {/* {items.map((recipe) => (
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
      ))} */}
    </div>
  );
};

export default RecipeList;
