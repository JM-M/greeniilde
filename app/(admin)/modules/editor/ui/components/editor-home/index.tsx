"use client";

import { Button } from "@/app/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/app/components/ui/input-group";
import { Spinner } from "@/app/components/ui/spinner";
import { PlusIcon, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useGetPages } from "../../../hooks/use-editor-queries";
import { CreatePageDialog } from "../create-page-dialog";
import { PageItem } from "./page-item";

export const EditorHome = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading: isLoadingPages } = useGetPages();

  const filteredPages = (data || []).filter((page) =>
    page.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to the Editor
          </h1>
          <p className="text-muted-foreground mt-2">
            Select a page to start editing
          </p>
          <div className="flex items-center justify-center py-2">
            <Button variant="link" asChild>
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto flex max-w-md items-center gap-2">
          <InputGroup>
            <InputGroupAddon>
              <Search className="text-muted-foreground size-4" />
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search pages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <CreatePageDialog>
            <Button>
              <PlusIcon />
              Create new page
            </Button>
          </CreatePageDialog>
        </div>

        <div className="grid gap-2">
          {filteredPages.map((page) => (
            <PageItem
              key={page.id}
              page={page}
              onClick={() => {
                window.location.href = `/editor?path=${page.path}`;
              }}
            />
          ))}
          {isLoadingPages && (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          )}
          {!isLoadingPages && filteredPages.length === 0 && (
            <div className="text-muted-foreground col-span-full py-8 text-center">
              No pages found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
