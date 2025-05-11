import { configureStore } from "@reduxjs/toolkit";
import { roomApi } from "./services/roomApi";
import { roomReservationApi } from "./services/roomReservationApi";
import { foodApi } from "./services/foodApi";
import { foodOrderApi } from "./services/foodOrderApi";
import { userApi } from "./services/userApi";

const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [roomReservationApi.reducerPath]: roomReservationApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [foodOrderApi.reducerPath]: foodOrderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      roomReservationApi.middleware,
      foodApi.middleware,
      foodOrderApi.middleware,
      userApi.middleware,
    ),
});
export default store;
