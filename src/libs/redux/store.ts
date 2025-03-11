import { apiSlice } from "@/services/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import chatMessagesReducer from "./chatMessagesSlice";
import sidePanelReducer from "./sidePanelSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    chatMessages: chatMessagesReducer,
    sidePanel: sidePanelReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat([apiSlice.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
