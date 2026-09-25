'use client';

import { motion } from 'framer-motion';
import {
  Wheat,
  Circle,
  Layers,
  Waves,
  MoreHorizontal,
  HelpCircle,
  Check,
} from 'lucide-react';
import { SOIL_TYPES } from '@/src/data/mock-data';
import type { SoilType } from '@/src/types';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, typeof Wheat> = {
  grain: Wheat,
  circle: Circle,
  layers: Layers,
  waves: Waves,
  'more-horizontal': MoreHorizontal,
  'help-circle': HelpCircle,
};

interface SoilSelectorProps {
  selected: SoilType | null;
  onSelect: (type: SoilType) => void;
}

export function SoilSelector({ selected, onSelect }: SoilSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {SOIL_TYPES.map((soil, index) => {
        const Icon = ICON_MAP[soil.icon] ?? HelpCircle;
        const isSelected = selected === soil.id;

        return (
          <motion.button
            key={soil.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => onSelect(soil.id)}
            className={cn(
              'group relative flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-all',
              isSelected
                ? 'border-primary bg-primary/5 shadow-soft-lg'
                : 'border-border bg-card hover:border-primary/30 hover:shadow-soft'
            )}
          >
            {/* Selected indicator */}
            {isSelected && (
              <motion.div
                layoutId="soil-selected"
                className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <Check className="h-4 w-4" strokeWidth={2.5} />
              </motion.div>
            )}

            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${soil.color}25` }}
            >
              <Icon
                className="h-6 w-6"
                style={{ color: soil.color }}
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h3 className="font-semibold text-foreground">{soil.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {soil.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
