import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";
import { FoodDataType } from "../../dataTypes/Data.type";

export const foodApi = createApi({
  reducerPath: "foodsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Foods"],
  endpoints: (builder) => ({
    getFoods: builder.query<FoodDataType[], void>({
      query: () => "foods",
      providesTags: ["Foods"],
    }),

    getFood: builder.query<FoodDataType, string>({
      query: (id) => `foods/${id}`,
      providesTags: ["Foods"],
    }),

    addFood: builder.mutation({
      query: (item: FoodDataType) => ({
        url: "foods",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Foods"],
    }),

    deleteFood: builder.mutation({
      query: (id: string) => ({
        url: `foods/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Foods"],
    }),

    editFood: builder.mutation({
      query: (item: FoodDataType) => ({
        url: `foods/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Foods"],
    }),
  }),
});

export const {
  useGetFoodsQuery,
  useGetFoodQuery,
  useAddFoodMutation,
  useDeleteFoodMutation,
  useEditFoodMutation,
} = foodApi;
