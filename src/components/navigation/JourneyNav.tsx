'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { JOURNEY_STEPS } from '@/src/data/journey-steps';
import { cn } from '@/lib/utils';

interface JourneyNavProps {
  currentStepId: string;
  nextLabel?: string;
  nextHref?: string;
  canProceed?: boolean;
  onProceed?: () => void;
  className?: string;
}

export function JourneyNav({
  currentStepId,
  nextLabel = 'Continue',
  nextHref,
  canProceed = true,
  onProceed,
  className,
}: JourneyNavProps) {
  const currentIndex = JOURNEY_STEPS.findIndex(
    (step) => step.id === currentStepId
  );
  const prevStep = currentIndex > 0 ? JOURNEY_STEPS[currentIndex - 1] : null;
  const nextStep =
    currentIndex < JOURNEY_STEPS.length - 1
      ? JOURNEY_STEPS[currentIndex + 1]
      : null;

  const nextLink = nextHref ?? nextStep?.path;

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 pt-2',
        className
      )}
    >
      {prevStep ? (
        <Link href={prevStep.path}>
          <Button variant="ghost" size="lg" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextLink && (
        <div className="flex items-center gap-3">
          {onProceed ? (
            <Button
              size="lg"
              className="gap-2 px-6"
              disabled={!canProceed}
              onClick={onProceed}
            >
              {nextLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Link href={nextLink}>
              <Button
                size="lg"
                className="gap-2 px-6"
                disabled={!canProceed}
              >
                {nextLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
