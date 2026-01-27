import { ReactNode } from 'react';
import { StepIndicator } from './StepIndicator';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  nextLabel = "Continuar",
  nextDisabled = false,
  showBack = true,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="w-24">
          {showBack && currentStep > 1 && onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar</span>
            </Button>
          )}
        </div>
        
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        
        <div className="w-24" />
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className={cn(
          "w-full max-w-md mx-auto",
          "animate-fade-in"
        )}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 safe-bottom">
        <div className="max-w-md mx-auto">
          {onNext && (
            <Button
              variant="hero"
              size="xl"
              onClick={onNext}
              disabled={nextDisabled}
              className="w-full"
            >
              {nextLabel}
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
