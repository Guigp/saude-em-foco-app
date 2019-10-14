import {
  PICK_NEW_LOCALIZATION,
  GET_ALL_COMPLAINTS,
  ADD_NEW_COMPLAINT,
  REMOVE_COMPLAINT,
  UPDATE_NUMBER_CASES_LOCATION,
  GET_USER_LOCALIZATION
} from "./actionTypes";

export const pickNewLocalization = (coords, locName, numberCases) => {
  return {
    type: PICK_NEW_LOCALIZATION,
    latitude: coords.latitude,
    longitude: coords.longitude,
    locationName: locName,
    numberCases: numberCases
  };
};
export const getUserLocalization = coords => {
  return {
    type: GET_USER_LOCALIZATION,
    latitude: coords.latitude,
    longitude: coords.longitude
  };
};

export const getAllComplaints = complaints => {
  return {
    type: GET_ALL_COMPLAINTS,
    complaints: complaints
  };
};
export const addNewComplaint = complaint => {
  return {
    type: ADD_NEW_COMPLAINT,
    complaint: complaint
  };
};
export const removeComplaint = id => {
  return {
    type: REMOVE_COMPLAINT,
    complaintID: id
  };
};
export const updateNumberCasesLocation = addOrRemove => {
  return {
    type: UPDATE_NUMBER_CASES_LOCATION,
    addOrRemove: addOrRemove
  };
};
