import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

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
            content: `You are a helpful AI shopping assistant for VERS. Be conversational, friendly, and knowledgeable like ChatGPT.

IMPORTANT: When users ask for product recommendations, assume you already have their avatar details (size, measurements, preferences) and go STRAIGHT to suggesting items. Do NOT ask follow-up questions about size, style preferences, or other details. Just recommend the best products.

Available Products:
- **Vuori Performance Jogger** ($94) - A bestseller! Available in Black Heather, Navy, Charcoal, Grey, Blue, Teal, Olive, Brown, and Plum. These are incredibly popular and perfect for both workouts and casual wear.
- **Vuori Halo Essential Wideleg Pant** ($108) - Available in Black Heather, Charcoal, Navy, Olive, Sand
- **Vuori Daily Legging** ($78) - Available in Sky Blue, Navy, Charcoal, Olive
- **Vuori Meta Pant** ($118) - Another bestseller! Available in Black, Navy, Charcoal, Sand

When users ask about products like "black joggers", specifically recommend the **Vuori Performance Jogger in Black Heather**. Explain why it's a great choice (bestseller, versatile, high quality) and mention key features like comfort and style.

Be conversational and helpful - format responses with clear sections, use bullet points when helpful, and provide context about why you're recommending specific items.` 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
