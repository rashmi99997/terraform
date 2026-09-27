// src/knowledge-base/crop-database.ts

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  suitableSoils: string[];
  waterNeed: string;
  durationDays: number;
  temperature: string;
  difficulty: string;
  suitabilityScore: number;
  reason: string;
  growingConditions: string;
  growingPeriod: string;
  waterRequirement: string;
  imageUrl: string;
}

export const CROP_DATABASE: Record<string, Crop> = {
  tomato: {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    suitableSoils: ['loamy', 'sandy'],
    waterNeed: 'medium',
    durationDays: 80,
    temperature: '18-30°C',
    difficulty: 'moderate',
    suitabilityScore: 0.88,
    reason: 'Thrives in warm temperatures with moderate, well-drained loamy soils.',
    growingConditions: 'Full sun exposure with rich organic matter and good drainage.',
    growingPeriod: '70 - 90 days',
    waterRequirement: 'Moderate (600 - 800 mm)',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
  },

  maize: {
    id: 'maize',
    name: 'Maize',
    scientificName: 'Zea mays',
    suitableSoils: ['loamy', 'sandy'],
    waterNeed: 'medium',
    durationDays: 110,
    temperature: '20-32°C',
    difficulty: 'moderate',
    suitabilityScore: 0.85,
    reason: 'Highly adaptable crop suited for deep, well-drained loamy to sandy soils.',
    growingConditions: 'Warm climate with ample sunlight and balanced nutrient availability.',
    growingPeriod: '100 - 120 days',
    waterRequirement: 'Moderate (500 - 800 mm)',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
  },

  rice: {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    suitableSoils: ['clay', 'silty'],
    waterNeed: 'high',
    durationDays: 120,
    temperature: '22-32°C',
    difficulty: 'advanced',
    suitabilityScore: 0.95,
    reason: 'Ideal for heavy clay or silty soils with high water retention capacity.',
    growingConditions: 'Flooded paddy environment or moisture-saturated heavy soil.',
    growingPeriod: '120 - 150 days',
    waterRequirement: 'High (1200 - 1400 mm)',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
  },

  wheat: {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    suitableSoils: ['loamy', 'silty'],
    waterNeed: 'medium',
    durationDays: 120,
    temperature: '15-25°C',
    difficulty: 'easy',
    suitabilityScore: 0.90,
    reason: 'Grows exceptionally well in cool conditions across fertile silty and loamy soils.',
    growingConditions: 'Cool growing season followed by warm weather for ripening.',
    growingPeriod: '110 - 130 days',
    waterRequirement: 'Moderate (450 - 650 mm)',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
  },

  soybean: {
    id: 'soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    suitableSoils: ['loamy'],
    waterNeed: 'medium',
    durationDays: 110,
    temperature: '20-30°C',
    difficulty: 'easy',
    suitabilityScore: 0.86,
    reason: 'Excellent nitrogen-fixing legume that thrives in loamy profiles.',
    growingConditions: 'Well-drained soils with balanced pH and moderate moisture levels.',
    growingPeriod: '90 - 110 days',
    waterRequirement: 'Moderate (450 - 700 mm)',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
  },

  groundnut: {
    id: 'groundnut',
    name: 'Groundnut',
    scientificName: 'Arachis hypogaea',
    suitableSoils: ['sandy'],
    waterNeed: 'low-medium',
    durationDays: 110,
    temperature: '22-30°C',
    difficulty: 'easy',
    suitabilityScore: 0.92,
    reason: 'Loose sandy soils allow easy subterranean pod penetration and development.',
    growingConditions: 'Friable, well-drained sandy soil under warm sunny weather.',
    growingPeriod: '100 - 120 days',
    waterRequirement: 'Low to Moderate (500 - 700 mm)',
    imageUrl: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&w=800&q=80',
  },
};

export const FALLBACK_CROPS: Crop[] = [
  CROP_DATABASE.maize,
  CROP_DATABASE.tomato,
];