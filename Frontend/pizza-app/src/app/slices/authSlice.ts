import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  client_id: string;
  client_name: string;
}

const initialState: AuthState = {
  isLogin: false,
  client_id: "",
  client_name: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogInUser: (state) => {
      state.isLogin = true;
    },
    UpdateClientData: (
      state,
      action: PayloadAction<{ client_name: string; client_id: string }>
    ) => {
      console.log(action.payload);
      state.isLogin = true;
      state.client_name = action.payload.client_name;
      state.client_id = action.payload.client_id;
    },
    LogOutUser: (state) => {
      state.isLogin = false;
      state.client_name = "";
      state.client_id = "";
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
