"use client";

import MarkdownContent from "@/components/shared/MarkdownContent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/libs/utils";
import {
  DeepResearchMessage,
  ResearchMessage,
  ThinkMessage,
} from "@/types/deep-research";
import { parseJsonl } from "@/utils/helpers";
import { Brain, FileText, HelpCircle, Loader, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Props {
  content: string;
}

export default function DeepResearchAgent({ content }: Props) {
  const [openAccordionId, setOpenAccordionId] = useState<string>();
  const [prevMessageCount, setPrevMessageCount] = useState(0);

  const researchContent = parseJsonl(content) as DeepResearchMessage[];

  const rewriteMessage = researchContent.find((msg) => msg.type === "rewrite");
  const finalAnswer = researchContent.find((msg) => msg.type === "final");
  const isResearchCompleted = researchContent.find(
    (msg) => msg.type === "completed_research"
  );

  // Group think and research messages by id
  const groupedMessages = useMemo(
    () =>
      researchContent.reduce(
        (acc, msg) => {
          if (msg.type === "think") {
            const id = (msg.value as { id: number }).id;
            if (!acc[id]) {
              acc[id] = { think: null, research: null };
            }
            acc[id].think = msg;
          } else if (msg.type === "research") {
            const id = (msg.value as { id: number }).id;
            if (!acc[id]) {
              acc[id] = { think: null, research: null };
            }
            acc[id].research = msg;
          }
          return acc;
        },
        {} as Record<
          number,
          {
            think: (DeepResearchMessage & ThinkMessage) | null;
            research: (DeepResearchMessage & ResearchMessage) | null;
          }
        >
      ),
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
              <AccordionContent>
                <CardContent className="pt-4 space-y-3">
                  {Object.entries(groupedMessages).map(([id, messages]) => (
                    <div key={id} className="relative pl-4">
                      {/* Timeline line */}
                      <div
                        className={cn(
                          "absolute left-[5px] top-2 -bottom-5 w-[2px] bg-blue-200",
                          {
                            "bottom-[2px]":
                              Number(id) ===
                              Object.keys(groupedMessages).length - 1,
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
                              <AccordionItem
                                value={`item-${id}`}
                                className="border-none"
                              >
                                <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>p]:line-clamp-none">
                                  <p className="text-base text-muted-foreground text-left line-clamp-1">
                                    {messages.think?.value.thought ||
                                      "Thinking..."}
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
                                            {messages.research?.value
                                              .research_question ||
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
                                            <p>
                                              {
                                                messages.research.value
                                                  .research_result
                                              }
                                            </p>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
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
      </div>
    </div>
  );
}
