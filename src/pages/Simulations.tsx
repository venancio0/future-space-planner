import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, TrendingDown, Clock, Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock current state
const currentState = {
  dailyAverage: 80,
  availableForGoals: 5900,
  safetyMargin: 1500,
  mainGoalMonths: 9,
  mainGoalName: 'Viagem para Itália',
};

export default function Simulations() {
  const [dailyChange, setDailyChange] = useState(0);
  const [monthlyChange, setMonthlyChange] = useState(0);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  // Calculate impact
  const dailyImpact = dailyChange * 30; // Monthly impact from daily change
  const totalMonthlyChange = dailyImpact + monthlyChange;
  const newAvailable = currentState.availableForGoals + totalMonthlyChange;
  const newSafetyMargin = currentState.safetyMargin + (totalMonthlyChange * 0.1);
  
  // Estimate new goal timeline
  const currentMonthlyContribution = 2000; // from goal
  const newMonthlyContribution = Math.max(0, currentMonthlyContribution + totalMonthlyChange * 0.5);
  const remainingAmount = 25000 - 8500; // target - current
  const newEstimatedMonths = newMonthlyContribution > 0 
    ? Math.ceil(remainingAmount / newMonthlyContribution) 
    : Infinity;
  const monthsChange = currentState.mainGoalMonths - newEstimatedMonths;

  const impactType: 'positive' | 'negative' | 'neutral' = 
    totalMonthlyChange > 0 ? 'positive' : totalMonthlyChange < 0 ? 'negative' : 'neutral';

  const resetSimulation = () => {
    setDailyChange(0);
    setMonthlyChange(0);
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Simulações
          </h1>
          <p className="text-muted-foreground">
            Veja como pequenas mudanças impactam seu futuro
          </p>
        </div>

        {/* Daily change simulation */}
        <div className="card-base p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">
              E se vocês mudassem o custo diário?
            </h3>
            <p className="text-sm text-muted-foreground">
              Hoje vocês gastam em média R${currentState.dailyAverage}/dia
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mudança diária</span>
              <span className={cn(
                "text-lg font-semibold",
                dailyChange > 0 ? "text-destructive" : dailyChange < 0 ? "text-success" : "text-foreground"
              )}>
                {dailyChange >= 0 ? '+' : ''}R$ {dailyChange}/dia
              </span>
            </div>
            
            <Slider
              value={[dailyChange]}
              onValueChange={([value]) => setDailyChange(value)}
              min={-50}
              max={50}
              step={5}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-R$ 50/dia</span>
              <span>+R$ 50/dia</span>
            </div>
          </div>
        </div>

        {/* Monthly extra simulation */}
        <div className="card-base p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">
              E se entrasse mais dinheiro?
            </h3>
            <p className="text-sm text-muted-foreground">
              Um bônus, freelance, ou renda extra mensal
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Renda extra mensal</span>
              <span className={cn(
                "text-lg font-semibold",
                monthlyChange > 0 ? "text-success" : monthlyChange < 0 ? "text-destructive" : "text-foreground"
              )}>
                {monthlyChange >= 0 ? '+' : ''}R$ {formatCurrency(monthlyChange)}
              </span>
            </div>
            
            <Slider
              value={[monthlyChange]}
              onValueChange={([value]) => setMonthlyChange(value)}
              min={-1000}
              max={2000}
              step={100}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-R$ 1.000</span>
              <span>+R$ 2.000</span>
            </div>
          </div>
        </div>

        {/* Impact visualization */}
        {(dailyChange !== 0 || monthlyChange !== 0) && (
          <div className={cn(
            "card-elevated p-6 space-y-6 animate-slide-up",
            impactType === 'positive' && "bg-success/5 border-success/20",
            impactType === 'negative' && "bg-destructive/5 border-destructive/20"
          )}>
            <div className="flex items-center gap-3">
              {impactType === 'positive' ? (
                <TrendingUp className="w-6 h-6 text-success" />
              ) : (
                <TrendingDown className="w-6 h-6 text-destructive" />
              )}
              <h3 className="font-semibold text-foreground">Impacto na vida de vocês</h3>
            </div>

            <div className="grid gap-4">
              {/* Monthly impact */}
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Espaço disponível</span>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "font-semibold",
                    impactType === 'positive' ? "text-success" : "text-destructive"
                  )}>
                    {totalMonthlyChange >= 0 ? '+' : ''}R$ {formatCurrency(totalMonthlyChange)}/mês
                  </span>
                </div>
              </div>

              {/* Goal timeline impact */}
              <div className="flex items-center justify-between p-4 bg-background rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <span className="text-sm text-muted-foreground">{currentState.mainGoalName}</span>
                  </div>
                </div>
                <div className="text-right">
                  {monthsChange !== 0 && isFinite(monthsChange) ? (
                    <span className={cn(
                      "font-semibold",
                      monthsChange > 0 ? "text-success" : "text-destructive"
                    )}>
                      {monthsChange > 0 ? `${monthsChange} meses a menos` : `${Math.abs(monthsChange)} meses a mais`}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Sem alteração</span>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="p-4 bg-background rounded-xl">
              {impactType === 'positive' ? (
                <p className="text-sm text-foreground">
                  <span className="font-medium">Ótimo!</span> Com essa mudança, vocês teriam mais 
                  <span className="font-semibold text-success"> R$ {formatCurrency(Math.abs(totalMonthlyChange))}</span> por mês 
                  para metas ou para aumentar a margem de segurança.
                </p>
              ) : (
                <p className="text-sm text-foreground">
                  <span className="font-medium">Atenção:</span> Isso reduziria o espaço disponível em 
                  <span className="font-semibold text-destructive"> R$ {formatCurrency(Math.abs(totalMonthlyChange))}</span> por mês.
                  Suas metas levariam mais tempo.
                </p>
              )}
            </div>

            <Button variant="secondary" onClick={resetSimulation} className="w-full">
              Resetar simulação
            </Button>
          </div>
        )}

        {/* Empty state */}
        {dailyChange === 0 && monthlyChange === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Arraste os controles acima para ver como mudanças afetam o planejamento</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
