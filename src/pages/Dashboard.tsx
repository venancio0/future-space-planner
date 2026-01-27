import { AppLayout } from '@/components/layout/AppLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { FinancialBar } from '@/components/dashboard/FinancialBar';
import { ContributionSplit } from '@/components/dashboard/ContributionSplit';
import { Wallet, Building2, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data - in real app, this would come from backend/context
const mockData = {
  totalIncome: 15000,
  fixedCosts: 5200,
  monthlyLiving: 2400, // 80 * 30
  safetyMargin: 1500,
  availableForGoals: 5900,
  partnerA: { name: 'Ana', income: 9000 },
  partnerB: { name: 'João', income: 6000 },
};

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const totalCommitted = mockData.fixedCosts + mockData.monthlyLiving + mockData.safetyMargin;
  
  // Calculate proportional contributions
  const totalPartnerIncome = mockData.partnerA.income + mockData.partnerB.income;
  const partnerAPercentage = (mockData.partnerA.income / totalPartnerIncome) * 100;
  const partnerBPercentage = (mockData.partnerB.income / totalPartnerIncome) * 100;

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Olá, Ana & João 👋
          </h1>
          <p className="text-muted-foreground">
            Aqui está a visão financeira de vocês
          </p>
        </div>

        {/* Main question card */}
        <div className="card-elevated p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Espaço disponível para metas
            </p>
            <p className="text-4xl md:text-5xl font-serif font-semibold text-primary">
              R$ {formatCurrency(mockData.availableForGoals)}
            </p>
            <p className="text-muted-foreground">por mês</p>
          </div>

          <FinancialBar
            total={mockData.totalIncome}
            segments={[
              { label: 'Custos fixos', value: mockData.fixedCosts, color: 'accent' },
              { label: 'Custo de vida', value: mockData.monthlyLiving, color: 'primary' },
              { label: 'Margem', value: mockData.safetyMargin, color: 'warning' },
              { label: 'Disponível', value: mockData.availableForGoals, color: 'success' },
            ]}
          />

          <Button asChild variant="outline-primary" className="w-full md:w-auto">
            <Link to="/goals">
              <Sparkles className="w-4 h-4 mr-2" />
              Criar uma meta
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Renda total"
            value={`R$ ${formatCurrency(mockData.totalIncome)}`}
            icon={<Wallet className="w-4 h-4 text-success" />}
            variant="success"
          />
          <MetricCard
            label="Custos fixos"
            value={`R$ ${formatCurrency(mockData.fixedCosts)}`}
            icon={<Building2 className="w-4 h-4 text-accent" />}
            variant="accent"
          />
          <MetricCard
            label="Custo de vida"
            value={`R$ ${formatCurrency(mockData.monthlyLiving)}`}
            sublabel="~R$80/dia"
            icon={<ShoppingBag className="w-4 h-4 text-primary" />}
            variant="primary"
          />
          <MetricCard
            label="Margem segura"
            value={`R$ ${formatCurrency(mockData.safetyMargin)}`}
            sublabel="10%"
            icon={<Sparkles className="w-4 h-4 text-warning" />}
          />
        </div>

        {/* Contribution split */}
        <ContributionSplit
          partnerA={{
            name: mockData.partnerA.name,
            percentage: partnerAPercentage,
            amount: Math.round((partnerAPercentage / 100) * totalCommitted),
          }}
          partnerB={{
            name: mockData.partnerB.name,
            percentage: partnerBPercentage,
            amount: Math.round((partnerBPercentage / 100) * totalCommitted),
          }}
        />
      </div>
    </AppLayout>
  );
}
