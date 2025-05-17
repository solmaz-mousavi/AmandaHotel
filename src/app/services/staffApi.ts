import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";
import { StaffDataType } from "../../dataTypes/Data.type";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getStaff: builder.query<StaffDataType[], void>({
      query: () => "staff",
      providesTags: ["Staff"],
    }),

    addStaff: builder.mutation({
      query: (item: StaffDataType) => ({
        url: "staff",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Staff"],
    }),

    deleteStaff: builder.mutation({
      query: (id: string) => ({
        url: `staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),

    editStaff: builder.mutation({
      query: (item: StaffDataType) => ({
        url: `staff/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useEditStaffMutation,
} = staffApi;
