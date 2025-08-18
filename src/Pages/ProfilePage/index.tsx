import { useDeviceType } from "@/hooks/useDeviceType";
import { useLazyGetAllLinksQuery } from "@/store/API/other.api";
import { updateToast } from "@/store/Features/toast.slice";
import { useAppDispatch, useAppSelector } from "@/utils";
import  { useEffect, useState } from "react";

const ProfilePage = () => {
  const userData = useAppSelector((state) => state.user);
  const [allLinks, setAllLinks] = useState<any>([]);
  const dispatch = useAppDispatch();
  console.log("userData: ", userData);
  // const [defaultSearch, setDefaultSearch] = useState("");

  const [getAllLinks] = useLazyGetAllLinksQuery();

  const fetchAllLinks = async () => {
    try {
      const res: any = await getAllLinks({}).unwrap();
      console.log("fetchAllLinks res:", res);
      setAllLinks(res?.data ?? []);
    } catch (error: any) {
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

  // const searchFunc = (text: string) => {
  //   console.log(text);

  //   //apply debouncing here , that is will not call the api on each input , only once after the last input
  // };

  const username = userData?.userData?.data?.username?.toUpperCase();
  const userInitials = userData?.userData?.data?.username
    ?.split(" ")
    ?.map((word: any) => {
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
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold underline">
            All Urls :{" "}
          </h1>
          {/* <input
            className={`p-2 border-b-2 w-[50%] ${
              deviceType === "desktop" ? "w-[50%]" : "w-full"
            }`}
            placeholder="Search by"
            value={defaultSearch}
            onChange={(e) => {
              setDefaultSearch(e?.target?.value);

              searchFunc(e.target.value);
            }}
          /> */}
          {/* <select className="border rounded-md px-2 py-1">
            <option value="">Select filter</option>
            <option value="someOption">Some option</option>
            <option value="otherOption">Other option</option>
          </select> */}
          {allLinks?.map(
            (link: {
              originalUrl: string;
              url: string;
              clickCount: number;
              _id: any;
            }) => {
              return (
                <div className="flex justify-between items-start w-[80%] py-3 pl-4  border-b-1">
                  <div className="flex justify-center ite`ms-start     flex-col">
                    <ul style={{ listStyleType: "circle" }}>
                      <li>
                        <label className="text-xs text-black bg-white rounded-sm py-0.5 px-0.5 mr-1">
                          Short Url :{" "}
                        </label>
                        <a
                          className="text-xs hover:text-blue-500 hover:underline"
                          href={link.url}
                          target="_blank"
                        >
                          {link?.url?.length > 100
                            ? link.url.substring(0, 80) + "..."
                            : link.url}
                        </a>
                      </li>
                      <li>
                        <label className="text-xs text-black bg-white rounded-sm py-0.5 px-0.5 mr-1">
                          Original Url :{" "}
                        </label>
                        <a
                          className="text-xs hover:text-blue-500 hover:underline"
                          href={link.originalUrl}
                          target="_blank"
                        >
                          {link?.originalUrl?.length > 80
                            ? link.originalUrl.substring(0, 100) + "..."
                            : link.originalUrl}
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* <p className="text-xs">Clicked : {link.clickCount}</p> */}
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
