import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import pickedLocalizationReducer from "./reducers/pickedLocalization";
import userReducer from "./reducers/user";
import uiReducer from "./reducers/ui";
import hospitalsReducer from "./reducers/hospitals";
import commentsReducer from "./reducers/comments";

const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  pickedLocalization: pickedLocalizationReducer,
  hospitals: hospitalsReducer,
  comments: commentsReducer
});

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)));
};

export default storeConfig;
