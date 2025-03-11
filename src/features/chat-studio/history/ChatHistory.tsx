import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { clearMessages } from "@/libs/redux/chatMessagesSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import { ChatMessageType } from "@/types/common";
import { chatHistoryData } from "@/utils/data";
import { sleep } from "@/utils/helpers";
import { MessageCirclePlus } from "lucide-react";
import { useState } from "react";

interface Props {
  setMessageHistory: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
}

const ChatHistory = ({ setMessageHistory }: Props) => {
  const [loadingNewChat, setLoadingNewChat] = useState(false);

  const dispatch = useAppDispatch();

  const handleStartNewChat = async () => {
    setLoadingNewChat(true);

    await sleep(1000);

    setLoadingNewChat(false);

    dispatch(clearMessages());
    setMessageHistory([]);
  };

  return (
    <Card className="h-full m-4 !border-gray-50">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Aurora</h2>
        </div>
      </div>
      <div className="p-4">
        <Button
          className="w-full gap-2"
          onClick={handleStartNewChat}
          loading={loadingNewChat}
        >
          <MessageCirclePlus className="h-4 w-4" />
          Start New Chat
        </Button>
      </div>
      <p className="text-xs text-gray-400 pl-[18px] pt-2 font-semibold">
        CHAT HISTORY
      </p>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-3 p-3">
          {chatHistoryData.map((chat) => (
            <p key={chat.id} className="text-sm text-gray-600  line-clamp-1">
              {chat.title}
            </p>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
export default ChatHistory;
