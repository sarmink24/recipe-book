// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Home from "./pages/Home";

// const App = () => {
//   return (
//     <div className="App">
//       <Home />
//     </div>
//   );
// };

// export default App;

// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Items from "./pages/items";
// import DessertsList from "./pages/DessertsList";
// import DessertDetail from "./pages/DessertDetail";
// import AddDessert from "./pages/AddDessert";
// import EditDessert from "./pages/EditDessert";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desserts" element={<Items />} />
        {/* <Route path="/desserts/:id" element={<DessertDetail />} /> */}
        {/* <Route path="/add-dessert" element={<AddDessert />} /> */}
        {/* <Route path="/edit-dessert/:id" element={<EditDessert />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
