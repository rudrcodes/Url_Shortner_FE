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
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const [shortenUrl] = useShortenUrlMutation();

  const [hashedUrl, setHashedUrl] = useState<string | null>(null);

  const customUrlValidation = (url: string) => {
    const urlRegex =
      /^(https?:\/\/)?((localhost|(\d{1,3}\.){3}\d{1,3}|[\w-]+(\.[\w-]+)+))(:\d+)?(\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)?$/i;

    if (urlRegex.test(url)) {
      setError(null);
    } else {
      setError("Please enter a valid url");
    }
  };
  // const customUrlValidation = (url: string) => {
  //   if (url) {
  //     if (url.startsWith("http://") || url.startsWith("https://")) {
  //       //check if there is anything after this
  //       if (url.startsWith("http://")) {
  //         const urlArr = url.split('http://');

  //         //check if the link containes more than 1 http:// or more

  //       }
  //       if (url.startsWith("https://")) {
  //         const urlArr = url.split("https://");
  //       }
  //       setError(null);
  //     } else {
  //       setError("Please enter a valid url");
  //     }
  //   } else {
  //     setError(null);
  //   }
  // };

  const dispatch = useAppDispatch();
  const handleShortenUrl = async (url: string | null) => {
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
      const res:any = await shortenUrl({
        url,
      });

      if (res?.data?.status !== 200) {
        throw new Error("Error in shortening url");
      }

      setHashedUrl(res?.data?.data);

      dispatch(updateConfetti(true));

      dispatch(
        updateToast({
          message: "URL shortened successfully",
          toastType: "success",
          callToast: true,
        })
      );
    } catch (error) {
      console.log("error: ", error);

      dispatch(
        updateToast({
          message: "Error in shortening url",
          toastType: "error",
          callToast: true,
        })
      );
    }
  };
  const handleOnFocus = (val: boolean) => {
    setIsFocus(val);
  };
  return (
    <section
      className=" h-full w-full text-[#fff]  text-center flex justify-start items-center  pt-10 flex-col gap-2  "
      // className={`flex-1 h-full  text-center flex justify-center items-center  flex-col gap-2 bg-[#24272B]`}
    >
      <div className="    w-[100%] text-center flex justify-center items-center  flex-col gap-8 ">
        <div className="    w-[100%] text-center flex justify-center items-center  flex-col gap-1 ">
          <div className="  w-full flex justify-center items-center   ">
            <input
              onFocus={() => handleOnFocus(true)}
              onBlur={() => handleOnFocus(false)}
              style={{
                boxShadow: isFocus
                  ? "4px 4px 12px 2px rgba(255,255,255,0.5)"
                  : "4px 3px 12px 2px rgba(255,255,255,0.3)",
              }}
              className="text-sm px-5 py-3 rounded-md w-[60%] bg-inherit  focus:shadow-3xl placeholder:text-[#e5e5e5b7]"
              placeholder="Enter URL here..."
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
              className=" px-3 py-1 rounded-sm cursor-pointer hover:scale-200 duration-200 delay-100 ease-in-out  "
              onClick={() => {
                handleShortenUrl(url);
              }}
            >
              <BsMagic
                size="14px"
                className={` text-red-500 hover:text-amber-400`}
              />
              {/* shorten it  Shorten it Shorten It*/}
            </motion.button>
          </div>
          {error && <p className="text-[#ba181b] text-sm">{error}</p>}
        </div>

        <OutputArea hashedUrl={hashedUrl} />
      </div>
    </section>
  );
};

export default UrlShortenArea;
