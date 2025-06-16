import { Button } from "@/Components/ui/button";
import React, { useEffect, useState } from "react";

import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { motion, useAnimation } from "motion/react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const AuthPage = () => {
  const [toLogin, setToLogin] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [creds, setCreds] = useState({
    username: null,
    password: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("creds :", creds);
  };

  const handleChange = (label: string, e: any) => {
    setCreds((prev) => {
      return {
        ...prev,
        [label]: e.target.value,
      };
    });
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#222]">
      <div className="bg-[#222] flex justify-center items-center  w-[100%]">
        <LoginLeftComponent text={toLogin ? "Login" : "SignUp"} />
        <div className=" flex-1">
          <form
            className="flex justify-center items-center flex-col   gap-3 text-[#fff]"
            style={{
              padding: "10px 20px",
            }}
            onSubmit={handleSubmit}
          >
            <input
              placeholder="Enter Username/Email"
              type="text"
              className=" w-[300px]  p-3 rounded-sm text-sm text-[#000] bg-[#fff]"
              onChange={(e) => {
                handleChange("username", e);
              }}
            />
            <div className="flex justify-between items-center  bg-[#fff]  w-[300px] gap-0.5 rounded-sm p-3">
              <input
                placeholder="Enter Password"
                type={!seePassword ? "password" : "text"}
                className="    flex-1 text-sm text-[#000]"
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
              {/* <Tooltip>
                <TooltipTrigger>
                  <IoAlertOutline />
                </TooltipTrigger>
                <TooltipContent>
                  <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                  </ul>
                </TooltipContent>
              </Tooltip> */}
            </div>

            <Button
              type="submit"
              style={{
                cursor: "pointer",
              }}
              className="text-red-300 hover:underline"
            >
              Submit
            </Button>
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

  const arr = new Array(10).fill(0);

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
            className={`text-6xl mt-3  z-[1] bg-red-400  ${
              currentText.toLowerCase() === "login"
                ? idx % 2 == 0
                  ? "text-end"
                  : "text-start"
                : idx % 2 == 0
                ? "text-start"
                : "text-end"
            } px-2 rounded-r-lg`}
          >
            {/* <motion.div className="text-6xl my-2 relative z-[1] bg-red-400"> */}
            <motion.h1
              key={currentText}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentText}
            </motion.h1>
          </motion.div>
        </div>
      ))}
    </div>
  );
};
