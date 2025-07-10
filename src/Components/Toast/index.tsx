import { updateToast } from "@/store/Features/toast.slice";
import { useAppDispatch, useAppSelector } from "@/utils";
import { useEffect } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

// type TToastType = "success" | "error" | "warning" | "info";

// interface ITtoastContainer {
//   message: string;
//   toastType: TToastType;
// }
const ToastComp = () => {
  const notify = () =>
    toast(`${toastState.message}`, {
      type: toastState.toastType,
    });

  const toastState = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toastState.callToast) {
      notify();

      dispatch(
        updateToast({
          message: "",
          toastType: undefined,
          callToast: false,
        })
      );
    }
  }, [toastState.callToast]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
};

export default ToastComp;
