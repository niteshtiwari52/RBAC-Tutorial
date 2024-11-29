import { SELF, CLEAR_USER, GET_USER_DETAILS, UPDATE_USER_DETAILS,GET_USER_LIST,FETCH_ALL_PROJECTS, ADD_USER_DETAILS, CREATE_NEW_PROJECT, UPDATE_PROJECT } from "./user.type";

const initialState = {
  selfUser: null,
  selfUserDetails: null,
  userList:[],
  AllProjects: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELF:
      return {
        ...state,
        selfUser: action.payload,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        selfUserDetails: action.payload,
      };
    case GET_USER_LIST:
      return {
        ...state,
        userList: action.payload
      };
      case ADD_USER_DETAILS:
        return {
          ...state,
          userList: [...state.userList, action.payload.newUser], // Create a new array with the existing users and the new user
        };
      case UPDATE_USER_DETAILS:
        return {
          ...state,
          userList: state.userList.map(user => 
            user._id === action.payload.user._id ? { ...user, ...action.payload.user } : user
          ),
        };
      case CREATE_NEW_PROJECT:
        return {
          ...state,
          AllProjects: [...state.AllProjects, action.payload.newProject], // Create a new array with the existing users and the new user
        };
      case UPDATE_PROJECT:
        return {
          ...state,
          AllProjects: state.AllProjects.map(project => 
            project._id === action.payload.updatedProject._id ? { ...project, ...action.payload.updatedProject } : project
          ),
        };
    case FETCH_ALL_PROJECTS:
      return {
        ...state,
        AllProjects: action.payload
      };
    case CLEAR_USER:
      return {
        selfUser: null,
        selfUserDetails: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
