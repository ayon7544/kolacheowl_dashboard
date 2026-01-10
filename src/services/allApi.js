import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "./cookies";
const allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nessa-kolacheowl-backend.vercel.app/api/v1",
    prepareHeaders: (headers) => {
      const token = getCookie("NessasBrokenWorldAuthToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation, // Exporting the hook for logout mutation
} = allApi;

export default allApi;
