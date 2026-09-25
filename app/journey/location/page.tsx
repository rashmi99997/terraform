'use client';

import { MapPin } from 'lucide-react';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { LocationPicker } from '@/src/components/forms/LocationPicker';
import { useJourney } from '@/src/store/journey-store';

export default function LocationPage() {
  const { state, setLocation } = useJourney();

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 1 of 9"
        title="Where is your land?"
        subtitle="Tell us the location of your land so we can understand the local climate and growing conditions."
        icon={<MapPin className="h-7 w-7" />}
      />

      <LocationPicker
        onSelect={setLocation}
        selected={state.location}
      />

      <JourneyNav
        currentStepId="location"
        nextLabel="Continue to Soil"
        canProceed={!!state.location}
      />
    </div>
  );
}
