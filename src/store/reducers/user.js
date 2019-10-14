import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  UPDATE_USER
} from "../actions/actionTypes";

const initialState = {
  _id: null,
  name: null,
  email: null,
  token: null,
  expiresAt: null,
  logged: false,
  avatar: null,
  genre: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        _id: action._id,
        name: action.name,
        email: action.email,
        genre: action.genre ? action.genre : null,
        avatar: action.avatar ? action.avatar : null,
        token: action.token,
        expiresAt: action.expiresAt,
        logged: true
      };

    case USER_LOGGED_OUT:
      return {
        ...initialState
      };
    case UPDATE_USER:
      return {
        ...state,
        name: action.user.name,
        email: action.user.email,
        genre: action.user.genre,
        avatar: action.user.avatar
      };

    default:
      return state;
  }
};

export default reducer;
