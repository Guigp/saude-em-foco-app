import {
  GET_HOSPITALS,
  GET_INDICATIONS,
  UPDATE_WAITING_TIME,
  UPDATE_HOSPITAL_NUMBER_COMMENTS
} from "../actions/actionTypes";

const initialState = {
  hospitals: [],
  indications: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOSPITALS:
      return {
        ...state,
        hospitals: action.allHospitals
      };
    case GET_INDICATIONS:
      const newArrayWithIndications = state.hospitals.map((hospital, index) => {
        return {
          ...hospital,
          infoIndication: action.indications.find(indication => {
            if (hospital._id === indication.hospitalId) {
              return {
                distance: indication.distance,
                duration: indication.duration,
                flag: indication.flag
              };
            }
          })
        };
      });

      return {
        ...state,
        hospitals: newArrayWithIndications,
        indications: true
      };
    case UPDATE_HOSPITAL_NUMBER_COMMENTS:
      const newArray = state.hospitals.map((item, index) => {
        if (item._id === action.hospitalId) {
          if (action.operation === "plus") {
            return { ...item, comments: item.comments + 1 };
          } else {
            return { ...item, comments: item.comments - 1 };
          }
        } else return { ...item };
      });

      return {
        ...state,
        hospitals: newArray
      };

    case UPDATE_WAITING_TIME:
      const newArray2 = state.hospitals.map(hospital => {
        if (hospital._id === action.hospitalId) {
          return {
            ...hospital,
            waitingTime: action.waitingTime,
            contributions: action.contributions
          };
        } else {
          return { ...hospital };
        }
      });
      return {
        ...state,
        hospitals: newArray2
      };

    default:
      return state;
  }
};

export default reducer;
