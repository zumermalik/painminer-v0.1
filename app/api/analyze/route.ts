import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const prompt = `
    You are an expert product strategist for digital creators. Analyze the following raw audience comments and identify their deepest, most recurring pain points. 
    
    Generate exactly 3 highly validated digital product ideas.
    
    Return the result as a strict JSON array of objects with exactly these keys: 
    - "title"
    - "description"
    - "painPoint"
    - "suggestedPrice" (a realistic dollar amount based on the value, e.g., "$27")
    - "firstActionStep" (a 1-sentence instruction on the very first thing the creator should do to start building this today)
    
    Do not include any markdown formatting like \`\`\`json in the output. Just the raw, valid JSON array.
    
    Comments to analyze:
    "${text}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "[]";
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const ideas = JSON.parse(cleanJson);

    return NextResponse.json({ ideas });
    
  } catch (error) {
    console.error("AI Processing Error:", error);
    return NextResponse.json({ error: "Failed to process text" }, { status: 500 });
  }
}
