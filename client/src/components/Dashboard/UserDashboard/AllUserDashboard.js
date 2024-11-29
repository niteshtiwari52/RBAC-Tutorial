import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaderboardDetailsAction } from "../../../redux/reducers/leaderboard/leaderboard.action";
import { getUserListAction } from "../../../redux/reducers/user/user.action";
import EditUserModel from "../../../Modals/User/EditUserModel"; // Import the EditUserModel
import { GrFormView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import CreateUserModel from "../../../Modals/User/CreateUserModel";

const AllUserDashboard = () => {
  const dispatch = useDispatch();
  const selfUser = useSelector((globalState) => globalState.user.selfUser);
  const AllUsersList = useSelector((globalState) => globalState.user.userList);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUserListAction({ role: ["project_manager", "user"] }));
  }, [dispatch]);

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true); // This opens the Add User Modal
  };
  const handleEdit = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsEditModalOpen(true); // Open the modal
  };

  const handleDelete = (user) => {
    console.log("Delete User:", user);
  };

  return (
    <>
      <div className="my-4 w-full border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <div className="flex flex-col border-b py-4 sm:flex-row sm:items-start">
          <div className="shrink-0 mr-auto sm:py-3 w-full">
            <p className="font-medium text-3xl text-center">User Management</p>
            <div className="mt-4 text-sm text-gray-600 text-center">
              {selfUser?.role === "project_manager" ? (
                ""
              ) : (
                <button
                  onClick={handleAddUserClick}
                  className="text-blue-500 hover:text-blue-700  font-medium text-sm"
                >
                  + Add New User
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="overflow-x-auto overflow-y-auto h-screen-73 rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    S. No.
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Mobile
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Role
                  </th>
                  {selfUser?.role === "project_manager" ? "" : <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Action
                  </th>}
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {AllUsersList &&
                  AllUsersList.map((user, index) => (
                    <tr key={user._id} className="text-center">
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {user.mobile}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {user.role}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        <div className="flex justify-center gap-3">
                          {/* <button className="text-blue-500 hover:text-blue-700">
                            <GrFormView size={24} />
                          </button> */}
                          {(selfUser?.role === "project_manager"  || selfUser?.role === "user")? "":<>
                            <button
                            onClick={() => handleEdit(user)}
                            className="text-yellow-500 hover:text-yellow-700"
                          >
                            <FiEdit size={24} />
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <RiDeleteBinFill size={24} />
                          </button>
                          </> }
                          
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <EditUserModel
          isOpen={isEditModalOpen}
          close={() => setIsEditModalOpen(false)}
          user={selectedUser}
        />
      )}
      {isAddUserModalOpen && (
        <CreateUserModel
          isOpen={isAddUserModalOpen}
          close={() => setIsAddUserModalOpen(false)}
          //   user={selectedUser}
        />
      )}
    </>
  );
};

export default AllUserDashboard;
