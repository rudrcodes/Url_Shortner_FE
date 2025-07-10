import { useState } from "react";
import { motion } from "motion/react";
import OutputArea from "./OutputArea";
import { useShortenUrlMutation } from "@/store/API/other.api";
import { useAppDispatch } from "@/utils";
import { updateConfetti, updateToast } from "@/store/Features/toast.slice";
import { BsMagic } from "react-icons/bs";

const UrlShortenArea = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [shortenUrl, { isLoading, isError, isFetching, isSuccess }] =
    useShortenUrlMutation();

  const [hashedUrl, setHashedUrl] = useState<string | null>(null);

  const customUrlValidation = (url: string) => {
    if (url) {
      console.log("url: ", url);
      if (url.startsWith("http://") || url.startsWith("https://")) {
        setError(null);
      } else {
        setError("Please enter a valid url");
      }
    } else {
      setError(null);
    }
  };

  const dispatch = useAppDispatch();
  const handleShortenUrl = async (url: string | null) => {
    console.log("url: ", url);
    // - call the api to shorten the url
    // - save it in the database
    // - give them the option to copy the short url
    // - give them the option to delete the short url
    // - give them the option to edit the short url
    // - give them the option to view the short url

    if (error || !url) {
      dispatch(
        updateToast({
          callToast: true,
          message: "Invalid URL",
          toastType: "error",
        })
      );
      return;
    }

    try {
      const res = await shortenUrl({
        url,
      });

      console.log("handleShortenUrl res: ", res);

      if (res?.data?.status !== 200) {
        throw new Error("Error in shortening url");
      }

      setHashedUrl(res?.data?.data);
      console.log("res: ", res);

      dispatch(updateConfetti(true));

      dispatch(
        updateToast({
          message: "URL shortened successfully",
          toastType: "success",
          callToast: true,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        updateToast({
          message: "Error in shortening url",
          toastType: "error",
          callToast: true,
        })
      );
    }
  };
  return (
    <section
      className=" h-full w-full text-[#fff]  text-center flex justify-start items-center  pt-10 flex-col gap-2  "
      // className={`flex-1 h-full  text-center flex justify-center items-center  flex-col gap-2 bg-[#24272B]`}
    >
      <div className="    w-[100%] text-center flex justify-center items-center  flex-col gap-5 ">
        <div className="    w-[100%] text-center flex justify-center items-center  flex-col gap-1 ">
          <div className="  w-full flex justify-center items-center   ">
            <input
              style={{
                boxShadow: "4px 2px 20px 1px rgba(0,0,0,0.3)",
              }}
              className="text-sm px-5 py-3 rounded-md w-[60%] bg-inherit border-[#f1faee] border-[1px]  focus:shadow-3xl placeholder:text-[#fff]"
              placeholder="Input here..."
              type="text"
              value={url ? url : ""}
              onChange={(e) => {
                customUrlValidation(e.target.value);
                setUrl(e.target.value);
              }}
            />

            <motion.button
              whileTap={{
                scale: "0.5",
                transition: { duration: 300, delay: 300, ease: "easeInOut" },
              }}
              className=" px-3 py-1 rounded-sm cursor-pointer hover:scale-125 duration-200 delay-100 ease-in-out  "
              onClick={() => {
                handleShortenUrl(url);
              }}
            >
              <BsMagic size="14px" color="red" />
              {/* shorten it */}
            </motion.button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <OutputArea hashedUrl={hashedUrl} />
      </div>
    </section>
  );
};

export default UrlShortenArea;
