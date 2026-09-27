import {
  CROP_DATABASE,
  FALLBACK_CROPS,
  type Crop,
} from '@/src/knowledge-base';
import type { CropRecommendation } from '@/src/types';

const DIFFICULTIES = ['easy', 'moderate', 'advanced'] as const;
type Difficulty = (typeof DIFFICULTIES)[number];

function normalizeSoilType(soilType: string): string {
  const lower = soilType.toLowerCase().trim();
  if (lower.includes('sand')) return 'sandy';
  if (lower.includes('clay')) return 'clay';
  if (lower.includes('silt')) return 'silty';
  if (lower.includes('loam')) return 'loamy';
  return lower;
}

function toDifficulty(value: string): Difficulty {
  return DIFFICULTIES.includes(value as Difficulty)
    ? (value as Difficulty)
    : 'moderate';
}

function toSuitabilityPercent(score: number): number {
  if (score <= 1) {
    return Math.round(score * 100);
  }
  return Math.round(score);
}

export function mapCropToRecommendation(crop: Crop): CropRecommendation {
  return {
    id: crop.id,
    name: crop.name,
    scientificName: crop.scientificName,
    suitabilityScore: toSuitabilityPercent(crop.suitabilityScore),
    reason: crop.reason,
    growingConditions: crop.growingConditions,
    growingPeriod: crop.growingPeriod,
    waterRequirement: crop.waterRequirement,
    temperature: crop.temperature,
    difficulty: toDifficulty(crop.difficulty),
    imageUrl: crop.imageUrl,
  };
}

export function getCropRecommendations(soilType: string): CropRecommendation[] {
  console.log('SOIL RECEIVED:', soilType);

  const normalized = normalizeSoilType(soilType);
  const matches = Object.values(CROP_DATABASE).filter((crop) =>
    crop.suitableSoils.includes(normalized)
  );
  const crops = matches.length > 0 ? matches : FALLBACK_CROPS;

  return crops
    .map(mapCropToRecommendation)
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}

export function getBestCrop(soilType: string): CropRecommendation | null {
  const recommendations = getCropRecommendations(soilType);
  return recommendations[0] ?? null;
}
