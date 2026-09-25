'use client';

import { CalendarDays, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { TreatmentTimeline } from '@/src/components/timeline/TreatmentTimeline';
import { useJourney } from '@/src/store/journey-store';
import {
  MOCK_GROWTH_STAGES,
  MOCK_TREATMENT_STEPS,
  MOCK_RECOMMENDATIONS,
} from '@/src/data/mock-data';
import type { GrowthStage } from '@/src/types';

export default function GrowingPage() {
  const { state } = useJourney();
  const selectedCrop = MOCK_RECOMMENDATIONS.find(
    (c) => c.id === state.selectedCrop
  );

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 8 of 9"
        title="Your Growing Journey"
        subtitle={
          selectedCrop
            ? `A step-by-step plan for growing ${selectedCrop.name} on your land — from soil preparation to maturity.`
            : 'A step-by-step plan to take you from soil preparation to a mature crop.'
        }
        icon={<CalendarDays className="h-7 w-7" />}
      />

      {/* Selected crop summary */}
      {selectedCrop && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sprout className="h-7 w-7" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Growing
            </p>
            <p className="font-display text-lg font-bold text-foreground">
              {selectedCrop.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {selectedCrop.growingPeriod} · {selectedCrop.difficulty} difficulty
            </p>
          </div>
        </motion.div>
      )}

      {/* Growth stages overview */}
      <div>
        <h2 className="mb-4 font-display text-xl font-bold text-foreground">
          Growth Stages
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_GROWTH_STAGES.map((stage: GrowthStage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent-dark">
                  {stage.period}
                </span>
              </div>
              <h3 className="mt-2.5 font-semibold text-foreground">
                {stage.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Treatment timeline */}
      <div>
        <h2 className="mb-4 font-display text-xl font-bold text-foreground">
          Step-by-Step Growing Plan
        </h2>
        <TreatmentTimeline steps={MOCK_TREATMENT_STEPS} />
      </div>

      <JourneyNav
        currentStepId="growing"
        nextLabel="See the Full Journey"
        nextHref="/journey/harvest"
      />
    </div>
  );
}
