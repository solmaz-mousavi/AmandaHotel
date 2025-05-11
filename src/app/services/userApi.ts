import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";
import { UserDataType } from "../../dataTypes/Data.type";

export const userApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({

    getUsers: builder.query<UserDataType[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getUser: builder.query<UserDataType, string>({
      query: (id) => `users/${id}`,
      providesTags: ["Users"],
    }),

    addUser: builder.mutation({
      query: (item: UserDataType) => ({
        url: "users",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    editUser: builder.mutation({
      query: (item: UserDataType) => ({
        url: `users/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Users"],
    }),


  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApi;
