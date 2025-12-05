"use client";

import { Button } from "@/app/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/app/lib/utils";
import { Check, ChevronDownIcon, Plus, Search } from "lucide-react";
import { useState } from "react";

const pages = [
  {
    title: "Home Page",
    path: "/",
    value: "home",
  },
  {
    title: "About Us",
    path: "/about",
    value: "about",
  },
  {
    title: "Contact",
    path: "/contact",
    value: "contact",
  },
  {
    title: "Case Study: Dutse",
    path: "/case-studies/dutse-jigawa-residential",
    value: "case-study-dutse",
  },
];

export const PageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("home");

  const selectedPage = pages.find((page) => page.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          role="combobox"
          aria-expanded={open}
          className="w-fit max-w-[500px] justify-between truncate sm:min-w-[150px]"
        >
          <span className="truncate font-medium">
            {selectedPage?.title || "Select page..."}
          </span>
          <ChevronDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="center">
        <div className="p-2">
          <InputGroup className="mb-2">
            <InputGroupAddon>
              <Search className="text-muted-foreground size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search pages..." />
          </InputGroup>
          <Button
            className="mb-2 w-full justify-start px-2"
            variant="ghost"
            size="sm"
          >
            <Plus className="mr-2 size-4" />
            Create new page
          </Button>
          <div className="max-h-[300px] overflow-y-auto">
            {pages.map((page) => (
              <div
                key={page.value}
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-between rounded-sm px-2 py-2 text-sm",
                  value === page.value && "bg-accent",
                )}
                onClick={() => {
                  setValue(page.value);
                  setOpen(false);
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{page.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {page.path}
                  </span>
                </div>
                {value === page.value && (
                  <Check className="text-primary h-4 w-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
