import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Mail } from 'lucide-react';

interface UserFinancialCardPlaceholderProps {
  onInvite?: () => void;
}

export function UserFinancialCardPlaceholder({ onInvite }: UserFinancialCardPlaceholderProps) {
  return (
    <Card className="h-full border-dashed border-2 bg-muted/20">
      <CardContent className="flex flex-col items-center justify-center h-full min-h-[280px] p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <UserPlus className="w-7 h-7 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">Parceiro(a) não conectado</h3>
          <p className="text-sm text-muted-foreground max-w-[200px]">
            Convide seu parceiro(a) para ter a visão financeira completa do casal
          </p>
        </div>
        {onInvite && (
          <Button variant="outline" size="sm" onClick={onInvite}>
            <Mail className="w-4 h-4 mr-2" />
            Enviar convite
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
