import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./customFetchBase";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  keepUnusedDataFor: 120,
  tagTypes: [
    "countries",
    "agencies",
    "drugs",
    "biomarkers",
    "modalities",
    "diseases",
    "final_recommendations",
  ],
  endpoints: () => ({}),
});
