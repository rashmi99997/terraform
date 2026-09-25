'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Droplets,
  TrendingDown,
  Leaf,
  CheckCircle,
  HelpCircle,
  Check,
} from 'lucide-react';
import { LAND_CONDITIONS } from '@/src/data/mock-data';
import type { LandCondition } from '@/src/types';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, typeof Sun> = {
  sun: Sun,
  droplets: Droplets,
  'trending-down': TrendingDown,
  leaf: Leaf,
  'check-circle': CheckCircle,
  'help-circle': HelpCircle,
};

interface ConditionSelectorProps {
  selected: LandCondition[];
  onToggle: (condition: LandCondition) => void;
}

export function ConditionSelector({ selected, onToggle }: ConditionSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {LAND_CONDITIONS.map((condition, index) => {
        const Icon = ICON_MAP[condition.icon] ?? HelpCircle;
        const isSelected = selected.includes(condition.id);

        return (
          <motion.button
            key={condition.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onToggle(condition.id)}
            className={cn(
              'group relative flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all',
              isSelected
                ? 'border-primary bg-primary/5 shadow-soft-lg'
                : 'border-border bg-card hover:border-primary/30 hover:shadow-soft'
            )}
          >
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-foreground">{condition.label}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {condition.description}
              </p>
            </div>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
