import { createSlice } from "@reduxjs/toolkit";
import store from "../store";
import { UserAuth } from "../User/UserAuth";

let initialState = {
  name: "",
  loggedIn: false,
};

if (UserAuth.isLoggedIn()) {
  UserAuth.me().then((res) => {
    store.dispatch(login(res));
  });
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      return {
        ...state,
        ...action.payload,
        loggedIn: true,
      };
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
