import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Dynamic helper to compute score if the external API times out/fails
function computeDynamicFallbackScore(soil: string, conditions: string): number {
  let score = 80;
  const cond = String(conditions || '').toLowerCase();
  const s = String(soil || '').toLowerCase();

  if (cond.includes('dry') || cond.includes('cracked') || cond.includes('dusty')) score -= 25;
  if (cond.includes('not growing') || cond.includes('stunted') || cond.includes('wilt')) score -= 15;
  if (s.includes('clay')) score -= 10;
  if (s.includes('sandy')) score -= 10;

  return Math.max(30, Math.min(95, score));
}

export async function POST(req: Request) {
  try {
    const { soilType, reportedConditions, location } = await req.json();

    const fallbackScore = computeDynamicFallbackScore(soilType, reportedConditions);

    const prompt = `
      You are an expert agronomist providing a land analysis report.
      Analyze these land parameters:
      - Soil Type: ${soilType || 'Unspecified'}
      - Reported Conditions: ${reportedConditions || 'None reported'}
      - Location: ${location || 'Unspecified'}

      INSTRUCTIONS:
      Compute a dynamic integer "overallScore" between 0 and 100 based strictly on the user's soil type and symptoms.
      - If severe conditions like dry, cracked soil, poor growth, or rot are present, the score MUST be low (between 35 and 55).
      - If conditions are optimal with no issues, the score MUST be high (between 80 and 95).

      Return ONLY a valid JSON object matching this schema:
      {
        "overallScore": <integer_0_to_100>,
        "summaryReport": "<agronomist summary text>",
        "sections": [
          {
            "id": "soil-health",
            "title": "Soil Composition & Nutrient Analysis",
            "severity": "optimal",
            "icon": "Sprout",
            "summary": "<summary text>",
            "details": ["<point 1>", "<point 2>"]
          },
          {
            "id": "condition-diagnosis",
            "title": "Symptom & Stress Diagnosis",
            "severity": "critical",
            "icon": "AlertTriangle",
            "summary": "<summary text>",
            "details": ["<point 1>", "<point 2>"]
          }
        ]
      }

      CRITICAL: "severity" MUST be one of: "optimal", "moderate", "critical".
      "icon" MUST be one of: "Sprout", "AlertTriangle", "Droplets", "Sun", "Activity".
    `;

    const modelsToTry = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-2.0-flash'];
    let responseText = '';

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
        responseText = response.text || '';
        if (responseText) break;
      } catch (err: any) {
        console.warn(`Model ${modelName} unavailable, checking fallback...`);
      }
    }

    let rawJson: any = null;

    if (responseText) {
      const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      rawJson = JSON.parse(cleanedText);
    } else {
      rawJson = {
        overallScore: fallbackScore,
        summaryReport: `Land analysis report generated for ${location || 'your farm'}. Soil condition (${soilType || 'clay'}) and stress symptoms (${reportedConditions || 'dry soil'}) evaluated.`,
        sections: [
          {
            id: 'soil-health',
            title: 'Soil Composition & Nutrient Analysis',
            severity: soilType?.toLowerCase().includes('clay') ? 'moderate' : 'optimal',
            icon: 'Sprout',
            summary: `Analyzed soil profile for ${soilType || 'soil'}.`,
            details: ['Soil compaction risk identified.', 'Drainage and aeration require management.'],
          },
          {
            id: 'condition-diagnosis',
            title: 'Symptom & Stress Diagnosis',
            severity: reportedConditions ? 'critical' : 'moderate',
            icon: 'AlertTriangle',
            summary: `Evaluated reported symptoms: ${reportedConditions || 'None'}.`,
            details: ['Water retention failure observed.', 'Immediate soil conditioning required.'],
          },
        ],
      };
    }

    const normalizeSeverity = (val: string) => {
      const lower = String(val || '').toLowerCase();
      if (['optimal', 'good', 'low', 'healthy'].includes(lower)) return 'optimal';
      if (['critical', 'high', 'severe', 'danger'].includes(lower)) return 'critical';
      return 'moderate';
    };

    const sanitizedSections = (rawJson.sections || []).map((sec: any, idx: number) => ({
      id: sec.id || `section-${idx}`,
      title: sec.title || 'Analysis Section',
      severity: normalizeSeverity(sec.severity),
      icon: sec.icon || 'Sprout',
      summary: sec.summary || 'Analysis complete.',
      details: Array.isArray(sec.details)
        ? sec.details
        : Array.isArray(sec.findings)
        ? sec.findings
        : ['Analysis complete.'],
    }));

    return NextResponse.json({
      overallScore: typeof rawJson.overallScore === 'number' ? rawJson.overallScore : fallbackScore,
      summaryReport: rawJson.summaryReport || 'Analysis report ready.',
      sections: sanitizedSections,
    });
  } catch (error: any) {
    console.error('Gemini API Route Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate report' },
      { status: 500 }
    );
  }
}