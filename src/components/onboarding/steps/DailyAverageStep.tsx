import { useOnboarding } from '@/contexts/OnboardingContext';
import { Slider } from '@/components/ui/slider';
import { Coffee, ShoppingBag, UtensilsCrossed } from 'lucide-react';

export function DailyAverageStep() {
  const { data, setDailyAverage } = useOnboarding();

  const monthlyEstimate = data.dailyAverage * 30;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const getSpendingLevel = () => {
    if (data.dailyAverage < 40) return { label: 'Econômico', color: 'text-success' };
    if (data.dailyAverage < 80) return { label: 'Moderado', color: 'text-primary' };
    if (data.dailyAverage < 150) return { label: 'Confortável', color: 'text-warning' };
    return { label: 'Alto', color: 'text-accent' };
  };

  const level = getSpendingLevel();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold">
          Custo médio diário
        </h2>
        <p className="text-muted-foreground">
          Quanto vocês gastam, em média, por dia?
        </p>
      </div>

      <div className="space-y-8">
        {/* Value display */}
        <div className="text-center space-y-1">
          <div className="text-5xl font-serif font-semibold text-foreground">
            R$ {formatCurrency(data.dailyAverage)}
          </div>
          <div className="text-sm text-muted-foreground">por dia</div>
          <div className={`text-sm font-medium ${level.color}`}>
            {level.label}
          </div>
        </div>

        {/* Slider */}
        <div className="px-2">
          <Slider
            value={[data.dailyAverage]}
            onValueChange={([value]) => setDailyAverage(value)}
            min={10}
            max={300}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>R$ 10</span>
            <span>R$ 300</span>
          </div>
        </div>

        {/* Monthly estimate */}
        <div className="bg-secondary/50 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Estimativa mensal</span>
            <span className="text-lg font-serif font-semibold text-foreground">
              R$ {formatCurrency(monthlyEstimate)}
            </span>
          </div>
          
          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-sm text-muted-foreground font-medium">
              Isso inclui coisas como:
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Coffee className="w-4 h-4" />
                <span>Café & lanches</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Refeições</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ShoppingBag className="w-4 h-4" />
                <span>Compras do dia</span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Não precisa ser exato. Uma média aproximada já ajuda muito no planejamento.
        </p>
      </div>
    </div>
  );
}
