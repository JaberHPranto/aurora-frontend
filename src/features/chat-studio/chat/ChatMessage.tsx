import MarkdownContent from "@/components/shared/MarkdownContent";
import { Button } from "@/components/ui/button";
import { Bot, Copy, RefreshCcw, ThumbsDown, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ChatMessageProps {
  sender: "user" | "assistant";
  content: string;
}

export function ChatMessage({ sender, content }: ChatMessageProps) {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy");
    } finally {
      setIsCopying(false);
    }
  };

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

  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-start gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="relative rounded-2xl bg-gradient-to-r from-primary-100/80 from-[30%] to-primary-50 p-4 shadow-sm border border-gray-200 max-w-[80%]">
            {/* <p className="text-sm leading-6 text-slate-800 whitespace-pre-wrap">
              {content}
            </p> */}
            <MarkdownContent>{content}</MarkdownContent>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600"
              onClick={handleCopy}
              disabled={isCopying}
            >
              <Copy
                className={`h-4 w-4 ${isCopying ? "text-primary-600" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
