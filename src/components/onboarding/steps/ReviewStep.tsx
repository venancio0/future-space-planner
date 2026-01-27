import { useOnboarding } from '@/contexts/OnboardingContext';
import { CheckCircle2, Wallet, Building2, ShoppingBag, Sparkles } from 'lucide-react';

export function ReviewStep() {
  const { data } = useOnboarding();

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const totalFixed = data.fixedCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const monthlyLiving = data.dailyAverage * 30;
  const totalCommitted = totalFixed + monthlyLiving;
  const available = data.monthlyIncome - totalCommitted;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold">
          Tudo certo!
        </h2>
        <p className="text-muted-foreground">
          Confira o resumo do seu planejamento
        </p>
      </div>

      <div className="space-y-4">
        {/* Income */}
        <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-success" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Sua renda</p>
            <p className="font-semibold text-foreground">R$ {formatCurrency(data.monthlyIncome)}</p>
          </div>
        </div>

        {/* Fixed costs */}
        <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Custos fixos ({data.fixedCosts.length})</p>
            <p className="font-semibold text-foreground">R$ {formatCurrency(totalFixed)}</p>
          </div>
        </div>

        {/* Daily average */}
        <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Custo de vida (~R${data.dailyAverage}/dia)</p>
            <p className="font-semibold text-foreground">R$ {formatCurrency(monthlyLiving)}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Available */}
        <div className="p-5 bg-primary/5 rounded-xl space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="font-medium text-foreground">Espaço disponível para metas</p>
          </div>
          <p className="text-3xl font-serif font-semibold text-primary">
            R$ {formatCurrency(Math.max(0, available))}
            <span className="text-base font-normal text-muted-foreground ml-2">/ mês</span>
          </p>
          {available < 0 && (
            <p className="text-sm text-destructive">
              Atenção: seus custos excedem sua renda em R$ {formatCurrency(Math.abs(available))}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Você pode ajustar esses valores a qualquer momento nas configurações.
      </p>
    </div>
  );
}
