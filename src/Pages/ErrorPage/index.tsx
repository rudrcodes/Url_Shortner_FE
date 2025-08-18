import style from "./index.module.css";
import { FaLongArrowAltLeft } from "react-icons/fa";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`${style.font_style} lg:text-3xl md:text-xl sm:text-md text-[#fefae0] h-screen flex justify-center items-start flex-col p-4 `}
    >
      <div className="relative inline-block overflow-hidden">
        {/* Text */}
        <motion.p className="relative z-10 text-2xl text-[#f8f9fa] font-semibold">
          404 - Well, This is Awkward...
        </motion.p>

        {/* Base underline (subtle gray line) */}
        <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-600 opacity-0 rounded" />

        {/* Glowing red moving segment */}
        <motion.div
          animate={{ x: ["-100%", "120%"] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute bottom-0 h-[10px] w-full bg-[#D11149] rounded-full "
        />
      </div>

      <p>Looks like you’ve wandered off the map.</p>
      <p>This page took a vacation or never existed at all.</p>
      <p>
        But hey, while you're here, want a cookie? 🍪 (Just kidding, we’re all
        out.)
      </p>
      <div className="flex justify-center items-start gap-4 mt-4 ">
        <motion.button
          className={`${style.font_style}  text-xl font-bold cursor-pointer text-[#00b4d8] hover:underline text-start`}
          onClick={() => {
            navigate("/", { replace: true });
          }}
          whileTap={{
            scale: 0.8,
          }}
        >
          Take me home before I break the internet
        </motion.button>

        <motion.div
          animate={{ x: [-10, 10] }}
          transition={{
            duration: 1, // total time for one left-to-right
            repeat: Infinity, // keep looping
            repeatType: "mirror", // goes back and forth
            ease: "easeInOut", // smooth easing
          }}
        >
          <FaLongArrowAltLeft fontSize="24px" />
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
