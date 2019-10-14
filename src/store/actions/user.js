import { uiStartLoading, uiStopLoading } from "./index";
import { USER_LOGGED_IN, USER_LOGGED_OUT, UPDATE_USER } from "./actionTypes";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import serverURL from "../../services/serverUrl";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());

    let url = `${serverURL()}/signup`;
    let method = "PUT";
    const email = authData.email;
    const password = authData.password;
    const name = authData.name;
    let body = {
      email: email,
      password: password,
      name: name
    };

    if (authMode === "login") {
      url = `${serverURL()}/login`;
      method = "POST";
      body = { email: email, password: password };
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error();
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then(resData => {
        dispatch(uiStopLoading());
        axios.defaults.headers.common[
          "Authorization"
        ] = `bearer ${resData.token}`;

        dispatch(updateStorageUserData(resData));
      })
      .catch(err => {
        Alert.alert("Ocorreu um erro, tente de novo!");
        dispatch(uiStopLoading());
      });
  };
};

//armazena dados do usuario no storage
export const updateStorageUserData = resData => {
  return dispatch => {
    const now = new Date();
    const expiresIn = now.getTime() + resData.expiresIn * 1000;

    dispatch(updateReduxUserData(resData, expiresIn));
    const data = {
      _id: resData._id,
      name: resData.name,
      email: resData.email,
      token: resData.token,
      genre: resData.genre ? resData.genre : null,
      avatar: resData.avatar ? resData.avatar : null,
      expiresIn: expiresIn.toString()
    };

    AsyncStorage.setItem("userData", JSON.stringify(data));
  };
};

export const updateReduxUserData = (resData, expiresIn) => {
  return {
    type: USER_LOGGED_IN,
    _id: resData._id,
    name: resData.name,
    email: resData.email,
    token: resData.token,
    genre: resData.genre ? resData.genre : null,
    avatar: resData.avatar ? resData.avatar : null,
    expiresIn: expiresIn
  };
};

export const userGetToken = () => {
  return (dispatch, getState) => {
    return (promise = new Promise(async (resolve, reject) => {
      const token = getState().user.token;
      const expiresIn = getState().user.expiresIn;

      if (!token || new Date(expiresIn) <= new Date()) {
        //se o token do redux estiver vencido, tenta trocar por outro antes de dar erro
        let fetchedToken;
        //se não achar o token procura na storage, se tb não achar rejeita o pedido
        await AsyncStorage.getItem("userData")
          .then(json => {
            return JSON.parse(json) || {};
          })

          .catch(err => reject())
          .then(async dataFromStorage => {
            if (!dataFromStorage) {
              //aqui rejeita se não tiver o token
              reject();
              return;
            }
            //mesmo que tenha token, verifica se ainda é válido
            return await AsyncStorage.getItem("userData");
          })
          .then(data => {
            const json = JSON.parse(data);
            fetchedToken = json.token;
            const aux = json.expiresIn;
            const parsedExpiryDate = new Date(parseInt(aux));
            const now = new Date();

            if (parsedExpiryDate > now) {
              dispatch(updateReduxUserData(json, parsedExpiryDate));
              resolve(fetchedToken);
            } else {
              dispatch(authLogout()); //se o token estiver vencido,sai do app
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    }));
  };
};

export const tryAutoLogin = () => {
  return dispatch => {
    dispatch(userGetToken())
      .then(token => {
        if (token) return true;
      })
      .catch(err => {
        return false;
      });
  };
};

export const userClearStorage = () => {
  return dispatch => {
    return AsyncStorage.removeItem("userData");
  };
};

export const authLogout = () => {
  return dispatch => {
    dispatch(userClearStorage());
    dispatch(updateUserLogout());
  };
};

export const updateUserLogout = () => {
  return {
    type: USER_LOGGED_OUT
  };
};
export const updateUser = user => {
  return {
    type: UPDATE_USER,
    user: user
  };
};
