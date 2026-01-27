import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Target, Calendar, Users } from 'lucide-react';

interface CreateGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGoal: (goal: { name: string; targetAmount: number }) => void;
  availableMonthly: number;
}

export function CreateGoalModal({
  open,
  onOpenChange,
  onCreateGoal,
  availableMonthly,
}: CreateGoalModalProps) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const handleAmountChange = (value: string) => {
    const rawValue = value.replace(/\D/g, '');
    setTargetAmount(rawValue);
  };

  const numericAmount = parseInt(targetAmount) || 0;
  const estimatedMonths = numericAmount > 0 ? Math.ceil(numericAmount / availableMonthly) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && numericAmount > 0) {
      onCreateGoal({ name: name.trim(), targetAmount: numericAmount });
      setName('');
      setTargetAmount('');
      onOpenChange(false);
    }
  };

  // Calculate fair split (60/40 example based on income ratio)
  const partnerAPercentage = 60;
  const partnerBPercentage = 40;
  const monthlyContribution = Math.min(availableMonthly, numericAmount / Math.max(estimatedMonths, 1));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif">
            <Target className="w-5 h-5 text-accent" />
            Nova meta
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal-name">Nome da meta</Label>
              <Input
                id="goal-name"
                placeholder="Ex: Viagem para Itália"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal-amount">Valor total</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                  R$
                </span>
                <Input
                  id="goal-amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={targetAmount ? formatCurrency(parseInt(targetAmount)) : ''}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="h-12 pl-12 text-xl font-semibold font-serif"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          {numericAmount > 0 && (
            <div className="bg-secondary/50 rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Vocês chegam lá em</p>
                  <p className="font-semibold text-foreground">
                    aproximadamente {estimatedMonths} meses
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Divisão proporcional</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-primary/5 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Ana ({partnerAPercentage}%)</p>
                    <p className="font-medium text-foreground">
                      R$ {formatCurrency(Math.round(monthlyContribution * (partnerAPercentage / 100)))}/mês
                    </p>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">João ({partnerBPercentage}%)</p>
                    <p className="font-medium text-foreground">
                      R$ {formatCurrency(Math.round(monthlyContribution * (partnerBPercentage / 100)))}/mês
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={!name.trim() || numericAmount <= 0}
            >
              Criar meta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
