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
    const { farmerProfile } = await req.json();
    
    if (!farmerProfile) {
      return new Response(
        JSON.stringify({ error: 'Farmer profile is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert agricultural policy advisor for India with deep knowledge of government schemes for farmers. 
Analyze the farmer's profile and provide personalized scheme recommendations.

Return your analysis in the following JSON structure:
{
  "eligibleSchemes": [
    {
      "name": "Scheme name",
      "category": "Category (e.g., Subsidy, Insurance, Credit, Infrastructure)",
      "eligibility": "Why this farmer is eligible",
      "benefits": "Key benefits",
      "howToApply": "Application process",
      "documents": ["List of required documents"],
      "priority": "high/medium/low"
    }
  ],
  "generalAdvice": "Overall guidance for maximizing scheme benefits",
  "nextSteps": ["Action items for the farmer"]
}`;

    const userPrompt = `Farmer Profile:
- Location: ${farmerProfile.location || 'Not specified'}, ${farmerProfile.state || 'Not specified'}
- Farm Size: ${farmerProfile.farm_size ? `${farmerProfile.farm_size} acres` : 'Not specified'}
- Farm Type: ${farmerProfile.farm_type || 'Not specified'}
- Name: ${farmerProfile.full_name || 'Not specified'}

Based on this profile, identify all relevant central and state government schemes in India that this farmer might be eligible for. Focus on practical, currently active schemes.`;

    console.log("Analyzing schemes for farmer profile:", farmerProfile);

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service requires payment. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to analyze schemes" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const analysis = JSON.parse(aiData.choices[0].message.content);
    
    console.log("Scheme analysis completed successfully");

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in analyze-schemes function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});