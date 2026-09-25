'use client';

import { Layers } from 'lucide-react';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { SoilSelector } from '@/src/components/forms/SoilSelector';
import { SoilUploadCard } from '@/src/components/forms/SoilUploadCard';
import { useJourney } from '@/src/store/journey-store';
import type { SoilAnalysisPlaceholder } from '@/src/types';

export default function SoilPage() {
  const { state, setSoilType, setSoil } = useJourney();

  const handleImageChange = (url: string | undefined) => {
    if (!state.soil) return;
    setSoil({ ...state.soil, imageUrl: url, analysisResult: undefined });
  };

  const handleAnalysisComplete = (result: SoilAnalysisPlaceholder) => {
    if (!state.soil) return;
    setSoil({ ...state.soil, analysisResult: result });
  };

  const hasSoilImage = !!state.soil?.imageUrl;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 2 of 9"
        title="What do you know about your soil?"
        subtitle="Select your soil type below. You can also upload a photo for analysis — but that's completely optional."
        icon={<Layers className="h-7 w-7" />}
      />

      <div className="space-y-8">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Soil Type
          </h3>
          <SoilSelector
            selected={state.soil?.type ?? null}
            onSelect={setSoilType}
          />
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Soil Photo Analysis (Optional)
          </h3>
          <SoilUploadCard
            imageUrl={state.soil?.imageUrl}
            onImageChange={handleImageChange}
            analysisResult={state.soil?.analysisResult}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
      </div>

      <JourneyNav
        currentStepId="soil"
        nextLabel="Continue to Land Condition"
        canProceed={!!state.soil?.type}
      />
    </div>
  );
}
