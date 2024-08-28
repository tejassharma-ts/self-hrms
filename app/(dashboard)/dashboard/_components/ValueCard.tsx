import { Card, CardContent } from "@/components/ui/card";

interface ValueCardProps {
  value: number;
  title: string;
  subtitle: string;
}

export default function ValueCard({ value, title, subtitle }: ValueCardProps) {
  return (
    <Card className="w-full h-48 p-4">
      <CardContent className="space-y-2">
        <div className="text-4xl font-bold text-foreground">{value}</div>
        <div className="text-lg font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">{subtitle}</div>
      </CardContent>
    </Card>
  );
}
