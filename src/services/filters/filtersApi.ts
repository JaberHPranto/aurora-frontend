import { apiSlice } from "../api/apiSlice";

export const filtersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableCountries: builder.query<{ countries: string[] }, void>({
      query: () => `/filters/countries`,
      providesTags: ["countries"],
    }),
    getAvailableAgencies: builder.query<{ agencies: string[] }, void>({
      query: () => `/filters/agencies`,
      providesTags: ["agencies"],
    }),
    getAvailableDrugs: builder.query<{ drugs: string[] }, void>({
      query: () => `/filters/drugs`,
      providesTags: ["drugs"],
    }),
    getAvailableBiomarkers: builder.query<{ biomarkers: string[] }, void>({
      query: () => `/filters/biomarkers`,
      providesTags: ["biomarkers"],
    }),
    getAvailableModalities: builder.query<{ modalities: string[] }, void>({
      query: () => `/filters/modalities`,
      providesTags: ["modalities"],
    }),
    getAvailableDiseases: builder.query<{ diseases: string[] }, void>({
      query: () => `/filters/diseases`,
      providesTags: ["diseases"],
    }),
    getAvailableFinalRecommendations: builder.query<
      { final_recommendations: string[] },
      void
    >({
      query: () => `/filters/final_recommendations`,
      providesTags: ["final_recommendations"],
    }),
    getFilterIds: builder.query<any, string>({
      query: (url: string) => {
        return {
          url: `/filters/get_ids?${url}`,
        };
      },
    }),
    getTableView: builder.query<any, string>({
      query: (ids) => {
        return {
          url: `/filters/table_view?${ids}`,
        };
      },
    }),
  }),
});

export const {
  useGetAvailableCountriesQuery,
  useGetAvailableAgenciesQuery,
  useGetAvailableDrugsQuery,
  useGetAvailableBiomarkersQuery,
  useGetAvailableModalitiesQuery,
  useGetAvailableDiseasesQuery,
  useGetAvailableFinalRecommendationsQuery,
  useGetFilterIdsQuery,
  useGetTableViewQuery,
} = filtersApi;
