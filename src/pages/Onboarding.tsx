import { useNavigate } from 'react-router-dom';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { WelcomeStep } from '@/components/onboarding/steps/WelcomeStep';
import { CoupleSetupStep } from '@/components/onboarding/steps/CoupleSetupStep';
import { IncomeStep } from '@/components/onboarding/steps/IncomeStep';
import { FixedCostsStep } from '@/components/onboarding/steps/FixedCostsStep';
import { DailyAverageStep } from '@/components/onboarding/steps/DailyAverageStep';
import { ReviewStep } from '@/components/onboarding/steps/ReviewStep';

const TOTAL_STEPS = 6;

function OnboardingContent() {
  const navigate = useNavigate();
  const { data, setStep } = useOnboarding();

  const handleNext = () => {
    if (data.step < TOTAL_STEPS) {
      setStep(data.step + 1);
    } else {
      // Complete onboarding
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (data.step > 1) {
      setStep(data.step - 1);
    }
  };

  const getStepContent = () => {
    switch (data.step) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <CoupleSetupStep />;
      case 3:
        return <IncomeStep />;
      case 4:
        return <FixedCostsStep />;
      case 5:
        return <DailyAverageStep />;
      case 6:
        return <ReviewStep />;
      default:
        return <WelcomeStep />;
    }
  };

  const getNextLabel = () => {
    if (data.step === 1) return 'Começar';
    if (data.step === TOTAL_STEPS) return 'Finalizar';
    return 'Continuar';
  };

  const isNextDisabled = () => {
    switch (data.step) {
      case 3:
        return !data.monthlyIncome || data.monthlyIncome <= 0;
      default:
        return false;
    }
  };

  return (
    <OnboardingLayout
      currentStep={data.step}
      totalSteps={TOTAL_STEPS}
      onBack={handleBack}
      onNext={handleNext}
      nextLabel={getNextLabel()}
      nextDisabled={isNextDisabled()}
      showBack={data.step > 1}
    >
      {getStepContent()}
    </OnboardingLayout>
  );
}

export default function Onboarding() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
