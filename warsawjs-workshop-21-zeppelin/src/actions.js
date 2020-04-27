import * as actionTypes from "./actionTypes";
import { createAction } from "redux-actions";
import * as api from "./api";
//redux thunk pozwala na robienie funkcji jako akcji do dispactch

const startLogin = createAction(actionTypes.LOGIN_START); //tutaj definiuję jaka akcje zostanie wywołana do dispatch
const endLogin = createAction(actionTypes.LOGIN_END);

export function login({username, password}) {
  return (dispatch, getState) => {
    dispatch(startLogin());
    return api
      .login({ username, password })
      .then(data => {
        if (data.ok) {
          dispatch(endLogin({ username: data.username }));
        } else {
          dispatch(endLogin(new Error(data.errors.join("/n"))));
        }
      })
      .catch(err => {
        dispatch(endLogin(new Error("network error")));
      });
  };
}
export const logout = createAction(actionTypes.LOGOUT);
//kreatory akcji
