import { cn } from "@/libs/utils";
import { Loader } from "lucide-react";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <Loader className="animate-spin text-primary-500" size={24} />
    </div>
  );
};

export default Spinner;
