import { configureStore } from "@reduxjs/toolkit";
import { roomApi } from "./services/roomApi";
import { roomReservationApi } from "./services/roomReservationApi";
import { foodApi } from "./services/foodApi";
import { foodOrderApi } from "./services/foodOrderApi";
import { userApi } from "./services/userApi";
import { staffApi } from "./services/staffApi";
import { messageApi } from "./services/messageApi";

const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [roomReservationApi.reducerPath]: roomReservationApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [foodOrderApi.reducerPath]: foodOrderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      roomReservationApi.middleware,
      foodApi.middleware,
      foodOrderApi.middleware,
      userApi.middleware,
      staffApi.middleware,
      messageApi.middleware,
    ),
});
export default store;
