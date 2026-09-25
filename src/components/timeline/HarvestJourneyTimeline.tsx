'use client';

import { motion } from 'framer-motion';
import {
  Shovel,
  Layers,
  Sprout,
  CheckCircle2,
  Leaf as SeedlingIcon,
  TrendingUp,
  Award,
  type LucideIcon,
} from 'lucide-react';
import type { HarvestStage } from '@/src/types';
import { cn } from '@/lib/utils';

const STAGE_ICONS: Record<string, LucideIcon> = {
  shovel: Shovel,
  layers: Layers,
  sprout: Sprout,
  'check-circle': CheckCircle2,
  seedling: SeedlingIcon,
  'trending-up': TrendingUp,
  award: Award,
};

interface HarvestJourneyTimelineProps {
  stages: HarvestStage[];
  className?: string;
}

export function HarvestJourneyTimeline({
  stages,
  className,
}: HarvestJourneyTimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Background line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />

      <div className="space-y-8">
        {stages.map((stage, index) => {
          const Icon = STAGE_ICONS[stage.icon] ?? Sprout;
          const isFinal = index === stages.length - 1;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
              className="relative flex gap-6"
            >
              {/* Node */}
              <div className="relative z-10 flex shrink-0 items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20,
                    delay: index * 0.12 + 0.2,
                  }}
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border-4 border-background shadow-soft',
                    isFinal
                      ? 'bg-gradient-to-br from-accent to-accent-dark text-white shadow-glow'
                      : stage.completed
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-muted-foreground border-border'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
              </div>

              {/* Content */}
              <div
                className={cn(
                  'flex-1 rounded-2xl border p-5 transition-all',
                  isFinal
                    ? 'border-accent/40 bg-gradient-to-br from-accent/10 to-primary/5 shadow-soft-lg'
                    : 'border-border bg-card shadow-soft'
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-medium',
                      isFinal
                        ? 'bg-accent/20 text-accent-dark'
                        : 'bg-primary/10 text-primary'
                    )}
                  >
                    {stage.period}
                  </span>
                  {stage.completed && (
                    <span className="flex items-center gap-1 text-xs font-medium text-success">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Completed
                    </span>
                  )}
                </div>

                <h3
                  className={cn(
                    'mt-2 font-display text-xl font-bold',
                    isFinal ? 'text-accent-dark' : 'text-foreground'
                  )}
                >
                  {stage.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
