import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DailyCostSimulationProps {
  currentDailyAverage: number;
  dailyChange: number;
  onDailyChangeUpdate: (value: number) => void;
}

export function DailyCostSimulation({
  currentDailyAverage,
  dailyChange,
  onDailyChangeUpdate,
}: DailyCostSimulationProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const quickActions = [-5, -10, -20, 5, 10, 20];
  const maxChange = Math.round(currentDailyAverage * 0.5);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Custo diário</h3>
          <p className="text-sm text-muted-foreground">
            Pequenos ajustes no dia a dia geram grandes impactos
          </p>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((value) => (
          <Button
            key={value}
            variant={dailyChange === value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onDailyChangeUpdate(value)}
            className={cn(
              "transition-all",
              value < 0 && dailyChange === value && "bg-success hover:bg-success/90",
              value > 0 && dailyChange === value && "bg-destructive hover:bg-destructive/90"
            )}
          >
            {value > 0 ? '+' : ''}R$ {value}
          </Button>
        ))}
        {dailyChange !== 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDailyChangeUpdate(0)}
            className="text-muted-foreground"
          >
            Limpar
          </Button>
        )}
      </div>

      {/* Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Ajuste manual</span>
          <span className={cn(
            "text-lg font-semibold",
            dailyChange < 0 ? "text-success" : dailyChange > 0 ? "text-destructive" : "text-foreground"
          )}>
            {dailyChange >= 0 ? '+' : ''}R$ {dailyChange}/dia
          </span>
        </div>
        
        <Slider
          value={[dailyChange]}
          onValueChange={([value]) => onDailyChangeUpdate(value)}
          min={-maxChange}
          max={maxChange}
          step={5}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>-R$ {maxChange}</span>
          <span>+R$ {maxChange}</span>
        </div>
      </div>

      {/* Current state info */}
      <div className="p-3 rounded-lg bg-muted/50 text-sm">
        <p className="text-muted-foreground">
          Custo atual: <span className="font-medium text-foreground">R$ {formatCurrency(currentDailyAverage)}/dia</span>
          {dailyChange !== 0 && (
            <>
              {' → '}
              <span className={cn(
                "font-medium",
                dailyChange < 0 ? "text-success" : "text-destructive"
              )}>
                R$ {formatCurrency(currentDailyAverage + dailyChange)}/dia
              </span>
            </>
          )}
        </p>
        {dailyChange !== 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            Impacto mensal: {dailyChange < 0 ? 'economia de' : 'aumento de'}{' '}
            <span className={cn(
              "font-medium",
              dailyChange < 0 ? "text-success" : "text-destructive"
            )}>
              R$ {formatCurrency(Math.abs(dailyChange * 30))}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
