import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimulationResultProps {
  impactType: 'positive' | 'negative' | 'neutral';
  monthlyImpact: number;
  goalName?: string;
  monthsChange: number;
  originalMonths: number;
  newMonths: number;
  originalAvailable: number;
  newAvailable: number;
  onReset: () => void;
}

export function SimulationResult({
  impactType,
  monthlyImpact,
  goalName,
  monthsChange,
  originalMonths,
  newMonths,
  originalAvailable,
  newAvailable,
  onReset,
}: SimulationResultProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  return (
    <Card className={cn(
      "border-2 animate-fade-in",
      impactType === 'positive' && "border-success/50 bg-success/5",
      impactType === 'negative' && "border-destructive/50 bg-destructive/5",
      impactType === 'neutral' && "border-primary/50 bg-primary/5"
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {impactType === 'positive' ? (
            <TrendingUp className="w-5 h-5 text-success" />
          ) : impactType === 'negative' ? (
            <TrendingDown className="w-5 h-5 text-destructive" />
          ) : (
            <TrendingUp className="w-5 h-5 text-primary" />
          )}
          Resultado da simulação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly impact */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-background">
            <p className="text-xs text-muted-foreground mb-1">Disponível antes</p>
            <p className="text-xl font-serif font-semibold text-foreground">
              R$ {formatCurrency(originalAvailable)}
            </p>
          </div>
          <div className={cn(
            "p-4 rounded-xl",
            impactType === 'positive' ? "bg-success/10" : impactType === 'negative' ? "bg-destructive/10" : "bg-primary/10"
          )}>
            <p className="text-xs text-muted-foreground mb-1">Disponível simulado</p>
            <p className={cn(
              "text-xl font-serif font-semibold",
              impactType === 'positive' ? "text-success" : impactType === 'negative' ? "text-destructive" : "text-primary"
            )}>
              R$ {formatCurrency(newAvailable)}
            </p>
          </div>
        </div>

        {/* Impact highlight */}
        {monthlyImpact !== 0 && (
          <div className={cn(
            "p-4 rounded-xl text-center",
            impactType === 'positive' ? "bg-success/10" : "bg-destructive/10"
          )}>
            <p className={cn(
              "text-lg font-semibold",
              impactType === 'positive' ? "text-success" : "text-destructive"
            )}>
              {monthlyImpact > 0 ? '+' : ''}R$ {formatCurrency(monthlyImpact)}/mês
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {impactType === 'positive' 
                ? 'Mais dinheiro disponível para metas' 
                : 'Menos dinheiro disponível para metas'}
            </p>
          </div>
        )}

        {/* Goal timeline impact */}
        {goalName && monthsChange !== 0 && isFinite(monthsChange) && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">
              Impacto na meta: {goalName}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Antes</p>
                <p className="text-lg font-semibold text-foreground">
                  {originalMonths} {originalMonths === 1 ? 'mês' : 'meses'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-xs text-muted-foreground mb-1">Simulação</p>
                <p className="text-lg font-semibold text-primary">
                  {newMonths} {newMonths === 1 ? 'mês' : 'meses'}
                </p>
              </div>
            </div>
            
            <div className={cn(
              "p-3 rounded-lg text-center",
              monthsChange > 0 ? "bg-success/10" : "bg-destructive/10"
            )}>
              <p className={cn(
                "font-semibold",
                monthsChange > 0 ? "text-success" : "text-destructive"
              )}>
                {monthsChange > 0
                  ? `${monthsChange} ${monthsChange === 1 ? 'mês' : 'meses'} a menos!`
                  : `${Math.abs(monthsChange)} ${Math.abs(monthsChange) === 1 ? 'mês' : 'meses'} a mais`
                }
              </p>
            </div>
          </div>
        )}

        {/* Message */}
        <div className="p-4 rounded-xl bg-background">
          {impactType === 'positive' ? (
            <p className="text-sm text-foreground">
              <span className="font-medium">Ótimo!</span> Com essas mudanças, vocês teriam mais 
              <span className="font-semibold text-success"> R$ {formatCurrency(Math.abs(monthlyImpact))}</span> por mês 
              para metas ou para aumentar a margem de segurança.
            </p>
          ) : impactType === 'negative' ? (
            <p className="text-sm text-foreground">
              <span className="font-medium">Atenção:</span> Isso reduziria o espaço disponível em 
              <span className="font-semibold text-destructive"> R$ {formatCurrency(Math.abs(monthlyImpact))}</span> por mês.
              Suas metas levariam mais tempo.
            </p>
          ) : (
            <p className="text-sm text-foreground">
              Essas mudanças não afetariam significativamente seu planejamento atual.
            </p>
          )}
        </div>

        <Button variant="outline" onClick={onReset} className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Limpar simulação
        </Button>
      </CardContent>
    </Card>
  );
}
