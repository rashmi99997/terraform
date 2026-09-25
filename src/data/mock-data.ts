// ============================================================================
// TERRAFORM — Mock Data
// All data below is placeholder content for the frontend journey.
// It is clearly separated from future real AI/backend functionality.
// ============================================================================

import type {
  CropRecommendation,
  GrowthStage,
  HarvestStage,
  LandCondition,
  LocationInfo,
  SoilType,
  TreatmentStep,
  WeatherInfo,
  LandAnalysis,
} from '@/src/types';

// --- Location mock data ---

export const MOCK_LOCATIONS: LocationInfo[] = [
 {
label: 'Bangalore Agricultural Region',
region: 'Karnataka',
country: 'India',
latitude: 12.9716,
longitude: 77.5946,
climateZone: 'Tropical Savanna',
},
  {
    label: 'Central Valley',
    region: 'California',
    country: 'United States',
    latitude: 37.7749,
    longitude: -120.9195,
    climateZone: 'Mediterranean',
  },
  {
    label: 'Nile Delta Farmlands',
    region: 'Nile Delta',
    country: 'Egypt',
    latitude: 30.9622,
    longitude: 31.2567,
    climateZone: 'Hot desert / irrigated',
  },
  {
    label: 'Lanao Rice Plains',
    region: 'Mindanao',
    country: 'Philippines',
    latitude: 7.8457,
    longitude: 124.2439,
    climateZone: 'Tropical monsoon',
  },
  {
    label: 'Loess Plateau',
    region: 'Shaanxi',
    country: 'China',
    latitude: 34.7466,
    longitude: 108.5486,
    climateZone: 'Temperate continental',
  },
  {
    label: 'Saint-Emilion Vineyard Area',
    region: 'Nouvelle-Aquitaine',
    country: 'France',
    latitude: 44.9372,
    longitude: -0.1553,
    climateZone: 'Oceanic temperate',
  },
];

// --- Soil types ---

export const SOIL_TYPES: {
  id: SoilType;
  label: string;
  description: string;
  icon: string;
  color: string;
}[] = [
  {
    id: 'sandy',
    label: 'Sandy',
    description: 'Drains quickly, warms up fast, low nutrient retention',
    icon: 'grain',
    color: 'hsl(35 50% 70%)',
  },
  {
    id: 'clay',
    label: 'Clay',
    description: 'Heavy and sticky when wet, hard when dry, retains nutrients',
    icon: 'circle',
    color: 'hsl(20 35% 50%)',
  },
  {
    id: 'loamy',
    label: 'Loamy',
    description: 'Balanced mix — ideal for most crops, drains and retains well',
    icon: 'layers',
    color: 'hsl(30 40% 45%)',
  },
  {
    id: 'silty',
    label: 'Silty',
    description: 'Smooth and fine, retains moisture, fertile but can compact',
    icon: 'waves',
    color: 'hsl(200 25% 60%)',
  },
  {
    id: 'other',
    label: 'Other',
    description: 'A different soil type — peat, chalk, gravel, or mixed',
    icon: 'more-horizontal',
    color: 'hsl(0 0% 55%)',
  },
  {
    id: 'unknown',
    label: "I don't know",
    description: 'Let TERRAFORM help identify your soil from an image',
    icon: 'help-circle',
    color: 'hsl(150 10% 60%)',
  },
];

// --- Land conditions ---

export const LAND_CONDITIONS: {
  id: LandCondition;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    id: 'very-dry',
    label: 'Very dry',
    description: 'Soil is often cracked or dusty, even after watering',
    icon: 'sun',
  },
  {
    id: 'water-logging',
    label: 'Water stays for a long time',
    description: 'Puddles form and water sits on the surface after rain',
    icon: 'droplets',
  },
  {
    id: 'poor-growth',
    label: "Plants aren't growing well",
    description: 'Growth is stunted or patchy compared to neighboring land',
    icon: 'trending-down',
  },
  {
    id: 'yellowing-leaves',
    label: 'Leaves turning yellow',
    description: 'Yellowing or discolored foliage on existing plants',
    icon: 'leaf',
  },
  {
    id: 'no-problems',
    label: 'No obvious problems',
    description: 'Land appears healthy with good vegetation',
    icon: 'check-circle',
  },
  {
    id: 'not-sure',
    label: "I'm not sure",
    description: 'Let TERRAFORM assess based on other information',
    icon: 'help-circle',
  },
];

// --- Mock analysis ---

export const MOCK_ANALYSIS: LandAnalysis = {
  overallScore: 72,
  sections: [
    {
      id: 'land-diagnosis',
      title: 'Land Diagnosis',
      icon: 'map',
      summary:
        'Your land shows moderate fertility with some drainage considerations based on the conditions you reported.',
      details: [
        'Soil structure appears workable with adequate depth for root development',
        'Reported water retention suggests improving drainage channels',
        'Land has good sun exposure throughout the growing season',
        'Slope and topography support natural water flow when managed',
      ],
      severity: 'moderate',
    },
    {
      id: 'soil-interpretation',
      title: 'Soil Interpretation',
      icon: 'layers',
      summary:
        'The soil type you identified has specific nutrient and water-holding characteristics that shape crop selection.',
      details: [
        'Nutrient retention capacity is moderate — regular amendment will help',
        'Organic matter levels could be improved with compost or green manure',
        'pH appears within a workable range for most common crops',
        'Soil structure supports tillage but benefits from minimal disturbance',
      ],
      severity: 'good',
    },
    {
      id: 'environmental-conditions',
      title: 'Environmental Conditions',
      icon: 'cloud-sun',
      summary:
        'Based on your location, the local climate supports a range of crops across the primary growing season.',
      details: [
        'Growing season length is approximately 180–220 days',
        'Average rainfall is adequate but supplemental irrigation may be needed',
        'Temperature range supports warm-season crops primarily',
        'Frost risk is low to moderate in early and late season',
      ],
      severity: 'good',
    },
    {
      id: 'potential-concerns',
      title: 'Potential Concerns',
      icon: 'alert-triangle',
      summary:
        'A few factors need attention before planting to maximize your chances of a successful harvest.',
      details: [
        'Waterlogging risk — consider raised beds or drainage trenches',
        'Yellowing leaves may indicate nitrogen deficiency — soil test recommended',
        'Monitor for pest pressure during warm, humid periods',
        'Plan crop rotation to avoid depleting the same nutrients each season',
      ],
      severity: 'concern',
    },
  ],
};

// --- Mock crop recommendations ---

export const MOCK_RECOMMENDATIONS: CropRecommendation[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    suitabilityScore: 92,
    reason:
      'Thrives in your climate zone with well-draining soil. Matches your land sun exposure and growing season length.',
    growingConditions: 'Full sun, well-drained soil, warm temperatures',
    growingPeriod: '70–85 days',
    waterRequirement: 'Regular, consistent moisture',
    temperature: '18–30°C optimal',
    difficulty: 'moderate',
    imageUrl:
      'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    suitabilityScore: 88,
    reason:
      'Deep-rooted and adaptable to your soil type. Excellent fit for the reported growing season and rainfall pattern.',
    growingConditions: 'Full sun, deep fertile soil, warm weather',
    growingPeriod: '90–120 days',
    waterRequirement: 'Moderate to high, especially during tasseling',
    temperature: '20–32°C optimal',
    difficulty: 'moderate',
    imageUrl:
      'https://images.pexels.com/photos/13566356/pexels-photo-13566356.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    suitabilityScore: 81,
    reason:
      'Well-suited to your climate zone. Can be grown as a cool-season crop with good yield potential in your soil.',
    growingConditions: 'Full sun, well-prepared seedbed, moderate fertility',
    growingPeriod: '110–130 days',
    waterRequirement: 'Moderate, less during ripening',
    temperature: '15–25°C optimal, tolerates cool',
    difficulty: 'easy',
    imageUrl:
      'https://images.pexels.com/photos/1605/landscape-nature-field-italy.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    suitabilityScore: 74,
    reason:
      'Compatible with your reported water retention conditions. Requires careful water management but suits your climate.',
    growingConditions: 'Flooded fields or high rainfall, warm humid climate',
    growingPeriod: '100–150 days',
    waterRequirement: 'Very high — flooded or saturated soil',
    temperature: '22–32°C optimal',
    difficulty: 'advanced',
    imageUrl:
      'https://images.pexels.com/photos/30685495/pexels-photo-30685495.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'soybean',
    name: 'Soybean',
    scientificName: 'Glycine max',
    suitabilityScore: 85,
    reason:
      'Fixes nitrogen naturally — helps address the potential deficiency indicated by your conditions. Adapts well to your soil.',
    growingConditions: 'Full sun, well-drained soil, warm season',
    growingPeriod: '100–130 days',
    waterRequirement: 'Moderate, consistent during pod fill',
    temperature: '20–30°C optimal',
    difficulty: 'easy',
    imageUrl:
      'https://images.pexels.com/photos/6427/rucola-salad-plant-leaf.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pepper',
    name: 'Bell Pepper',
    scientificName: 'Capsicum annuum',
    suitabilityScore: 79,
    reason:
      'Warm-season crop that performs well in your temperature range. Benefits from the soil improvements recommended in your analysis.',
    growingConditions: 'Full sun, rich well-drained soil, warm temperatures',
    growingPeriod: '60–90 days',
    waterRequirement: 'Regular, avoid waterlogging',
    temperature: '20–28°C optimal',
    difficulty: 'moderate',
    imageUrl:
      'https://images.pexels.com/photos/11489216/pexels-photo-11489216.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

// --- Mock treatment / growing steps ---

export const MOCK_TREATMENT_STEPS: TreatmentStep[] = [
  {
    id: 'soil-prep',
    phase: 'Preparation',
    title: 'Soil Preparation',
    description:
      'Prepare your land for planting by testing, tilling, and amending the soil to create the best foundation for your crop.',
    duration: 'Week 1–2',
    tasks: [
      'Conduct a soil test for pH and nutrient levels',
      'Clear the area of weeds, rocks, and debris',
      'Till soil to 6–8 inches depth for root development',
      'Add compost or organic matter to improve fertility',
      'Level the surface for even water distribution',
    ],
    status: 'completed',
  },
  {
    id: 'treatment',
    phase: 'Preparation',
    title: 'Soil Treatment',
    description:
      'Apply targeted treatments based on your soil analysis to address drainage, nutrient, and structure concerns.',
    duration: 'Week 2–3',
    tasks: [
      'Apply lime if pH is below 6.0 to reduce acidity',
      'Add nitrogen-rich fertilizer if deficiency is detected',
      'Create drainage channels in waterlogging-prone areas',
      'Incorporate biochar or manure for organic improvement',
    ],
    status: 'active',
  },
  {
    id: 'planting',
    phase: 'Planting',
    title: 'Planting',
    description:
      'Sow seeds or transplant seedlings at the right depth, spacing, and timing for your chosen crop.',
    duration: 'Week 3–4',
    tasks: [
      'Sow seeds at the recommended depth for your crop',
      'Space plants according to crop-specific guidelines',
      'Water gently immediately after planting',
      'Mark rows clearly for ongoing management',
    ],
    status: 'upcoming',
  },
  {
    id: 'water-management',
    phase: 'Growing',
    title: 'Water Management',
    description:
      'Establish a watering routine that matches your crop needs and your land water conditions.',
    duration: 'Week 4 onward',
    tasks: [
      'Water early morning to reduce evaporation',
      'Monitor soil moisture — aim for damp, not saturated',
      'Install drip irrigation for efficient water use',
      'Adjust frequency based on rainfall and weather',
    ],
    status: 'upcoming',
  },
  {
    id: 'crop-care',
    phase: 'Growing',
    title: 'Crop Care',
    description:
      'Support healthy growth through weeding, mulching, and monitoring plant development.',
    duration: 'Week 4–12',
    tasks: [
      'Weed regularly to reduce competition for nutrients',
      'Apply organic mulch to retain moisture and suppress weeds',
      'Thin overcrowded seedlings for better airflow',
      'Support tall plants with stakes or trellises as needed',
    ],
    status: 'upcoming',
  },
  {
    id: 'pest-monitoring',
    phase: 'Growing',
    title: 'Disease & Pest Monitoring',
    description:
      'Watch for signs of pest pressure and disease so you can act early and protect your crop.',
    duration: 'Ongoing',
    tasks: [
      'Inspect leaves weekly for spots, holes, or discoloration',
      'Check underside of leaves for aphids and eggs',
      'Use companion planting to deter common pests',
      'Apply organic pest control at first sign of infestation',
    ],
    status: 'upcoming',
  },
  {
    id: 'fertilizer',
    phase: 'Growing',
    title: 'Fertilizer & Remedy Guidance',
    description:
      'Feed your crop at key growth stages and apply remedies for any deficiency symptoms observed.',
    duration: 'Week 6–12',
    tasks: [
      'Apply balanced fertilizer during vegetative growth',
      'Switch to phosphorus-rich feed during flowering',
      'Address yellowing leaves with nitrogen supplement',
      'Use foliar spray for quick nutrient correction',
    ],
    status: 'upcoming',
  },
];

export const MOCK_GROWTH_STAGES: GrowthStage[] = [
  {
    id: 'germination',
    name: 'Germination',
    period: 'Day 1–10',
    description: 'Seeds absorb water and sprout. First roots and shoot emerge.',
  },
  {
    id: 'seedling',
    name: 'Seedling',
    period: 'Day 10–30',
    description: 'True leaves develop. Plant establishes its root system.',
  },
  {
    id: 'vegetative',
    name: 'Vegetative Growth',
    period: 'Day 30–60',
    description: 'Rapid stem and leaf growth. Plant builds its structure.',
  },
  {
    id: 'flowering',
    name: 'Flowering',
    period: 'Day 60–80',
    description: 'Flowers appear and pollination begins. Critical for yield.',
  },
  {
    id: 'fruiting',
    name: 'Fruiting / Grain Fill',
    period: 'Day 80–100',
    description: 'Fruits or grains develop and fill out. Peak water demand.',
  },
  {
    id: 'maturation',
    name: 'Maturation',
    period: 'Day 100+',
    description: 'Crop ripens and dries. Ready to harvest when mature.',
  },
];

// --- Mock harvest journey ---

export const MOCK_HARVEST_STAGES: HarvestStage[] = [
  {
    id: 'bare-soil',
    title: 'Bare Soil',
    period: 'Day 0',
    description:
      'Your journey began with bare, untested land. TERRAFORM helped you understand what was beneath the surface.',
    icon: 'shovel',
    completed: true,
  },
  {
    id: 'soil-analysis',
    title: 'Soil Understanding',
    period: 'Week 1',
    description:
      'You identified your soil type and land conditions, giving TERRAFORM the foundation to guide your decisions.',
    icon: 'layers',
    completed: true,
  },
  {
    id: 'crop-decision',
    title: 'Crop Selection',
    period: 'Week 2',
    description:
      'Based on your land profile and TERRAFORM analysis, you chose the right crop for your conditions.',
    icon: 'sprout',
    completed: true,
  },
  {
    id: 'preparation',
    title: 'Land Preparation',
    period: 'Week 2–3',
    description:
      'Soil was tested, amended, and prepared. Drainage and nutrient concerns were addressed before planting.',
    icon: 'check-circle',
    completed: true,
  },
  {
    id: 'planting',
    title: 'Planting',
    period: 'Week 3–4',
    description:
      'Seeds were sown at the right depth and spacing, giving your crop the best start in prepared soil.',
    icon: 'seedling',
    completed: true,
  },
  {
    id: 'growing',
    title: 'Growing & Care',
    period: 'Week 4–14',
    description:
      'Through watering, weeding, monitoring, and feeding, your crop grew from seedling to maturity.',
    icon: 'trending-up',
    completed: true,
  },
  {
    id: 'harvest',
    title: 'Harvest',
    period: 'Week 14+',
    description:
      'Your crop has reached maturity. The journey from bare soil to a full harvest is complete.',
    icon: 'award',
    completed: true,
  },
];

// --- Mock weather ---

export const MOCK_WEATHER: WeatherInfo = {
  currentTemp: 26,
  condition: 'Partly cloudy',
  humidity: 58,
  rainfall: 'Low — 12mm this week',
  forecast: [
    { day: 'Today', tempHigh: 28, tempLow: 18, condition: 'Partly cloudy' },
    { day: 'Tomorrow', tempHigh: 30, tempLow: 19, condition: 'Sunny' },
    { day: 'Wednesday', tempHigh: 27, tempLow: 17, condition: 'Light rain' },
    { day: 'Thursday', tempHigh: 25, tempLow: 16, condition: 'Cloudy' },
    { day: 'Friday', tempHigh: 29, tempLow: 18, condition: 'Sunny' },
  ],
};
