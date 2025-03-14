import HookFormItem from "@/components/hook-form/HookFormItem";
import { MultiSelect } from "@/components/select/MultiSelect";
import SimpleSelect from "@/components/select/SimpleSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setFilterIds } from "@/libs/redux/chatMessagesSlice";
import {
  useGetAvailableBiomarkersQuery,
  useGetAvailableCountriesQuery,
  useGetAvailableDiseasesQuery,
  useGetAvailableDrugsQuery,
  useGetAvailableFinalRecommendationsQuery,
  useGetAvailableModalitiesQuery,
  useGetFilterIdsQuery,
} from "@/services/filters/filtersApi";
import { decisionDateData } from "@/utils/data";
import {
  convertObjectToQueryString,
  formatSelectOptions,
  formatSelectValues,
} from "@/utils/helpers";
import { FiltersSchema, FiltersSchemaType } from "@/validators/filtersSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const FilterConfigController = () => {
  const dispatch = useDispatch();

  const [selectedFilterIds, setSelectedFilterIds] = useState("");

  const { data: countries, isLoading: isCountriesLoading } =
    useGetAvailableCountriesQuery();

  const { data: drugs, isLoading: isDrugsLoading } =
    useGetAvailableDrugsQuery();
  const { data: biomarkers, isLoading: isBiomarkersLoading } =
    useGetAvailableBiomarkersQuery();
  const { data: modalities, isLoading: isModalitiesLoading } =
    useGetAvailableModalitiesQuery();
  const { data: diseases, isLoading: isDiseasesLoading } =
    useGetAvailableDiseasesQuery();
  const { data: recommendations, isLoading: isRecommendationsLoading } =
    useGetAvailableFinalRecommendationsQuery();

  const { data: filterIds, isFetching } = useGetFilterIdsQuery(
    selectedFilterIds,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (filterIds) {
      dispatch(setFilterIds(filterIds));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIds]);

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
      dt_upto: "",
    },
  });

  const handleSubmit = (data: FiltersSchemaType) => {
    const filtersData = Object.entries(data).reduce(
      (acc: { [key: string]: string[] }, [key, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          acc[key] = formatSelectValues(value);
        } else if (typeof value === "string") {
          acc[key] = [value];
        }
        return acc;
      },
      {}
    );
    setSelectedFilterIds(convertObjectToQueryString(filtersData));
  };

  const handleFilterReset = () => {
    setSelectedFilterIds("");
    form.reset();
  };

  return (
    <Card className="h-[calc(100vh-2rem)] m-4 !border-gray-50 relative">
      {filterIds?.ids && (
        <div className="text-center absolute right-4 top-4">
          <div className="bg-primary-100 text-primary-700 font-semibold text-2xl py-2 rounded-lg">
            {filterIds.ids.length > 0 &&
            filterIds.ids.length < 10 &&
            filterIds.ids.length
              ? `0${filterIds.ids.length}`
              : filterIds.ids.length}
          </div>
          <p className="text-xs text-gray-500 font-medium mt-1">
            Records Selected
          </p>
        </div>
      )}
      <CardHeader className="flex flex-row justify-between">
        <CardTitle className="relative">
          <h3 className="text-xl">Filter Configuration</h3>
          {selectedFilterIds.length > 0 && (
            <Button
              className="absolute -left-4 top-[22px] text-gray-500 text-xs"
              variant={"ghost"}
              onClick={handleFilterReset}
            >
              Clear All
              <X className="w-3 h-3" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-5rem)] pt-4 relative">
        <Form {...form}>
          <ScrollArea className="flex-1 h-[calc(100%-4rem)] -mr-6 pr-6">
            <form className="space-y-6 mb-6" action="apply-filters">
              <HookFormItem name="countries" label="Country">
                <MultiSelect
                  options={
                    countries?.countries
                      ? formatSelectOptions(countries.countries)
                      : []
                  }
                  isLoading={isCountriesLoading}
                />
              </HookFormItem>
              <HookFormItem name="dt_upto" label="HTA Decision Date">
                <SimpleSelect
                  options={decisionDateData}
                  placeholder="Select option"
                />
              </HookFormItem>
              <HookFormItem name="drugs" label="Drug Name">
                <MultiSelect
                  options={drugs?.drugs ? formatSelectOptions(drugs.drugs) : []}
                  isLoading={isDrugsLoading}
                />
              </HookFormItem>
              <HookFormItem name="biomarkers" label="Biomarkers">
                <MultiSelect
                  options={
                    biomarkers?.biomarkers
                      ? formatSelectOptions(biomarkers.biomarkers)
                      : []
                  }
                  isLoading={isBiomarkersLoading}
                />
              </HookFormItem>
              <HookFormItem name="modalities" label="Treatment Modality">
                <MultiSelect
                  options={
                    modalities?.modalities
                      ? formatSelectOptions(modalities.modalities)
                      : []
                  }
                  isLoading={isModalitiesLoading}
                />
              </HookFormItem>
              <HookFormItem name="diseases" label="Primary Disease">
                <MultiSelect
                  options={
                    diseases?.diseases
                      ? formatSelectOptions(diseases.diseases)
                      : []
                  }
                  isLoading={isDiseasesLoading}
                />
              </HookFormItem>
              <HookFormItem
                name="final_recommendations"
                label="Final Recommendations"
              >
                <MultiSelect
                  options={
                    recommendations?.final_recommendations
                      ? formatSelectOptions(
                          recommendations.final_recommendations
                        )
                      : []
                  }
                  isLoading={isRecommendationsLoading}
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
              loading={isFetching}
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
