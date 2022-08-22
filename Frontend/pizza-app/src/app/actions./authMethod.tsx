import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import authSlice, { authActions } from "../slices/authSlice";
import axios, { AxiosError, AxiosResponse } from "axios";

interface loginUser {
  name: string;
  email: string;
  mobile_no: string;
  password: string;
}

const URL = `http://localhost:4000/auth`;

export const RegisterUser = (
  REG_REQ_BODY: loginUser
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    console.log("Inside the function");
    axios
      .post(`${URL}/register`, REG_REQ_BODY)
      .then((result: AxiosResponse) => {
        console.log(result);
        const data = result.data.data;
        console.log(data);
        dispatch(
          authActions.UpdateClientData({
            client_name: data.name,
            client_id: data.user_id,
          })
        );
      })
      .catch((err: AxiosError) => {
        console.log(err);
      });
  };
};
