import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulated AI response based on the "PainMiner" concept
    const mockIdeas = [
      {
        title: "The 5-Day Burnout Reset",
        description: "A step-by-step checklist and daily audio guide to recovering energy without quitting your job.",
        painPoint: "Audience repeatedly mentions feeling exhausted and overwhelmed.",
      },
      {
        title: "Focus Flow Templates",
        description: "Plug-and-play Notion templates designed specifically for ADHD brains to track daily tasks.",
        painPoint: "Users commenting about inability to stick to standard planners.",
      },
      {
        title: "Cold Email Conversion Kit",
        description: "3 proven email scripts that get clients to reply, including objection-handling frameworks.",
        painPoint: "Freelancers complaining about sending pitches and hearing crickets.",
      }
    ];

    return NextResponse.json({ ideas: mockIdeas });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process text" }, { status: 500 });
  }
}
