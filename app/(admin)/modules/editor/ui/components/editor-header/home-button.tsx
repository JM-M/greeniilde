import { Button } from "@/app/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export const HomeButton = () => (
  <Button size="icon-sm" variant="ghost" asChild>
    <Link href="/editor">
      <HomeIcon />
    </Link>
  </Button>
);
