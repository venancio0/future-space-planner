import { cn } from '@/lib/utils';

interface ContributionSplitProps {
  partnerA: {
    name: string;
    percentage: number;
    amount: number;
  };
  partnerB: {
    name: string;
    percentage: number;
    amount: number;
  };
}

export function ContributionSplit({ partnerA, partnerB }: ContributionSplitProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  return (
    <div className="card-base p-5 space-y-4">
      <h3 className="font-medium text-foreground">Divisão proporcional</h3>
      
      {/* Visual bar */}
      <div className="h-3 w-full rounded-full overflow-hidden flex">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${partnerA.percentage}%` }}
        />
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${partnerB.percentage}%` }}
        />
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="text-sm font-medium text-foreground">{partnerA.name}</span>
          </div>
          <p className="text-lg font-serif font-semibold text-foreground">
            {partnerA.percentage.toFixed(0)}%
          </p>
          <p className="text-sm text-muted-foreground">
            R$ {formatCurrency(partnerA.amount)}/mês
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="text-sm font-medium text-foreground">{partnerB.name}</span>
          </div>
          <p className="text-lg font-serif font-semibold text-foreground">
            {partnerB.percentage.toFixed(0)}%
          </p>
          <p className="text-sm text-muted-foreground">
            R$ {formatCurrency(partnerB.amount)}/mês
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Baseado na proporção de renda de cada pessoa
      </p>
    </div>
  );
}
