import { Heart, TrendingUp, Shield } from 'lucide-react';

export function WelcomeStep() {
  return (
    <div className="text-center space-y-8">
      {/* Logo/Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Heart className="w-10 h-10 text-primary" />
        </div>
      </div>

      {/* Title */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
          Bem-vindos ao Duo
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Planejamento financeiro para casais que pensam no futuro
        </p>
      </div>

      {/* Key message */}
      <div className="bg-secondary/50 rounded-2xl p-6 text-left space-y-4">
        <p className="text-foreground font-medium text-base leading-relaxed">
          "Não é sobre quanto vocês gastaram. É sobre quanto podem comprometer com segurança."
        </p>
        <p className="text-muted-foreground text-sm">
          Trabalhamos com médias e previsibilidade — não com extratos ou histórico de gastos.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-4 text-left">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-success" />
          </div>
          <div>
            <p className="font-medium text-foreground">Visão de futuro</p>
            <p className="text-sm text-muted-foreground">Planejem grandes objetivos juntos</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="font-medium text-foreground">Clareza financeira</p>
            <p className="text-sm text-muted-foreground">Menos conflito, mais segurança</p>
          </div>
        </div>
      </div>
    </div>
  );
}
