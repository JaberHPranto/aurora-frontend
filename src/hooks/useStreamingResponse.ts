import {
  selectAllFilterIds,
  selectAllMessages,
} from "@/libs/redux/chatMessagesSlice";
import { ChatMessageType } from "@/types/common";
import { getConversationHistory } from "@/utils/helpers";
import { useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  isDeepResearchEnabled: boolean;
}

function useStreamResponseForChat({
  setMessages,
  isDeepResearchEnabled,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasDoneStreaming, setHasDoneStreaming] = useState(true);
  const [assistantResponse, setAssistantResponse] = useState("");

  const filterIds = useSelector(selectAllFilterIds);
  const chatMessages = useSelector(selectAllMessages);

  const apiEndpoint = isDeepResearchEnabled
    ? "/chat/deep_think/stream"
    : "/chat/stream";

  async function runQuery(queryContent: string) {
    setIsLoading(true);
    setAssistantResponse("");

    const response = await fetch(process.env.API_URL + apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryContent,
        filtered_ids: filterIds.ids,
        prev_messages: getConversationHistory(chatMessages),
      }),
    });

    setHasDoneStreaming(false);

    if (!response.body) {
      throw new Error("ReadableStream not supported in this browser.");
    }

    const reader = response.body.getReader();
    readStream(reader);
    return reader;
  }

  async function readStream(reader: ReadableStreamDefaultReader) {
    async function read() {
      const { done, value } = await reader.read();
      if (done) {
        setHasDoneStreaming(true);
        return;
      }

      const text = new TextDecoder("utf-8").decode(value, { stream: true });
      setAssistantResponse((prev) => prev + text);

      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage && lastMessage.sender === "assistant") {
          // Update existing assistant message
          lastMessage.content += text;
        } else {
          setIsLoading(false);
          // Create new assistant message
          newMessages.push({
            content: text,
            sender: "assistant",
            type: isDeepResearchEnabled ? "deep-research" : "text",
          });
        }

        return newMessages;
      });

      read();
    }
    read();
  }

  return { runQuery, isLoading, hasDoneStreaming, assistantResponse };
}

export default useStreamResponseForChat;
