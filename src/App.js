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
import Details from "./pages/details";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/desserts" element={<Items />} />
        <Route path="/desserts/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
