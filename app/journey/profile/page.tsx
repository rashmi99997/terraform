'use client';

import { FileText, ScanLine } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import { LandProfileCard } from '@/src/components/cards/LandProfileCard';
import { useJourney } from '@/src/store/journey-store';
import { diagnosisService } from '@/src/services';

export default function LandProfilePage() {
  const { state } = useJourney();
  const router = useRouter();

  const handleAnalyze = async () => {
    // Kick off the diagnosis service (placeholder) so it's "warm"
    // when the user lands on the analysis page.
    diagnosisService.diagnoseLand(
      state.location,
      state.soil?.type ?? null,
      state.conditions
    );
    router.push('/journey/analysis');
  };

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 5 of 9"
        title="Your Land Profile"
        subtitle="Here's everything we've gathered about your land. Review the details and edit anything that needs changing before we analyze."
        icon={<FileText className="h-7 w-7" />}
      />

      <LandProfileCard state={state} editLinks />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col items-center gap-4 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft-lg">
          <ScanLine className="h-8 w-8" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">
            Ready to analyze your land?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            TERRAFORM will review your land profile and provide a detailed
            diagnosis, soil interpretation, and crop recommendations.
          </p>
        </div>
        <Button
          size="lg"
          className="gap-2 px-8"
          onClick={handleAnalyze}
        >
          <ScanLine className="h-4 w-4" />
          Analyze My Land
        </Button>
      </motion.div>

      <JourneyNav
        currentStepId="profile"
        nextLabel="Analyze My Land"
        nextHref="/journey/analysis"
      />
    </div>
  );
}
