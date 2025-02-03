import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils";
import { Bot, PanelLeftClose, PanelRightClose, Send } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import {
  addMessage,
  Message,
  selectAllFilterIds,
  selectAllMessages,
} from "@/libs/redux/chatMessagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import TypingLoader from "@/components/shared/TypingLoadder";
import { useAddQueryMutation } from "@/services/chatApi";
import { toast } from "sonner";

interface Props {
  isLeftPanelOpen: boolean;
  isRightPanelOpen: boolean;
  setIsLeftPanelOpen: (open: boolean) => void;
  setIsRightPanelOpen: (open: boolean) => void;
}

const ChatInterface = ({
  isLeftPanelOpen,
  isRightPanelOpen,
  setIsLeftPanelOpen,
  setIsRightPanelOpen,
}: Props) => {
  const dispatch = useDispatch();

  const chatMessages = useSelector(selectAllMessages);
  const filterIds = useSelector(selectAllFilterIds);

  const [addQuery, { isLoading }] = useAddQueryMutation();

  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleMessageSubmit = () => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: "user",
    };

    setInputText("");
    dispatch(addMessage(newMessage));

    addQuery({ query: inputText, filtered_ids: filterIds?.ids ?? [] })
      .unwrap()
      .then((response: string) => {
        console.log("response", response);
        dispatch(
          addMessage({
            id: Date.now().toString(),
            content: response,
            sender: "assistant",
          })
        );
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <>
      <div className="flex flex-col h-full bg-gradient-to-b from-white from-[75%] to-primary-50 relative">
        {/* Empty Chat Screen */}
        {chatMessages.length === 0 && (
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
          {chatMessages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              sender={message.sender}
            />
          ))}
          {chatMessages.length > 0 && isLoading && (
            <div className="mb-4 text-left">
              <div className="flex w-fit items-center gap-2 rounded-lg bg-secondary px-2 h-11 text-secondary-foreground">
                <TypingLoader />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <footer className="rounded-t-xl pb-6">
          <div className="mx-auto w-full max-w-3xl rounded-xl">
            <div>
              <div className="flex items-end justify-start  rounded-xl border border-input relative">
                <AutosizeTextarea
                  placeholder="Ask Anything..."
                  minHeight={80}
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
                  className="min-h-[100px] select-none resize-none overflow-hidden overflow-y-auto rounded-b-none rounded-xl border-0 bg-white  focus-visible:ring-0 focus-visible:ring-offset-0 p-3 focus-visible:outline-primary-200"
                />
                <Button
                  type="submit"
                  variant={"outline"}
                  size="icon"
                  className="absolute right-3 bottom-3"
                  disabled={!inputText.trim()}
                  onClick={handleMessageSubmit}
                >
                  <Send className=" text-gray-600 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default ChatInterface;
