import { Button } from '@/components/ui/button';
import { FinancialBar } from './FinancialBar';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HealthyStateCardProps {
  totalIncome: number;
  fixedCosts: number;
  monthlyLiving: number;
  safetyMargin: number;
  availableForGoals: number;
  totalCommitted?: number;
  hasGoals?: boolean;
}

export function HealthyStateCard({
  totalIncome,
  fixedCosts,
  monthlyLiving,
  safetyMargin,
  availableForGoals,
  totalCommitted = 0,
  hasGoals = false,
}: HealthyStateCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const displayAvailable = hasGoals 
    ? Math.max(0, availableForGoals - totalCommitted)
    : availableForGoals;

  return (
    <div className="card-elevated p-5 md:p-8 space-y-5">
      <div className="space-y-2">
        <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {hasGoals ? 'Ainda livre para novas metas' : 'Espaço disponível para metas'}
        </p>
        <p className="text-3xl md:text-5xl font-serif font-semibold text-primary">
          R$ {formatCurrency(displayAvailable)}
        </p>
        <p className="text-sm text-muted-foreground">
          {hasGoals 
            ? `de R$ ${formatCurrency(availableForGoals)} disponível (R$ ${formatCurrency(totalCommitted)} já comprometidos)`
            : 'por mês'
          }
        </p>
      </div>

      <FinancialBar
        total={totalIncome}
        segments={[
          { label: 'Custos fixos', value: fixedCosts, color: 'accent' },
          { label: 'Custo de vida', value: monthlyLiving, color: 'primary' },
          { label: 'Margem', value: safetyMargin, color: 'warning' },
          { label: 'Disponível', value: availableForGoals, color: 'success' },
        ]}
      />

      <Button asChild variant="default" size="lg" className="w-full md:w-auto">
        <Link to="/goals">
          <Sparkles className="w-4 h-4 mr-2" />
          {hasGoals ? 'Ver metas' : 'Criar uma meta'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </div>
  );
}
