import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/libs/utils";
import { DeepResearchGroup } from "@/types/deep-research";
import { FileText, HelpCircle } from "lucide-react";

interface Props {
  groupedMessages: DeepResearchGroup;
  openAccordionId: string | undefined;
  setOpenAccordionId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ResearchContent = ({
  groupedMessages,
  openAccordionId,
  setOpenAccordionId,
}: Props) => {
  return (
    <CardContent className="pt-4 space-y-3">
      {Object.entries(groupedMessages).map(([id, messages]) => (
        <div key={id} className="relative pl-4">
          {/* Timeline line */}
          <div
            className={cn(
              "absolute left-[5px] top-2 -bottom-5 w-[2px] bg-blue-200",
              {
                "bottom-[2px]":
                  Number(id) === Object.keys(groupedMessages).length - 1,
              }
            )}
          />

          <div className="space-y-8">
            <div className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[16px] top-[6px] w-3 h-3 min-w-3 min-h-3 rounded-full bg-blue-500 ring-4 ring-blue-50" />
              <div className="pl-6">
                <Accordion
                  type="single"
                  collapsible
                  value={openAccordionId}
                  onValueChange={setOpenAccordionId}
                >
                  <AccordionItem value={`item-${id}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>p]:line-clamp-none">
                      {/* Thought */}
                      <p className="text-base text-muted-foreground text-left line-clamp-1">
                        {messages.think?.value.thought || "Thinking..."}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-6">
                      <div className="text-gray-600 space-y-6">
                        {/* Research Question Section */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-700">
                            <HelpCircle className="w-[18px] h-[18px] text-blue-500" />
                            <h4 className="font-medium text-base">
                              Research Question
                            </h4>
                          </div>
                          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 text-gray-800 leading-6">
                            <div className="flex gap-3">
                              <p>
                                {messages.research?.value.research_question ||
                                  "Researching..."}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Research Outcome Section */}
                        {messages.research && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                              <FileText className="w-[18px] h-[18px] text-blue-500" />
                              <h4 className="font-medium text-base">
                                Research Outcome
                              </h4>
                            </div>

                            <div className="gap-4">
                              <div className="bg-gray-100 leading-6 rounded-lg p-4 border border-gray-100 transition-all hover:shadow-sm text-gray-700">
                                <p>{messages.research.value.research_result}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  );
};
export default ResearchContent;
