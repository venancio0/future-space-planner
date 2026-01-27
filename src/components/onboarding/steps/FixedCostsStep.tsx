import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Building2, Plus, Trash2, Wifi, Car, Tv, Heart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUGGESTED_COSTS = [
  { icon: Building2, name: 'Aluguel', placeholder: '2.000' },
  { icon: Zap, name: 'Energia', placeholder: '200' },
  { icon: Wifi, name: 'Internet', placeholder: '100' },
  { icon: Car, name: 'Transporte', placeholder: '400' },
  { icon: Heart, name: 'Plano de saúde', placeholder: '500' },
  { icon: Tv, name: 'Streaming', placeholder: '80' },
];

export function FixedCostsStep() {
  const { data, addFixedCost, removeFixedCost, updateFixedCost } = useOnboarding();
  const [newCostName, setNewCostName] = useState('');
  const [newCostAmount, setNewCostAmount] = useState('');

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const handleAmountChange = (id: string, value: string) => {
    const rawValue = value.replace(/\D/g, '');
    const numericValue = parseInt(rawValue) || 0;
    updateFixedCost(id, { amount: numericValue });
  };

  const addSuggestedCost = (name: string) => {
    if (data.fixedCosts.some(c => c.name === name)) return;
    addFixedCost({
      id: crypto.randomUUID(),
      name,
      amount: 0,
    });
  };

  const addCustomCost = () => {
    if (!newCostName.trim()) return;
    addFixedCost({
      id: crypto.randomUUID(),
      name: newCostName.trim(),
      amount: parseInt(newCostAmount.replace(/\D/g, '')) || 0,
    });
    setNewCostName('');
    setNewCostAmount('');
  };

  const totalFixed = data.fixedCosts.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
          <Building2 className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold">
          Custos fixos
        </h2>
        <p className="text-muted-foreground">
          O que vocês pagam todo mês, sem variação
        </p>
      </div>

      {/* Quick add suggestions */}
      {data.fixedCosts.length < 6 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {SUGGESTED_COSTS.filter(s => !data.fixedCosts.some(c => c.name === s.name)).slice(0, 4).map((suggestion) => (
            <button
              key={suggestion.name}
              onClick={() => addSuggestedCost(suggestion.name)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                "bg-secondary text-secondary-foreground text-sm",
                "hover:bg-secondary/80 transition-colors"
              )}
            >
              <Plus className="w-3.5 h-3.5" />
              {suggestion.name}
            </button>
          ))}
        </div>
      )}

      {/* Existing costs */}
      <div className="space-y-3">
        {data.fixedCosts.map((cost) => (
          <div
            key={cost.id}
            className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border"
          >
            <div className="flex-1">
              <Input
                value={cost.name}
                onChange={(e) => updateFixedCost(cost.id, { name: e.target.value })}
                className="border-0 bg-transparent p-0 h-auto text-sm font-medium focus-visible:ring-0"
                placeholder="Nome do custo"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">R$</span>
              <Input
                type="text"
                inputMode="numeric"
                value={cost.amount ? formatCurrency(cost.amount) : ''}
                onChange={(e) => handleAmountChange(cost.id, e.target.value)}
                className="w-24 h-9 text-right font-semibold"
                placeholder="0"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeFixedCost(cost.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Add custom cost */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl border border-dashed border-border">
          <div className="flex-1">
            <Input
              value={newCostName}
              onChange={(e) => setNewCostName(e.target.value)}
              className="border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0"
              placeholder="Adicionar outro custo..."
              onKeyDown={(e) => e.key === 'Enter' && addCustomCost()}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">R$</span>
            <Input
              type="text"
              inputMode="numeric"
              value={newCostAmount}
              onChange={(e) => setNewCostAmount(e.target.value)}
              className="w-24 h-9 text-right"
              placeholder="0"
              onKeyDown={(e) => e.key === 'Enter' && addCustomCost()}
            />
            <Button
              variant="soft"
              size="icon-sm"
              onClick={addCustomCost}
              disabled={!newCostName.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Total */}
      {data.fixedCosts.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
          <span className="font-medium text-foreground">Total de custos fixos</span>
          <span className="text-xl font-serif font-semibold text-primary">
            R$ {formatCurrency(totalFixed)}
          </span>
        </div>
      )}
    </div>
  );
}
