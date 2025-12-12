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
    const { analysisType, data } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (analysisType) {
      case "fit_confidence":
        systemPrompt = `You are an expert AI analyst for virtual try-on analytics. Analyze the provided VTO data and generate Fit Confidence Scores (FCS) - a proprietary metric that predicts shopper confidence based on avatar fit, garment drape, and buy/return behavior. 
        
        Return a JSON object with:
        - overallFCS: number 0-100
        - skuScores: array of {sku, score, confidenceFactors, purchaseLikelihood}
        - insights: array of actionable insights
        - emotionalDrivers: what's driving confidence up or down`;
        userPrompt = `Analyze this VTO session data and generate Fit Confidence Scores: ${JSON.stringify(data)}`;
        break;

      case "return_risk":
        systemPrompt = `You are an ML-powered return prediction analyst. Calculate Return Risk Index for each SKU based on body type, fabric simulation, purchase history, and fit warnings.
        
        Return a JSON object with:
        - highRiskSKUs: array of {sku, riskScore, bodyType, factors, recommendedAction}
        - mediumRiskSKUs: same structure
        - lowRiskSKUs: same structure
        - totalReturnReduction: estimated percentage reduction possible
        - profitProtection: estimated dollar impact`;
        userPrompt = `Predict return risk for these SKUs and body types: ${JSON.stringify(data)}`;
        break;

      case "fit_mismatch":
        systemPrompt = `You are a fit analysis AI that detects garment-body mismatch patterns. Identify issues like sleeve length mismatches, waistband tension, rise problems, and shoulder-bust ratio conflicts.
        
        Return a JSON object with:
        - alerts: array of {severity, garmentType, issue, affectedDemographic, percentageAffected, recommendation}
        - patternsTrending: emerging fit issues
        - merchantActions: specific fixes merchants can implement`;
        userPrompt = `Detect fit mismatch patterns in this try-on data: ${JSON.stringify(data)}`;
        break;

      case "avatar_pathway":
        systemPrompt = `You are a behavioral analytics AI analyzing how avatar customization drives purchase decisions. Track waist adjustments, color exploration, size changes, and correlate with conversions.
        
        Return a JSON object with:
        - pathwayInsights: array of {behavior, conversionMultiplier, insight}
        - intentSignals: what behaviors indicate high purchase intent
        - conversionNudges: recommendations to boost final conversion
        - avatarEngagementScore: overall engagement metric`;
        userPrompt = `Analyze avatar behavior pathways: ${JSON.stringify(data)}`;
        break;

      case "sku_simulation":
        systemPrompt = `You are a simulation quality analyst. Rank SKU simulations by accuracy and business impact based on conversion uplift, return reduction, and confidence scores.
        
        Return a JSON object with:
        - rankings: array of {sku, simulationStrength, conversionUplift, returnReduction, investmentPriority}
        - improvementOpportunities: SKUs needing better 3D assets
        - topPerformers: highest-impact simulations`;
        userPrompt = `Rank simulation quality for these SKUs: ${JSON.stringify(data)}`;
        break;

      case "inventory_forecast":
        systemPrompt = `You are an inventory demand forecaster using try-on behavior signals. Predict which sizes, colors, and styles will sell out based on try-on to purchase velocity.
        
        Return a JSON object with:
        - demandTrending: array of {sku, size, color, velocityChange, prediction}
        - stockoutRisks: items trending toward sellout
        - overstockRisks: high try-on but low conversion items
        - sizeCurveOptimization: recommended units per size for next order`;
        userPrompt = `Forecast inventory demand from this try-on data: ${JSON.stringify(data)}`;
        break;

      case "body_type_prediction":
        systemPrompt = `You are a predictive analytics AI for body-type specific conversions. Don't just report historical data - predict future performance by body type and recommend style optimizations.
        
        Return a JSON object with:
        - predictions: array of {bodyType, currentConversion, predictedNextMonth, predictedChange, recommendedStyles, predictedUplift}
        - styleRecommendations: which silhouettes work best for each body type
        - seasonalTrends: upcoming body-type preferences`;
        userPrompt = `Generate predictive body-type conversion forecasts: ${JSON.stringify(data)}`;
        break;

      case "cross_brand_compatibility":
        systemPrompt = `You are a cross-brand fit compatibility analyst. Predict how well garments translate between brands based on size mapping and fit characteristics.
        
        Return a JSON object with:
        - compatibilityIndex: array of {sourceBrand, targetBrand, compatibilityScore, sizeMapping, fitNotes}
        - crossBuyerInsights: what cross-shoppers reveal about fit preferences
        - brandPositioning: where each brand sits in the fit spectrum`;
        userPrompt = `Calculate cross-brand fit compatibility: ${JSON.stringify(data)}`;
        break;

      case "sku_improvement":
        systemPrompt = `You are a product improvement AI. For underperforming SKUs, predict conversion uplift if specific issues are fixed, and provide actionable recommendations.
        
        Return a JSON object with:
        - improvements: array of {sku, currentConversion, issues, suggestedFixes, predictedUpliftIfFixed, priority}
        - quickWins: fixes with highest impact-to-effort ratio
        - redesignCandidates: SKUs needing fundamental changes`;
        userPrompt = `Analyze SKUs and suggest improvements: ${JSON.stringify(data)}`;
        break;

      default:
        throw new Error(`Unknown analysis type: ${analysisType}`);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
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

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;
    
    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      analysis = { rawResponse: content };
    }

    console.log(`Analysis completed for type: ${analysisType}`);

    return new Response(JSON.stringify({ analysis, analysisType }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Error in analyze-vto-data:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
