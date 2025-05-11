import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";
import { RoomReservationDataType } from "../../dataTypes/Data.type";


export const roomReservationApi = createApi({
  reducerPath: "roomReservationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	tagTypes: ['RoomReservations'],
  endpoints: (builder) => ({

    getRoomReservations: builder.query<RoomReservationDataType[], void>({
      query: () => "roomReservations",
      providesTags: ["RoomReservations"],
    }),

    addRoomReservation: builder.mutation({
      query: (item:RoomReservationDataType) => ({
        url: "roomReservations",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["RoomReservations"],
    }),

    deleteRoomReservation: builder.mutation({
      query: (id:string) => ({
        url: `roomReservations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RoomReservations"],
    }),
  }),
});

export const {
  useGetRoomReservationsQuery,
  useAddRoomReservationMutation,
  useDeleteRoomReservationMutation,
} = roomReservationApi;
