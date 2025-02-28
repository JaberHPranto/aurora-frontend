import TypingLoader from "@/components/shared/TypingLoadder";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useStreamResponseForChat from "@/hooks/useStreamingResponse";
import { cn } from "@/libs/utils";
import {
  BookOpenText,
  Bot,
  Brain,
  PanelLeftClose,
  PanelRightClose,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import PromptTemplateModal from "./prompt-template/PromptTemplateModal";

interface Props {
  isLeftPanelOpen: boolean;
  isRightPanelOpen: boolean;
  setIsLeftPanelOpen: (open: boolean) => void;
  setIsRightPanelOpen: (open: boolean) => void;
}

export interface ChatMessageType {
  content: string;
  sender: "user" | "assistant";
  type: "text" | "deep-research";
}

const ChatInterface = ({
  isLeftPanelOpen,
  isRightPanelOpen,
  setIsLeftPanelOpen,
  setIsRightPanelOpen,
}: Props) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isDeepResearchEnabled, setIsDeepResearchEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { runQuery, isLoading, hasDoneStreaming } = useStreamResponseForChat({
    setMessages,
    isDeepResearchEnabled,
  });

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = () => {
    const newMessage: ChatMessageType = {
      content: inputText,
      sender: "user",
      type: "text",
    };

    setInputText("");
    setMessages((prev) => [...prev, newMessage]);

    runQuery(inputText);
  };

  return (
    <>
      <div className="flex flex-col h-full bg-gradient-to-b from-white from-[75%] to-primary-50 relative">
        {/* Empty Chat Screen */}
        {messages.length === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-semibold flex items-center justify-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
                How can I assist you today?
              </h1>
              <p className="text-gray-500 text-center">
                It looks like you haven’t asked anything yet. I can provide
                insights on medical literature, drug interactions, and disease
                management based on trusted sources.
              </p>
            </div>
          </div>
        )}

        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
              className="shrink-0"
            >
              <PanelLeftClose
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  !isLeftPanelOpen && "rotate-180"
                )}
              />
            </Button>
            <h2 className="font-semibold">Chat</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
            className="shrink-0"
          >
            <PanelRightClose
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                !isRightPanelOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              sender={message.sender}
              type={message.type}
            />
          ))}
          {messages.length > 0 && isLoading && (
            <div className="mb-4 text-left">
              <div className="flex w-fit items-center gap-2 rounded-lg bg-secondary px-2 h-11 text-secondary-foreground">
                <TypingLoader />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Chat Input */}
        <footer className="rounded-xl pb-6">
          <div className="mx-auto w-full max-w-3xl rounded-xl">
            <div>
              <div className="items-end justify-start overflow-hidden rounded-xl border border-input relative">
                <AutosizeTextarea
                  placeholder="Ask Anything..."
                  minHeight={60}
                  maxHeight={240}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (inputText.trim()) {
                        handleMessageSubmit();
                      }
                    }
                  }}
                  className="select-none resize-none overflow-hidden overflow-y-auto rounded-b-none border-0   focus-visible:ring-0 focus-visible:ring-offset-0 px-3 pt-3 focus-visible:outline-none "
                />
                <div className="w-full flex items-center justify-between bg-white px-4 pb-4 pt-2">
                  <div className="flex items-center gap-2 ">
                    <Button
                      type="submit"
                      variant={"outline"}
                      className={cn(
                        " w-40 rounded-3xl text-gray-600 hover:text-gray-600",
                        {
                          "text-primary-600 bg-primary-50 border-primary-200 hover:text-primary-600 hover:bg-primary-50":
                            isDeepResearchEnabled,
                        }
                      )}
                      onClick={() => setIsDeepResearchEnabled((prev) => !prev)}
                    >
                      <Brain className="h-4 -mr-1" />
                      Deep Research
                    </Button>

                    <Button
                      type="submit"
                      variant={"outline"}
                      className={cn(
                        " w-40 rounded-3xl text-gray-600 hover:text-gray-600"
                      )}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <BookOpenText className="h-4 -mr-1" />
                      Prompt Library
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    variant={"outline"}
                    size="icon"
                    className=""
                    loading={!hasDoneStreaming}
                    disabled={!inputText.trim()}
                    onClick={handleMessageSubmit}
                  >
                    <Send className=" text-gray-600 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <PromptTemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setPrompt={setInputText}
      />
    </>
  );
};
export default ChatInterface;
