"use client";

import ChatInterface from "@/features/chat-studio/chat/ChatInterface";
import FilterConfigController from "@/features/chat-studio/filters/FilterConfigController";
import ChatHistory from "@/features/chat-studio/history/ChatHistory";
import { cn } from "@/libs/utils";
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
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - History */}
      <Panel
        className={cn(
          "w-[380px] border-r transition-all duration-300 ease-in-out bg-[#F6F8FA]",
          !isLeftPanelOpen && "w-0 opacity-0 overflow-hidden"
        )}
      >
        <ChatHistory />
      </Panel>

      {/* Center Panel - Chat */}
      <Panel className="flex-1">
        <ChatInterface
          isLeftPanelOpen={isLeftPanelOpen}
          isRightPanelOpen={isRightPanelOpen}
          setIsLeftPanelOpen={setIsLeftPanelOpen}
          setIsRightPanelOpen={setIsRightPanelOpen}
        />
      </Panel>

      {/* Right Panel - Filters */}
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
