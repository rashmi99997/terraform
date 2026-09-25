'use client';

import { Eye } from 'lucide-react';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { ConditionSelector } from '@/src/components/forms/ConditionSelector';
import { useJourney } from '@/src/store/journey-store';

export default function LandConditionPage() {
  const { state, toggleCondition } = useJourney();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 3 of 9"
        title="What do you notice about your land?"
        subtitle="Select any conditions you've observed. You can choose multiple — this helps us understand what your land needs."
        icon={<Eye className="h-7 w-7" />}
      />

      <ConditionSelector
        selected={state.conditions}
        onToggle={toggleCondition}
      />

      {state.conditions.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          {state.conditions.length} condition
          {state.conditions.length > 1 ? 's' : ''} selected
        </p>
      )}

      <JourneyNav
        currentStepId="condition"
        nextLabel="Continue to Crop Intention"
        canProceed={state.conditions.length > 0}
      />
    </div>
  );
}
