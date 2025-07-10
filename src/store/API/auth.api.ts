import { createApi } from "@reduxjs/toolkit/query/react";
import { baseUrlQuery } from "./baseQuery";
import { API_ENDPOINTS } from "@/Constants/endpoints";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseUrlQuery,
  tagTypes: ["Login", "Logout"],
  endpoints: (builder) => ({
    loginApi: builder.mutation<any, any>({
      query: (formData: any) => ({
        url: API_ENDPOINTS.LOGIN,
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   Sorce: "Web",
        //   Lang: "EN",
        // },
      }),
      //   async onQueryStarted() {},
    }),
    signUpApi: builder.mutation<any, any>({
      query: (formData: any) => ({
        url: API_ENDPOINTS.SIGN_UP,
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   Sorce: "Web",
        //   Lang: "EN",
        // },
      }),
      //   async onQueryStarted() {},
    }),
  }),
});

export const { useLoginApiMutation, useSignUpApiMutation } = authApi;
