import { useEffect, useState } from "react";

import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { motion, useAnimation } from "motion/react";

import {
  useLoginApiMutation,
  useSignUpApiMutation,
} from "@/store/API/auth.api";
import { useDispatch } from "react-redux";
import { updateUserData } from "@/store/Features/user.slice";
import { updateToast } from "@/store/Features/toast.slice";
import { useDeviceType } from "@/hooks/useDeviceType";
import { useNavigate } from "react-router-dom";
import { Meteors } from "@/Components/ui/meteors";

const AuthPage = () => {
  const [toLogin, setToLogin] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [creds, setCreds] = useState({
    username: null,
    password: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginApiMutation();
  const [signUp] = useSignUpApiMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!creds?.password || !creds?.username) {
        throw new Error("Please enter creds");
      }
      if (!toLogin) {
        //login
        const res: any = await login({
          username: creds.username,
          password: creds.password,
        });

        if (!res?.data?.status?.toString().startsWith(2)) {
          throw new Error(res?.error?.data?.message ?? "Login failed");
        }

        //store this user data in the redux store
        dispatch(
          updateToast({
            message: "Login successful",
            toastType: "success",
            callToast: true,
          })
        );
        dispatch(updateUserData({ userData: res?.data, isLoggedIn: true }));
      } else {
        //signUp
        const res :any= await signUp({
          username: creds.username,
          password: creds.password,
        });

        if (!res?.data?.status?.toString().startsWith(2) || res?.error) {
          throw new Error(res?.error?.message ?? "Signup failed");
        }

        dispatch(
          updateToast({
            message: "Signup successful",
            toastType: "success",
            callToast: true,
          })
        );
      }

      //navigate to the profile page
      navigate("/profile", { replace: true });
    } catch (error: any) {
      dispatch(
        updateToast({
          message: error?.message,
          // message: `${!toLogin ? "Login" : "Signup"} failed`,
          toastType: "error",
          callToast: true,
        })
      );
    }
    //check if is login or signup
  };

  const handleChange = (label: string, e: any) => {
    setCreds((prev) => {
      return {
        ...prev,
        [label]: e.target.value,
      };
    });
  };

  const deviceType = useDeviceType();

  return (
    <div className="relative z-10 h-screen w-screen flex justify-center items-center ">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Meteors />
      </div>
      <div className=" flex justify-center items-center  w-[100%]">
        {deviceType !== "mobile" && (
          <LoginLeftComponent text={toLogin ? "Login" : "SignUp"} />
        )}
        <div className=" flex-1">
          <form
            className="flex justify-center items-center flex-col   gap-3 text-[#fff] "
            style={{
              padding: "10px 20px",
            }}
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Enter Username/Email"
              type="text"
              className=" w-[300px]  p-3 rounded-sm text-sm text-[#000] bg-[#fff] focus:bg-[#fff]"
              onChange={(e) => {
                handleChange("username", e);
              }}
            />
            <div className="flex justify-between items-center  bg-[#fff]  w-[300px] gap-0.5 rounded-sm p-3 focus:bg-[#fff]">
              <input
                placeholder="Enter Password"
                type={!seePassword ? "password" : "text"}
                className="    flex-1 text-sm text-[#000] focus:bg-[#fff]"
                onChange={(e) => {
                  handleChange("password", e);
                }}
              />
              {seePassword ? (
                <IoMdEye
                  color="black"
                  cursor="pointer"
                  onClick={() => {
                    setSeePassword((prev) => !prev);
                  }}
                />
              ) : (
                <IoMdEyeOff
                  color="black"
                  cursor="pointer"
                  onClick={() => {
                    setSeePassword((prev) => !prev);
                  }}
                />
              )}
            </div>

            <motion.button
              type="submit"
              style={{
                cursor: "pointer",
              }}
              className="text-red-400 hover:underline text-lg "
              whileHover={{
                scale: 1.2,
                y: -10,
              }}
              whileTap={{
                scale: 1.2,
                y: -10,
              }}
            >
              <br />
              {!toLogin ? "Login" : "SignUp"}
            </motion.button>
            <hr />
            <p>
              {toLogin ? "Already have an account?" : "Don't have an account?"}

              <span
                style={{
                  cursor: "pointer",
                  margin: "0px 3px",
                }}
                className="hover:underline"
                onClick={() => {
                  setToLogin((prev) => !prev);
                }}
              >
                {toLogin ? "Login" : "SignUp"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

const LoginLeftComponent = ({ text }: { text: string }) => {
  const [currentText, setCurrentText] = useState(text);
  const controls = useAnimation();

  useEffect(() => {
    const animateBar = async () => {
      // Bar starts at right
      await controls.start({
        x: "40vw",
        width: "0px",
        transition: { duration: 0 },
      });

      // Move bar left
      await controls.start({
        x: "0vw",
        width: "100px",
        transition: { duration: 0.5, ease: "easeInOut" },
      });

      // Change the text when bar reaches left
      setCurrentText((prev) => (prev === "Login" ? "SignUp" : "Login"));

      // Move bar back to right
      await controls.start({
        x: "40vw",
        width: "0px",
        transition: { duration: 0.5, ease: "easeInOut" },
      });
    };
    animateBar();
  }, [text]);

  const arr = new Array(7).fill(0);

  return (
    <div className="w-[50%]">
      {arr.map((_, idx) => (
        <div className="h-[60px]" key={idx}>
          {/* <div className="relative h-[50px]" key={idx}> */}
          {/* Yellow bar above the text */}
          {/* <motion.div
            animate={controls}
            initial={{ x: "40vw", width: "200px" }}
            className="bg-yellow-400 h-[50px] absolute top-0 left-0 z-[10]"
          /> */}

          {/* Text below the bar */}
          <motion.div
            className={`text-6xl mt-3  z-[1] bg-red-500  ${
              idx % 2 == 0 ? "text-start" : "text-end"

              // currentText.toLowerCase() === "login"
              //   ? idx % 2 == 0
              //     ? "text-end"
              //     : "text-start"
              //   : idx % 2 == 0
              //   ? "text-start"
              //   : "text-end"
            } px-2 rounded-r-lg`}
          >
            {/* <motion.div className="text-6xl my-2 relative z-[1] bg-red-400"> */}
            <motion.h1
              key={currentText}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentText?.toLowerCase() === "login" ? "Sign-Up" : "Login"}
            </motion.h1>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
