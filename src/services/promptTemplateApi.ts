import { PromptTemplate } from "@/types/prompt-template";
import { apiSlice } from "./api/apiSlice";

export const promptTemplateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPromptTemplates: builder.query<{ prompts: PromptTemplate[] }, void>({
      query: () => `/prompts/`,
      providesTags: ["prompts"],
    }),
  }),
});

export const { useGetAllPromptTemplatesQuery } = promptTemplateApi;
