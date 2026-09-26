import { CROP_DATABASE } from '@/src/knowledge-base';

export function getCropRecommendations(soilType: string) {
  return Object.values(CROP_DATABASE).map((crop) => ({
    ...crop,
    score: crop.suitableSoils.includes(soilType) ? 100 : 0,
  }))
  .filter((crop) => crop.score > 0)
  .sort((a, b) => b.score - a.score);
}

export function getBestCrop(soilType: string) {
  const recommendations = getCropRecommendations(soilType);

  if (recommendations.length === 0) {
    return null;
  }

  return recommendations[0];
}