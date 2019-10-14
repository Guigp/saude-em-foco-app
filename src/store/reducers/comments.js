import {
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  GET_ALL_COMMENTS
} from "../actions/actionTypes";

const initialState = {
  comments: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_COMMENT:
      return {
        ...state,
        comments: [action.comment, ...state.comments]
      };

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => {
          return comment._id !== action.comment;
        })
      };
    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.comments
      };
    default:
      return state;
  }
};

export default reducer;
