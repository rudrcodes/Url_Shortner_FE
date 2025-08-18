"use client";
import  { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useDeviceType } from "@/hooks/useDeviceType";

export const Meteors = ({
  // number = 20,
  className,
}: {
  // number?: number;
  className?: string;
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deviceType = useDeviceType();

  const [currDeviceType, setcurrDeviceType] = useState("");
  const [number, setNumber] = useState(20);

  useEffect(() => {
    if (currDeviceType !== deviceType) {
      setcurrDeviceType(deviceType);

      if (deviceType == "desktop" || deviceType == "tablet") {
        setNumber(20);
      } else {
        setNumber(15);
        //change the number of meteors
      }
    }
  }, [deviceType]);

  return (
    <motion.div className="relative w-full h-full overflow-hidden">
      {windowWidth > 0 &&
        new Array(number).fill(true).map((_, idx) => {
          const position = (idx / number) * windowWidth;
          return (
            <span
              key={idx}
              className={cn(
                "absolute animate-meteor-effect h-0.5 w-0.5 rotate-[45deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
                "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
                className
              )}
              style={{
                top: "-40px",
                left: `${position}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            />
          );
        })}
    </motion.div>
  );
};
