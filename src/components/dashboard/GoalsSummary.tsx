import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Target, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  estimatedMonths: number;
}

interface GoalsSummaryProps {
  goals: Goal[];
  availableForGoals: number;
  totalCommitted: number;
}

export function GoalsSummary({ goals, availableForGoals, totalCommitted }: GoalsSummaryProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const remainingAvailable = availableForGoals - totalCommitted;
  const isOvercommitted = remainingAvailable < 0;

  if (goals.length === 0) {
    return (
      <Card className="border-success/20 bg-success/5">
        <CardContent className="py-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto">
            <Target className="w-7 h-7 text-success" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-semibold text-foreground">
              🎯 Crie sua primeira meta
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Vocês têm <span className="font-semibold text-success">R$ {formatCurrency(availableForGoals)}</span> disponível para suas metas!
            </p>
            <p className="text-sm text-muted-foreground">
              Que tal planejar uma viagem, comprar um imóvel ou criar uma reserva?
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/goals">
              <Sparkles className="w-5 h-5 mr-2" />
              Criar Primeira Meta
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Metas Ativas</CardTitle>
            <CardDescription>
              {goals.length} {goals.length === 1 ? 'meta' : 'metas'} • R$ {formatCurrency(totalCommitted)}/mês comprometidos
            </CardDescription>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link to="/goals">
              Ver todas
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.slice(0, 3).map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          
          return (
            <div 
              key={goal.id} 
              className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground truncate">{goal.name}</h3>
                  <span className="text-sm font-semibold text-primary ml-2">
                    R$ {formatCurrency(goal.monthlyContribution)}/mês
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {goal.estimatedMonths} {goal.estimatedMonths === 1 ? 'mês' : 'meses'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Remaining available */}
        {!isOvercommitted && remainingAvailable > 0 && (
          <div className="p-3 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-center">
              <span className="text-muted-foreground">Ainda livre: </span>
              <span className="font-semibold text-success">R$ {formatCurrency(remainingAvailable)}/mês</span>
            </p>
          </div>
        )}

        {/* Over-committed warning */}
        {isOvercommitted && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-center">
              <span className="text-destructive font-medium">
                ⚠️ R$ {formatCurrency(Math.abs(remainingAvailable))} acima do disponível
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
