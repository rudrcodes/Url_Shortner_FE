import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { store } from "../store";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { storageService } from "@/storage.service";
import { STORAGE_CONST } from "@/Constants/storage";
import { BASE_URL } from "@/Constants/endpoints";

// import { FOUNDATION_URL, PRIME_PLVC_URL, STORAGE_CONSTANTS } from "Constants";

export const getDefaultHeaders = (token?: string) => {
  const tempHeaders = {
    "Content-Type": "application/json",
    Source: "Web",
    Lang: "EN",
    origin: window.location.origin,
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  };
  if (token) {
    return {
      ...tempHeaders,
      Authorization: `Token ${token}`,
    };
  }
  return tempHeaders;
};

export const getFileHeaders = (token: string) => {
  const tempHeaders = {
    "Content-Type": "multipart/form-data",
    // Source: 'Web',
    // Lang: 'EN',
    origin: window.location.origin,
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
  };
  if (token) {
    return {
      ...tempHeaders,
      Authorization: `Token ${token}`,
    };
  }
  return tempHeaders;
};

export const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      body?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      responseType?: AxiosRequestConfig["responseType"];
    },
    unknown,
    unknown
  > =>
  async (args, api) => {
    const { url, method, body, params, headers, responseType } = args;
    const state = api.getState() as any;
    const token = state?.user?.userData?.authToken;
    // const token = store.getState()?.user?.userData?.authtoken;
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data: body,
        params,
        headers: headers ?? getDefaultHeaders(token),
        responseType,
      });
      if (
        `${result.data.status}` !== "200" &&
        `${result.data.status}` !== "201" &&
        `${result.data.status}` !== "202"
      ) {
        if (result.data.message) {
          // toast.error(result.data.message)
          console.log(result.data.message);
        }
        throw result.data;
      }
      return { data: result.data };
    } catch (axiosError: any) {
      if (axiosError?.response?.status === 401) {
        // Unauthorised Case , so throw the user out to the Home Page and clear all the storages
        // Clear the Store as well ? -> Rudransh
        localStorage.clear();
        sessionStorage.clear();
        storageService.removeValueFromLocalStorage(STORAGE_CONST.AUTH_USER);
        storageService.removeValueFromSessionStorage(STORAGE_CONST.AUTH_USER);
        // ToastService.showErrorToast({
        //   title: 'Session time out',
        // })
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      }
      if (axios.isAxiosError(axiosError)) {
        const err = axiosError as AxiosError;
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        };
      } else {
        const err = axiosError as any;
        return {
          error: {
            status: err.status,
            data: err.data,
            message: err.message,
          },
        };
      }
    }
  };

const baseUrlQuery = axiosBaseQuery({
  baseUrl: BASE_URL,
});

export { baseUrlQuery };
