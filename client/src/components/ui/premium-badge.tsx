import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumBadgeProps {
  onClick: () => void;
  className?: string;
}

export function PremiumBadge({ onClick, className = "" }: PremiumBadgeProps) {
  return (
    <Button
      onClick={onClick}
      className={`hidden sm:flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm ${className}`}
      variant="default"
      size="sm"
    >
      <Crown className="mr-1.5 h-3.5 w-3.5" />
      <span>Premium</span>
    </Button>
  );
}
