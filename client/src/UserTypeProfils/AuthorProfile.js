// Importing necessary modules and components
import React, { useState } from 'react'; // Importing React and useState hook
import { Outlet, useNavigate } from 'react-router-dom'; // Importing Outlet and useNavigate from react-router-dom
import { NavLink } from 'react-router-dom'; // Importing NavLink from react-router-dom
import { useSelector } from 'react-redux'; // Importing useSelector from react-redux

// Functional component for AuthorProfile
function AuthorProfile() {
  const navigate = useNavigate(); // useNavigate hook from react-router-dom for programmatic navigation
  const [activeButton, setActiveButton] = useState(""); // State to track active button

  // Extracting currentUser from the Redux store using useSelector
  let { currentUser } = useSelector(
    (state) => state.userAuthoruserAuthorLoginReducer
  );

  // Function to handle button click and set active button
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // Set active button based on the clicked button
  };

  return (
    <div>
      <div className='raju mt-3 w-75 d-block mx-auto '>
        {/* Navigation links */}
        <ul className="nav  justify-content-around fs-3 mt-2">
          {/* NavLink to display Articles List */}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`articles-by-author/${currentUser.username}`}
              // Style changes based on activeButton state
              style={{ color: activeButton === "articles" ? "#FFA500" : "#1ED4FA" }}
              // Click handler to set activeButton
              onClick={() => handleButtonClick("articles")}
            >
              <button className='btn btn-info'> Articles List</button>
            </NavLink>
          </li>
          {/* NavLink to Add new Article */}
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to="new-article"
              // Style changes based on activeButton state
              style={{ color: activeButton === "newArticle" ? "#FFA500" : "#1ED4FA" }}
              // Click handler to set activeButton
              onClick={() => handleButtonClick("newArticle")}
            >
              <button className='btn btn-info'>  Add new Article </button>
            </NavLink>
          </li>
        </ul>
        {/* Rendering child routes
        <Outlet/> */}
      </div>
      {/* Rendering child routes */}
      <Outlet/>
    </div>
  );
}

export default AuthorProfile; // Exporting AuthorProfile component
