import { useLazyGetOriginalUrlQuery } from "@/store/API/other.api";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HashedUrlPage = () => {
  // NOTE: Tried the redicret logic and it's working, the below is the mock representation of that , will replace it with the actual DB call

  const [getUrlFromDBFunc, { isLoading, isError }] =
    useLazyGetOriginalUrlQuery();
  //Imitating the DB here
  const getUrlFromDB = async (hashedUrl: string) => {
    // search for this link in the users db and then update the link document
    if (hashedUrl === "") {
      return null;
    }
    try {
      console.log("arg hashedUrl: ", hashedUrl);

      const res: any = await getUrlFromDBFunc({
        hashedUrl,
      });

      if (res?.data?.status !== 200) {
        throw new Error("Error in fetching the url");
      } else if (res?.data?.status == 200) {
        setRedirectUrlExists(true);
        setUrlToRedirect(res?.data?.data);

        window.location.href = res?.data?.data;

        return res?.data?.data;
      }
    } catch (error) {
      setRedirectUrlExists(false);
      console.log("error: ", error);
      return null;
    }
    // const obj: Record<string, any> = {
    //   "1234567890": {
    //     url: "https://www.youtube.com",
    //     hashedUrl: "1234567890",
    //   },
    // };

    // console.log("obj[hashedUrl]: ", obj[hashedUrl]);
    // return obj[hashedUrl];
  };
  const location = useLocation().pathname;

  console.log("location outside: ", location);

  const [redirectUrlExists, setRedirectUrlExists] = useState(false);
  const [urlToRedirect, setUrlToRedirect] = useState("");

  useEffect(() => {
    console.log("location: ", location);
    const hashedUrl = location?.split("/").pop() || "";
    console.log("hashedUrl: ", hashedUrl);

    if (hashedUrl) {
      getUrlFromDB(hashedUrl);
    }
  }, [location]);

  // useEffect(() => {
  //   console.log("location changed: ", location);
  //   const hashedUrl = location?.split("/").pop() || "";
  //   getUrlFromDB(hashedUrl);

  //   // getUrlFromDB(hashedUrl)
  //   //   .then((res: any) => {
  //   //     setRedirectUrlExists(true);
  //   //     setUrlToRedirect(res?.url);
  //   //     window.location.href = res?.url;
  //   //   })
  //   //   .catch(() => {
  //   //     setRedirectUrlExists(false);
  //   //   });
  // }, [location]);

  //will fetch the urlhash from the location (url) here and then fill redirect it from here to that original URL
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error in fetching the url</div>}

      {redirectUrlExists ? (
        <div>Redirecting......</div>
      ) : (
        <div>No URL found</div>
      )}
    </div>
  );
};

export default HashedUrlPage;
