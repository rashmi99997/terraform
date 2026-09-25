'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { JOURNEY_STEPS } from '@/src/data/journey-steps';
import { cn } from '@/lib/utils';

interface ProgressStepperProps {
  className?: string;
}

export function ProgressStepper({ className }: ProgressStepperProps) {
  const pathname = usePathname();
  const currentIndex = JOURNEY_STEPS.findIndex(
    (step) => step.path === pathname
  );

  return (
    <nav
      aria-label="Journey progress"
      className={cn('w-full', className)}
    >
      {/* Desktop: horizontal steps */}
      <div className="hidden items-center justify-center md:flex">
        <div className="flex items-center gap-1">
          {JOURNEY_STEPS.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const StepIcon = step.icon;

            return (
              <div key={step.id} className="flex items-center">
                <Link
                  href={step.path}
                  className={cn(
                    'group flex flex-col items-center gap-2 transition-all',
                    index > currentIndex + 1 && 'pointer-events-none'
                  )}
                >
                  <div className="relative flex items-center">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                        isCompleted &&
                          'border-primary bg-primary text-primary-foreground',
                        isCurrent &&
                          'border-primary bg-primary/10 text-primary shadow-glow',
                        !isCompleted &&
                          !isCurrent &&
                          'border-border bg-card text-muted-foreground'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" strokeWidth={2.5} />
                      ) : (
                        <StepIcon className="h-4.5 w-4.5" />
                      )}
                    </div>
                    {isCurrent && (
                      <motion.div
                        layoutId="stepper-glow"
                        className="absolute -inset-1 rounded-full bg-primary/20 blur-sm"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      'max-w-[80px] text-center text-xs font-medium transition-colors',
                      isCurrent
                        ? 'text-foreground'
                        : isCompleted
                          ? 'text-primary'
                          : 'text-muted-foreground'
                    )}
                  >
                    {step.shortLabel}
                  </span>
                </Link>
                {index < JOURNEY_STEPS.length - 1 && (
                  <div
                    className={cn(
                      'mx-1 h-0.5 w-8 rounded-full transition-colors duration-300 lg:w-12',
                      isCompleted ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: compact progress bar */}
      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {JOURNEY_STEPS[currentIndex]?.label ?? 'Journey'}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {JOURNEY_STEPS.length}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / JOURNEY_STEPS.length) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </nav>
  );
}
