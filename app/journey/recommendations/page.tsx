'use client';

import { useEffect, useState } from 'react';
import { Sprout, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { RecommendationCard } from '@/src/components/cards/RecommendationCard';
import { LoadingState } from '@/src/components/common/LoadingState';
import { useJourney } from '@/src/store/journey-store';
import { recommendationService } from '@/src/services';
import type { CropRecommendation } from '@/src/types';

export default function RecommendationsPage() {
  const { state, setSelectedCrop } = useJourney();
  const [recommendations, setRecommendations] = useState<
    CropRecommendation[]
  >([]);
  const [loading, setLoading] = useState(true);

  const soilType =
    typeof state.soil === 'string'
      ? state.soil
      : state.soil?.type ?? null;

  useEffect(() => {
    let active = true;
    setLoading(true);

    console.log('[RecommendationsPage] Resolved soilType from store:', soilType);

    recommendationService
      .getRecommendations(
        state.location,
        soilType,
        state.conditions
      )
      .then((result) => {
        if (active) {
          setRecommendations(result);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [state.location, soilType, state.conditions]);

  const hasSelection = !!state.selectedCrop;

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 7 of 9"
        title="Crop Recommendations"
        subtitle={
          state.cropIntention === 'have-crop'
            ? "Here's how well your intended crop suits your land, along with alternatives to consider."
            : "Based on your land analysis, here are the crops most likely to thrive on your land."
        }
        icon={<Sprout className="h-7 w-7" />}
      />

      {loading && (
        <LoadingState
          label="Finding the best crops for your land..."
          sublabel="Matching your soil, climate, and conditions to suitable crops"
        />
      )}

      {!loading && recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {recommendations.map((crop, index) => (
            <RecommendationCard
              key={crop.id}
              crop={crop}
              index={index}
              selected={state.selectedCrop === crop.id}
              onSelect={setSelectedCrop}
              showSelectButton
            />
          ))}
        </motion.div>
      )}

      {/* Selection confirmation */}
      {hasSelection && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-success/30 bg-success/10 p-4"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
          <p className="text-sm font-medium text-foreground">
            Great choice! Continue to see your personalized growing plan.
          </p>
        </motion.div>
      )}

      <JourneyNav
        currentStepId="recommendations"
        nextLabel="View Growing Plan"
        nextHref="/journey/growing"
        canProceed={hasSelection}
      />
    </div>
  );
}