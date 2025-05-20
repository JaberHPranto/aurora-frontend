import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader } from "@/components/ui/card";
import { DeepResearchSection } from "@/types/deep-research";
import { parseStreamedText } from "@/utils/parser";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import FinalAnswerSection from "./components/FinalAnswerSection";
import { ResearchContent } from "./components/ResearchContent";

interface Props {
  content: string;
}

export default function DeepResearchAgent({ content }: Props) {
  const [openAccordionId, setOpenAccordionId] = useState<string>();
  const [prevGroupCount, setPrevGroupCount] = useState(0);

  const researchContent = useMemo(() => parseStreamedText(content), [content]);

  const { rewriteSection, researchSections, finalAnswer } = useMemo(() => {
    let rewrite = undefined;
    const research = [];
    let final = undefined;

    for (const section of researchContent) {
      switch (section.type) {
        case "rewrite":
          rewrite = section;
          break;
        case "research":
          research.push(section);
          break;
        case "final":
          final = section;
          break;
      }
    }

    return {
      rewriteSection: rewrite,
      researchSections: research,
      finalAnswer: final,
    };
  }, [researchContent]);

  useEffect(() => {
    const currentGroupCount = researchSections.length ?? 0;

    if (currentGroupCount > prevGroupCount) {
      if (
        !researchSections[currentGroupCount - 1]?.parts?.question ||
        !researchSections[currentGroupCount - 1]?.parts?.answer
      )
        return;

      setOpenAccordionId(`item-${currentGroupCount - 1}`);
      setPrevGroupCount(currentGroupCount);
    }
  }, [prevGroupCount, researchSections, researchSections.length]);

  return (
    <div className="p-3">
      <div className=" space-y-6">
        <h1 className="text-2xl font-semibold leading-tight text-gray-800">
          {rewriteSection?.content || "Deep Research"}
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
                        {researchSections?.length} research points
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
              </CardHeader>

              {/* Research Content */}
              <AccordionContent>
                <ResearchContent
                  researchSections={researchSections as DeepResearchSection[]}
                  openAccordionId={openAccordionId}
                  setOpenAccordionId={setOpenAccordionId}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Final Answer */}
        <FinalAnswerSection
          isResearchCompleted={Boolean(finalAnswer)}
          finalAnswer={finalAnswer?.content}
        />
      </div>
    </div>
  );
}
