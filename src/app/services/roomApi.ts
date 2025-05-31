import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";
import { NewRoomDataType, RoomDataType } from "../../dataTypes/Data.type";


export const roomApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	tagTypes: ['Rooms'],
  endpoints: (builder) => ({
		
    getRooms: builder.query<RoomDataType[], void>({
      query: () => "rooms",
      providesTags: ["Rooms"],
    }),

		getRoom: builder.query<RoomDataType, string>({
      query: (id) => `rooms/${id}`,
      providesTags: ["Rooms"],
    }),

    addRoom: builder.mutation({
      query: (item:NewRoomDataType) => ({
        url: "rooms",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Rooms"],
    }),

    deleteRoom: builder.mutation({
      query: (id:string) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),

    editRoom: builder.mutation({
      query: (item:RoomDataType) => ({
        url: `rooms/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useAddRoomMutation,
  useDeleteRoomMutation,
  useEditRoomMutation,
} = roomApi;
