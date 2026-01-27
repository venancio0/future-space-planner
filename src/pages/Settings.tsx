import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Wallet, 
  Building2, 
  ShoppingBag, 
  Users, 
  CreditCard, 
  ChevronRight,
  LogOut,
  Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const userData = {
  name: 'Ana',
  email: 'ana@email.com',
  partnerName: 'João',
  partnerEmail: 'joao@email.com',
  income: 9000,
  plan: 'Pro',
};

interface SettingsLinkProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
}

function SettingsLink({ icon, label, value, onClick }: SettingsLinkProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl transition-colors",
        "hover:bg-muted/50"
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium text-foreground">{label}</p>
        {value && <p className="text-sm text-muted-foreground">{value}</p>}
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

export default function Settings() {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR');
  };

  return (
    <AppLayout>
      <div className="space-y-8 animate-fade-in max-w-xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Configurações
          </h1>
          <p className="text-muted-foreground">
            Gerencie seu perfil e planejamento
          </p>
        </div>

        {/* Profile section */}
        <div className="card-base overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Seu perfil</h2>
          </div>
          <div className="divide-y divide-border">
            <div className="p-4">
              <Label htmlFor="name" className="text-muted-foreground text-sm">Nome</Label>
              <Input
                id="name"
                defaultValue={userData.name}
                className="mt-1.5 h-11"
              />
            </div>
            <div className="p-4">
              <Label htmlFor="email" className="text-muted-foreground text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={userData.email}
                className="mt-1.5 h-11"
              />
            </div>
          </div>
        </div>

        {/* Financial settings */}
        <div className="card-base overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Planejamento financeiro</h2>
          </div>
          <div className="divide-y divide-border">
            <SettingsLink
              icon={<Wallet className="w-5 h-5 text-success" />}
              label="Renda mensal"
              value={`R$ ${formatCurrency(userData.income)}`}
            />
            <SettingsLink
              icon={<Building2 className="w-5 h-5 text-accent" />}
              label="Custos fixos"
              value="6 itens cadastrados"
            />
            <SettingsLink
              icon={<ShoppingBag className="w-5 h-5 text-primary" />}
              label="Média diária"
              value="R$ 80/dia"
            />
          </div>
        </div>

        {/* Partner */}
        <div className="card-base overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Parceiro(a)</h2>
          </div>
          <div className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{userData.partnerName}</p>
              <p className="text-sm text-muted-foreground">{userData.partnerEmail}</p>
            </div>
            <Button variant="secondary" size="sm">
              <Mail className="w-4 h-4 mr-1.5" />
              Reenviar convite
            </Button>
          </div>
        </div>

        {/* Billing */}
        <div className="card-base overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="font-semibold text-foreground">Plano e cobrança</h2>
          </div>
          <SettingsLink
            icon={<CreditCard className="w-5 h-5 text-primary" />}
            label="Plano atual"
            value={`${userData.plan} — R$ 29/mês`}
          />
        </div>

        {/* Logout */}
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-4 h-4 mr-2" />
          Sair da conta
        </Button>
      </div>
    </AppLayout>
  );
}
