import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";


export const foodOrderApi = createApi({
  reducerPath: "foodOrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	tagTypes: ['FoodOrder'],
  endpoints: (builder) => ({
    getFoodOrders: builder.query({
      query: () => "foodOrders",
      providesTags: ["FoodOrder"],
    }),

    addFoodOrder: builder.mutation({
      query: (newItem) => ({
        url: "foodOrders",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: ["FoodOrder"],
    }),

    deleteFoodOrder: builder.mutation({
      query: (item) => ({
        url: `foodOrders/${item.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoodOrder"],
    }),
  }),
});

export const {
  useGetFoodOrdersQuery,
  useAddFoodOrderMutation,
  useDeleteFoodOrderMutation,
} = foodOrderApi;
