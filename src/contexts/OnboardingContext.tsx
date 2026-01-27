import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingData, FixedCost } from '@/types/finance';

interface OnboardingContextType {
  data: OnboardingData;
  setStep: (step: number) => void;
  setCoupleName: (name: string) => void;
  setPartnerEmail: (email: string) => void;
  setMonthlyIncome: (income: number) => void;
  addFixedCost: (cost: FixedCost) => void;
  removeFixedCost: (id: string) => void;
  updateFixedCost: (id: string, updates: Partial<FixedCost>) => void;
  setDailyAverage: (average: number) => void;
  resetOnboarding: () => void;
}

const defaultData: OnboardingData = {
  step: 1,
  monthlyIncome: 0,
  fixedCosts: [],
  dailyAverage: 50,
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(defaultData);

  const setStep = (step: number) => setData(prev => ({ ...prev, step }));
  
  const setCoupleName = (coupleName: string) => setData(prev => ({ ...prev, coupleName }));
  
  const setPartnerEmail = (partnerEmail: string) => setData(prev => ({ ...prev, partnerEmail }));
  
  const setMonthlyIncome = (monthlyIncome: number) => setData(prev => ({ ...prev, monthlyIncome }));
  
  const addFixedCost = (cost: FixedCost) => setData(prev => ({
    ...prev,
    fixedCosts: [...prev.fixedCosts, cost],
  }));
  
  const removeFixedCost = (id: string) => setData(prev => ({
    ...prev,
    fixedCosts: prev.fixedCosts.filter(c => c.id !== id),
  }));
  
  const updateFixedCost = (id: string, updates: Partial<FixedCost>) => setData(prev => ({
    ...prev,
    fixedCosts: prev.fixedCosts.map(c => c.id === id ? { ...c, ...updates } : c),
  }));
  
  const setDailyAverage = (dailyAverage: number) => setData(prev => ({ ...prev, dailyAverage }));
  
  const resetOnboarding = () => setData(defaultData);

  return (
    <OnboardingContext.Provider value={{
      data,
      setStep,
      setCoupleName,
      setPartnerEmail,
      setMonthlyIncome,
      addFixedCost,
      removeFixedCost,
      updateFixedCost,
      setDailyAverage,
      resetOnboarding,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
