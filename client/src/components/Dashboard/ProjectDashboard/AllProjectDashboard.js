import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaderboardDetailsAction } from "../../../redux/reducers/leaderboard/leaderboard.action";
import { fetchAllProjectsActions } from "../../../redux/reducers/user/user.action";
import { GrFormView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import EditProjectModel from "../../../Modals/Project/EditProjectModel";
import CreateProjectModal from "../../../Modals/Project/CreateProjectModal";

const AllProjectDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((globalState) => globalState.user.selfUser);
  const userID = useSelector((globalState) => globalState.user.selfUser);
  const AllProjectList = useSelector(
    (globalState) => globalState.user.AllProjects
  );

  const [isProjectEditModal, setIsProjectEditModal] = useState(false);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    dispatch(fetchAllProjectsActions());
  }, []);
  const handleAddProjectClick = () => {
    setIsAddProjectModalOpen(true); // This opens the Add User Modal
  };
  const handleEdit = (project) => {
    setSelectedProject(project); // Set the selected user
    setIsProjectEditModal(true); // Open the modal
  };

  const handleDelete = (project) => {
    console.log("Delete project:", project);
  };

  return (
    <>
      <div class="my-4  w-3/4 border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div class="shrink-0 mr-auto sm:py-3 w-full">
            <p class="font-medium text-3xl text-center">Project Dashboard</p>
            <div className="mt-4 text-sm text-gray-600 text-center">
              {user?.role === "user" ? (
                ""
              ) : (
                <button
                  onClick={handleAddProjectClick}
                  className="text-blue-500 hover:text-blue-700  font-medium text-sm"
                >
                  + Add New Project
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div class=" overflow-x-auto  overflow-y-auto h-screen-73  rounded-lg border border-gray-200">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead class="ltr:text-left rtl:text-right">
                <tr>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    S. No.
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Project Name
                  </th>
                  {/* <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Rank
              </th> */}
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Manager
                  </th>
                  <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Total members
                  </th>
                  {user?.role === "user" ? (
                    ""
                  ) : (
                    <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-200">
                {AllProjectList &&
                  AllProjectList.map((project, index) => (
                    <>
                      <tr key={project._id} className="text-center">
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                          {index + 1}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {project.name}{" "}
                        </td>
                        {/* <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                      {user.userLeaderboardRank}
                    </td> */}
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                          {project.status}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                          {project.projectManager.name}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                          {project.assignedUsers.length}
                        </td>
                        <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                          <div className="flex justify-center gap-3">
                            {/* <button
                              onClick={() => handleView(project)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <GrFormView size={24} />
                            </button> */}

                            {/* Edit Button */}
                            {user?.role === "user" ? (
                              ""
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(project)}
                                  className="text-yellow-500 hover:text-yellow-700"
                                >
                                  <FiEdit size={24} />
                                </button>

                                {/* Delete Button */}
                                <button
                                  onClick={() => handleDelete(project)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <RiDeleteBinFill size={24} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isProjectEditModal && (
        <EditProjectModel
          isOpen={isProjectEditModal}
          close={() => setIsProjectEditModal(false)}
          project={selectedProject}
        />
      )}
      {isAddProjectModalOpen && (
        <CreateProjectModal
          isOpen={isAddProjectModalOpen}
          close={() => setIsAddProjectModalOpen(false)}
          //   user={selectedUser}
        />
      )}
    </>
  );
};

export default AllProjectDashboard;
