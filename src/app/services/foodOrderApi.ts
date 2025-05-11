import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";


export const foodOrderApi = createApi({
  reducerPath: "foodOrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	tagTypes: ['FoodOrder'],
  endpoints: (builder) => ({
    getFoodOrder: builder.query({
      query: () => "foodOrder",
      providesTags: ["FoodOrder"],
    }),

    addFoodOrder: builder.mutation({
      query: (newItem) => ({
        url: "foodOrder",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["FoodOrder"],
    }),

    deleteFoodOrder: builder.mutation({
      query: (item) => ({
        url: `foodOrder/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoodOrder"],
    }),
  }),
});

export const {
  useGetFoodOrderQuery,
  useAddFoodOrderMutation,
  useDeleteFoodOrderMutation,
} = foodOrderApi;
