import { cn } from "@/app/lib/utils";

interface EditorStatusProps {
  status: string;
  className?: string;
}

export const EditorStatus = ({ status, className }: EditorStatusProps) => {
  return (
    <div
      className={cn(
        "text-muted-foreground animate-in fade-in text-sm font-medium transition-all duration-300",
        className,
      )}
    >
      {status}
    </div>
  );
};
