import { Message } from "@/libs/redux/chatMessagesSlice";

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
