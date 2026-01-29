import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  name: string;
  currentContribution: number;
  estimatedMonths: number;
}

interface GoalDedicationSimulationProps {
  goals: Goal[];
  selectedGoalId: string | null;
  onGoalSelect: (goalId: string) => void;
  currentDedicationPercentage: number;
  simulatedDedicationPercentage: number | null;
  onDedicationChange: (percentage: number) => void;
  availableForGoals: number;
}

export function GoalDedicationSimulation({
  goals,
  selectedGoalId,
  onGoalSelect,
  currentDedicationPercentage,
  simulatedDedicationPercentage,
  onDedicationChange,
  availableForGoals,
}: GoalDedicationSimulationProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const displayPercentage = simulatedDedicationPercentage ?? currentDedicationPercentage;
  const selectedGoal = goals.find(g => g.id === selectedGoalId);
  
  // Calculate simulated contribution
  const simulatedContribution = (availableForGoals * displayPercentage) / 100;
  const contributionChange = selectedGoal 
    ? simulatedContribution - selectedGoal.currentContribution 
    : 0;

  if (goals.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Dedicação a metas</h3>
            <p className="text-sm text-muted-foreground">
              Crie uma meta primeiro para simular dedicação
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
          <Target className="w-5 h-5 text-success" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Dedicação a metas</h3>
          <p className="text-sm text-muted-foreground">
            Ajuste quanto do disponível vai para esta meta
          </p>
        </div>
      </div>

      {/* Goal selector */}
      {goals.length > 1 && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Meta para simular</label>
          <Select
            value={selectedGoalId || ''}
            onValueChange={onGoalSelect}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma meta" />
            </SelectTrigger>
            <SelectContent>
              {goals.map((goal) => (
                <SelectItem key={goal.id} value={goal.id}>
                  {goal.name} ({goal.estimatedMonths} meses)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedGoal && (
        <>
          {/* Dedication slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Percentual dedicado</span>
              <span className={cn(
                "text-lg font-semibold",
                simulatedDedicationPercentage !== null && simulatedDedicationPercentage !== currentDedicationPercentage
                  ? "text-primary"
                  : "text-foreground"
              )}>
                {displayPercentage}%
              </span>
            </div>
            
            <Slider
              value={[displayPercentage]}
              onValueChange={([value]) => onDedicationChange(value)}
              min={10}
              max={90}
              step={5}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10%</span>
              <span>90%</span>
            </div>
          </div>

          {/* Current state info */}
          <div className="p-3 rounded-lg bg-muted/50 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Meta selecionada:</span>
              <span className="font-medium text-foreground">{selectedGoal.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Contribuição atual:</span>
              <span className="font-medium text-foreground">
                R$ {formatCurrency(selectedGoal.currentContribution)}/mês
              </span>
            </div>
            {simulatedDedicationPercentage !== null && simulatedDedicationPercentage !== currentDedicationPercentage && (
              <div className="flex items-center justify-between pt-1 border-t">
                <span className="text-muted-foreground">Contribuição simulada:</span>
                <span className={cn(
                  "font-semibold",
                  contributionChange > 0 ? "text-success" : contributionChange < 0 ? "text-destructive" : "text-foreground"
                )}>
                  R$ {formatCurrency(simulatedContribution)}/mês
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
