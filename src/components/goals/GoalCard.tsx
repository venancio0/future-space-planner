import { Goal } from '@/types/finance';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
}

export function GoalCard({ goal, onClick }: GoalCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full card-base p-5 text-left space-y-4 transition-all duration-200",
        "hover:shadow-elevated hover:border-primary/20",
        onClick && "cursor-pointer"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{goal.name}</h3>
            <p className="text-sm text-muted-foreground">
              Meta: R$ {formatCurrency(goal.targetAmount)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="progress-track">
          <div
            className="progress-fill-accent"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            R$ {formatCurrency(goal.currentAmount)} acumulado
          </span>
          <span className="font-medium text-foreground">{progress.toFixed(0)}%</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Por mês</p>
            <p className="text-sm font-medium text-foreground">
              R$ {formatCurrency(goal.monthlyContribution)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Previsão</p>
            <p className="text-sm font-medium text-foreground">
              ~{goal.estimatedMonths} meses
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
