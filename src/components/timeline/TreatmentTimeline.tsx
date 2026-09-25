'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Loader2,
  CircleDot,
  Sprout,
  Shovel,
  FlaskConical,
  Droplets,
  Eye,
  Bug,
  FlaskRound,
  type LucideIcon,
} from 'lucide-react';
import type { TreatmentStep } from '@/src/types';
import { cn } from '@/lib/utils';

const PHASE_ICONS: Record<string, LucideIcon> = {
  'soil-prep': Shovel,
  treatment: FlaskConical,
  planting: Sprout,
  'water-management': Droplets,
  'crop-care': Eye,
  'pest-monitoring': Bug,
  fertilizer: FlaskRound,
};

const STATUS_CONFIG = {
  completed: {
    icon: CheckCircle2,
    iconClass: 'text-success bg-success/10',
    lineClass: 'bg-success',
  },
  active: {
    icon: Loader2,
    iconClass: 'text-primary bg-primary/10',
    lineClass: 'bg-primary',
    spin: true,
  },
  upcoming: {
    icon: Circle,
    iconClass: 'text-muted-foreground bg-muted/50',
    lineClass: 'bg-border',
  },
};

interface TreatmentTimelineProps {
  steps: TreatmentStep[];
  className?: string;
}

export function TreatmentTimeline({ steps, className }: TreatmentTimelineProps) {
  return (
    <div className={cn('space-y-1', className)}>
      {steps.map((step, index) => {
        const StepIcon = PHASE_ICONS[step.id] ?? Sprout;
        const status = STATUS_CONFIG[step.status];
        const StatusIcon = status.icon;
        const isLast = index === steps.length - 1;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="flex gap-4"
          >
            {/* Timeline rail */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors',
                  step.status === 'active'
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : step.status === 'completed'
                      ? 'bg-success/10 text-success'
                      : 'bg-muted text-muted-foreground'
                )}
              >
                <StepIcon className="h-5 w-5" />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'mt-2 w-0.5 flex-1 min-h-[40px] rounded-full transition-colors',
                    status.lineClass
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div
              className={cn(
                'mb-6 flex-1 rounded-2xl border p-5 transition-all',
                step.status === 'active'
                  ? 'border-primary/30 bg-primary/5 shadow-soft'
                  : 'border-border bg-card'
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent-dark">
                  {step.phase}
                </span>
                <span className="text-xs text-muted-foreground">
                  {step.duration}
                </span>
                <div
                  className={cn(
                    'ml-auto flex items-center gap-1.5 text-xs font-medium',
                    status.iconClass.includes('success')
                      ? 'text-success'
                      : status.iconClass.includes('primary')
                        ? 'text-primary'
                        : 'text-muted-foreground'
                  )}
                >
                  <StatusIcon
                    className={cn(
                      'h-4 w-4',
                      step.status === 'active' && 'animate-spin'
                    )}
                  />
                  {step.status === 'completed'
                    ? 'Completed'
                    : step.status === 'active'
                      ? 'In Progress'
                      : 'Upcoming'}
                </div>
              </div>

              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {step.description}
              </p>

              <ul className="mt-4 space-y-2">
                {step.tasks.map((task, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
