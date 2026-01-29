import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User, Wallet, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserBreakdown {
  name: string;
  income: number;
  fixedCosts: number;
  contributionPercentage: number;
  contributionAmount: number;
}

interface UserFinancialCardProps {
  breakdown: UserBreakdown;
  variant?: 'default' | 'primary';
}

export function UserFinancialCard({ breakdown, variant = 'default' }: UserFinancialCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  const netAmount = breakdown.income - breakdown.fixedCosts;

  return (
    <Card className={cn(
      "h-full",
      variant === 'primary' && "border-primary/20 bg-primary/5"
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          {breakdown.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Income */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Wallet className="w-4 h-4" />
            Renda
          </div>
          <span className="font-semibold text-success">
            R$ {formatCurrency(breakdown.income)}
          </span>
        </div>

        {/* Fixed costs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="w-4 h-4" />
            Custos fixos
          </div>
          <span className="font-medium text-foreground">
            R$ {formatCurrency(breakdown.fixedCosts)}
          </span>
        </div>

        {/* Net */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Líquido</span>
            <span className={cn(
              "font-semibold",
              netAmount >= 0 ? "text-foreground" : "text-destructive"
            )}>
              R$ {formatCurrency(netAmount)}
            </span>
          </div>
        </div>

        {/* Contribution */}
        <div className="p-3 rounded-lg bg-muted/50 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Contribuição justa</span>
            <span className="font-semibold text-primary">
              {breakdown.contributionPercentage.toFixed(0)}%
            </span>
          </div>
          <Progress value={breakdown.contributionPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground text-center">
            R$ {formatCurrency(breakdown.contributionAmount)}/mês
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
