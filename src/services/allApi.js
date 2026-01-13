import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "./cookies";

const allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.10.20.2:5006/api/v1",
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
    // --- ABOUT US (3) ---
    getAboutUs: builder.query({
      query: () => "/legal/about-us",
    }),
    createAboutUs: builder.mutation({
      query: (data) => ({ url: "/legal/about-us", method: "POST", body: data }),
    }),
    updateAboutUs: builder.mutation({
      query: (data) => ({ url: "/legal/about-us", method: "Post", body: data }),
    }),

    // --- PRIVACY POLICY (3) ---
    getPrivacyPolicy: builder.query({
      query: () => "/legal/privacy-policy",
    }),
    createPrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/legal/privacy-policy",
        method: "POST",
        body: data,
      }),
    }),
    updatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/legal/privacy-policy",
        method: "POST",
        body: data,
      }),
    }),

    // --- TERMS & CONDITIONS (3) ---
    getTermsConditions: builder.query({
      query: () => "/legal/terms-and-conditions",
    }),
    createTermsConditions: builder.mutation({
      query: (data) => ({
        url: "/legal/terms-and-conditions",
        method: "POST",
        body: data,
      }),
    }),
    updateTermsConditions: builder.mutation({
      query: (data) => ({
        url: "/legal/terms-and-conditions",
        method: "POST",
        body: data,
      }),
    }),
    // --- BOOK MANAGEMENT ---
    getBooks: builder.query({
      query: ({ page = 1, limit = 10, searchTerm = "" } = {}) =>
        `/book/?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
      transformResponse: (response) => ({
        result: response.data.result,
        meta: response.data.meta,
      }),
    }),

    getSingleBook: builder.query({
      query: (bookId) => `/book/single/${bookId}`,
      transformResponse: (response) => response.data,
    }),

    createBook: builder.mutation({
      query: (formData) => ({
        url: "/book/create",
        method: "POST",
        body: formData,
      }),
    }),

    updateBook: builder.mutation({
      query: ({ bookId, formData }) => ({
        url: `/book/update/${bookId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/book/delete/${bookId}`,
        method: "DELETE",
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
  useCreateAboutUsMutation,
  useCreatePrivacyPolicyMutation,
  useCreateTermsConditionsMutation,
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsConditionsQuery,
  useUpdateAboutUsMutation,
  useUpdatePrivacyPolicyMutation,
  useUpdateTermsConditionsMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
} = allApi;

export default allApi;
