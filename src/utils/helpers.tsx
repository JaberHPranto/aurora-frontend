import { Message } from "@/libs/redux/chatMessagesSlice";
import {
  DeepResearchGroup,
  DeepResearchMessage,
  ResearchMessage,
  ResearchParts,
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

export const getConversationHistory = (chatMessages: Message[]) => {
  // retrieving the last 6 messages (3 conversations)
  const conversationHistory = chatMessages.slice(-6).map((message) => {
    return {
      role: message.sender === "user" ? "human" : "assistant",
      content: message.content,
    };
  });

  return conversationHistory;
};

// Function to check if scroll is at bottom
export const checkIfElementAtBottom = (
  container: Element,
  threshold: number
) => {
  const { scrollTop, scrollHeight, clientHeight } = container;

  return scrollHeight - (scrollTop + clientHeight) < threshold;
};

export const parseStreamedText = (text: string) => {
  if (!text) return [];

  const sections = text.split("___VIVA__SEPARATOR___");

  return sections
    .map((sectionText) => {
      let type = "unknown";
      let content = sectionText.trim();

      // Question Rewrite
      if (content.startsWith("__VIVA__REWRITE__")) {
        type = "rewrite";
        content = content.replace("__VIVA__REWRITE__", "").trim();
      }
      // Deep Research Group
      else if (content.includes("__VIVA__THINK__")) {
        const parts: ResearchParts = {};

        const thinkMatch = content.match(
          /__VIVA__THINK__([\s\S]*?)(?=__VIVA__RESEARCH_QUESTION__|$)/
        );
        if (thinkMatch && thinkMatch[1]) {
          parts.think = thinkMatch[1].trim();
        }

        const questionMatch = content.match(
          /__VIVA__RESEARCH_QUESTION__([\s\S]*?)(?=___VIVA__RESEARCH_ANSWER___|$)/
        );
        if (questionMatch && questionMatch[1]) {
          parts.question = questionMatch[1].trim();
        }

        const answerMatch = content.match(
          /___VIVA__RESEARCH_ANSWER___([\s\S]*?)$/
        );
        if (answerMatch && answerMatch[1]) {
          parts.answer = answerMatch[1].trim();
        }

        return { type: "research", parts };
      }
      // Final Answer
      else if (content.startsWith("__VIVA__FINAL__")) {
        type = "final";
        content = content.replace("__VIVA__FINAL__", "").trim();
      }

      return { type, content };
    })
    .filter((section) => section.type !== "unknown" || section.content);
};
