'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Gauge,
  Sun,
  Droplets,
  Thermometer,
  Clock,
} from 'lucide-react';
import type { CropRecommendation } from '@/src/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecommendationCardProps {
  crop: CropRecommendation;
  index?: number;
  selected?: boolean;
  onSelect?: (id: string) => void;
  showSelectButton?: boolean;
}

const DIFFICULTY_STYLES = {
  easy: { label: 'Easy', className: 'bg-success/15 text-success' },
  moderate: {
    label: 'Moderate',
    className: 'bg-warning/15 text-warning',
  },
  advanced: { label: 'Advanced', className: 'bg-error/15 text-error' },
};

export function RecommendationCard({
  crop,
  index = 0,
  selected = false,
  onSelect,
  showSelectButton = false,
}: RecommendationCardProps) {
  const difficulty = DIFFICULTY_STYLES[crop.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group overflow-hidden rounded-3xl border-2 bg-card transition-all',
        selected
          ? 'border-primary shadow-soft-lg'
          : 'border-border shadow-soft hover:shadow-soft-lg'
      )}
    >
      {/* Image header */}
      <div className="relative h-44 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={crop.imageUrl}
          alt={crop.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Suitability badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur">
          <Gauge className="h-4 w-4 text-primary" />
          <span className="text-sm font-bold text-foreground">
            {crop.suitabilityScore}%
          </span>
          <span className="text-xs text-muted-foreground">match</span>
        </div>

        {/* Crop name */}
        <div className="absolute bottom-3 left-4 text-white">
          <h3 className="font-display text-xl font-bold">{crop.name}</h3>
          <p className="text-sm text-white/80 italic">{crop.scientificName}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Difficulty + selected */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium',
              difficulty.className
            )}
          >
            {difficulty.label}
          </span>
          {selected && (
            <span className="flex items-center gap-1 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Selected
            </span>
          )}
        </div>

        {/* Why */}
        <p className="text-sm text-muted-foreground">{crop.reason}</p>

        {/* Specs */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <SpecItem
            icon={Clock}
            label="Growing period"
            value={crop.growingPeriod}
          />
          <SpecItem
            icon={Thermometer}
            label="Temperature"
            value={crop.temperature}
          />
          <SpecItem
            icon={Droplets}
            label="Water"
            value={crop.waterRequirement}
          />
          <SpecItem
            icon={Sun}
            label="Conditions"
            value={crop.growingConditions}
          />
        </div>

        {/* Action */}
        {showSelectButton && (
          <Button
            onClick={() => onSelect?.(crop.id)}
            variant={selected ? 'secondary' : 'default'}
            className="mt-5 w-full gap-2"
            size="lg"
          >
            {selected ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Crop Selected
              </>
            ) : (
              <>
                <Circle className="h-4 w-4" />
                Choose this crop
              </>
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-muted/50 p-3">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
