// src/knowledge-base/nutrient-deficiencies.ts

export const NUTRIENT_DEFICIENCIES = {
  nitrogen: {
    symptom: 'Leaves turning yellow',
    cause: 'Nitrogen deficiency',
    solutions: [
      'Apply urea',
      'Apply compost',
      'Use nitrogen-rich organic fertilizer',
    ],
  },

  phosphorus: {
    symptom: 'Purple leaves',
    cause: 'Phosphorus deficiency',
    solutions: [
      'Apply phosphate fertilizer',
      'Add rock phosphate',
    ],
  },

  potassium: {
    symptom: 'Brown leaf edges',
    cause: 'Potassium deficiency',
    solutions: [
      'Apply potash fertilizer',
      'Add wood ash in controlled amounts',
    ],
  },

  waterlogging: {
    symptom: 'Water stays for a long time',
    cause: 'Poor drainage',
    solutions: [
      'Create drainage channels',
      'Use raised beds',
      'Improve soil structure with organic matter',
    ],
  },

  drought: {
    symptom: 'Very dry soil',
    cause: 'Low water retention',
    solutions: [
      'Mulching',
      'Regular irrigation',
      'Add compost to improve moisture retention',
    ],
  },
};