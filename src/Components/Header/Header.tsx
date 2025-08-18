import { Meteors } from "../ui/meteors";
import style from "./index.module.css";
import { motion } from "motion/react";
const Header = () => {
  return (
    <section className="relative z-10 flex justify-center items-center flex-col gap-3 h-[100%]">
      {/* <section className="relative  flex justify-end items-center flex-col gap-3  h-full "> */}
      {/* Motion Div behind */}
      {/* <motion.div
        animate={{
          scale: [1, 2, 3, 2, 1],
          borderRadius: ["100%", "100%", "100%", "100%", "100%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="absolute z-0 w-[300px] h-[300px] bg-[#FF2C55] rounded-full flex justify-center items-center blur-3xl"
        // className="absolute z-0 w-[300px] h-[300px] bg-[#89FC00] rounded-full flex justify-center items-center blur-3xl"
      >
        <motion.div
          animate={{
            scale: [0, 1, 2, 1, 0],
            borderRadius: ["100%", "100%", "100%", "100%", "100%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.1, 0.2, 0.4, 0.8],
            repeat: Infinity,
            repeatDelay: 0,
          }}
          className=" z-0 w-[30px] h-[30px] bg-[#121212] rounded-full "
        ></motion.div>
      </motion.div> */}

      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Meteors />
      </div>

      {/* Text Content */}
      <motion.h1
        className={`z-10 ${style.mainHead2} text-[#fefae0] lg:text-8xl md:text-6xl text-4xl font-bold`}
      >
        Size Matters
      </motion.h1>

      <div
        className={`z-10 ${style.secondaryHead1} text-[#FFFEFE]  flex gap-2`}
      >
        {/* Tiny Links */}
        <div className="relative inline-block overflow-hidden">
          {/* Text */}
          <motion.p className="relative z-10 lg:text-2xl md:text-xl text-md text-white font-semibold">
            Tiny Links
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
              bounce: "spring",
            }}
            className="absolute bottom-0 h-[10px] w-full bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
          />
        </div>

        {/* Dot */}
        <motion.span className="text-red-500">.</motion.span>

        {/* Mighty Impact */}
        <div className="relative inline-block overflow-hidden">
          {/* Text */}
          <motion.p className="relative z-10 lg:text-2xl md:text-xl text-md text-white font-semibold">
            Mighty Impact
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
      </div>
    </section>
  );
};

export default Header;
