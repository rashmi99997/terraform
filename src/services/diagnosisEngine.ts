import { NUTRIENT_DEFICIENCIES } from '@/src/knowledge-base';

export function diagnoseConditions(conditions: string[]) {
  const findings = [];

  if (conditions.includes('yellowing-leaves')) {
    findings.push({
      issue: 'Possible Nitrogen Deficiency',
      data: NUTRIENT_DEFICIENCIES.nitrogen,
    });
  }

  if (conditions.includes('water-logging')) {
    findings.push({
      issue: 'Drainage Problem Detected',
      data: NUTRIENT_DEFICIENCIES.waterlogging,
    });
  }

  if (conditions.includes('very-dry')) {
    findings.push({
      issue: 'Drought Stress Detected',
      data: NUTRIENT_DEFICIENCIES.drought,
    });
  }

  return findings;
}