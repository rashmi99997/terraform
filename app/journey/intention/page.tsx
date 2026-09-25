'use client';

import { Sparkles } from 'lucide-react';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { CropIntentionSelector } from '@/src/components/forms/CropIntentionSelector';
import { useJourney } from '@/src/store/journey-store';

export default function CropIntentionPage() {
  const { state, setCropIntention } = useJourney();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 4 of 9"
        title="What would you like to do?"
        subtitle="Do you already have a crop in mind, or would you like TERRAFORM to suggest one based on your land?"
        icon={<Sparkles className="h-7 w-7" />}
      />

      <CropIntentionSelector
        selected={state.cropIntention}
        onSelect={setCropIntention}
      />

      <JourneyNav
        currentStepId="intention"
        nextLabel="Review My Land Profile"
        canProceed={!!state.cropIntention}
      />
    </div>
  );
}
