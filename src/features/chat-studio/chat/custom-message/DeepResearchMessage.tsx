import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader } from "@/components/ui/card";
import { DeepResearchMessage } from "@/types/deep-research";
import { groupMessagesByID, parseJsonl } from "@/utils/helpers";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import FinalAnswerSection from "./components/FinalAnswerSection";
import ResearchContent from "./components/ResearchContent";

interface Props {
  content: string;
}

export default function DeepResearchAgent({ content }: Props) {
  const [openAccordionId, setOpenAccordionId] = useState<string>();
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  const researchContent = parseJsonl(content) as DeepResearchMessage[];

  const { rewriteMessage, finalAnswer, isResearchCompleted, groupedMessages } =
    useMemo(
      () => ({
        rewriteMessage: researchContent.find((msg) => msg.type === "rewrite"),
        finalAnswer: researchContent.find((msg) => msg.type === "final"),
        isResearchCompleted: researchContent.find(
          (msg) => msg.type === "completed_research"
        ),
        groupedMessages: groupMessagesByID(researchContent),
      }),
      [researchContent]
    );

  useEffect(() => {
    const messageIds = Object.keys(groupedMessages);
    const currentCount = messageIds.length;

    if (currentCount > prevMessageCount) {
      // New message has arrived
      const lastId = messageIds[currentCount - 1];
      setOpenAccordionId(`item-${lastId}`);
      setPrevMessageCount(currentCount);
    }
  }, [groupedMessages, prevMessageCount]);

  return (
    <div className="p-3">
      <div className=" space-y-6">
        <h1 className="text-2xl font-semibold leading-tight text-gray-800">
          {rewriteMessage?.value?.rewritten_query || "Deep Research"}
        </h1>

        <Card>
          <Accordion type="single" collapsible defaultValue="research">
            <AccordionItem value="research" className="border-none">
              <CardHeader className="pb-0">
                <AccordionTrigger className="hover:no-underline pt-0 pb-5">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Search className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-lg">Deep Research</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 mr-3">
                        {Object.keys(groupedMessages).length} research points
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
              </CardHeader>

              {/* Research Content */}
              <AccordionContent>
                <ResearchContent
                  groupedMessages={groupedMessages}
                  openAccordionId={openAccordionId}
                  setOpenAccordionId={setOpenAccordionId}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Final Answer */}
        <FinalAnswerSection
          isResearchCompleted={Boolean(isResearchCompleted)}
          finalAnswer={finalAnswer}
        />
      </div>
    </div>
  );
}
