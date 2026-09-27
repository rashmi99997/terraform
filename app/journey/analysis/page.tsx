'use client';

import { useEffect, useState } from 'react';
import { ScanLine, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/src/components/common/PageHeader';
import { JourneyNav } from '@/src/components/navigation/JourneyNav';
import {
  AnalysisCard,
  OverallScoreCard,
} from '@/src/components/cards/AnalysisCard';
import { LoadingState } from '@/src/components/common/LoadingState';
import { useJourney } from '@/src/store/journey-store';

interface GeminiAnalysis {
  overallScore: number;
  sections: Array<{
    id: string;
    title: string;
    status: 'good' | 'warning' | 'critical';
    summary: string;
    findings: string[];
  }>;
  summaryReport: string;
}

export default function AnalysisPage() {
  const { state } = useJourney();
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    async function fetchGeminiAnalysis() {
      try {
        // 1. Get soil type safely
        const soilTypeParam =
          typeof state.soil === 'string'
            ? state.soil
            : state.soil?.type ?? 'Sandy Soil';

        // 2. Get reported conditions safely as readable text
        const conditionsParam = Array.isArray(state.conditions)
          ? state.conditions.join(', ')
          : state.conditions || 'None reported';

        // 3. Get location safely
        const locationParam =
          typeof state.location === 'string'
            ? state.location
            : state.location?.region || 'Unspecified';

        const res = await fetch('/api/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            soilType: soilTypeParam,
            reportedConditions: conditionsParam,
            location: locationParam,
          }),
        });

        if (!res.ok) {
          throw new Error(`Server status: ${res.status}`);
        }

        const data = await res.json();

        if (active) {
          if (data && typeof data.overallScore === 'number') {
            setAnalysis(data);
          } else {
            throw new Error('Invalid JSON structure returned');
          }
        }
      } catch (err: any) {
        console.error('Error fetching Gemini AI report:', err);
        if (active) {
          setError(err.message || 'Failed to load report');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchGeminiAnalysis();

    return () => {
      active = false;
    };
  }, [state.location, state.soil, state.conditions]);

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
          label="Generating AI Land Report..."
          sublabel="Analyzing location, soil parameters, and environmental conditions with Gemini AI"
        />
      )}

      {error && !loading && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Unable to load AI Analysis</p>
            <p className="text-sm">{error}. Please check your browser console or terminal logs.</p>
          </div>
        </div>
      )}

      {!loading && analysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Live AI Status Badge */}
          <div className="flex items-start gap-2.5 rounded-xl border border-primary/30 bg-primary/10 p-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold text-primary">
                Gemini AI Reasoning Active
              </p>
              <p className="mt-0.5 text-sm text-primary/80">
                Land health scores and diagnostic cards are computed live by Gemini based on your specific parameters.
              </p>
            </div>
          </div>

          {/* Dynamic Overall Score */}
          <OverallScoreCard score={analysis.overallScore} />

          {/* AI Summary Card */}
          {analysis.summaryReport && (
            <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-2">
              <h3 className="text-md font-bold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Agronomist Summary
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {analysis.summaryReport}
              </p>
            </div>
          )}

          {/* Dynamic Analysis Sections */}
          <div className="space-y-4">
            {analysis.sections.map((section, index) => (
              <AnalysisCard
                key={section.id || index}
                section={section as any}
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