import { useEffect, useState } from "react";

const getDeviceType = (width: number) => {
  if (width < 640) return "mobile";
  if (width >= 640 && width < 1024) return "tablet";
  return "desktop";
};

export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(() =>
    getDeviceType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      const newType = getDeviceType(window.innerWidth);
      setDeviceType(newType);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType; // "mobile", "tablet", or "desktop"
};
