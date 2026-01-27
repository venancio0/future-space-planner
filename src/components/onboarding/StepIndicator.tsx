import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;

        return (
          <div
            key={stepNumber}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              isActive && "bg-primary scale-110",
              isComplete && "bg-success",
              !isActive && !isComplete && "bg-muted"
            )}
          >
            {isComplete && (
              <div className="w-full h-full flex items-center justify-center">
                <Check className="w-1.5 h-1.5 text-success-foreground" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
