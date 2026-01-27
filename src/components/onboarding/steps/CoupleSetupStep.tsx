import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Users, Mail, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Mode = 'choose' | 'create' | 'join';

export function CoupleSetupStep() {
  const [mode, setMode] = useState<Mode>('choose');
  const { data, setCoupleName, setPartnerEmail } = useOnboarding();

  if (mode === 'choose') {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold">
            Configurar casal
          </h2>
          <p className="text-muted-foreground">
            Como vocês querem começar?
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setMode('create')}
            className={cn(
              "w-full p-5 rounded-xl border-2 border-border bg-card text-left transition-all duration-200",
              "hover:border-primary hover:shadow-md"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Criar novo casal</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Você será quem configura primeiro e convida seu parceiro(a)
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setMode('join')}
            className={cn(
              "w-full p-5 rounded-xl border-2 border-border bg-card text-left transition-all duration-200",
              "hover:border-primary hover:shadow-md"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Entrar em um casal</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Já recebi um convite do meu parceiro(a)
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold">
            Criar novo casal
          </h2>
          <p className="text-muted-foreground">
            Dê um nome e convide seu parceiro(a)
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="couple-name">Nome do casal (opcional)</Label>
            <Input
              id="couple-name"
              type="text"
              placeholder="Ex: Ana & João"
              value={data.coupleName || ''}
              onChange={(e) => setCoupleName(e.target.value)}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Só vocês verão isso
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="partner-email">Email do parceiro(a)</Label>
            <Input
              id="partner-email"
              type="email"
              placeholder="parceiro@email.com"
              value={data.partnerEmail || ''}
              onChange={(e) => setPartnerEmail(e.target.value)}
              className="h-12"
            />
            <p className="text-xs text-muted-foreground">
              Enviaremos um convite para entrar no planejamento
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => setMode('choose')}
          className="w-full"
        >
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold">
          Entrar em um casal
        </h2>
        <p className="text-muted-foreground">
          Insira o código que você recebeu
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="invite-code">Código do convite</Label>
          <Input
            id="invite-code"
            type="text"
            placeholder="XXXX-XXXX"
            className="h-12 text-center text-xl tracking-widest font-mono"
          />
          <p className="text-xs text-muted-foreground text-center">
            Você encontra esse código no email de convite
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => setMode('choose')}
        className="w-full"
      >
        Voltar
      </Button>
    </div>
  );
}
