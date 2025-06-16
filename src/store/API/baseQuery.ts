import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { store } from "../store";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { storageService } from "@/storage.service";
import { STORAGE_CONST } from "@/Constants/storage";
// import { FOUNDATION_URL, PRIME_PLVC_URL, STORAGE_CONSTANTS } from "Constants";
// import { storageService } from "./storage.service";

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
  async ({ url, method, body, params, headers, responseType }) => {
    const token = store.getState()?.user?.authenticatedUser?.authtoken;
    // console.log('qwertyuioqwertyuiop', token)
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
        localStorage.clear();
        sessionStorage.clear();
        storageService.removeValueFromLocalStorage(STORAGE_CONST.AUTH_USER);
        storageService.removeValueFromSessionStorage(STORAGE_CONST.AUTH_USER);
        // ToastService.showErrorToast({
        //   title: 'Session time out',
        // })
        setTimeout(() => {
          window.location.replace("/login");
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

const foundationUrlQuery = axiosBaseQuery({
  baseUrl: FOUNDATION_URL,
});

const primePlvcUrlQuery = axiosBaseQuery({
  baseUrl: PRIME_PLVC_URL,
});

export { foundationUrlQuery, primePlvcUrlQuery };
