import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private readonly apiKey = process.env.GEMINI_API_KEY;
    private readonly apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    async analyzeReport(description: string, latitude: number, longitude: number): Promise<{ verdict: string; confidence: number; reason: string }> {
        if (!this.apiKey) {
            this.logger.warn('GEMINI_API_KEY not set — skipping AI analysis');
            return { verdict: 'PENDING', confidence: 0, reason: 'AI service not configured' };
        }

        const prompt = `You are an AI moderator for an animal rescue platform called NGO Connect. Analyze the following animal rescue report and determine if it appears genuine or potentially fake/spam.

Report Description: "${description}"
Location Coordinates: ${latitude}, ${longitude}

Respond ONLY with a valid JSON object in this exact format, no markdown, no explanation:
{"verdict": "LIKELY_REAL", "confidence": 85, "reason": "Brief reason here"}

Rules:
- verdict must be exactly one of: LIKELY_REAL, SUSPICIOUS, LIKELY_FAKE
- confidence is an integer 0-100
- reason is a short string under 100 characters
- LIKELY_REAL: genuine animal distress report
- SUSPICIOUS: could be real but has inconsistencies or vague details
- LIKELY_FAKE: clearly spam, test, joke, or non-animal content`;

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.1, maxOutputTokens: 256 }
                })
            });

            if (!response.ok) {
                const errText = await response.text();
                this.logger.error(`Gemini API error: ${response.status} — ${errText}`);
                return { verdict: 'PENDING', confidence: 0, reason: 'AI analysis failed' };
            }

            const data = await response.json() as any;
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

            if (!text) {
                return { verdict: 'PENDING', confidence: 0, reason: 'Empty AI response' };
            }

            // Parse the JSON from the response
            const cleanText = text.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(cleanText);

            if (!['LIKELY_REAL', 'SUSPICIOUS', 'LIKELY_FAKE'].includes(parsed.verdict)) {
                return { verdict: 'LIKELY_REAL', confidence: 70, reason: 'Defaulted after invalid verdict' };
            }

            return {
                verdict: parsed.verdict,
                confidence: Math.min(100, Math.max(0, parseInt(parsed.confidence) || 70)),
                reason: parsed.reason || 'Analysis complete'
            };
        } catch (error) {
            this.logger.error('AI analysis error:', error);
            return { verdict: 'PENDING', confidence: 0, reason: 'AI analysis exception' };
        }
    }
}
