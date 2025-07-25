import React from "react";
import { motion } from "motion/react";
import { BsCopy } from "react-icons/bs";
import { useAppDispatch } from "@/utils";
import { updateToast } from "@/store/Features/toast.slice";

interface IOutputArea {
  hashedUrl: string | null;
}

const OutputArea = (props: IOutputArea) => {
  const { hashedUrl } = props;
  const dispatch = useAppDispatch();

  const copyText = () => {
    if (hashedUrl) {
      navigator.clipboard.writeText(hashedUrl);
      dispatch(
        updateToast({
          callToast: true,
          message: "Copied to clipboard",
          toastType: "success",
        })
      );
    } else {
      dispatch(
        updateToast({
          callToast: true,
          message: "HashedUrl not found",
          toastType: "error",
        })
      );
    }
  };

  return (
    <div className="flex flex-col  gap-3 w-[100%]    ">
      <div className="  w-[full] flex justify-center items-center  ">
        <div
          // value={hashedUrl ?? ""}
          // placeholder="output here..."
          style={{
            boxShadow: "4px 2px 20px 1px rgba(0,0,0,0.3)",
          }}
          className="text-sm px-5 py-3 rounded-md w-[60%] bg-inherit border-[#f1faee] border-[1px]  focus:shadow-3xl text-start"
        >
          {hashedUrl ? hashedUrl : "Output here..."}
        </div>
        <motion.button
          // whileHover={{
          //   scale: "2",
          //   transition: { duration: 200, delay: 150, ease: "easeIn" },
          // }}
          className=" px-3 py-1 rounded-sm cursor-pointer hover:scale-200  duration-200 delay-100 ease-in-out "
          onClick={() => {
            // handleShortenUrl(url);
            copyText();
          }}
        >
          <BsCopy size="14px"  className="text-red-500 hover:text-amber-400" />
        </motion.button>
      </div>
    </div>
  );
};

export default OutputArea;
