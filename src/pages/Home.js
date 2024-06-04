// import React, { useState, useEffect } from "react";
// import "../App.css";
// import RecipeList from "../components/lists/RecipeList";
// import SearchBar from "../components/search/SearchBar";
// import axios from "axios";
// const Home = () => {
//   const [showDesserts, setShowDesserts] = useState(false);
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/desserts");
//         setRecipes(response.data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   const handleClick = () => {
//     setShowDesserts(true);
//   };

//   return (
//     <div className="App">
//       {!showDesserts ? (
//         <button className="button" onClick={handleClick}>
//           Fetch Desserts
//         </button>
//       ) : (
//         <>
//           <SearchBar />
//           <RecipeList recipes={recipes} />
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;

import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/desserts");
  };

  return (
    <div className="App">
      <button className="button" onClick={handleClick}>
        Fetch Desserts
      </button>
    </div>
  );
};

export default Home;
