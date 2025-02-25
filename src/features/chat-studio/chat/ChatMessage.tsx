import MarkdownContent from "@/components/shared/MarkdownContent";
import { Bot, User } from "lucide-react";
import AiResponseAction from "./components/AiResponseAction";
import DeepResearchAgent from "./custom-message/DeepResearchMessage";

interface ChatMessageProps {
  sender: "user" | "assistant";
  content: string;
  type: "text" | "deep-research";
}

export function ChatMessage({
  sender,
  content,
  type = "text",
}: ChatMessageProps) {
  // User message
  if (sender === "user") {
    return (
      <div className="space-y-4 mb-8">
        <div className="flex items-start justify-end gap-3">
          <div className="flex-1 space-y-2.5">
            <div className="relative rounded-2xl bg-white p-4 shadow-sm border border-gray-200 ml-auto max-w-[80%]">
              <p className="text-sm leading-6 text-slate-700 whitespace-pre-wrap">
                {content}
              </p>
            </div>
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-400 to-gray-600">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    );
  }
  //  Deep research assistant message
  else if (sender === "assistant" && type === "deep-research") {
    return (
      <div className="flex items-start gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary-100/80 from-[30%] to-primary-50 p-4 shadow-sm border border-gray-200 max-w-[80%]">
            <DeepResearchAgent content={content} />
          </div>
          <AiResponseAction content={content} />
        </div>
      </div>
    );
  }

  // Regular assistant message
  else if (sender === "assistant" && type === "text") {
    return (
      <div>
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 space-y-1.5">
              <div className="relative rounded-2xl bg-gradient-to-r from-primary-100/80 from-[30%] to-primary-50 p-4 shadow-sm border border-gray-200 max-w-[80%]">
                <MarkdownContent>{content}</MarkdownContent>
              </div>
              <AiResponseAction content={content} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
