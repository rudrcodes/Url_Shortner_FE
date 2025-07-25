import style from "./navbar.module.css";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <nav className={`${style.navbar} bg-red-800`}>
      <motion.div
        className={`${style.logo} text-sm font-bold cursor-pointer text-[#f1faee]`}
        whileTap={{
          scale: 0.8,
        }}
      >
        © 2025 | Rudransh Aggarwal
      </motion.div>
      <motion.div
        className={`${style.logo} text-sm font-bold cursor-pointer text-[#f1faee] hover:underline`}
        onClick={() => {
          window.open(
            "https://rudranshaggarwal.netlify.app/",
            "_blank",
            "noopener,noreferrer"
          );
        }}
        whileTap={{
          scale: 0.8,
        }}
      >
        Visit Author
      </motion.div>
    </nav>
  );
};

export default Footer;
