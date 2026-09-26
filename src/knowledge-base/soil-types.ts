export const SOIL_KNOWLEDGE = {
  sandy: {
    name: 'Sandy Soil',
    drainage: 'Excellent',
    nutrientRetention: 'Low',
    waterRetention: 'Low',
    suitableCrops: [
      'Groundnut',
      'Carrot',
      'Watermelon',
      'Potato',
      'Millet',
    ],
    commonProblems: [
      'Dries quickly',
      'Low fertility',
      'Requires frequent watering',
    ],
    improvements: [
      'Add compost',
      'Add organic matter',
      'Mulching',
    ],
  },

  clay: {
    name: 'Clay Soil',
    drainage: 'Poor',
    nutrientRetention: 'High',
    waterRetention: 'High',
    suitableCrops: [
      'Rice',
      'Broccoli',
      'Cabbage',
      'Beans',
    ],
    commonProblems: [
      'Waterlogging',
      'Compaction',
    ],
    improvements: [
      'Add compost',
      'Create drainage channels',
      'Raised beds',
    ],
  },

  loamy: {
    name: 'Loamy Soil',
    drainage: 'Balanced',
    nutrientRetention: 'High',
    waterRetention: 'Balanced',
    suitableCrops: [
      'Tomato',
      'Maize',
      'Wheat',
      'Soybean',
      'Vegetables',
    ],
    commonProblems: [
      'Few major issues',
    ],
    improvements: [
      'Maintain organic matter',
      'Crop rotation',
    ],
  },

  silty: {
    name: 'Silty Soil',
    drainage: 'Moderate',
    nutrientRetention: 'High',
    waterRetention: 'High',
    suitableCrops: [
      'Rice',
      'Wheat',
      'Sugarcane',
      'Vegetables',
    ],
    commonProblems: [
      'Compaction',
      'Erosion',
    ],
    improvements: [
      'Add organic matter',
      'Improve drainage',
    ],
  },
};