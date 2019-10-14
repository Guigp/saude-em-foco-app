import {
  PICK_NEW_LOCALIZATION,
  GET_USER_LOCALIZATION,
  GET_ALL_COMPLAINTS,
  ADD_NEW_COMPLAINT,
  REMOVE_COMPLAINT,
  UPDATE_NUMBER_CASES_LOCATION
} from "../actions/actionTypes";
import { Dimensions } from "react-native";

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.02,
  longitudeDelta:
    (Dimensions.get("window").width / Dimensions.get("window").height) * 0.02,
  locationName: "",
  numberCasesNearLocation: 0,
  complaints: [],
  radius: 1,
  locationChosen: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PICK_NEW_LOCALIZATION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
        locationName: action.locationName,
        numberCasesNearLocation: action.numberCases,
        locationChosen: true
      };
    case GET_USER_LOCALIZATION:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.1,
        locationChosen: true
      };
    case GET_ALL_COMPLAINTS:
      return {
        ...state,
        complaints: action.complaints
      };
    case ADD_NEW_COMPLAINT:
      const copyComplaints = state.complaints.slice();
      copyComplaints.push(action.complaint);
      const newStateComplaints = copyComplaints;

      return {
        ...state,
        complaints: newStateComplaints
      };
    case REMOVE_COMPLAINT:
      return {
        ...state,
        complaints: state.complaints.filter(complaint => {
          return complaint._id !== action.complaintID;
        })
      };
    case UPDATE_NUMBER_CASES_LOCATION:
      return {
        ...state,
        numberCasesNearLocation:
          action.addOrRemove === "add"
            ? state.numberCasesNearLocation + 1
            : state.numberCasesNearLocation - 1
      };
    default:
      return state;
  }
};
export default reducer;
