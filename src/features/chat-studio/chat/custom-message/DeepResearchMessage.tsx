"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/libs/utils";
import { parseJsonl } from "@/utils/helpers";
import { FileText, HelpCircle, Search } from "lucide-react";

interface Props {
  content: string;
}

export default function ResearchAgent({ content }: Props) {
  const researchContent = parseJsonl(content);

  return (
    <div className="p-3">
      <div className=" space-y-6">
        <h1 className="text-2xl font-semibold leading-tight text-gray-800">
          I want to do a deep research on why the HTA Submission fails and
          generate a report.
        </h1>

        <Card>
          <Accordion type="single" collapsible defaultValue="research">
            <AccordionItem value="research" className="border-none">
              <CardHeader className="pb-0">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <Search className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-lg">Deep Research</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 mr-3">
                        2 research points
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="pt-4 space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div className="relative pl-4">
                      {/* Timeline line */}
                      <div
                        className={cn(
                          "absolute left-[5px] top-2 -bottom-5 w-[2px] bg-blue-200",
                          {
                            "bottom-[2px]": item === 3,
                          }
                        )}
                      />

                      <div className="space-y-8">
                        <div className="relative">
                          {/* Timeline dot */}
                          <div className="absolute -left-[16px] top-[6px] w-[12px] h-[12px] rounded-full bg-blue-500 ring-4 ring-blue-50" />
                          <div className="pl-6">
                            <Accordion type="single" collapsible>
                              <AccordionItem
                                value="item-0"
                                className="border-none"
                              >
                                <AccordionTrigger className="hover:no-underline p-0 [&[data-state=open]>p]:line-clamp-none">
                                  <p className="text-base text-muted-foreground text-left line-clamp-1">
                                    The question about why HTA submissions fail
                                    is not fully addressed by the information
                                    provided. Further research into the common
                                    reasons for failure, as well as strategies
                                    to prevent such failures, would be
                                    beneficial.
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
                                            What are the common reasons for HTA
                                            submission failures and how can
                                            these be mitigated to increase the
                                            success rate?
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Research Results Section */}
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2 text-gray-700">
                                        <FileText className="w-[18px] h-[18px] text-blue-500" />
                                        <h4 className="font-medium text-base">
                                          Research Results
                                        </h4>
                                      </div>

                                      <div className="gap-4">
                                        <div className="bg-gray-100 leading-6 rounded-lg p-4 border border-gray-100 transition-all hover:shadow-sm text-gray-700">
                                          <p>
                                            Specific case studies, such as those
                                            involving drugs like Enhertu,
                                            Nerlynx, and Trodelvy, illustrate
                                            common reasons for HTA submission
                                            failures. These include incomplete
                                            or inappropriate comparator data,
                                            high risk of bias in study
                                            endpoints, lack of robust real-world
                                            evidence, insufficient subgroup
                                            analyses, and failure to meet
                                            regulatory or guideline-specific
                                            requirements.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
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

        {/* Final Report Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-medium">Final Report</h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700">
              <p>
                Based on the provided context and previous research outcomes,
                HTA submission failures commonly occur due to the following
                reasons:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    1. Uncertainty in Evidence
                  </h3>
                  <p>
                    Immature or limited clinical trial data, lack of comparative
                    evidence, and insufficient subgroup analyses.
                  </p>
                  <p className="mt-1">
                    <strong>Mitigation:</strong> Strengthen trial designs with
                    mature, head-to-head comparative data and robust subgroup
                    analyses.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    2. Cost-Effectiveness Concerns
                  </h3>
                  <p>
                    ICER values exceeding acceptable thresholds due to limited
                    or uncertain benefits relative to costs.
                  </p>
                  <p className="mt-1">
                    <strong>Mitigation:</strong> Align economic models with
                    payer expectations, incorporate RWE, and address long-term
                    outcomes.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    3. Insufficient Real-World Evidence (RWE)
                  </h3>
                  <p>
                    Lack of RWE to support clinical trial findings, which
                    weakens submissions.
                  </p>
                  <p className="mt-1">
                    <strong>Mitigation:</strong> Generate and integrate RWE to
                    bridge gaps in applicability and support cost-effectiveness
                    claims.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
