import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { GoalCard } from '@/components/goals/GoalCard';
import { CreateGoalModal } from '@/components/goals/CreateGoalModal';
import { Button } from '@/components/ui/button';
import { Plus, Target, Sparkles } from 'lucide-react';
import { Goal } from '@/types/finance';

// Mock data
const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Viagem para Itália',
    targetAmount: 25000,
    currentAmount: 8500,
    monthlyContribution: 2000,
    estimatedMonths: 9,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Reserva de emergência',
    targetAmount: 30000,
    currentAmount: 18000,
    monthlyContribution: 1500,
    estimatedMonths: 8,
    createdAt: new Date(),
  },
];

const availableMonthly = 5900;

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const handleCreateGoal = (data: { name: string; targetAmount: number }) => {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      name: data.name,
      targetAmount: data.targetAmount,
      currentAmount: 0,
      monthlyContribution: Math.min(availableMonthly, data.targetAmount),
      estimatedMonths: Math.ceil(data.targetAmount / availableMonthly),
      createdAt: new Date(),
    };
    setGoals([...goals, newGoal]);
  };

  const totalCommitted = goals.reduce((sum, g) => sum + g.monthlyContribution, 0);
  const remainingAvailable = availableMonthly - totalCommitted;

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
              Metas
            </h1>
            <p className="text-muted-foreground">
              Os objetivos que vocês estão construindo juntos
            </p>
          </div>
          <Button variant="hero" onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nova meta
          </Button>
        </div>

        {/* Available summary */}
        <div className="card-base p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Disponível para metas</p>
              <p className="text-xl font-serif font-semibold text-success">
                R$ {formatCurrency(availableMonthly)}/mês
              </p>
            </div>
          </div>

          <div className="h-px md:h-10 md:w-px bg-border" />

          <div>
            <p className="text-sm text-muted-foreground">Já comprometido</p>
            <p className="text-lg font-semibold text-foreground">
              R$ {formatCurrency(totalCommitted)}/mês
            </p>
          </div>

          <div className="h-px md:h-10 md:w-px bg-border" />

          <div>
            <p className="text-sm text-muted-foreground">Ainda livre</p>
            <p className="text-lg font-semibold text-primary">
              R$ {formatCurrency(remainingAvailable)}/mês
            </p>
          </div>
        </div>

        {/* Goals list */}
        {goals.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <div className="card-base p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Nenhuma meta ainda</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Crie sua primeira meta e comecem a planejar o futuro de vocês juntos
              </p>
            </div>
            <Button variant="hero" onClick={() => setIsCreateOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar primeira meta
            </Button>
          </div>
        )}

        <CreateGoalModal
          open={isCreateOpen}
          onOpenChange={setIsCreateOpen}
          onCreateGoal={handleCreateGoal}
          availableMonthly={remainingAvailable}
        />
      </div>
    </AppLayout>
  );
}
