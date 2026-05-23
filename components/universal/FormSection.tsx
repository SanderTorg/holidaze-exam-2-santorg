import { cn } from "@/lib/utils";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, children, className }: Props) {
  return (
    <div className={cn("border rounded-xl p-5 flex flex-col gap-4", className)}>
      <h2 className="font-semibold">{title}</h2>
      {children}
    </div>
  );
}
