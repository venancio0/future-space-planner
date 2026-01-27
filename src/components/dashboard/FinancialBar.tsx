import { cn } from '@/lib/utils';

interface FinancialBarProps {
  segments: {
    label: string;
    value: number;
    color: 'primary' | 'accent' | 'success' | 'muted' | 'warning';
  }[];
  total: number;
}

export function FinancialBar({ segments, total }: FinancialBarProps) {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary';
      case 'accent': return 'bg-accent';
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      {/* Bar */}
      <div className="h-4 w-full bg-muted rounded-full overflow-hidden flex">
        {segments.map((segment, index) => {
          const percentage = (segment.value / total) * 100;
          return (
            <div
              key={segment.label}
              className={cn(
                getColorClass(segment.color),
                "h-full transition-all duration-500",
                index === 0 && "rounded-l-full",
                index === segments.length - 1 && "rounded-r-full"
              )}
              style={{ width: `${Math.max(percentage, 1)}%` }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", getColorClass(segment.color))} />
            <span className="text-sm text-muted-foreground">{segment.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
