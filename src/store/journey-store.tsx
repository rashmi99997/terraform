'use client';

// ============================================================================
// TERRAFORM — Journey Store
// Central state for the multi-step wizard. Uses React Context so any
// page in the journey can read or update the user's collected answers.
// ============================================================================

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type {
  CropIntention,
  JourneyState,
  LandCondition,
  LocationInfo,
  SoilInfo,
  SoilType,
} from '@/src/types';

const initialState: JourneyState = {
  location: null,
  soil: null,
  conditions: [],
  cropIntention: null,
  selectedCrop: null,
};

interface JourneyContextValue {
  state: JourneyState;
  setLocation: (location: LocationInfo) => void;
  setSoil: (soil: SoilInfo) => void;
  setSoilType: (type: SoilType) => void;
  toggleCondition: (condition: LandCondition) => void;
  setCropIntention: (intention: CropIntention) => void;
  setSelectedCrop: (cropId: string) => void;
  reset: () => void;
}

const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JourneyState>(initialState);

  const setLocation = useCallback((location: LocationInfo) => {
    setState((prev) => ({ ...prev, location }));
  }, []);

  const setSoil = useCallback((soil: SoilInfo) => {
    setState((prev) => ({ ...prev, soil }));
  }, []);

  const setSoilType = useCallback(
    (type: SoilType) => {
      setState((prev) => ({
        ...prev,
        soil: {
          type,
          imageUrl: prev.soil?.imageUrl,
          analysisResult: prev.soil?.analysisResult,
        },
      }));
    },
    []
  );

  const toggleCondition = useCallback((condition: LandCondition) => {
    setState((prev) => {
      const exists = prev.conditions.includes(condition);
      return {
        ...prev,
        conditions: exists
          ? prev.conditions.filter((c) => c !== condition)
          : [...prev.conditions, condition],
      };
    });
  }, []);

  const setCropIntention = useCallback((intention: CropIntention) => {
    setState((prev) => ({ ...prev, cropIntention: intention }));
  }, []);

  const setSelectedCrop = useCallback((cropId: string) => {
    setState((prev) => ({ ...prev, selectedCrop: cropId }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo<JourneyContextValue>(
    () => ({
      state,
      setLocation,
      setSoil,
      setSoilType,
      toggleCondition,
      setCropIntention,
      setSelectedCrop,
      reset,
    }),
    [
      state,
      setLocation,
      setSoil,
      setSoilType,
      toggleCondition,
      setCropIntention,
      setSelectedCrop,
      reset,
    ]
  );

  return (
    <JourneyContext.Provider value={value}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return ctx;
}
