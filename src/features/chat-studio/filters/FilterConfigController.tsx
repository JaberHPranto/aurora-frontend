import HookFormItem from "@/components/hook-form/HookFormItem";
import { MultiSelect } from "@/components/select/MultiSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  agenciesMockData,
  biomarkersMockData,
  countriesMockData,
  diseasesMockData,
  drugsMockData,
  finalRecommendationsMockData,
  modalitiesMockData,
} from "@/utils/data";
// import {
//   useGetAvailableAgenciesQuery,
//   useGetAvailableBiomarkersQuery,
//   useGetAvailableCountriesQuery,
//   useGetAvailableDiseasesQuery,
//   useGetAvailableDrugsQuery,
//   useGetAvailableFinalRecommendationsQuery,
//   useGetAvailableModalitiesQuery,
// } from "@/services/filters/filtersApi";
// import { formatSelectOptions } from "@/utils/helpers";
import { useForm } from "react-hook-form";
import { FiltersSchema, FiltersSchemaType } from "@/validators/filtersSchema";

const FilterConfigController = () => {
  // const { data: countries, isLoading: isCountriesLoading } =
  //   useGetAvailableCountriesQuery();
  // const { data: agencies, isLoading: isAgenciesLoading } =
  //   useGetAvailableAgenciesQuery();
  // const { data: drugs, isLoading: isDrugsLoading } =
  //   useGetAvailableDrugsQuery();
  // const { data: biomarkers, isLoading: isBiomarkersLoading } =
  //   useGetAvailableBiomarkersQuery();
  // const { data: modalities, isLoading: isModalitiesLoading } =
  //   useGetAvailableModalitiesQuery();
  // const { data: diseases, isLoading: isDiseasesLoading } =
  //   useGetAvailableDiseasesQuery();
  // const { data: recommendations, isLoading: isRecommendationsLoading } =
  //   useGetAvailableFinalRecommendationsQuery();

  const form = useForm<FiltersSchemaType>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      countries: [],
      agencies: [],
      drugs: [],
      biomarkers: [],
      modalities: [],
      diseases: [],
      final_recommendations: [],
    },
  });

  const handleSubmit = (data: FiltersSchemaType) => {
    console.log("data", data);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] m-4 !border-gray-50">
      <CardHeader className="flex-none">
        <CardTitle className="text-xl">Filter Configuration</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-5rem)] pt-0 relative">
        <Form {...form}>
          <ScrollArea className="flex-1 h-[calc(100%-4rem)] -mr-6 pr-6">
            <form className="space-y-6 mb-6" action="apply-filters">
              <HookFormItem name="countries" label="Country">
                <MultiSelect
                  options={countriesMockData}
                  // options={
                  //   countries?.countries
                  //     ? formatSelectOptions(countries.countries)
                  //     : []
                  // }
                  // isLoading={isCountriesLoading}
                />
              </HookFormItem>
              <HookFormItem name="agencies" label="Agency">
                <MultiSelect
                  options={agenciesMockData}
                  // options={
                  //   agencies?.agencies
                  //     ? formatSelectOptions(agencies.agencies)
                  //     : []
                  // }
                  // isLoading={isAgenciesLoading}
                />
              </HookFormItem>
              <HookFormItem name="drugs" label="Drug Name">
                <MultiSelect
                  options={drugsMockData}
                  // options={drugs?.drugs ? formatSelectOptions(drugs.drugs) : []}
                  // isLoading={isDrugsLoading}
                />
              </HookFormItem>
              <HookFormItem name="biomarkers" label="Biomarkers">
                <MultiSelect
                  options={biomarkersMockData}
                  // options={
                  //   biomarkers?.biomarkers
                  //     ? formatSelectOptions(biomarkers.biomarkers)
                  //     : []
                  // }
                  // isLoading={isBiomarkersLoading}
                />
              </HookFormItem>
              <HookFormItem name="modalities" label="Treatment Modality">
                <MultiSelect
                  options={modalitiesMockData}
                  // options={
                  //   modalities?.modalities
                  //     ? formatSelectOptions(modalities.modalities)
                  //     : []
                  // }
                  // isLoading={isModalitiesLoading}
                />
              </HookFormItem>
              <HookFormItem name="diseases" label="Primary Disease">
                <MultiSelect
                  options={diseasesMockData}
                  // options={
                  //   diseases?.diseases
                  //     ? formatSelectOptions(diseases.diseases)
                  //     : []
                  // }
                  // isLoading={isDiseasesLoading}
                />
              </HookFormItem>
              <HookFormItem
                name="final_recommendations"
                label="Final Recommendations"
              >
                <MultiSelect
                  options={finalRecommendationsMockData}
                  // options={
                  //   recommendations?.recommendations
                  //     ? formatSelectOptions(recommendations.recommendations)
                  //     : []
                  // }
                  // isLoading={isRecommendationsLoading}
                />
              </HookFormItem>
            </form>
          </ScrollArea>
          <div className="sticky bottom-0 bg-white  border-t pt-6">
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              type="submit"
              className="w-full"
              size="lg"
              form="apply-filters"
            >
              Apply Filters
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
export default FilterConfigController;
