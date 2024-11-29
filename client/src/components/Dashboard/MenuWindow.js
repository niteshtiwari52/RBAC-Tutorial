import React from "react";
import { useParams } from "react-router-dom";

// Components
import UserDetails from "./User/UserDetails";
import NewQuiz from "./Quiz/NewQuiz";
import SubmittedQuiz from "./SubmittedQuiz/SubmittedQuiz";
import Leaderboard from "./Leaderboard/Leaderboard";
import AllUserDashboard from "./UserDashboard/AllUserDashboard";
import AllProjectDashboard from "./ProjectDashboard/AllProjectDashboard";
import AllAdminDashboard from "./AdminDashboard/AllAdminDashboard";

const MenuWindow = (props) => {
  const { menuID, setMenuID } = props;

  let componentToRender;

  // Conditionally set the component based on menuID
  if (menuID === 1) {
    componentToRender = <UserDetails />;
  } else if (menuID === 2) {
    // componentToRender = <NewQuiz />;
    componentToRender = <AllProjectDashboard />;
  } else if (menuID === 3) {
    componentToRender =<AllUserDashboard />;
  } else if (menuID === 4) {
    componentToRender = <AllAdminDashboard />;
  } else {
    // Handle other cases or set a default component
    componentToRender = <p>Invalid menuID</p>;
  }
  return <>{componentToRender}</>;
};

export default MenuWindow;
