/* eslint-disable react-hooks/exhaustive-deps */
import TypingLoader from "@/components/shared/TypingLoadder";
import {
  AutosizeTextarea,
  AutosizeTextAreaRef,
} from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useStreamResponseForChat from "@/hooks/useStreamingResponse";
import { addMessage } from "@/libs/redux/chatMessagesSlice";
import { cn } from "@/libs/utils";
import { ChatMessageType } from "@/types/common";
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
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { toggleLeftPanel, toggleRightPanel } from "@/libs/redux/sidePanelSlice";
import { checkIfElementAtBottom } from "@/utils/helpers";

interface Props {
  messages: ChatMessageType[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
}

const SCROLL_THRESHOLD = 100;

const ChatInterface = ({ messages, setMessages }: Props) => {
  const [isDeepResearchEnabled, setIsDeepResearchEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLeftPanelOpen, isRightPanelOpen } = useAppSelector(
    (state) => state.sidePanel
  );
  const dispatch = useAppDispatch();

  const { runQuery, isLoading, hasDoneStreaming, assistantResponse } =
    useStreamResponseForChat({
      setMessages,
      isDeepResearchEnabled,
    });

  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<AutosizeTextAreaRef | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [userScrolled, setUserScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const scrollToBottom = () => {
    if (!userScrolled || isAtBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // scrollable container (the viewport of ScrollArea of Radix)
    const scrollContainer = event.currentTarget.querySelector(
      "[data-radix-scroll-area-viewport]"
    );

    if (scrollContainer) {
      const atBottom = checkIfElementAtBottom(
        scrollContainer,
        SCROLL_THRESHOLD
      );
      setIsAtBottom(atBottom);

      if (!atBottom) {
        setUserScrolled(true);
      } else {
        setUserScrolled(false);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (hasDoneStreaming && assistantResponse && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "assistant") {
        dispatch(
          addMessage({
            id: Date.now().toString(),
            content: assistantResponse,
            sender: "assistant",
            type: isDeepResearchEnabled ? "deep-research" : "text",
          })
        );
      }
    }
  }, [hasDoneStreaming, assistantResponse]);

  const handleMessageSubmit = () => {
    const newMessage: ChatMessageType = {
      content: inputText,
      sender: "user",
      type: "text",
    };

    dispatch(addMessage({ id: Date.now().toString(), ...newMessage }));

    setInputText("");
    setMessages((prev) => [...prev, newMessage]);

    setUserScrolled(false);
    setIsAtBottom(true);

    runQuery(inputText);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      textareaRef?.current?.textArea?.focus();
    }, 100);
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
              onClick={() => dispatch(toggleLeftPanel())}
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
            onClick={() => dispatch(toggleRightPanel())}
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

        <ScrollArea className="flex-1 p-6" onScrollCapture={handleScroll}>
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              sender={message.sender}
              type={message.type}
            />
          ))}
          {messages.length > 0 && isLoading && (
            <div className="mb-4 text-left flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex w-fit items-center gap-2 rounded-lg bg-secondary px-2 h-10 text-secondary-foreground">
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
                  ref={textareaRef}
                  autoFocus
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (inputText.trim() && !isLoading) {
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
                    disabled={!inputText.trim() || isLoading}
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
        onClose={handleModalClose}
        setPrompt={setInputText}
      />
    </>
  );
};
export default ChatInterface;
