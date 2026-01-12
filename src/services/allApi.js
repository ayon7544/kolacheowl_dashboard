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
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    // --- New Endpoints Added Below ---
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: otpData,
      }),
    }),
    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    uploadProfileImage: builder.mutation({
      query: (formData) => ({
        url: "/users/profile-image",
        method: "PUT",
        body: formData,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile-update",
        method: "PUT",
        body: data, // Sending { name: "..." }
      }),
    }),
    adminChangePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useChangePasswordMutation,
  useGetUserInfoQuery,
  useUploadProfileImageMutation,
  useUpdateProfileMutation,
  useAdminChangePasswordMutation,
} = allApi;

export default allApi;
