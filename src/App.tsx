import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { AppRoutes } from "./Routes";
import AnimatedCursor from "react-animated-cursor";

import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./utils";
import { updateConfetti } from "./store/Features/toast.slice";

function App() {
  const { width, height } = useWindowSize();

  const showConfetti = useAppSelector((state) => state?.toast.showConfetti);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("showConfetti:", showConfetti);
    if (showConfetti) {
      //timer chlao and then utne timer ke baad showConfetti false krdo

      setTimeout(() => {
        dispatch(updateConfetti(false));
      }, 8000);
    }
  }, [showConfetti]);

  return (
    <div className="relative flex justify-start items-center bg-[] h-screen w-screen flex-col bg-[#0a100d]">
      {/* <CustomCursor /> */}

      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} />
      )}

      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        outerStyle={{
          border: "3px solid  rgba(255, 0, 0, 0.6)",
        }}
        innerStyle={{
          backgroundColor: "rgba(255, 0, 0, 1)",
        }}
      />

      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
