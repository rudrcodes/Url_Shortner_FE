import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrlQuery } from "./baseQuery";
import { API_ENDPOINTS } from "@/Constants/endpoints";

export const shortenUrlApi = createApi({
  reducerPath: "shortenUrlApi",
  baseQuery: baseUrlQuery,
  endpoints: (builder) => ({
    shortenUrl: builder.mutation<unknown, unknown>({
      query: (url: string) => ({
        url: API_ENDPOINTS.SHORTEN_URL,
        method: "POST",
        body: url,
      }),
    }),
    getOriginalUrl: builder.query<unknown, unknown>({
      query: (params: unknown) => ({
        url: API_ENDPOINTS.GET_ORIGINAL_URL,
        method: "GET",
        params
      }),
    }),
  }),
});

export const { useShortenUrlMutation, useLazyGetOriginalUrlQuery } =
  shortenUrlApi;
