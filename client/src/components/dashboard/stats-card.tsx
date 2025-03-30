import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  goal?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  unit,
  change,
  goal,
  icon,
  iconBgColor,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("transition-all duration-300 hover:translate-y-[-4px]", className)}>
      <CardContent className="p-5">
        <div className="flex items-center mb-2">
          <div className={cn("h-10 w-10 rounded-full flex items-center justify-center mr-3", iconBgColor)}>
            {icon}
          </div>
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-baseline">
          <span className="font-poppins font-bold text-3xl">{value}</span>
          {unit && <span className="text-gray-500 dark:text-gray-400 ml-1">{unit}</span>}
          {change && (
            <span className={cn("ml-2 text-sm", change.isPositive ? "text-secondary" : "text-red-500")}>
              {change.isPositive ? "+" : "-"}{change.value}
            </span>
          )}
        </div>
        {goal && (
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">{goal}</div>
        )}
      </CardContent>
    </Card>
  );
}
