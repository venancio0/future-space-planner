import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, ShoppingBag, Home, Target } from 'lucide-react';
import { CurrentStateCard } from '@/components/simulations/CurrentStateCard';
import { DailyCostSimulation } from '@/components/simulations/DailyCostSimulation';
import { FixedCostsSimulation } from '@/components/simulations/FixedCostsSimulation';
import { GoalDedicationSimulation } from '@/components/simulations/GoalDedicationSimulation';
import { SimulationResult } from '@/components/simulations/SimulationResult';

// Mock current state - would come from backend/context
const currentState = {
  dailyAverage: 80,
  totalFixedCosts: 4500,
  availableForGoals: 5900,
  safetyMargin: 1500,
  goals: [
    { id: '1', name: 'Viagem para Itália', currentContribution: 2000, estimatedMonths: 9, targetAmount: 25000, currentAmount: 8500 },
    { id: '2', name: 'Entrada do apartamento', currentContribution: 1500, estimatedMonths: 24, targetAmount: 60000, currentAmount: 24000 },
  ],
  fixedCosts: [
    { id: 'fc1', name: 'Aluguel', amount: 2500 },
    { id: 'fc2', name: 'Internet', amount: 150 },
    { id: 'fc3', name: 'Energia', amount: 200 },
    { id: 'fc4', name: 'Streaming', amount: 80 },
  ],
};

interface FixedCostAdjustment {
  id: string;
  name: string;
  originalAmount: number;
  newAmount: number;
}

interface NewFixedCost {
  name: string;
  amount: number;
}

export default function Simulations() {
  // Simulation states
  const [dailyChange, setDailyChange] = useState(0);
  const [fixedCostAdjustments, setFixedCostAdjustments] = useState<FixedCostAdjustment[]>([]);
  const [newFixedCosts, setNewFixedCosts] = useState<NewFixedCost[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(currentState.goals[0]?.id || null);
  const [goalDedicationPercentage, setGoalDedicationPercentage] = useState<number | null>(null);

  // Calculate current dedication percentage for selected goal
  const selectedGoal = currentState.goals.find(g => g.id === selectedGoalId);
  const currentDedicationPercentage = selectedGoal
    ? Math.round((selectedGoal.currentContribution / currentState.availableForGoals) * 100)
    : 50;

  // Calculate simulation results
  const simulationResults = useMemo(() => {
    // Daily impact
    const dailyImpact = dailyChange * 30;

    // Fixed costs impact
    const fixedCostsChange = fixedCostAdjustments.reduce((sum, adj) => {
      return sum + (adj.newAmount - adj.originalAmount);
    }, 0) + newFixedCosts.reduce((sum, cost) => sum + cost.amount, 0);

    // Total monthly change (negative dailyChange = savings, so we flip it)
    const totalMonthlyChange = -dailyImpact - fixedCostsChange;

    // New available for goals
    const newAvailable = currentState.availableForGoals + totalMonthlyChange;

    // Goal timeline calculation
    let newEstimatedMonths = selectedGoal?.estimatedMonths || 0;
    let monthsChange = 0;

    if (selectedGoal) {
      const dedicationPct = goalDedicationPercentage ?? currentDedicationPercentage;
      const newContribution = Math.max(0, (newAvailable * dedicationPct) / 100);
      const remainingAmount = selectedGoal.targetAmount - selectedGoal.currentAmount;
      
      if (newContribution > 0) {
        newEstimatedMonths = Math.ceil(remainingAmount / newContribution);
        monthsChange = selectedGoal.estimatedMonths - newEstimatedMonths;
      } else {
        newEstimatedMonths = Infinity;
        monthsChange = -Infinity;
      }
    }

    // Determine impact type
    let impactType: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (totalMonthlyChange > 50) impactType = 'positive';
    else if (totalMonthlyChange < -50) impactType = 'negative';

    return {
      dailyImpact,
      fixedCostsChange,
      totalMonthlyChange,
      newAvailable,
      newEstimatedMonths,
      monthsChange,
      impactType,
    };
  }, [dailyChange, fixedCostAdjustments, newFixedCosts, goalDedicationPercentage, selectedGoal, currentDedicationPercentage]);

  // Check if there are any changes
  const hasChanges = dailyChange !== 0 || 
    fixedCostAdjustments.length > 0 || 
    newFixedCosts.length > 0 ||
    (goalDedicationPercentage !== null && goalDedicationPercentage !== currentDedicationPercentage);

  // Handlers
  const handleFixedCostAdjustment = (costId: string, newAmount: number) => {
    const cost = currentState.fixedCosts.find(c => c.id === costId);
    if (!cost) return;

    setFixedCostAdjustments(prev => {
      const existing = prev.find(a => a.id === costId);
      if (existing) {
        if (newAmount === cost.amount) {
          // Remove adjustment if back to original
          return prev.filter(a => a.id !== costId);
        }
        return prev.map(a => a.id === costId ? { ...a, newAmount } : a);
      }
      if (newAmount !== cost.amount) {
        return [...prev, { id: costId, name: cost.name, originalAmount: cost.amount, newAmount }];
      }
      return prev;
    });
  };

  const handleRemoveFixedCostAdjustment = (costId: string) => {
    setFixedCostAdjustments(prev => prev.filter(a => a.id !== costId));
  };

  const handleAddNewCost = (cost: NewFixedCost) => {
    setNewFixedCosts(prev => [...prev, cost]);
  };

  const handleUpdateNewCost = (index: number, cost: NewFixedCost) => {
    setNewFixedCosts(prev => prev.map((c, i) => i === index ? cost : c));
  };

  const handleRemoveNewCost = (index: number) => {
    setNewFixedCosts(prev => prev.filter((_, i) => i !== index));
  };

  const resetSimulation = () => {
    setDailyChange(0);
    setFixedCostAdjustments([]);
    setNewFixedCosts([]);
    setGoalDedicationPercentage(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Sparkles className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Simular cenários
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Nada aqui altera seu plano real. Combine múltiplas decisões para ver o impacto completo.
          </p>
        </div>

        {/* Current State */}
        <CurrentStateCard
          dailyAverage={currentState.dailyAverage}
          totalFixedCosts={currentState.totalFixedCosts}
          availableForGoals={currentState.availableForGoals}
          mainGoalName={currentState.goals[0]?.name}
          mainGoalMonths={currentState.goals[0]?.estimatedMonths}
        />

        {/* Simulation Tabs */}
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="daily" className="flex items-center gap-2 py-3">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Custo diário</span>
              <span className="sm:hidden">Diário</span>
            </TabsTrigger>
            <TabsTrigger value="fixed" className="flex items-center gap-2 py-3">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Custos fixos</span>
              <span className="sm:hidden">Fixos</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2 py-3">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Metas</span>
              <span className="sm:hidden">Metas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <DailyCostSimulation
                  currentDailyAverage={currentState.dailyAverage}
                  dailyChange={dailyChange}
                  onDailyChangeUpdate={setDailyChange}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fixed" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <FixedCostsSimulation
                  currentFixedCosts={currentState.fixedCosts}
                  adjustments={fixedCostAdjustments}
                  newCosts={newFixedCosts}
                  onAdjustmentChange={handleFixedCostAdjustment}
                  onRemoveAdjustment={handleRemoveFixedCostAdjustment}
                  onAddNewCost={handleAddNewCost}
                  onUpdateNewCost={handleUpdateNewCost}
                  onRemoveNewCost={handleRemoveNewCost}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <GoalDedicationSimulation
                  goals={currentState.goals}
                  selectedGoalId={selectedGoalId}
                  onGoalSelect={setSelectedGoalId}
                  currentDedicationPercentage={currentDedicationPercentage}
                  simulatedDedicationPercentage={goalDedicationPercentage}
                  onDedicationChange={setGoalDedicationPercentage}
                  availableForGoals={currentState.availableForGoals}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Simulation Result */}
        {hasChanges && (
          <SimulationResult
            impactType={simulationResults.impactType}
            monthlyImpact={simulationResults.totalMonthlyChange}
            goalName={selectedGoal?.name}
            monthsChange={isFinite(simulationResults.monthsChange) ? simulationResults.monthsChange : 0}
            originalMonths={selectedGoal?.estimatedMonths || 0}
            newMonths={isFinite(simulationResults.newEstimatedMonths) ? simulationResults.newEstimatedMonths : 999}
            originalAvailable={currentState.availableForGoals}
            newAvailable={simulationResults.newAvailable}
            onReset={resetSimulation}
          />
        )}

        {/* Empty state */}
        {!hasChanges && (
          <div className="text-center py-8 text-muted-foreground">
            <p>Use os controles acima para simular mudanças no seu planejamento</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
