'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Pencil, MapPin, Layers, Eye, Sparkles } from 'lucide-react';
import type { JourneyState, LandCondition } from '@/src/types';
import { LAND_CONDITIONS, SOIL_TYPES } from '@/src/data/mock-data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LandProfileCardProps {
  state: JourneyState;
  editLinks?: boolean;
  className?: string;
}

export function LandProfileCard({
  state,
  editLinks = false,
  className,
}: LandProfileCardProps) {
  const soilLabel =
    SOIL_TYPES.find((s) => s.id === state.soil?.type)?.label ?? 'Not set';
  const conditionLabels = state.conditions
    .map(
      (c) => LAND_CONDITIONS.find((lc) => lc.id === c)?.label ?? (c as string)
    )
    .filter(Boolean) as string[];

  const intentionLabel =
    state.cropIntention === 'have-crop'
      ? 'I have a crop in mind'
      : state.cropIntention === 'suggest-crop'
        ? 'Suggest a crop for me'
        : 'Not set';

  const rows = [
    {
      icon: MapPin,
      label: 'Location',
      value: state.location
        ? `${state.location.label} · ${state.location.region}, ${state.location.country}`
        : 'Not set',
      subValue: state.location?.climateZone,
      editHref: '/journey/location',
    },
    {
      icon: Layers,
      label: 'Soil Type',
      value: soilLabel,
      subValue: state.soil?.analysisResult
        ? `AI analysis: ${state.soil.analysisResult.predictedType} (${Math.round(
            state.soil.analysisResult.confidence * 100
          )}% confidence)`
        : undefined,
      editHref: '/journey/soil',
    },
    {
      icon: Eye,
      label: 'Land Conditions',
      value:
        conditionLabels.length > 0
          ? conditionLabels.join(', ')
          : 'None selected',
      editHref: '/journey/condition',
    },
    {
      icon: Sparkles,
      label: 'Crop Intention',
      value: intentionLabel,
      editHref: '/journey/intention',
    },
  ];

  return (
    <div
      className={cn(
        'overflow-hidden rounded-3xl border border-border bg-card shadow-soft-lg',
        className
      )}
    >
      <div className="border-b border-border bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-4">
        <h2 className="font-display text-xl font-bold text-foreground">
          Your Land Profile
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A summary of everything we know about your land so far
        </p>
      </div>

      <div className="divide-y divide-border">
        {rows.map((row, index) => {
          const Icon = row.icon;
          return (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex items-start gap-4 px-6 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {row.label}
                </p>
                <p className="mt-1 font-medium text-foreground">
                  {row.value}
                </p>
                {row.subValue && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {row.subValue}
                  </p>
                )}
              </div>
              {editLinks && row.editHref && (
                <Link href={row.editHref}>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
