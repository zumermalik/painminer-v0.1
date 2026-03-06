import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the SDK. Vercel will inject your API key from its environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const prompt = `
    You are an expert product strategist for digital creators. Your job is to analyze the following raw audience comments and identify their deepest, most recurring pain points. 
    
    Based on these pain points, generate exactly 3 highly validated, specific digital product ideas that the creator could instantly build and sell (like an ebook, a notion template, a 5-day email course, or a mini-video guide).
    
    Return the result as a strict JSON array of objects with exactly these keys: "title", "description", and "painPoint".
    Do not include any markdown formatting like \`\`\`json in the output. Just the raw, valid JSON array.
    
    Comments to analyze:
    "${text}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "[]";
    
    // Clean up any markdown wrappers the AI might add
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const ideas = JSON.parse(cleanJson);

    return NextResponse.json({ ideas });
    
  } catch (error) {
    console.error("AI Processing Error:", error);
    return NextResponse.json({ error: "Failed to process text" }, { status: 500 });
  }
}
