import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ContributionSplit } from '@/components/dashboard/ContributionSplit';
import { UserFinancialCard } from '@/components/dashboard/UserFinancialCard';
import { UserFinancialCardPlaceholder } from '@/components/dashboard/UserFinancialCardPlaceholder';
import { GoalsSummary } from '@/components/dashboard/GoalsSummary';
import { CriticalStateCard } from '@/components/dashboard/CriticalStateCard';
import { HealthyStateCard } from '@/components/dashboard/HealthyStateCard';
import { Wallet, Building2, ShoppingBag, Sparkles } from 'lucide-react';

// Mock data - in real app, this would come from backend/context
const mockData = {
  coupleName: 'Ana & João',
  totalIncome: 15000,
  fixedCosts: 5200,
  monthlyLiving: 2400, // 80 * 30
  dailyAverage: 80,
  safetyMargin: 1500,
  safetyMarginPercentage: 10,
  availableForGoals: 5900,
  partners: [
    { 
      name: 'Ana', 
      income: 9000, 
      fixedCosts: 3100,
      contributionPercentage: 60,
      contributionAmount: 5460,
    },
    { 
      name: 'João', 
      income: 6000, 
      fixedCosts: 2100,
      contributionPercentage: 40,
      contributionAmount: 3640,
    },
  ],
  goals: [
    { id: '1', name: 'Viagem para Itália', targetAmount: 25000, currentAmount: 8500, monthlyContribution: 2000, estimatedMonths: 9 },
    { id: '2', name: 'Entrada do apartamento', targetAmount: 60000, currentAmount: 24000, monthlyContribution: 1500, estimatedMonths: 24 },
  ],
  hasPartnerJoined: true, // Set to false to test placeholder
};

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  // Calculate totals
  const totalCommitted = mockData.goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  const remainingAvailable = mockData.availableForGoals - totalCommitted;
  
  // Determine financial state
  const isCostsExceedIncome = mockData.totalIncome < (mockData.fixedCosts + mockData.monthlyLiving);
  const isOvercommitted = mockData.goals.length > 0 && remainingAvailable < 0;
  const isCritical = isCostsExceedIncome || isOvercommitted || mockData.availableForGoals <= 0;

  return (
    <AppLayout>
      <div className="space-y-6 md:space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Olá, {mockData.coupleName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Aqui está a visão financeira de vocês
          </p>
        </div>

        {/* Main state card - Critical or Healthy */}
        {isCritical ? (
          <CriticalStateCard
            totalIncome={mockData.totalIncome}
            fixedCosts={mockData.fixedCosts}
            monthlyLiving={mockData.monthlyLiving}
            safetyMargin={mockData.safetyMargin}
            availableForGoals={mockData.availableForGoals}
            isOvercommitted={isOvercommitted}
            overcommittedAmount={Math.abs(remainingAvailable)}
          />
        ) : (
          <HealthyStateCard
            totalIncome={mockData.totalIncome}
            fixedCosts={mockData.fixedCosts}
            monthlyLiving={mockData.monthlyLiving}
            safetyMargin={mockData.safetyMargin}
            availableForGoals={mockData.availableForGoals}
            totalCommitted={totalCommitted}
            hasGoals={mockData.goals.length > 0}
          />
        )}

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <MetricCard
            label="Renda total"
            value={`R$ ${formatCurrency(mockData.totalIncome)}`}
            icon={<Wallet className="w-4 h-4 text-success" />}
            variant="success"
          />
          <MetricCard
            label="Custos fixos"
            value={`R$ ${formatCurrency(mockData.fixedCosts)}`}
            icon={<Building2 className="w-4 h-4 text-accent-foreground" />}
            variant="accent"
          />
          <MetricCard
            label="Custo de vida"
            value={`R$ ${formatCurrency(mockData.monthlyLiving)}`}
            sublabel={`~R$${mockData.dailyAverage}/dia`}
            icon={<ShoppingBag className="w-4 h-4 text-primary" />}
            variant="primary"
          />
          <MetricCard
            label="Margem segura"
            value={`R$ ${formatCurrency(mockData.safetyMargin)}`}
            sublabel={`${mockData.safetyMarginPercentage}%`}
            icon={<Sparkles className="w-4 h-4 text-warning" />}
          />
        </div>

        {/* Individual partner breakdown */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg md:text-xl font-serif font-semibold text-foreground">
              Situação Individual
            </h2>
            <p className="text-sm text-muted-foreground">
              Veja como está a contribuição de cada um
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.partners.map((partner, index) => (
              <UserFinancialCard 
                key={index} 
                breakdown={partner}
                variant={index === 0 ? 'primary' : 'default'}
              />
            ))}
            
            {/* Show placeholder if partner hasn't joined */}
            {!mockData.hasPartnerJoined && (
              <UserFinancialCardPlaceholder 
                onInvite={() => console.log('Invite partner')}
              />
            )}
          </div>
        </div>

        {/* Goals summary */}
        <GoalsSummary
          goals={mockData.goals}
          availableForGoals={mockData.availableForGoals}
          totalCommitted={totalCommitted}
        />

        {/* Contribution split */}
        {mockData.partners.length === 2 && (
          <ContributionSplit
            partnerA={{
              name: mockData.partners[0].name,
              percentage: mockData.partners[0].contributionPercentage,
              amount: mockData.partners[0].contributionAmount,
            }}
            partnerB={{
              name: mockData.partners[1].name,
              percentage: mockData.partners[1].contributionPercentage,
              amount: mockData.partners[1].contributionAmount,
            }}
          />
        )}
      </div>
    </AppLayout>
  );
}
