import { useEffect, useRef, useState } from "react";

import { ChevronDown, Loader, Search, X } from "lucide-react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/libs/utils";

const MAX_HEIGHT = 200;

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value?: Option[]; // The selected value will come from react-hook-form
  onChange?: (selectedOptions: Option[]) => void;
  placeholder?: string;
  error?: string;
  isLoading?: boolean;
}

export function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
  error,
  isLoading = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const updateDropdownPosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const dropdownHeight = MAX_HEIGHT;

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        updateDropdownPosition();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!isOpen) {
      updateDropdownPosition();
    }
    setIsOpen(!isOpen);
    setSearchTerm("");
  };

  const toggleOption = (option: Option) => {
    const updatedSelection = value.some((item) => item.value === option.value)
      ? value.filter((item) => item.value !== option.value)
      : [...value, option];

    onChange?.(updatedSelection);
  };

  const removeOption = (option: Option) => {
    const updatedSelection = value.filter(
      (item) => item.value !== option.value
    );
    onChange?.(updatedSelection);
  };

  const availableOptions = options.filter(
    (option) => !value.some((selected) => selected.value === option.value)
  );

  const filteredOptions = availableOptions.filter((option) =>
    option.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        ref={triggerRef}
        className={cn(
          "flex  cursor-pointer flex-wrap items-center  rounded-md border border-input px-3 py-[11px] gap-y-2",
          {
            "border-destructive focus-visible:border-input focus-visible:ring-destructive":
              error,
            "pointer-events-none opacity-70": isLoading,
          }
        )}
        onClick={toggleDropdown}
      >
        {value.length === 0 ? (
          <span className="text-sm text-muted-foreground">{placeholder}</span>
        ) : (
          value.map((option) => (
            <span
              key={option.value}
              className="mr-2 flex items-center rounded bg-primary-50 px-2.5 py-0.5 text-sm font-medium text-blue-600"
            >
              {option.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeOption(option);
                }}
                className="ml-1 text-blue-800"
                aria-label={`Remove ${option.label}`}
              >
                <X size={14} />
              </button>
            </span>
          ))
        )}
        {isLoading ? (
          <Loader className="text-gray-600 ml-auto h-4 w-4 animate-spin" />
        ) : (
          <ChevronDown className="ml-auto h-5 w-5 opacity-50" />
        )}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 w-full rounded-md border border-gray-300 bg-white shadow-lg ${
            dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          <div className="border-b border-gray-300 p-2">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                className="h-10 w-full rounded-md border border-input py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>
          {filteredOptions.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="cursor-pointer px-6 py-2 text-sm hover:bg-gray-100"
                  onClick={() => toggleOption(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
}
