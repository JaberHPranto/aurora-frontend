import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = process.env.API_URL;

export const baseQuery = fetchBaseQuery({
  baseUrl,
  //   prepareHeaders: async (headers, { getState }) => {
  //     const allState: any = getState();
  //     const token = allState?.auth?.accessToken;

  //     if (token) {
  //       headers.set("Authorization", `Bearer ${token}`);
  //       headers.set("Content-Type", "application/json");
  //       headers.set("Access-Control-Allow-Origin", "*");
  //     }

  //     return headers;
  //   },
});
