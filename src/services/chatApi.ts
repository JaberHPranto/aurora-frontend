import { apiSlice } from "./api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addQuery: builder.mutation<any, { query: string; filtered_ids: string[] }>({
      query: (data) => {
        return {
          url: "/chat/",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useAddQueryMutation } = chatApi;
