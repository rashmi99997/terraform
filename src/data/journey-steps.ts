import {
  MapPin,
  Layers,
  Eye,
  Sparkles,
  FileText,
  ScanLine,
  Sprout,
  CalendarDays,
  Award,
} from 'lucide-react';

export interface JourneyStep {
  id: string;
  label: string;
  shortLabel: string;
  path: string;
  icon: typeof MapPin;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'location',
    label: 'Location',
    shortLabel: 'Location',
    path: '/journey/location',
    icon: MapPin,
  },
  {
    id: 'soil',
    label: 'Soil',
    shortLabel: 'Soil',
    path: '/journey/soil',
    icon: Layers,
  },
  {
    id: 'condition',
    label: 'Land Condition',
    shortLabel: 'Condition',
    path: '/journey/condition',
    icon: Eye,
  },
  {
    id: 'intention',
    label: 'Crop Intention',
    shortLabel: 'Intention',
    path: '/journey/intention',
    icon: Sparkles,
  },
  {
    id: 'profile',
    label: 'Land Profile',
    shortLabel: 'Profile',
    path: '/journey/profile',
    icon: FileText,
  },
  {
    id: 'analysis',
    label: 'Analysis',
    shortLabel: 'Analysis',
    path: '/journey/analysis',
    icon: ScanLine,
  },
  {
    id: 'recommendations',
    label: 'Recommendations',
    shortLabel: 'Crops',
    path: '/journey/recommendations',
    icon: Sprout,
  },
  {
    id: 'growing',
    label: 'Growing',
    shortLabel: 'Growing',
    path: '/journey/growing',
    icon: CalendarDays,
  },
  {
    id: 'harvest',
    label: 'Harvest',
    shortLabel: 'Harvest',
    path: '/journey/harvest',
    icon: Award,
  },
];
