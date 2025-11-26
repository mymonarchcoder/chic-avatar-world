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
    const { bodyType, height, faceImageBase64, bodyPhotoBase64 } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build the prompt based on body type and height
    const bodyTypeDescriptions: Record<string, string> = {
      petite: "petite build, shorter stature",
      athletic: "athletic and toned physique with defined muscles",
      curvy: "curvy hourglass figure",
      plus: "plus-size build",
    };

    const heightDescriptions: Record<string, string> = {
      short: "5'0\" to 5'3\" height",
      average: "5'4\" to 5'7\" height", 
      tall: "5'8\" to 6'0\" height",
      verytall: "over 6'0\" height",
    };

    let prompt = `Create a full-body 3D avatar with the following characteristics:
- Body type: ${bodyTypeDescriptions[bodyType] || bodyType}
- Height: ${heightDescriptions[height] || height}
- Standing in a neutral T-pose, facing forward
- Wearing form-fitting athletic wear (sports bra and leggings)
- Clean white background
- Professional studio lighting
- Photorealistic style
- Full body visible from head to toe

${bodyPhotoBase64 ? 'Use the provided full body photo as reference for body proportions and build. Match the facial features from the face reference image.' : 'The avatar should have the facial features and appearance from the reference face image provided.'}

Create a natural, realistic representation suitable for virtual try-on clothing.`;

    console.log("Generating avatar with prompt:", prompt);

    const messages: any[] = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt }
        ]
      }
    ];

    // Add face image if provided
    if (faceImageBase64) {
      messages[0].content.push({
        type: "image_url",
        image_url: { url: faceImageBase64 }
      });
    }

    // Add body photo if provided
    if (bodyPhotoBase64) {
      messages[0].content.push({
        type: "image_url",
        image_url: { url: bodyPhotoBase64 }
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages,
        modalities: ["image", "text"]
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Avatar generation response received");
    
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      throw new Error("No image generated");
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating avatar:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate avatar" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
