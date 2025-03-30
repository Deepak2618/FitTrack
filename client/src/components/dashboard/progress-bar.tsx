import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  sublabel?: string;
  color?: string;
  height?: number;
  showPercentage?: boolean;
  animationDuration?: number;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  sublabel,
  color = "bg-primary",
  height = 8,
  showPercentage = false,
  animationDuration = 1.5,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  return (
    <div className={className}>
      {(label || sublabel) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="font-medium text-sm">{label}</span>}
          {sublabel && <span className="text-sm">{sublabel}</span>}
        </div>
      )}
      <div className={cn(`h-${height} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`)}>
        <div 
          className={cn("h-full rounded-full progress-bar", color)}
          style={{
            width: `${percentage}%`,
            animation: `progressAnimation ${animationDuration}s ease-out forwards`,
          }}
        />
      </div>
      {showPercentage && (
        <div className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">
          {percentage.toFixed(0)}%
        </div>
      )}
    </div>
  );
}
