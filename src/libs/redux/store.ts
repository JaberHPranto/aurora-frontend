import { apiSlice } from "@/services/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import chatMessagesReducer from "./chatMessagesSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chatMessages: chatMessagesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat([apiSlice.middleware]),
});
