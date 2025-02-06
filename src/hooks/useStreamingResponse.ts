import { ChatMessageType } from "@/features/chat-studio/chat/ChatInterface";
import { selectAllFilterIds } from "@/libs/redux/chatMessagesSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

function useStreamResponseForChat({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
}) {
  // const [responses, setResponses] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  // const [buffer, setBuffer] = useState("");

  const filterIds = useSelector(selectAllFilterIds);

  async function runQuery(queryContent: string) {
    const response = await fetch(process.env.API_URL + "/chat/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryContent,
        filtered_ids: filterIds.ids,
        prev_messages: [],
      }),
    });

    if (!response.body) {
      throw new Error("ReadableStream not supported in this browser.");
    }

    setIsLoading(true);

    const reader = response.body.getReader();
    // streamCallback([]);
    readStream(reader);
    return reader;
  }

  async function readStream(reader: ReadableStreamDefaultReader) {
    async function read() {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }

      const text = new TextDecoder("utf-8").decode(value, { stream: true });
      if (text.includes("COMPLETED _ END OF STREAM _ FINAL RESULT")) {
        setData(text.replace(/.*COMPLETED _ END OF STREAM _ FINAL RESULT/, ""));
      } else {
        // the text will start with <<GGWWP>> and if multiple <<GGWWP>> is there, it will be split by <<GGWWP>>
        // also remove the <<GGWWP>> prefix

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
            });
          }

          return newMessages;
        });

        // const responses = text
        //   .split("<<GGWWP>>")
        //   .filter((response) => response !== "");
        // responses.forEach((response) => {
        //   // if response starts with $ then remove $ and append it to buffer and then set buffer to ""
        //   if (response.startsWith("$")) {
        //     streamCallback((prevValue) => [
        //       ...prevValue,
        //       buffer + response.slice(1),
        //     ]);
        //     setBuffer("");
        //   } else {
        //     setBuffer(buffer + response);
        //   }
        // });

        // setResponses((prev) => prev + text)
        // streamCallback((prevValue) => [...prevValue, text])
      }
      read();
    }
    read();
  }

  return { data, runQuery, isLoading, setIsLoading };
}

export default useStreamResponseForChat;
