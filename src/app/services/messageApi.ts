import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseURL";
import { MessageDataType } from "../../dataTypes/Data.type";

export const messageApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query<MessageDataType[], void>({
      query: () => "messages",
      providesTags: ["Messages"],
    }),

    addMessage: builder.mutation({
      query: (item: MessageDataType) => ({
        url: "messages",
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Messages"],
    }),

    deleteMessage: builder.mutation({
      query: (id: string) => ({
        url: `messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),

    editMessage: builder.mutation({
      query: (item: MessageDataType) => ({
        url: `messages/${item.id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messageApi;
