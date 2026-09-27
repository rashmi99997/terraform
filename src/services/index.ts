// ============================================================================
// TERRAFORM — Placeholder & Integration Services
// Connects UI calls to reasoning logic and mock databases.
// ============================================================================
import { getCropRecommendations } from './reasoningService';
import {
  MOCK_ANALYSIS,
  MOCK_LOCATIONS,
  MOCK_WEATHER,
} from '@/src/data/mock-data';
import type {
  CropRecommendation,
  LandAnalysis,
  LocationInfo,
  SoilAnalysisPlaceholder,
  SoilType,
  WeatherInfo,
} from '@/src/types';

/**
 * Simulates async API latency so the UI loading states are exercised.
 */
function simulateDelay<T>(data: T, ms = 800): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

// --- Location Service ---

export const locationService = {
  /** PLACEHOLDER: Returns mock location results. Replace with geocoding API. */
  async searchLocations(query: string): Promise<LocationInfo[]> {
    if (!query.trim()) return MOCK_LOCATIONS;
    const filtered = MOCK_LOCATIONS.filter(
      (loc) =>
        loc.label.toLowerCase().includes(query.toLowerCase()) ||
        loc.region.toLowerCase().includes(query.toLowerCase()) ||
        loc.country.toLowerCase().includes(query.toLowerCase())
    );
    return simulateDelay(filtered, 400);
  },

  /** PLACEHOLDER: Simulates browser geolocation. Replace with navigator.geolocation. */
  async getCurrentLocation(): Promise<LocationInfo> {
    return simulateDelay(MOCK_LOCATIONS[0], 600);
  },
};

// --- Soil Analysis Service ---

export const soilAnalysisService = {
  /** PLACEHOLDER: Returns mock soil analysis from an uploaded image. Replace with soil vision AI. */
  async analyzeSoilImage(
    imageUrl: string
  ): Promise<SoilAnalysisPlaceholder> {
    console.log('[PLACEHOLDER] soilAnalysisService.analyzeSoilImage', imageUrl);
    return simulateDelay(
      {
        predictedType: 'loamy' as SoilType,
        confidence: 0.78,
        pH: '6.2 (slightly acidic)',
        organicMatter: 'Moderate (2.8%)',
        note: 'Mock analysis — soil appears to be loamy with moderate organic matter. This result is simulated and will be replaced by real AI image analysis.',
      },
      1200
    );
  },
};

// --- Diagnosis Service ---

export const diagnosisService = {
  /** PLACEHOLDER: Returns mock land analysis. Replace with reasoning AI / RAG backend. */
  async diagnoseLand(
    location: LocationInfo | null,
    soilType: SoilType | null,
    conditions: string[]
  ): Promise<LandAnalysis> {
    console.log('[PLACEHOLDER] diagnosisService.diagnoseLand', {
      location: location?.label,
      soilType,
      conditions,
    });
    return simulateDelay(MOCK_ANALYSIS, 1500);
  },
};

// --- Recommendation Service ---

export const recommendationService = {
  async getRecommendations(
    location: LocationInfo | null,
    soilType: string | null,
    conditions: string[]
  ): Promise<CropRecommendation[]> {
    console.log('[recommendationService] Fetching recommendations for:', {
      location: location?.label,
      soilType,
      conditions,
    });

    if (!soilType) {
      return [];
    }

    return getCropRecommendations(soilType);
  },
};
// --- Weather Service ---

export const weatherService = {
  /** PLACEHOLDER: Returns mock weather data. Replace with real weather API. */
  async getWeather(
    location: LocationInfo | null
  ): Promise<WeatherInfo> {
    console.log('[PLACEHOLDER] weatherService.getWeather', location?.label);
    return simulateDelay(MOCK_WEATHER, 600);
  },
};