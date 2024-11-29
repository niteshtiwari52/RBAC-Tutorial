import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCheckSquare } from "react-icons/fa";
import { MdQuiz, MdLeaderboard } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { VscGithubProject } from "react-icons/vsc";
import { HiOutlineLogout } from "react-icons/hi";
// Hamburger menu icons
import { GiHamburgerMenu } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { selectMenuAction } from "../../redux/reducers/menu/menu.action";
import { signOutAction } from "../../redux/reducers/auth/auth.action";
import { clearUserAction } from "../../redux/reducers/user/user.action";
import { clearLeaderboardAction } from "../../redux/reducers/leaderboard/leaderboard.action";
import { clearQuizAction } from "../../redux/reducers/quiz/quiz.action";

const SideMenu = (props) => {
  const user = useSelector((globalState) => globalState.user.selfUser);
  const { menuID, setMenuID } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(true);

  // Define all features
  const allFeatures = [
    {
      featureId: 1,
      featureName: "Dashboard",
      featureUrl: "dashboard",
      featureIcon: MdSpaceDashboard,
    },
    {
      featureId: 2,
      featureName: "Projects Management",
      featureUrl: "project-management",
      subMenu: [
        {
          id: 1,
          name: "Add Project",
        },
      ],
      featureIcon: VscGithubProject,
    },
    {
      featureId: 3,
      featureName: "Users Management",
      featureUrl: "user-management",
      subMenu: [
        {
          id: 1,
          name: "Add User",
        },
      ],
      featureIcon: FaUserCircle,
    },
    {
      featureId: 4,
      featureName: "Admin Management",
      featureUrl: "admin-management",
      featureIcon: MdLeaderboard,
    },
  ];

  // Dynamically filter features based on role
  const features = user?allFeatures.filter((feature) => {
    if (user.role === "admin") {
      return true; // Show all options for admin
    }
    if (user.role === "project_manager") {
      return feature.featureId !== 4; // Exclude Admin Management
    }
    if (user.role === "user") {
      return feature.featureId === 1 || feature.featureId === 2; // Only show Dashboard and Projects Management
    }
    return false; // Fallback for other roles
  }): [];

  const handleClickSetMenu = (item) => {
    dispatch(selectMenuAction(item));
  };

  const handleClickSignOut = async () => {
    await dispatch(signOutAction());
    await dispatch(clearUserAction());
    await dispatch(selectMenuAction({}));
    await dispatch(clearLeaderboardAction());
    await dispatch(clearQuizAction());
    navigate("/");
  };

  useEffect(() => {
    handleClickSetMenu({
      featureId: 1,
      featureName: "Dashboard",
      featureUrl: "dashboard",
      featureIcon: "MdSpaceDashboard",
    });
  }, [dispatch]);


  return (
    <div
      className={`flex h-screen flex-col justify-between bg-white border-e transition-all duration-300 ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div>
        <div className="inline-flex h-16 w-full items-center justify-center border-b">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="grid h-10 w-full place-content-center rounded-lg bg-teal-100 text-gray-600"
          >
            {/* {isExpanded ? (
              <GiHamburgerMenu className="h-5 w-5" />
            ) : (
              <GiHamburgerMenu className="h-5 w-5" />
            )} */}
            RBAC Tutorial
          </button>
        </div>

        {/* Features List */}
        <div className="border-t border-gray-100">
          <ul className="space-y-1 border-t border-gray-100 pt-4">
            {features.map((item) => (
              <li key={item.featureId}>
                <button
                  onClick={() => handleClickSetMenu(item)}
                  className={`group relative flex items-center rounded px-2 py-1.5 hover:bg-teal-200 hover:text-teal-700 ${
                    item.featureId === menuID
                      ? "bg-teal-200 text-teal-700"
                      : "text-teal-500"
                  }`}
                >
                  <item.featureIcon className="h-5 w-5 opacity-75" />
                  {isExpanded && (
                    <span className="ml-4 text-sm font-medium">
                      {item.featureName}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <button
          onClick={handleClickSignOut}
          className="group relative flex items-center w-full justify-center rounded-lg px-2 py-1.5 text-sm text-teal-500 hover:bg-teal-200 hover:text-teal-700"
        >
          <HiOutlineLogout className="h-5 w-5 opacity-75" />
          {isExpanded && (
            <span className="ml-4 text-sm font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
