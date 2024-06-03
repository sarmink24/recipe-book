import React, { useState, useEffect } from "react";
import "../App.css";
import EditRecipe from "../components/form/EditReceipe";
import { useLocation } from 'react-router-dom';

const Edit = () => {

    const location = useLocation();
    const recipe = location.state.recipe;
    console.log("edit recipe list: ", recipe);

  return (
    <div className="App">
      <EditRecipe recipe={recipe}/>
    </div>
  );
};

export default Edit;