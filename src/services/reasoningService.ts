// src/services/reasoningService.ts

import { SOIL_KNOWLEDGE } from '@/src/knowledge-base/soil-types';
import { CROP_DATABASE } from '@/src/knowledge-base/crop-database';

export function getCropRecommendations(soilType: string) {
  const recommendations = [];

  for (const crop of Object.values(CROP_DATABASE)) {
    if (crop.suitableSoils.includes(soilType)) {
      recommendations.push(crop);
    }
  }

  return recommendations;
}