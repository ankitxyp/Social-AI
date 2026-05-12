import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    // Check image
    if (!imageBase64) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Clean base64
    const base64Data = imageBase64.includes(',')
      ? imageBase64.split(',')[1]
      : imageBase64;

    const prompt = `
Analyze this image for an Instagram reel, story, or social media post.

Detect:
- mood
- emotions
- aesthetic
- lighting
- vibe
- colors

Recommend REAL trending songs that match the image vibe.

VERY IMPORTANT:
- Songs must actually exist
- Include Spotify search links
- Include YouTube search links
- Return ONLY valid JSON
- No markdown
- No explanation
- No backticks

JSON format:

{
  "mood": "Brief mood description",
  "colors": ["color1", "color2"],
  "music": [
    {
      "title": "Song Name",
      "artist": "Artist Name",
      "reason": "Why it matches",
      "spotify": "https://open.spotify.com/search/song",
      "youtube": "https://www.youtube.com/results?search_query=song"
    }
  ],
  "captions": [
    "Caption option 1",
    "Caption option 2"
  ],
  "hashtags": [
    "#tag1",
    "#tag2"
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data,
              },
            },
          ],
        },
      ],
    });

    // Handle SDK response safely
    const textResult = response.text;

    if (!textResult) {
      throw new Error('No response received from Gemini.');
    }

    // Clean response
    const cleanedText = textResult
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // Parse JSON
    const jsonResult = JSON.parse(cleanedText);

    return NextResponse.json(jsonResult);
  } catch (error: any) {
    console.error('AI Error:', error.message || error);

    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
