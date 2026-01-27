import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Wallet } from 'lucide-react';

export function IncomeStep() {
  const { data, setMonthlyIncome } = useOnboarding();

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numericValue = parseInt(rawValue) || 0;
    setMonthlyIncome(numericValue);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto">
          <Wallet className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold">
          Sua renda mensal
        </h2>
        <p className="text-muted-foreground">
          Informe quanto você recebe por mês
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="income">Renda mensal líquida</Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
              R$
            </span>
            <Input
              id="income"
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={data.monthlyIncome ? formatCurrency(data.monthlyIncome) : ''}
              onChange={handleChange}
              className="h-14 pl-12 text-2xl font-semibold font-serif"
            />
          </div>
        </div>

        <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Por que pedimos isso?</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Usamos apenas para calcular a divisão justa entre vocês dois. Cada pessoa contribui proporcionalmente à sua renda.
          </p>
        </div>
      </div>
    </div>
  );
}
