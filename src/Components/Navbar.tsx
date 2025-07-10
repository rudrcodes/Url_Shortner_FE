import { useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import { motion } from "motion/react";
import { useState } from "react";
import { useAppSelector } from "@/utils";

const Navbar = () => {
  const navList = [
    {
      label: "Login/SignUp",
      navigateTo: "/auth",
      isLoggedIn: false,
    },
    {
      label: "Profile",
      navigateTo: "/profile",
      isLoggedIn: true,
    },
  ];

  const { isLoggedIn } = useAppSelector((state) => state.user);

  const [hovered, setHovered] = useState(false);
  const [indexHovered, setIndexHovered] = useState(0);

  //NOTE: get from Redux Store if the user is logged in or not , then show the Profile button accordingly
  const navigate = useNavigate();
  return (
    // <nav className="flex justify-between items-center bg-[##fff] w-[100vw] px-4">
    <nav className={style.navbar}>
      <motion.div
        className={`${style.logo} text-2xl font-bold  text-[#fff]`}
        onClick={() => {
          navigate("/");
        }}
        whileTap={{
          scale: 0.8,
        }}
        whileHover={{
          scale: 1.2,
        }}
      >
        MiniMe
      </motion.div>
      <div className="flex justify-around items-center  gap-10">
        {navList.map((item, index) => {
          return (
            <motion.div
              key={item.label}
              onClick={() => {
                navigate(item.navigateTo);
              }}
              // style={{
              //   cursor: "pointer",
              // }}
              // className="text-[#fff] border-none   hover:text-shadow-white"
              whileHover={{
                scale: 1.2,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onMouseEnter={() => {
                setHovered(true);
                setIndexHovered(index);
              }}
              onMouseLeave={() => setHovered(false)}
              style={{
                transition: "all 0.2s ease",
                // cursor: "pointer",
                textShadow:
                  hovered && index === indexHovered
                    ? "3px 3px 5px rgba(255,255,255,1)"
                    : "none",
                color: "#fff",
              }}
            >
              {item.label}
            </motion.div>
          );
        })}
        {/* <Login />
        <SignUp /> */}
      </div>
    </nav>
  );
};

export default Navbar;
