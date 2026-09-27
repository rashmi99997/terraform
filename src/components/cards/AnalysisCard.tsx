'use client';

import { motion } from 'framer-motion';
import {
  Map,
  Layers,
  CloudSun,
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  TrendingUp,
} from 'lucide-react';
import type { AnalysisSection } from '@/src/types';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, typeof Map> = {
  map: Map,
  layers: Layers,
  'cloud-sun': CloudSun,
  'alert-triangle': AlertTriangle,
  Sprout: Map,
  AlertTriangle: AlertTriangle,
};

const SEVERITY_STYLES = {
  good: {
    icon: CheckCircle2,
    badge: 'bg-success/15 text-success',
    border: 'border-success/30',
    label: 'Good',
  },
  moderate: {
    icon: CircleAlert,
    badge: 'bg-warning/15 text-warning',
    border: 'border-warning/30',
    label: 'Moderate',
  },
  concern: {
    icon: AlertTriangle,
    badge: 'bg-error/15 text-error',
    border: 'border-error/30',
    label: 'Needs Attention',
  },
};

interface AnalysisCardProps {
  section: AnalysisSection;
  index?: number;
}

export function AnalysisCard({ section, index = 0 }: AnalysisCardProps) {
  const Icon = ICON_MAP[section.icon] ?? Map;

  const getStyleKey = (sev: string) => {
    const s = String(sev || '').toLowerCase();
    if (['good', 'optimal', 'low', 'healthy'].includes(s)) return 'good';
    if (['concern', 'critical', 'high', 'warning'].includes(s)) return 'concern';
    return 'moderate';
  };

  const styleKey = getStyleKey(section.severity);
  const severity = SEVERITY_STYLES[styleKey];
  const SeverityIcon = severity.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'rounded-2xl border bg-card p-5 shadow-soft transition-shadow hover:shadow-soft-lg',
        severity.border
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {section.title}
            </h3>
            <span
              className={cn(
                'flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
                severity.badge
              )}
            >
              <SeverityIcon className="h-3 w-3" />
              {severity.label}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">{section.summary}</p>

          <ul className="mt-4 space-y-2">
            {(section.details || []).map((detail, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

interface OverallScoreCardProps {
  score: number;
}

export function OverallScoreCard({ score }: OverallScoreCardProps) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 text-center shadow-soft"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            strokeWidth="8"
            className="stroke-border"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className="stroke-primary"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-3xl font-bold text-foreground">
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center gap-1.5">
          <TrendingUp className="h-4 w-4 text-success" />
          <p className="font-semibold text-foreground">Land Health Score</p>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Your land shows good potential with a few areas to address
        </p>
      </div>
    </motion.div>
  );
}