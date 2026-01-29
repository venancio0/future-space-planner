import { Button } from '@/components/ui/button';
import { FinancialBar } from './FinancialBar';
import { AlertTriangle, Calculator, Settings, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CriticalStateCardProps {
  totalIncome: number;
  fixedCosts: number;
  monthlyLiving: number;
  safetyMargin: number;
  availableForGoals: number;
  isOvercommitted?: boolean;
  overcommittedAmount?: number;
}

export function CriticalStateCard({
  totalIncome,
  fixedCosts,
  monthlyLiving,
  safetyMargin,
  availableForGoals,
  isOvercommitted = false,
  overcommittedAmount = 0,
}: CriticalStateCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const isCostsExceedIncome = totalIncome < (fixedCosts + monthlyLiving);

  return (
    <div className="card-elevated p-5 md:p-8 space-y-5 border-warning/30 bg-warning/5">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-warning" />
        </div>
        <div className="space-y-1 flex-1">
          <p className="text-xs font-medium text-warning uppercase tracking-wide">
            Situação de ajuste
          </p>
          <h2 className="text-xl md:text-2xl font-serif font-semibold text-foreground">
            {isOvercommitted
              ? "Metas excedem o disponível"
              : isCostsExceedIncome 
                ? "Custos acima da renda"
                : "Espaço limitado para metas"
            }
          </h2>
          <p className="text-sm text-muted-foreground">
            {isOvercommitted
              ? `Vocês têm R$ ${formatCurrency(overcommittedAmount)} a mais comprometidos do que o disponível. Revise as metas.`
              : isCostsExceedIncome
                ? "Vocês estão gastando mais do que ganham. Vamos encontrar um equilíbrio?"
                : "Não há muito espaço para metas no momento. Que tal simular alguns ajustes?"
            }
          </p>
        </div>
      </div>

      <FinancialBar
        total={totalIncome}
        segments={[
          { label: 'Custos fixos', value: fixedCosts, color: 'accent' },
          { label: 'Custo de vida', value: monthlyLiving, color: 'primary' },
          { label: 'Margem', value: safetyMargin, color: 'warning' },
          { label: 'Disponível', value: Math.max(0, availableForGoals), color: 'success' },
        ]}
      />

      <div className="flex flex-col sm:flex-row gap-3">
        {isOvercommitted ? (
          <>
            <Button asChild size="lg" className="flex-1 sm:flex-none">
              <Link to="/goals">
                <Target className="w-4 h-4 mr-2" />
                Revisar metas
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 sm:flex-none">
              <Link to="/simulations">
                <Calculator className="w-4 h-4 mr-2" />
                Simular ajustes
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button asChild size="lg" className="flex-1 sm:flex-none">
              <Link to="/simulations">
                <Calculator className="w-4 h-4 mr-2" />
                Simular ajustes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1 sm:flex-none">
              <Link to="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Ajustar custos
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
