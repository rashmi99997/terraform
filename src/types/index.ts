// ============================================================================
// TERRAFORM — Type Definitions
// These types define the shape of data flowing through the journey wizard.
// Mock services return these types; future real services will match them.
// ============================================================================

export type SoilType =
  | 'sandy'
  | 'clay'
  | 'loamy'
  | 'silty'
  | 'other'
  | 'unknown';

export type LandCondition =
  | 'very-dry'
  | 'water-logging'
  | 'poor-growth'
  | 'yellowing-leaves'
  | 'no-problems'
  | 'not-sure';

export type CropIntention = 'have-crop' | 'suggest-crop';

export interface LocationInfo {
  label: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  climateZone: string;
}

export interface SoilInfo {
  type: SoilType;
  imageUrl?: string;
  analysisResult?: SoilAnalysisPlaceholder;
}

export interface SoilAnalysisPlaceholder {
  predictedType: SoilType;
  confidence: number;
  pH: string;
  organicMatter: string;
  note: string;
}

export interface JourneyState {
  location: LocationInfo | null;
  soil: SoilInfo | null;
  conditions: LandCondition[];
  cropIntention: CropIntention | null;
  selectedCrop: string | null;
}

// --- Analysis ---

export interface AnalysisSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  details: string[];
  severity: 'good' | 'moderate' | 'concern';
}

export interface LandAnalysis {
  sections: AnalysisSection[];
  overallScore: number;
}

// --- Recommendations ---

export interface CropRecommendation {
  id: string;
  name: string;
  scientificName: string;
  suitabilityScore: number;
  reason: string;
  growingConditions: string;
  growingPeriod: string;
  waterRequirement: string;
  temperature: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  imageUrl: string;
}

// --- Treatment / Growing ---

export interface TreatmentStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
  status: 'upcoming' | 'active' | 'completed';
}

export interface GrowthStage {
  id: string;
  name: string;
  period: string;
  description: string;
}

// --- Harvest ---

export interface HarvestStage {
  id: string;
  title: string;
  period: string;
  description: string;
  icon: string;
  completed: boolean;
}

// --- Weather ---

export interface WeatherInfo {
  currentTemp: number;
  condition: string;
  humidity: number;
  rainfall: string;
  forecast: WeatherDay[];
}

export interface WeatherDay {
  day: string;
  tempHigh: number;
  tempLow: number;
  condition: string;
}
