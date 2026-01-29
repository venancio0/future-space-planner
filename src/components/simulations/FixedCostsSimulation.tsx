import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Home, Plus, X, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FixedCost {
  id: string;
  name: string;
  amount: number;
}

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

interface FixedCostsSimulationProps {
  currentFixedCosts: FixedCost[];
  adjustments: FixedCostAdjustment[];
  newCosts: NewFixedCost[];
  onAdjustmentChange: (costId: string, newAmount: number) => void;
  onRemoveAdjustment: (costId: string) => void;
  onAddNewCost: (cost: NewFixedCost) => void;
  onUpdateNewCost: (index: number, cost: NewFixedCost) => void;
  onRemoveNewCost: (index: number) => void;
}

export function FixedCostsSimulation({
  currentFixedCosts,
  adjustments,
  newCosts,
  onAdjustmentChange,
  onRemoveAdjustment,
  onAddNewCost,
  onUpdateNewCost,
  onRemoveNewCost,
}: FixedCostsSimulationProps) {
  const [newCostName, setNewCostName] = useState('');
  const [newCostAmount, setNewCostAmount] = useState('');

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const handleAddNewCost = () => {
    if (newCostName.trim() && parseFloat(newCostAmount) > 0) {
      onAddNewCost({
        name: newCostName.trim(),
        amount: parseFloat(newCostAmount),
      });
      setNewCostName('');
      setNewCostAmount('');
    }
  };

  const getAdjustment = (costId: string) => {
    return adjustments.find(a => a.id === costId);
  };

  const totalOriginal = currentFixedCosts.reduce((sum, c) => sum + c.amount, 0);
  const totalAdjusted = currentFixedCosts.reduce((sum, c) => {
    const adj = getAdjustment(c.id);
    return sum + (adj ? adj.newAmount : c.amount);
  }, 0) + newCosts.reduce((sum, c) => sum + c.amount, 0);

  const hasChanges = adjustments.length > 0 || newCosts.length > 0;
  const difference = totalAdjusted - totalOriginal;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Home className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Custos fixos</h3>
          <p className="text-sm text-muted-foreground">
            Edite valores existentes ou adicione novos custos
          </p>
        </div>
      </div>

      {/* Current fixed costs */}
      {currentFixedCosts.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Custos atuais</p>
          <div className="space-y-2">
            {currentFixedCosts.map((cost) => {
              const adjustment = getAdjustment(cost.id);
              const isAdjusted = !!adjustment;
              const displayAmount = isAdjusted ? adjustment.newAmount : cost.amount;

              return (
                <div
                  key={cost.id}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border transition-all",
                    isAdjusted ? "border-primary/30 bg-primary/5" : "bg-card"
                  )}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{cost.name}</span>
                      {isAdjusted && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          Ajustado
                        </span>
                      )}
                    </div>
                    {isAdjusted && (
                      <span className="text-xs text-muted-foreground">
                        Original: R$ {formatCurrency(cost.amount)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-28">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        R$
                      </span>
                      <Input
                        type="number"
                        min="0"
                        value={displayAmount}
                        onChange={(e) => {
                          const newValue = parseFloat(e.target.value) || 0;
                          onAdjustmentChange(cost.id, newValue);
                        }}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                    {isAdjusted && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveAdjustment(cost.id)}
                        className="h-9 w-9"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* New costs */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Novos custos fictícios</p>
        
        {newCosts.length > 0 && (
          <div className="space-y-2">
            {newCosts.map((cost, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-dashed bg-muted/30"
              >
                <Input
                  placeholder="Nome do custo"
                  value={cost.name}
                  onChange={(e) => onUpdateNewCost(index, { ...cost, name: e.target.value })}
                  className="flex-1 h-9"
                />
                <div className="relative w-28">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                    R$
                  </span>
                  <Input
                    type="number"
                    min="0"
                    value={cost.amount || ''}
                    onChange={(e) => onUpdateNewCost(index, { ...cost, amount: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                    className="pl-8 h-9 text-sm"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveNewCost(index)}
                  className="h-9 w-9"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add new cost form */}
        <div className="flex items-center gap-2">
          <Input
            placeholder="Nome do novo custo"
            value={newCostName}
            onChange={(e) => setNewCostName(e.target.value)}
            className="flex-1 h-9"
          />
          <div className="relative w-28">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              R$
            </span>
            <Input
              type="number"
              min="0"
              value={newCostAmount}
              onChange={(e) => setNewCostAmount(e.target.value)}
              placeholder="0"
              className="pl-8 h-9 text-sm"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddNewCost}
            disabled={!newCostName.trim() || !parseFloat(newCostAmount)}
            className="h-9 w-9"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Summary */}
      {hasChanges && (
        <div className="p-3 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Custos fixos atuais:</span>
            <span className="font-medium">R$ {formatCurrency(totalOriginal)}/mês</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total simulado:</span>
            <span className={cn(
              "font-semibold",
              difference > 0 ? "text-destructive" : difference < 0 ? "text-success" : "text-foreground"
            )}>
              R$ {formatCurrency(totalAdjusted)}/mês
            </span>
          </div>
          {difference !== 0 && (
            <div className={cn(
              "text-xs pt-1",
              difference > 0 ? "text-destructive" : "text-success"
            )}>
              {difference > 0 ? '+' : ''}R$ {formatCurrency(difference)}/mês
            </div>
          )}
        </div>
      )}
    </div>
  );
}
