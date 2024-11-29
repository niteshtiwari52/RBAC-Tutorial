import axios from "axios";
import { SELF, CLEAR_USER, GET_USER_DETAILS,UPDATE_USER_DETAILS,  GET_USER_LIST, FETCH_ALL_PROJECTS, ADD_USER_DETAILS, CREATE_NEW_PROJECT, UPDATE_PROJECT } from "./user.type";
const apiUrl = process.env.REACT_APP_API_URL;

export const getMyDetailsAction = () => async (dispatch) => {
  try {
    const User = await axios({
      method: "GET",
      url: `${apiUrl}/api/v1/user/getProfile`,
    });
    // console.log(User);
    return dispatch({ type: SELF, payload: { ...User.data.user } });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const getUserDetailsAction = () => async (dispatch) => {
  try {
    const UserDetails = await axios({
      method: "GET",
      url: `${apiUrl}/api/v1/user/userDetails`,
    });

    return dispatch({
      type: GET_USER_DETAILS,
      payload: { ...UserDetails.data },
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const getUserListAction = (query = {}) => async (dispatch) => {
  try {
    // Convert query object to query string
   // Convert query object to query string
   const queryString = new URLSearchParams(
    Object.entries(query).flatMap(([key, value]) =>
      Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]
    )
  ).toString();

    const userList = await axios({
      method: "GET",
      url: `${apiUrl}/api/v1/admin/getAllUser${queryString ? `?${queryString}` : ""}`,
    });
    return dispatch({
      type: GET_USER_LIST,
      payload: [ ...userList.data.data ],
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const addNewUserAction = (userDetails) => async (dispatch) => {
  try {
    // Send a POST request to add a new user
    const response = await axios({
      method: "POST", // POST to create a new user
      url: `${apiUrl}/api/v1/admin/addNewUser`, // Assuming your API has this route
      data: userDetails, // the user details to create a new user
    });

    // Dispatch the newly added user data
    return dispatch({
      type: ADD_USER_DETAILS,
      payload: response.data, // Assuming the response contains the added user data
    });
  } catch (error) {
    // If there's an error, dispatch an error action
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const updateUserDetailsAction = (userId, userDetails) => async (dispatch) => {
  try {
    // Send a PUT request to update the user details
    const response = await axios({
      method: "PUT", // or "PATCH" if you're doing partial updates
      url: `${apiUrl}/api/v1/admin/updateUser/${userId}`, // Assuming your API has this route
      data: userDetails, // the data to update for the user
    });

    // Dispatch the updated user data
    return dispatch({
      type: UPDATE_USER_DETAILS,
      payload: response.data, // Assuming the response contains the updated user data
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
export const addProjectAction = (projectData) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/project/createProject`, projectData);
    dispatch({
      type: CREATE_NEW_PROJECT,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const updateProjectAction = (projectId, projectData) => async (dispatch) => {
  try {
    const response = await axios.put(`${apiUrl}/api/v1/project/updateProject/${projectId}`, projectData);
    dispatch({
      type: UPDATE_PROJECT,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error.message });
  }
};

export const fetchAllProjectsActions = () => async (dispatch) => {
  try {
    

    const projectList = await axios({
      method: "GET",
      url: `${apiUrl}/api/v1/project/getAllProjects`,
    });
    return dispatch({
      type: FETCH_ALL_PROJECTS,
      payload: projectList.data.data.projects,
    });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const clearUserAction = () => async (dispatch) => {
  try {
    return dispatch({ type: CLEAR_USER, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
