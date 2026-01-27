import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success';
  size?: 'default' | 'large';
}

export function MetricCard({
  label,
  value,
  sublabel,
  icon,
  variant = 'default',
  size = 'default',
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "card-base p-5 space-y-3",
        variant === 'primary' && "bg-primary/5 border-primary/20",
        variant === 'accent' && "bg-accent/5 border-accent/20",
        variant === 'success' && "bg-success/5 border-success/20"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="metric-label">{label}</span>
        {icon && (
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            variant === 'default' && "bg-muted",
            variant === 'primary' && "bg-primary/10",
            variant === 'accent' && "bg-accent/10",
            variant === 'success' && "bg-success/10"
          )}>
            {icon}
          </div>
        )}
      </div>
      <div>
        <p className={cn(
          "font-serif font-semibold tracking-tight",
          size === 'large' ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
          variant === 'primary' && "text-primary",
          variant === 'accent' && "text-accent",
          variant === 'success' && "text-success"
        )}>
          {value}
        </p>
        {sublabel && (
          <p className="text-sm text-muted-foreground mt-1">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
