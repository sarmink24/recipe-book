

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
