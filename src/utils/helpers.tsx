import {
  DeepResearchGroup,
  DeepResearchMessage,
  ResearchMessage,
  ThinkMessage,
} from "@/types/deep-research";

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

export function parseJsonl(content: string): DeepResearchMessage[] {
  const jsonStrings = content.split("---VIVA--SEPARATOR---");

  const parsedData: DeepResearchMessage[] = [];

  for (const jsonStr of jsonStrings) {
    if (!jsonStr.trim()) {
      continue;
    }

    try {
      const data = JSON.parse(jsonStr.trim()) as DeepResearchMessage;
      parsedData.push(data);
    } catch (e) {
      console.error("Error parsing JSON:", e);
      continue;
    }
  }

  return parsedData;
}

export function groupMessagesByID(messages: DeepResearchMessage[]) {
  return messages.reduce((acc, msg) => {
    if (msg.type === "think" || msg.type === "research") {
      const id = msg.value.id;
      if (!acc[id]) {
        acc[id] = { think: null, research: null };
      }

      if (msg.type === "think") {
        acc[id].think = msg as DeepResearchMessage & ThinkMessage;
      } else if (msg.type === "research") {
        acc[id].research = msg as DeepResearchMessage & ResearchMessage;
      }
    }
    return acc;
  }, {} as DeepResearchGroup);
}

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
