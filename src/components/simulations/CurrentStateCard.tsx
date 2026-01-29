import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

interface CurrentStateCardProps {
  dailyAverage: number;
  totalFixedCosts: number;
  availableForGoals: number;
  mainGoalName?: string;
  mainGoalMonths?: number;
}

export function CurrentStateCard({
  dailyAverage,
  totalFixedCosts,
  availableForGoals,
  mainGoalName,
  mainGoalMonths,
}: CurrentStateCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-primary" />
          Plano atual
        </CardTitle>
        <CardDescription>
          Seu estado financeiro real (não muda durante a simulação)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Custo diário</p>
            <p className="text-lg font-semibold text-foreground">
              R$ {formatCurrency(dailyAverage)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Custos fixos</p>
            <p className="text-lg font-semibold text-foreground">
              R$ {formatCurrency(totalFixedCosts)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Disponível p/ metas</p>
            <p className="text-lg font-semibold text-primary">
              R$ {formatCurrency(availableForGoals)}
            </p>
          </div>
          {mainGoalName && mainGoalMonths && (
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{mainGoalName}</p>
              <p className="text-lg font-semibold text-foreground">
                {mainGoalMonths} meses
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
