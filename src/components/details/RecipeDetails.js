// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./RecipeDetails.css"; // Import the CSS file for styling
// import { CiEdit } from "react-icons/ci";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const RecipeDetails = ({ recipe }) => {
//   const [expandedId, setExpandedId] = useState(null);
//   const navigate = useNavigate();

//   const handleEditClick = () => {
//     navigate(`/edit-dessert/${recipe.id}`, { state: { recipe } });
//   };

//   const toggleDescription = (id) => {
//     setExpandedId(id === expandedId ? null : id);
//   };

//   const handleDeleteClick = () => {
//     toast(
//       ({ closeToast }) => (
//         <div>
//           <p>Are you sure you want to delete this recipe?</p>
//           <button
//             onClick={() => {
//               handleDeleteConfirmation();
//               closeToast();
//             }}
//             className="toast-button"
//           >
//             Yes
//           </button>
//           <button onClick={closeToast} className="toast-button">
//             No
//           </button>
//         </div>
//       ),
//       {
//         closeOnClick: false,
//         draggable: false,
//       }
//     );
//   };

//   const handleDeleteConfirmation = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/desserts/${recipe.id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete the recipe");
//       }

//       toast.success("Recipe deleted successfully!", {
//         onClose: () => navigate("/desserts"),
//       });
//     } catch (error) {
//       console.error("Error deleting recipe:", error);
//       toast.error("Error deleting recipe. Please try again.");
//     }
//   };

//   return (
//     <div key={recipe.id} className="dessert">
//       <div className="dessert-photo">
//         <img src={recipe.imageUrl} alt={recipe.name} />
//       </div>
//       <div className="dessert-details">
//         <div className="title-price">
//           <h3 className="price">
//             <mark>${recipe.price}</mark>
//           </h3>
//           <h3 className="title">{recipe.name}</h3>
//         </div>
//         <p>
//           {expandedId === recipe.id
//             ? recipe.description
//             : `${recipe.description.slice(0, 40)}... `}
//           <button
//             className="read-more"
//             onClick={() => toggleDescription(recipe.id)}
//           >
//             {expandedId === recipe.id ? "Read Less" : "Read More"}
//           </button>
//         </p>
//         <div className="edit-delete">
//           <button onClick={handleEditClick} className="edit-b">
//             <CiEdit className="edit-i" />
//             Edit
//           </button>
//           <button onClick={handleDeleteClick} className="delete-b">
//             <RiDeleteBin6Line className="delete-i" />
//             Delete
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default RecipeDetails;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RecipeDetails.css"; // Import the CSS file for styling
import Modal from "../Modal";
import EditRecipe from "../form/EditReceipe";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const RecipeDetails = ({ recipe }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedRecipe(null);
  };

  const toggleDescription = (id) => {
    setExpandedId(id === expandedId ? null : id);
  };

  const handleDeleteClick = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this recipe?</p>
          <button
            onClick={() => {
              handleDeleteConfirmation();
              closeToast();
            }}
            className="toast-button"
          >
            Yes
          </button>
          <button onClick={closeToast} className="toast-button">
            No
          </button>
        </div>
      ),
      {
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleGoBack = () => {
    navigate("/desserts");
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/desserts/${recipe.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the recipe");
      }

      toast.success("Recipe deleted successfully!", {
        onClose: () => navigate("/desserts"),
      });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Error deleting recipe. Please try again.");
    }
  };

  return (
    <div key={recipe.id} className="dessert">
      <div className="dessert-photo">
        <img src={recipe.imageUrl} alt={recipe.name} />
      </div>
      <div className="dessert-details">
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
          <button
            className="read-more"
            onClick={() => toggleDescription(recipe.id)}
          >
            {expandedId === recipe.id ? "Read Less" : "Read More"}
          </button>
        </p>
        <div className="edit-delete">
          <button onClick={() => handleEditClick(recipe)} className="edit-b">
            <CiEdit className="edit-i" />
            Edit
          </button>
          <button onClick={handleDeleteClick} className="delete-b">
            <RiDeleteBin6Line className="delete-i" />
            Delete
          </button>
        </div>
        <div className="go-back">
          <button  className="goback-button" onClick={handleGoBack}> {"<<"} Go Back</button>
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={closeModal}>
        {selectedRecipe && <EditRecipe recipe={selectedRecipe} />}
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default RecipeDetails;
