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
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useGetPages } from "../../../hooks/use-editor-queries";
import { CreatePageDialog } from "../create-page-dialog";

type Page = {
  id: string;
  title: string;
  slug: string;
  type: string;
  status: string;
};

export const PageDropdown = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const currentSlug = searchParams.get("slug") || "home";

  const { data: rawPages = [] } = useGetPages();
  const pages = rawPages as Page[];

  const selectedPage = pages.find((page) => page.slug === currentSlug);

  const filteredPages = pages.filter((page) =>
    page.title.toLowerCase().includes(search.toLowerCase()),
  );

  console.log(pages);

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
            <InputGroupInput
              placeholder="Search pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <CreatePageDialog onOpenChange={(open) => !open && setOpen(false)}>
            <Button
              className="mb-2 w-full justify-start px-2"
              variant="ghost"
              size="sm"
            >
              <Plus className="mr-2 size-4" />
              Create new page
            </Button>
          </CreatePageDialog>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredPages.map((page) => (
              <div
                key={page.id}
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-between rounded-sm px-2 py-2 text-sm",
                  currentSlug === page.slug && "bg-accent",
                )}
                onClick={() => {
                  window.location.href = `/editor?slug=${page.slug}`;
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{page.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {!page.slug.startsWith("/") && "/"}
                    {page.slug}
                  </span>
                </div>
                {currentSlug === page.slug && (
                  <Check className="text-primary h-4 w-4" />
                )}
              </div>
            ))}
            {filteredPages.length === 0 && (
              <div className="text-muted-foreground py-4 text-center text-sm">
                No pages found
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
