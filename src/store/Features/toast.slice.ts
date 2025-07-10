import { createSlice } from "@reduxjs/toolkit";
import type { TypeOptions } from "react-toastify";

interface IToast {
  message: string;
  toastType: TypeOptions | undefined;
  callToast: boolean;
  showConfetti?: boolean;
}

const initialState: IToast = {
  message: "",
  toastType: undefined,
  callToast: false,
  showConfetti: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    updateToast: (state: typeof initialState, action: { payload: IToast }) => {
      state.message = action.payload.message;
      state.toastType = action.payload.toastType;
      state.callToast = action.payload.callToast;
    },
    updateConfetti: (state, action) => {
      state.showConfetti = action.payload;
    },
  },
});
//export the reducer itself

const { reducer } = toastSlice;

//export actions
const { updateToast, updateConfetti } = toastSlice.actions;

export { reducer as toastSliceReducer, updateToast, updateConfetti };
