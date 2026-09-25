'use client';

import { motion } from 'framer-motion';
import { Sprout, Sparkles, Check } from 'lucide-react';
import type { CropIntention } from '@/src/types';
import { cn } from '@/lib/utils';

interface CropIntentionSelectorProps {
  selected: CropIntention | null;
  onSelect: (intention: CropIntention) => void;
}

const OPTIONS: {
  id: CropIntention;
  title: string;
  description: string;
  icon: typeof Sprout;
  accent: string;
}[] = [
  {
    id: 'have-crop',
    title: 'I already have a crop in mind',
    description:
      'Tell us which crop you want to grow and we will analyze whether it suits your land.',
    icon: Sprout,
    accent: 'from-primary to-primary-light',
  },
  {
    id: 'suggest-crop',
    title: 'Suggest a crop for me',
    description:
      'Let TERRAFORM analyze your land and recommend the best crops for your conditions.',
    icon: Sparkles,
    accent: 'from-accent to-accent-light',
  },
];

export function CropIntentionSelector({
  selected,
  onSelect,
}: CropIntentionSelectorProps) {
  return (
    <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
      {OPTIONS.map((option, index) => {
        const Icon = option.icon;
        const isSelected = selected === option.id;

        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.1 }}
            onClick={() => onSelect(option.id)}
            className={cn(
              'group relative flex flex-col items-start gap-4 overflow-hidden rounded-3xl border-2 p-6 text-left transition-all',
              isSelected
                ? 'border-primary shadow-soft-lg'
                : 'border-border bg-card hover:border-primary/30 hover:shadow-soft'
            )}
          >
            {/* Gradient accent */}
            <div
              className={cn(
                'absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity',
                option.accent,
                isSelected && 'opacity-100'
              )}
            />

            <div
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-105',
                isSelected
                  ? `bg-gradient-to-br ${option.accent} text-white`
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Icon className="h-7 w-7" strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {option.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>

            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
