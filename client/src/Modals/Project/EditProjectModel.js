import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectAction } from "../../redux/reducers/user/user.action";

const EditProjectModal = ({ isOpen, close, project }) => {
  const dispatch = useDispatch();
  const AllUsersList = useSelector((state) => state.user.userList);

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    status: "Not Started",
    projectManager: "",
    assignedUsers: [],
  });

  useEffect(() => {
    if (project) {
      setProjectData({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "Not Started",
        projectManager: project.projectManager?._id || "",
        assignedUsers: project.assignedUsers?.map((user) => user._id) || [],
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleAssignedUserCheckboxChange = (userId) => {
    const updatedAssignedUsers = projectData.assignedUsers.includes(userId)
      ? projectData.assignedUsers.filter((id) => id !== userId)
      : [...projectData.assignedUsers, userId];

    setProjectData({ ...projectData, assignedUsers: updatedAssignedUsers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...projectData,
      projectManager: projectData.projectManager,
      assignedUsers: projectData.assignedUsers,
    };
    dispatch(updateProjectAction(project._id, payload));
    close();
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"} fixed inset-0 z-10`}>
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Edit Project</h2>
            <button
              onClick={close}
              className="text-gray-500 hover:text-gray-700"
            >
              &#x2715; {/* Close Icon */}
            </button>
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={projectData.name}
                  onChange={handleChange}
                  placeholder="Enter Project Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={handleChange}
                  placeholder="Enter Project Description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Status
                </label>
                <select
                  name="status"
                  value={projectData.status}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Project Manager
                </label>
                <select
                  name="projectManager"
                  value={projectData.projectManager}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="" disabled>
                    Select Project Manager
                  </option>
                  {AllUsersList.filter(
                    (user) => user.role === "project_manager"
                  ).map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} - {user.email}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Assigned Users
                </label>
                <div
                  className="bg-gray-50 border border-gray-300 rounded-lg p-3 overflow-y-scroll"
                  style={{ maxHeight: "200px" }} // Set a fixed height for the scrollable box
                >
                  {AllUsersList.filter(
                    (user) => user.role === "user"
                  ).map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center mb-2 last:mb-0"
                    >
                      <input
                        type="checkbox"
                        id={`user-${user._id}`}
                        checked={projectData.assignedUsers.includes(user._id)}
                        onChange={() =>
                          handleAssignedUserCheckboxChange(user._id)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`user-${user._id}`}
                        className="ml-2 text-sm text-gray-900"
                      >
                        {user.name} - {user.email}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
