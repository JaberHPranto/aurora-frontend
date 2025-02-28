"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils";
import { useGetAllPromptTemplatesQuery } from "@/services/promptTemplateApi";
import { PromptTemplate, TemplateCategory } from "@/types/prompt-template";
import {
  BookOpen,
  BriefcaseMedical,
  FileChartColumn,
  Landmark,
  List,
  Loader,
  MonitorCog,
  PackageSearch,
  Search,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const categories = [...Object.values(TemplateCategory)];

const categoryIcons = {
  [TemplateCategory.ALL]: List,
  [TemplateCategory.PATIENTS]: Users,
  [TemplateCategory.INTERVENTION]: BriefcaseMedical,
  [TemplateCategory.COMPARATOR]: FileChartColumn,
  [TemplateCategory.OUTCOMES]: MonitorCog,
  [TemplateCategory.STUDY_DESIGN]: Landmark,
};

export default function PromptTemplateModal({
  isOpen,
  onClose,
  setPrompt,
}: TemplateModalProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [promptTemplates, setpromptTemplates] = useState<PromptTemplate[]>([]);

  const { data: prompts, isLoading } = useGetAllPromptTemplatesQuery();

  useEffect(() => {
    if (prompts) {
      setpromptTemplates(prompts.prompts);
    }
  }, [prompts]);

  const filteredTemplates = promptTemplates
    .filter(
      (template) => activeCategory === "All" || template.type === activeCategory
    )
    .filter((template) => {
      if (!searchQuery.trim()) return true;

      const query = searchQuery.toLowerCase();
      return (
        template.title.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.prompt.toLowerCase().includes(query)
      );
    });

  const selectedTemplateData = promptTemplates.find(
    (template) => template.id === selectedTemplate
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[600px] p-0">
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-[250px] border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative h-10">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Categories */}
            <ScrollArea className="flex-1">
              <div className="p-3">
                {categories.map((category) => {
                  const Icon =
                    categoryIcons[category as keyof typeof categoryIcons] ||
                    BookOpen;
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setSelectedTemplate(null);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors capitalize",
                        activeCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {category}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Main Content */}
          {isLoading ? (
            <div className="flex items-center justify-center h-full w-4/5">
              <Loader className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="border-b px-4 h-[73px] flex items-center justify-between">
                <h2 className="text-lg font-semibold capitalize">
                  {activeCategory} Templates
                </h2>
              </div>

              {/* Template List */}
              <div className="flex-1 flex">
                <div
                  className={cn(
                    "w-[300px] border-r",
                    !selectedTemplate && "flex-1"
                  )}
                >
                  <ScrollArea className="h-[500px]">
                    <div className="p-4 grid gap-2">
                      {filteredTemplates?.length === 0 ? (
                        <div className="w-full flex flex-col gap-5 items-center justify-center h-[450px]">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600">
                            <PackageSearch className="h-7 w-7 text-white" />
                          </div>
                          <p className="text-sm font-semibold text-primary-500">
                            No templates found for this category
                          </p>
                        </div>
                      ) : (
                        filteredTemplates.map((template) => (
                          <button
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={cn(
                              "w-full text-left p-3 rounded-lg border text-sm transition-colors",
                              selectedTemplate === template.id
                                ? "border-primary bg-primary-50 text-primary"
                                : "hover:border-muted-foreground/20"
                            )}
                          >
                            <div className="font-medium mb-1">
                              {template.title}
                            </div>
                            <div className="text-muted-foreground text-xs line-clamp-2">
                              {template.description}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* Template Details */}
                {selectedTemplate && (
                  <div className="flex-1 flex flex-col">
                    <ScrollArea className="h-[455px] overflow-hidden flex flex-col p-6">
                      <h3 className="text-lg font-semibold mb-2">
                        {selectedTemplateData?.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {selectedTemplateData?.description}
                      </p>
                      <div className="flex-1 bg-muted rounded-lg">
                        <div className="py-4 pl-4 pr-2">
                          <pre className="text-sm whitespace-pre-wrap">
                            {selectedTemplateData?.prompt}
                          </pre>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="border-t p-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          setPrompt(selectedTemplateData?.prompt ?? "");
                          onClose();
                        }}
                      >
                        Use Template
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
