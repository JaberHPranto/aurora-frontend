import { Button } from "@/components/ui/button";
import { Copy, RefreshCcw, ThumbsDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  content: string;
}

const AiResponseAction = ({ content }: Props) => {
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

  return (
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
        <Copy className={`h-4 w-4 ${isCopying ? "text-primary-600" : ""}`} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};
export default AiResponseAction;
