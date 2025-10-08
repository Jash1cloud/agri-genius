import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing crop image...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert agricultural pathologist and crop disease specialist. Analyze crop images and provide:
1. Crop identification (type, variety if possible)
2. Health status (healthy, diseased, pest damage, nutrient deficiency)
3. Specific diseases or issues detected with confidence level
4. Severity assessment (mild, moderate, severe)
5. Recommended treatments and preventive measures
6. Urgency level (immediate action, monitor, routine care)

Return a structured JSON response with these fields:
{
  "cropType": "string",
  "healthStatus": "healthy|diseased|pest_damage|nutrient_deficiency|unknown",
  "confidence": number (0-100),
  "diseases": [
    {
      "name": "string",
      "confidence": number,
      "severity": "mild|moderate|severe",
      "description": "string"
    }
  ],
  "treatments": ["string"],
  "preventiveMeasures": ["string"],
  "urgency": "immediate|monitor|routine",
  "additionalNotes": "string"
}`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this crop image and identify the crop type and any diseases or issues present."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    console.log("AI Response:", content);

    // Try to extract JSON from the response
    let analysis;
    try {
      // Remove markdown code blocks if present
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                       content.match(/```([\s\S]*?)```/) ||
                       [null, content];
      const jsonString = jsonMatch[1] || content;
      analysis = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // Return raw content if parsing fails
      analysis = {
        cropType: "Unknown",
        healthStatus: "unknown",
        confidence: 0,
        diseases: [],
        treatments: [],
        preventiveMeasures: [],
        urgency: "monitor",
        additionalNotes: content
      };
    }

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in analyze-crop function:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
