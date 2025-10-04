import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobDescription } = await req.json();
    
    if (!jobDescription || jobDescription.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Job description is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Analyzing job description with AI...");

    const systemPrompt = `You are an expert interview preparation coach. Analyze the job description and create a comprehensive, actionable interview preparation plan.

Your response must be a valid JSON object with this exact structure:
{
  "company": "Company name",
  "role": "Job title",
  "keySkills": ["skill1", "skill2", "skill3"],
  "projects": [
    {
      "title": "Project name",
      "description": "What to build",
      "skills": ["skill1", "skill2"],
      "difficulty": "beginner|intermediate|advanced"
    }
  ],
  "codingChallenges": [
    {
      "title": "Challenge name",
      "description": "Challenge description",
      "difficulty": "easy|medium|hard",
      "topics": ["topic1", "topic2"]
    }
  ],
  "behavioralQuestions": [
    {
      "question": "The question",
      "focus": "What to emphasize in answer",
      "tips": "Answer strategy"
    }
  ],
  "studyTimeline": {
    "duration": "2-4 weeks",
    "phases": [
      {
        "phase": "Phase name",
        "duration": "Duration",
        "focus": ["focus1", "focus2"]
      }
    ]
  }
}

Generate 3-5 projects, 5-8 coding challenges, and 5-7 behavioral questions.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Job Description:\n\n${jobDescription}\n\nCreate a comprehensive interview preparation plan.` }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to generate prep plan" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log("AI response received, parsing...");
    
    // Extract JSON from markdown code blocks if present
    let jsonContent = aiResponse;
    const jsonMatch = aiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }
    
    const prepPlan = JSON.parse(jsonContent);
    
    console.log("Prep plan generated successfully");

    return new Response(
      JSON.stringify({ success: true, plan: prepPlan }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-prep-plan:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
