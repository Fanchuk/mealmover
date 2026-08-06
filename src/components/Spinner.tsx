import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
  color?: string;
}

export function Spinner({ size = 20, className = "", color = "#EF5B5B" }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      color={color}
      className={`animate-spin ${className}`}
    />
  );
}