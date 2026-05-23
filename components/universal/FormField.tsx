import { cn } from "@/lib/utils";

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, children, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
