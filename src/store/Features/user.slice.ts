import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  isLoggedIn: boolean;
  userData: any;
}

const initialState: IUser = {
  isLoggedIn: false,
  userData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
//export the reducer itself

const { reducer } = userSlice;

//export actions
const { updateUserData } = userSlice.actions;

export { reducer as userSliceReducer, updateUserData };
