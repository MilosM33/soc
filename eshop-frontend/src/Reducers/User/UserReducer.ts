import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../Api/User/User";

export interface IUserState {
  name: string | null;
  email: string | null;
  token: string | null;
  isAuth: boolean;
  expires: number | null;
  error: string | null;
  role: string | null;
}
const initialState: IUserState = {
  name: null,
  email: null,
  token: null,
  isAuth: false,
  expires: null,
  error: null,
  role: null,
};

const json = localStorage.getItem("user");
/* if (json) {
  const user = JSON.parse(json);
  if (user && user.expires > Date.now()) {
    initialState.token = user.token;
    initialState.expires = user.expires;
    initialState.isAuth = true;
  }
} */
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action: any) => {
      const auth = action.payload.authorisation;
      const user = action.payload.user;

      const name = user.name;
      const email = user.email;

      const token = auth.token;
      const expires = Date.now() + auth.expires_in * 1000;

      state.name = name;
      state.email = email;
      state.isAuth = true;
      state.token = token;
      state.expires = expires;

      // save to local storage
      localStorage.setItem(
        "user",
        JSON.stringify({
          token: token,
          expires: expires,
        })
      );
    },
    setUserData: (state, action: any) => {
      const data = action.payload;
      state.name = data.user.name;
      state.email = data.user.email;
      state.isAuth = data.isAuth;
      state.role = data.user.role;
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.isAuth = false;
      state.token = null;
      state.expires = null;

      // remove from local storage
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout, setUserData } = userSlice.actions;
export const UserReducer = userSlice.reducer;
