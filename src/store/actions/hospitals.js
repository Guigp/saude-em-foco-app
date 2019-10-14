import {
  GET_HOSPITALS,
  GET_INDICATIONS,
  UPDATE_HOSPITAL_NUMBER_COMMENTS,
  UPDATE_WAITING_TIME
} from "./actionTypes";

export const getHospitals = allHospitals => {
  return {
    type: GET_HOSPITALS,
    allHospitals: allHospitals
  };
};
export const getIndications = indications => {
  return {
    type: GET_INDICATIONS,
    indications: indications
  };
};
export const updateHospitalNumberComments = (hospitalId, operation) => {
  return {
    type: UPDATE_HOSPITAL_NUMBER_COMMENTS,
    hospitalId: hospitalId,
    operation: operation
  };
};
export const updateWaitingTime = (hospitalId, time, contributions) => {
  return {
    type: UPDATE_WAITING_TIME,
    hospitalId: hospitalId,
    waitingTime: time,
    contributions: contributions
  };
};
