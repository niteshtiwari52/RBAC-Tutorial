import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { updateUserDetailsAction } from "../../redux/reducers/user/user.action";


const EditUserModel = ({ isOpen, close, user }) => {
  const dispatch = useDispatch();
  
  // Initialize form state with user data
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
    role: user.role || "user",
    isEmailVerified: user.isEmailVerified ,
  });

  // Update form data when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        role: user.role || "user",
        isEmailVerified: user.isEmailVerified ,
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dispatch the action with the updated form data
    dispatch(updateUserDetailsAction(user._id, formData));

    // Close the modal after dispatch
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Edit User: {user.name}
            </h2>
            <button onClick={close} className="text-gray-500 hover:text-gray-700">
              &#x2715; {/* Cross Icon */}
            </button>
          </div>

          {/* Modal Body */}
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Users Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
              {/* Email */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Users Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Users Phone Number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                //   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>

              {/* Role */}
              <div className="mb-6">
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value="user">User</option>
                  <option value="project_manager">Project Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Is Email Verified */}
              <div className="mb-6">
                <label
                  htmlFor="isEmailVerified"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Is Email Verified
                </label>
                <select
                  id="isEmailVerified"
                  name="isEmailVerified"
                  value={formData.isEmailVerified}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>

              {/* Cancel and Save Buttons */}
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EditUserModel;
