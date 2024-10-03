import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ValueCardProps {
  value: number;
  title: string;
  subtitle: string;
  className?: string;
}

export default function ValueCard({ value, title, subtitle, className }: ValueCardProps) {
  return (
    <Card className={cn("h-48 w-full", className)}>
      <CardHeader>
        <div className="text-4xl font-bold text-foreground">{value}</div>
      </CardHeader>
      <CardContent className="space-y-0">
        <div className="text-lg font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{subtitle}</div>
      </CardContent>
    </Card>
  );
}
