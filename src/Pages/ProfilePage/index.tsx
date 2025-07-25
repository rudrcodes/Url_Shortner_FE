import { useDeviceType } from "@/hooks/useDeviceType";
import { useLazyGetAllLinksQuery } from "@/store/API/other.api";
import { updateToast } from "@/store/Features/toast.slice";
import { debounce, useAppDispatch, useAppSelector } from "@/utils";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const userData = useAppSelector((state) => state.user);
  const [allLinks, setAllLinks] = useState<any>([]);
  const dispatch = useAppDispatch();
  console.log("userData: ", userData);
  const [defaultSearch, setDefaultSearch] = useState("");

  const [getAllLinks, { isLoading, isFetching, isSuccess }] =
    useLazyGetAllLinksQuery();

  const fetchAllLinks = async () => {
    try {
      const res: {
        data: any;
        message: string;
        status: number;
      } = await getAllLinks({}).unwrap();
      console.log("fetchAllLinks res:", res);
      setAllLinks(res?.data ?? []);
    } catch (error) {
      dispatch(
        updateToast({
          callToast: true,
          message: "Error in getting Shortened Links",
          toastType: "error",
        })
      );
    }
  };

  useEffect(() => {
    fetchAllLinks();
  }, []);
  // const [defaultSearch, setDefaultSearch] = useState("Moving test here");

  const deviceType = useDeviceType();

  // NOTE: Can search by URL or name
  /*
  ${
          deviceType != "laptop" ? "flex-col" : "flex-row"
        }
  */

  const searchFunc = (text: string) => {
    console.log(text);

    //apply debouncing here , that is will not call the api on each input , only once after the last input
  };

  const username = userData?.userData?.data?.username;
  const userInitials = userData?.userData?.data?.username
    ?.split(" ")
    ?.map((word) => {
      return word.slice(0, 1)?.toUpperCase();
    })
    ?.join(" ");

  // const debounceSearch = debounce(searchFunc);
  return (
    <section className="h-screen w-screen flex justify-center items-center   text-[#fff]">
      <div
        className={`flex justify-center items-center   h-full w-[96%] gap-4 ${
          deviceType === "desktop" ? "flex-row" : "flex-col"
        } `}
      >
        <div
          className={`   flex justify-center
          items-start  ${deviceType === "desktop" ? "w-[25vw]" : "w-full"} ${
            deviceType === "desktop" ? "h-full" : ""
          } 
          border-dotted
          ${deviceType === "desktop" ? "border-r-2" : "border-b-2"}
        
          `}
        >
          <div
            className={`flex justify-center items-center gap-3  p-3
             ${deviceType === "desktop" ? "flex-col" : "flex-row"}`}
          >
            <div
              className={`border rounded-full h-30 w-30   flex justify-center items-center text-3xl`}
            >
              {userInitials}
            </div>
            <p>{username}</p>
          </div>
        </div>
        <div
          className={`w-full flex-1  ${
            deviceType === "desktop" ? "h-full" : ""
          } `}
        >
          <input
            className={`p-2 border-b-2 w-[50%] ${
              deviceType === "desktop" ? "w-[50%]" : "w-full"
            }`}
            placeholder="Search by"
            value={defaultSearch}
            onChange={(e) => {
              setDefaultSearch(e?.target?.value);

              searchFunc(e.target.value);
            }}
          />
          {/* <select className="border rounded-md px-2 py-1">
            <option value="">Select filter</option>
            <option value="someOption">Some option</option>
            <option value="otherOption">Other option</option>
          </select> */}
          {allLinks?.map(
            (link: { url: string; clickCount: number; _id: any }) => {
              return (
                <div className="flex justify-between items-center w-[80%] py-3  border-b-1">
                  <a
                    className="text-xs hover:text-blue-500 hover:underline"
                    href={link.url}
                    target="_blank"
                  >
                    {link?.url?.length > 50
                      ? link.url.substring(0, 20) + '...'
                      : link.url}
                  </a>
                  <p className="text-xs">Clicked : {link.clickCount}</p>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
