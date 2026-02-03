import { Calculator, MessageSquareText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimulationsModeToggleProps {
  mode: 'simulations' | 'chat';
  onModeChange: (mode: 'simulations' | 'chat') => void;
}

export function SimulationsModeToggle({ mode, onModeChange }: SimulationsModeToggleProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center bg-muted p-1 rounded-xl">
        <button
          onClick={() => onModeChange('simulations')}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            mode === 'simulations'
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Calculator className="w-4 h-4" />
          <span>Simulações</span>
        </button>
        <button
          onClick={() => onModeChange('chat')}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            mode === 'chat'
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <MessageSquareText className="w-4 h-4" />
          <span>Assistente IA</span>
        </button>
      </div>
    </div>
  );
}
