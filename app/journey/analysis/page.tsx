'use client';

import { useEffect, useState } from 'react';
import { ScanLine, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import {
  AnalysisCard,
  OverallScoreCard,
} from '@/src/components/cards/AnalysisCard';
import { LoadingState } from '@/src/components/common/LoadingState';
import { useJourney } from '@/src/store/journey-store';
import { diagnosisService } from '@/src/services';
import type { LandAnalysis } from '@/src/types';

export default function AnalysisPage() {
  const { state } = useJourney();
  const [analysis, setAnalysis] = useState<LandAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    diagnosisService
      .diagnoseLand(
        state.location,
        state.soil?.type ?? null,
        state.conditions
      )
      .then((result) => {
        if (active) {
          setAnalysis(result);
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [state.location, state.soil?.type, state.conditions]);

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Step 6 of 9"
        title="Land Analysis"
        subtitle="Here's what TERRAFORM has learned about your land based on your profile."
        icon={<ScanLine className="h-7 w-7" />}
      />

      {loading && (
        <LoadingState
          label="Analyzing your land..."
          sublabel="Reviewing location, soil, and conditions to generate your diagnosis"
        />
      )}

      {!loading && analysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Mock data disclaimer */}
          <div className="flex items-start gap-2.5 rounded-xl border border-accent/30 bg-accent/10 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" />
            <div>
              <p className="text-sm font-semibold text-accent-dark">
                Placeholder Analysis
              </p>
              <p className="mt-0.5 text-sm text-accent-dark/80">
                This analysis uses mock data to demonstrate the experience. Real
                AI-powered analysis will replace this in a future update.
              </p>
            </div>
          </div>

          {/* Overall score */}
          <OverallScoreCard score={analysis.overallScore} />

          {/* Analysis sections */}
          <div className="space-y-4">
            {analysis.sections.map((section, index) => (
              <AnalysisCard
                key={section.id}
                section={section}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      )}

      <JourneyNav
        currentStepId="analysis"
        nextLabel="See Crop Recommendations"
        nextHref="/journey/recommendations"
        canProceed={!loading}
      />
    </div>
  );
}
