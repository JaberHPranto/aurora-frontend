export const formatSelectOptions = (options: string[]) => {
  if (!options || options.length === 0) return [];

  return options.map((option) => {
    return { label: option, value: option };
  });
};

export const formatSelectValues = (
  data: { label: string; value: string }[]
): string[] => {
  return data.map((item) => item.value);
};

export function convertObjectToQueryString(
  obj: Record<string, string[]>
): string {
  const queryParams: string[] = [];

  for (const [key, values] of Object.entries(obj)) {
    if (Array.isArray(values)) {
      for (const value of values) {
        queryParams.push(`${key}=${encodeURIComponent(value.toLowerCase())}`);
      }
    }
  }

  return queryParams.join("&");
}
