import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, TrendingUp, Users, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <span className="font-serif font-semibold text-xl text-foreground">Duo</span>
        </div>
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          Entrar
        </Button>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Planejamento financeiro para casais
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight">
            Não é sobre quanto vocês gastaram.
            <br />
            <span className="text-primary">É sobre o futuro de vocês.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            Planejem grandes objetivos juntos com clareza, segurança e menos conflito financeiro.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => navigate('/onboarding')}
            >
              Começar agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => navigate('/dashboard')}
            >
              Ver demonstração
            </Button>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="px-6 py-16 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto">
                <TrendingUp className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Visão de futuro</h3>
              <p className="text-muted-foreground">
                Trabalhamos com médias e projeções, não com extratos bancários
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Feito para casais</h3>
              <p className="text-muted-foreground">
                Divisão proporcional e justa, planejamento em conjunto
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Clareza e segurança</h3>
              <p className="text-muted-foreground">
                Saibam quanto podem comprometer com tranquilidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Duo Finance</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Feito para casais que pensam no futuro
          </p>
        </div>
      </footer>
    </div>
  );
}
