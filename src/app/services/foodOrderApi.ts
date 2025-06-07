import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";
import { FoodOrderDataType, NewFoodOrderDataType } from "../../dataTypes/Data.type";


export const foodOrderApi = createApi({
  reducerPath: "foodOrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	tagTypes: ['FoodOrders'],
  endpoints: (builder) => ({
    getFoodOrders: builder.query<FoodOrderDataType[], void>({
      query: () => "foodOrders",
      providesTags: ["FoodOrders"],
    }),

    addFoodOrder: builder.mutation({
      query: (item: NewFoodOrderDataType) => ({
        url: "foodOrders",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["FoodOrders"],
    }),

    deleteFoodOrder: builder.mutation({
      query: (id:string) => ({
        url: `foodOrders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FoodOrders"],
    }),
  }),
});

export const {
  useGetFoodOrdersQuery,
  useAddFoodOrderMutation,
  useDeleteFoodOrderMutation,
} = foodOrderApi;
