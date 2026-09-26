// src/knowledge-base/crop-database.ts

export const CROP_DATABASE = {
  tomato: {
    name: 'Tomato',
    suitableSoils: ['loamy', 'sandy'],
    waterNeed: 'medium',
    durationDays: 80,
    temperature: '18-30°C',
    difficulty: 'moderate',
  },

  maize: {
    name: 'Maize',
    suitableSoils: ['loamy', 'sandy'],
    waterNeed: 'medium',
    durationDays: 110,
    temperature: '20-32°C',
    difficulty: 'moderate',
  },

  rice: {
    name: 'Rice',
    suitableSoils: ['clay', 'silty'],
    waterNeed: 'high',
    durationDays: 120,
    temperature: '22-32°C',
    difficulty: 'advanced',
  },

  wheat: {
    name: 'Wheat',
    suitableSoils: ['loamy', 'silty'],
    waterNeed: 'medium',
    durationDays: 120,
    temperature: '15-25°C',
    difficulty: 'easy',
  },

  soybean: {
    name: 'Soybean',
    suitableSoils: ['loamy'],
    waterNeed: 'medium',
    durationDays: 110,
    temperature: '20-30°C',
    difficulty: 'easy',
  },

  groundnut: {
    name: 'Groundnut',
    suitableSoils: ['sandy'],
    waterNeed: 'low',
    durationDays: 100,
    temperature: '20-30°C',
    difficulty: 'easy',
  },
};