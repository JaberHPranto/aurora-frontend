"use client";

import ChatInterface from "@/features/chat-studio/chat/ChatInterface";
import FilterConfigController from "@/features/chat-studio/filters/FilterConfigController";
import ChatHistory from "@/features/chat-studio/history/ChatHistory";
import { useAppSelector } from "@/libs/redux/hooks";
import { cn } from "@/libs/utils";
import { ChatMessageType } from "@/types/common";
import { useState } from "react";

interface PanelProps {
  className?: string;
  children: React.ReactNode;
}

function Panel({ className, children }: PanelProps) {
  return (
    <div className={cn("flex h-screen flex-col", className)}>{children}</div>
  );
}

const ChatStudio = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const { isLeftPanelOpen, isRightPanelOpen } = useAppSelector(
    (state) => state.sidePanel
  );

  return (
    <div className="flex h-screen bg-background">
      <Panel
        className={cn(
          "w-[380px] border-r transition-all duration-300 ease-in-out bg-[#F6F8FA]",
          !isLeftPanelOpen && "w-0 opacity-0 overflow-hidden"
        )}
      >
        <ChatHistory setMessageHistory={setMessages} />
      </Panel>

      <Panel className="flex-1">
        <ChatInterface messages={messages} setMessages={setMessages} />
      </Panel>

      <Panel
        className={cn(
          "w-[480px] border-l transition-all duration-300 ease-in-out overflow-hidden bg-[#F6F8FA]",
          !isRightPanelOpen && "w-0 opacity-0 overflow-hidden"
        )}
      >
        <FilterConfigController />
      </Panel>
    </div>
  );
};

export default ChatStudio;
