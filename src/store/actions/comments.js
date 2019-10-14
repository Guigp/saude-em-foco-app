import {
  ADD_NEW_COMMENT,
  DELETE_COMMENT,
  GET_ALL_COMMENTS
} from "./actionTypes";

export const getAllComments = allComments => {
  return {
    type: GET_ALL_COMMENTS,
    comments: allComments
  };
};
export const addNewComment = comment => {
  return {
    type: ADD_NEW_COMMENT,
    comment: comment
  };
};
export const deleteComment = comment => {
  return {
    type: DELETE_COMMENT,
    comment: comment
  };
};
