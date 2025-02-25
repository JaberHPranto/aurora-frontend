import {
  Archive,
  Bookmark,
  Check,
  Copy,
  Edit2,
  PackageOpen,
  Search,
  Trash,
} from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Selection {
  id: string;
  text: string;
  timestamp: number;
  color: string;
}

const colors = ["#FFA07A", "#98FB98", "#87CEFA", "#DDA0DD", "#F0E68C"];

export function TextSelectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [showBucket, setShowBucket] = useState(false);
  const [editingSelection, setEditingSelection] = useState<Selection | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const addSelection = (text: string) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setSelections((prev) => [
      ...prev,
      { id: Date.now().toString(), text, timestamp: Date.now(), color },
    ]);
  };

  const removeSelection = (id: string) => {
    setSelections((prev) => prev.filter((selection) => selection.id !== id));
  };

  const updateSelection = (id: string, newText: string) => {
    setSelections((prev) =>
      prev.map((selection) =>
        selection.id === id ? { ...selection, text: newText } : selection
      )
    );
  };

  const filteredSelections = useMemo(() => {
    return selections.filter((selection) =>
      selection.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selections, searchTerm]);

  const clearSelection = () => {
    // For Chrome
    if (window.getSelection) {
      if (window.getSelection()?.empty) {
        window.getSelection()?.empty();
      }
      // For Firefox
      else if (window.getSelection()?.removeAllRanges) {
        window.getSelection()?.removeAllRanges();
      }
    }
    // For other browsers (fallback case)
    else if ((document as any).selection) {
      (document as any).selection.empty();
    }
  };

  useEffect(() => {
    const handleSelection = (e: MouseEvent) => {
      // Ignore if clicking on the tooltip
      if ((e.target as HTMLElement).closest(".tooltip-container")) {
        return;
      }

      if (!wrapperRef.current?.contains(e.target as Node)) {
        setShowTooltip(false);
        return;
      }

      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: rect.top,
          });
          setSelectedText(text);
          setShowTooltip(true);
        }
      } else {
        setShowTooltip(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Don't clear selection if clicking on tooltip
      if (tooltipRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      clearSelection();
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <>
      <div ref={wrapperRef}>{children}</div>

      {showTooltip &&
        createPortal(
          <div
            className="fixed z-50 transform -translate-x-1/2 -translate-y-full rounded-lg p-2 transition-all duration-200 ease-in-out scale-95 animate-in slide-in-from-top-10 fade-in-0 zoom-in-95 tooltip-container"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              pointerEvents: "auto",
            }}
            ref={tooltipRef}
          >
            <Button
              size="sm"
              variant={"outline"}
              className="rounded-full !bg-primary-500 h-10 px-5 text-primary-50 border-primary-100 shadow-md !font-semibold transition-all duration-200 ease-in-out hover:scale-105 hover:text-primary-50"
              onClick={(e) => {
                e.stopPropagation();
                addSelection(selectedText);
                setShowTooltip(false);
                if (window.getSelection()) {
                  window.getSelection()?.removeAllRanges();
                }
              }}
            >
              <Archive className="w-4 h-4 mr-1" />
              Add to Bucket
            </Button>
          </div>,
          document.body
        )}

      <Button
        className="fixed bottom-4 right-4 rounded-full shadow-lg"
        onClick={() => setShowBucket(true)}
      >
        <Bookmark className="w-4 h-4 mr-2" />
        View Bucket
        {selections.length > 0 && (
          <span className="ml-2 bg-primary-foreground text-primary rounded-full px-2 py-1 text-xs font-bold">
            {selections.length}
          </span>
        )}
      </Button>

      <Dialog open={showBucket} onOpenChange={setShowBucket}>
        <DialogContent className="sm:max-w-[700px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Archive className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">
                Context Bucket
              </h2>
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Search context..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow h-11 outline-none focus-visible:outline-none focus"
            />
          </div>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="grid grid-cols-1  gap-4">
              <>
                {filteredSelections.map((selection) => (
                  <div>
                    <div
                      className="bg-muted p-4 rounded-lg shadow-sm"
                      style={{ borderLeft: `4px solid ${selection.color}` }}
                    >
                      {editingSelection?.id === selection.id ? (
                        <Input
                          value={editingSelection.text}
                          onChange={(e) =>
                            setEditingSelection({
                              ...editingSelection,
                              text: e.target.value,
                            })
                          }
                          onBlur={() => {
                            updateSelection(
                              selection.id,
                              editingSelection.text
                            );
                            setEditingSelection(null);
                          }}
                          autoFocus
                          className="mb-2"
                        />
                      ) : (
                        <p className="text-sm mb-2 text-gray-700 leading-6">
                          {selection.text}
                        </p>
                      )}
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>
                          {new Date(selection.timestamp).toDateString()}
                        </span>
                        <div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              copyToClipboard(selection.text, selection.id)
                            }
                          >
                            {copiedId === selection.id ? (
                              <Check className="w-4 h-4 hover:text-primary-500" />
                            ) : (
                              <Copy className="w-4 h-4 hover:text-primary-500" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingSelection(selection)}
                          >
                            <Edit2 className="w-4 h-4 hover:text-primary-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSelection(selection.id)}
                          >
                            <Trash className="w-4 h-4 hover:text-primary-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            </div>
            {filteredSelections.length === 0 && (
              <div className="text-center h-[45vh] flex flex-col items-center justify-center">
                <div className="bg-primary-50 text-primary-500 p-4 mb-4 rounded-full">
                  {searchTerm ? (
                    <Search className="w-12 h-12 mx-auto" />
                  ) : (
                    <PackageOpen className="w-12 h-12  mx-auto" />
                  )}
                </div>
                <p className="text-muted-foreground text-lg">
                  {searchTerm
                    ? "No matching selections found."
                    : "Your bucket is empty. Select some text to add items."}
                </p>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
