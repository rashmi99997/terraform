// src/knowledge-base/treatments.ts

export const TREATMENTS = {
  nitrogenDeficiency: {
    problem: 'Nitrogen Deficiency',
    symptoms: ['Yellow leaves', 'Slow growth'],
    remedies: [
      'Apply urea fertilizer',
      'Use compost',
      'Add vermicompost',
    ],
  },

  waterlogging: {
    problem: 'Waterlogging',
    symptoms: [
      'Standing water',
      'Root rot',
    ],
    remedies: [
      'Create drainage channels',
      'Use raised beds',
      'Improve soil aeration',
    ],
  },

  drought: {
    problem: 'Drought Stress',
    symptoms: [
      'Dry soil',
      'Wilting plants',
    ],
    remedies: [
      'Mulching',
      'Drip irrigation',
      'Increase organic matter',
    ],
  },

  poorGrowth: {
    problem: 'Poor Plant Growth',
    symptoms: [
      'Stunted growth',
      'Low yield',
    ],
    remedies: [
      'Soil testing',
      'Fertilizer application',
      'Improve irrigation',
    ],
  },
};