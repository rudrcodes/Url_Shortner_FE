import type { AppDispatch, RootState } from "@/store/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const debounce = (fn: any) => {
  console.log("debounce it : ", fn);
};
