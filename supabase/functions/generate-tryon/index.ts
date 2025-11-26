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
    const { avatarImageBase64, outfitDescription, size, bodyType, height } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const bodyTypeDescriptions: Record<string, string> = {
      petite: "petite build, 5'4\", slim frame with pilates-toned physique",
      athletic: "athletic and toned physique with defined muscles",
      curvy: "curvy hourglass figure",
      plus: "plus-size build",
    };

    // XS measurements for accurate sizing
    const sizeDetails = `
Size: XS (2-4)
- Bust: 32-34 inches
- Under Bust: 27-28 inches  
- Waist: 25-26.5 inches
- Boxy, oversized fit as designed
- Relaxed, comfortable drape`;

    const prompt = `Create a highly photorealistic full-body image of this person wearing the following outfit:

OUTFIT DETAILS:
${outfitDescription}

FIT & SIZING:
${sizeDetails}

BODY TYPE: ${bodyTypeDescriptions[bodyType] || bodyType}

STYLING REQUIREMENTS:
- Cream/beige Alo Yoga hoodie with drawstrings, kangaroo front pocket, and hood
- Small "alo" embroidered logo on left chest (subtle, small text)
- Matching cream/beige Alo sweatpants with drawstring waist
- Small "alo" logo embroidered on left hip area of pants
- Soft fleece/terry material with natural texture and folds
- Oversized, boxy fit on XS frame - hoodie should look relaxed and roomy, not tight
- Sweatpants should have comfortable, slightly loose fit with natural draping
- Visible seam details on shoulders and sleeves
- Drawstrings hanging naturally from hood and waistband
- Ribbed cuffs on sleeves and pant legs

FACE & APPEARANCE (CRITICAL):
- Natural, minimal makeup look - fresh-faced with bare skin
- Real 3D skin texture with dimension and natural shadows
- Avoid flat, plastic, or overly-smooth appearance
- Natural facial contours with proper depth
- Realistic, matte skin finish

POSE & SETTING:
- Natural, relaxed standing pose with weight on one leg
- Head and gaze turned slightly to the right
- Clean white/light gray background
- Professional studio lighting with natural shadows showing fabric dimension
- Full body visible from head to toe
- Casual, approachable posture with slight hip tilt

The outfit should drape naturally showing realistic fabric folds and the intentionally oversized fit of XS Alo athleisure wear.`;

    console.log("Generating try-on with prompt:", prompt);

    const messages: any[] = [
      {
        role: "user",
        content: [
          { type: "text", text: prompt }
        ]
      }
    ];

    // Add avatar image as reference if provided
    if (avatarImageBase64) {
      messages[0].content.push({
        type: "image_url",
        image_url: { url: avatarImageBase64 }
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
    console.log("Try-on generation response received");
    
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      throw new Error("No image generated");
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error generating try-on:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to generate try-on" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
