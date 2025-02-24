import MarkdownContent from "@/components/shared/MarkdownContent";
import { FinalMessage } from "@/types/deep-research";
import { Brain, Loader } from "lucide-react";

interface Props {
  isResearchCompleted: boolean;
  finalAnswer: FinalMessage | undefined;
}

const FinalAnswerSection = ({ isResearchCompleted, finalAnswer }: Props) => {
  return (
    <div>
      {isResearchCompleted ? (
        finalAnswer?.value?.final_answer ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-medium">Final Answer</h2>
            </div>
            <div>
              <MarkdownContent>
                {finalAnswer.value.final_answer}
              </MarkdownContent>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Loader className="text-gray-600 animate-spin w-4.5 h-4.5" />
              <p className="font-medium text-gray-600">
                Generating final answer ...
              </p>
            </div>
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="h-5 w-full bg-gray-300 animate-pulse "
              />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};
export default FinalAnswerSection;
