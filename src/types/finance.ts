// Types for Duo Finance app

export interface User {
  id: string;
  name: string;
  email: string;
  monthlyIncome: number;
}

export interface Couple {
  id: string;
  partnerA: User;
  partnerB?: User;
  invitePending?: boolean;
}

export interface FixedCost {
  id: string;
  name: string;
  amount: number;
}

export interface OnboardingData {
  step: number;
  coupleName?: string;
  partnerEmail?: string;
  monthlyIncome: number;
  fixedCosts: FixedCost[];
  dailyAverage: number;
}

export interface FinancialSummary {
  totalIncome: number;
  totalFixedCosts: number;
  monthlyLivingCost: number;
  safetyMargin: number;
  availableForGoals: number;
  partnerAContribution: number;
  partnerBContribution: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  estimatedMonths: number;
  createdAt: Date;
}

export interface SimulationResult {
  monthsReduced: number;
  extraAvailable: number;
  newSafetyMargin: number;
  impact: 'positive' | 'negative' | 'neutral';
}
