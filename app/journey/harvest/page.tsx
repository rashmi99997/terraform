'use client';

import { Award, Sprout, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { HarvestJourneyTimeline } from '@/src/components/timeline/HarvestJourneyTimeline';
import { useJourney } from '@/src/store/journey-store';
import { MOCK_HARVEST_STAGES, MOCK_RECOMMENDATIONS } from '@/src/data/mock-data';

export default function HarvestPage() {
  const { state, reset } = useJourney();
  const selectedCrop = MOCK_RECOMMENDATIONS.find(
    (c) => c.id === state.selectedCrop
  );

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 9 of 9"
        title="Your Harvest Journey"
        subtitle="From bare soil to a full harvest — here's the complete story of your agricultural journey."
        icon={<Award className="h-7 w-7" />}
      />

      {/* Celebration banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-primary/5 to-primary/10 p-8 text-center shadow-soft-lg"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="relative">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-dark text-white shadow-glow"
          >
            <Award className="h-10 w-10" strokeWidth={1.5} />
          </motion.div>

          <h2 className="font-display text-3xl font-bold text-foreground">
            You did it!
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            {selectedCrop
              ? `You've completed the journey from understanding your land to growing ${selectedCrop.name}. Your land has reached its full potential.`
              : "You've completed the journey from understanding your land to preparing for harvest. Your land has reached its full potential."}
          </p>

          {state.location && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="rounded-full bg-white/60 px-3 py-1 backdrop-blur">
                {state.location.label}
              </span>
              {selectedCrop && (
                <span className="flex items-center gap-1 rounded-full bg-white/60 px-3 py-1 backdrop-blur">
                  <Sprout className="h-3.5 w-3.5 text-primary" />
                  {selectedCrop.name}
                </span>
              )}
              <span className="flex items-center gap-1 rounded-full bg-white/60 px-3 py-1 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-accent-dark" />
                Harvest Complete
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full journey timeline */}
      <div>
        <h2 className="mb-6 font-display text-xl font-bold text-foreground">
          The Complete Journey
        </h2>
        <HarvestJourneyTimeline stages={MOCK_HARVEST_STAGES} />
      </div>

      {/* What's next */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft"
      >
        <h3 className="font-display text-xl font-bold text-foreground">
          What&apos;s Next?
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          This is the frontend experience of TERRAFORM. In the future, real AI
          analysis, weather data, and soil image recognition will power every
          step of your journey.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            onClick={reset}
            className="gap-2"
          >
            Start a New Journey
          </Button>
          <Link href="/">
            <Button className="gap-2">
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>

      <JourneyNav currentStepId="harvest" nextLabel="Complete" />
    </div>
  );
}
