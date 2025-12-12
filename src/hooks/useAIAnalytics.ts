import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type AnalysisType = 
  | 'fit_confidence' 
  | 'return_risk' 
  | 'fit_mismatch' 
  | 'avatar_pathway' 
  | 'sku_simulation' 
  | 'inventory_forecast' 
  | 'body_type_prediction' 
  | 'cross_brand_compatibility'
  | 'sku_improvement';

export interface AnalysisResult {
  analysis: Record<string, unknown>;
  analysisType: AnalysisType;
  [key: string]: unknown;
}

// Mock data to simulate VTO analytics
const getMockData = (type: AnalysisType) => {
  const baseData = {
    tryOnSessions: 23456,
    conversionRate: 68.2,
    returnRate: 8.4,
    avgOrderValue: 127,
    skus: [
      { id: 'HIGH-WAIST-MOTO', name: 'High Waist Moto Legging', category: 'leggings', price: 128, tryOns: 4521, purchases: 3890, returns: 234 },
      { id: 'GODDESS-LEGGING', name: 'Goddess Legging', category: 'leggings', price: 118, tryOns: 3892, purchases: 3191, returns: 189 },
      { id: 'AIRLIFT-BRA', name: 'Airlift Intrigue Bra', category: 'bras', price: 72, tryOns: 3234, purchases: 2555, returns: 312 },
      { id: 'CROP-TEE', name: 'Alosoft Crop Tee', category: 'tops', price: 58, tryOns: 2891, purchases: 578, returns: 289 },
      { id: 'RIBBED-TANK', name: 'Ribbed Manifest Tank', category: 'tops', price: 52, tryOns: 2456, purchases: 540, returns: 216 },
    ],
    bodyTypes: [
      { type: 'Hourglass', sessions: 7891, conversions: 5524, returns: 276 },
      { type: 'Rectangle', sessions: 6234, conversions: 4052, returns: 243 },
      { type: 'Pear', sessions: 5123, conversions: 3279, returns: 312 },
      { type: 'Apple', sessions: 4208, conversions: 2609, returns: 287 },
    ],
    avatarBehaviors: [
      { action: 'waist_adjustment', count: 12456, purchaseRate: 78 },
      { action: 'color_exploration', count: 18923, purchaseRate: 65 },
      { action: 'size_change', count: 8934, purchaseRate: 82 },
      { action: 'multi_try', count: 15234, purchaseRate: 71 },
    ],
    brands: ['Alo', 'Lululemon', 'Athleta', 'Nike', 'Vuori'],
  };

  return baseData;
};

export const useAIAnalytics = () => {
  const [loading, setLoading] = useState<Record<AnalysisType, boolean>>({
    fit_confidence: false,
    return_risk: false,
    fit_mismatch: false,
    avatar_pathway: false,
    sku_simulation: false,
    inventory_forecast: false,
    body_type_prediction: false,
    cross_brand_compatibility: false,
    sku_improvement: false,
  });

  const [results, setResults] = useState<Record<AnalysisType, AnalysisResult | null>>({
    fit_confidence: null,
    return_risk: null,
    fit_mismatch: null,
    avatar_pathway: null,
    sku_simulation: null,
    inventory_forecast: null,
    body_type_prediction: null,
    cross_brand_compatibility: null,
    sku_improvement: null,
  });

  const runAnalysis = useCallback(async (analysisType: AnalysisType) => {
    setLoading(prev => ({ ...prev, [analysisType]: true }));

    try {
      const mockData = getMockData(analysisType);
      
      const { data, error } = await supabase.functions.invoke('analyze-vto-data', {
        body: { analysisType, data: mockData }
      });

      if (error) throw error;

      setResults(prev => ({ ...prev, [analysisType]: data }));
      toast.success(`${analysisType.replace(/_/g, ' ')} analysis complete`);
      return data;
    } catch (error: unknown) {
      console.error('Analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      toast.error(errorMessage);
      return null;
    } finally {
      setLoading(prev => ({ ...prev, [analysisType]: false }));
    }
  }, []);

  const runAllAnalyses = useCallback(async () => {
    const types: AnalysisType[] = [
      'fit_confidence',
      'return_risk', 
      'fit_mismatch',
      'avatar_pathway',
      'sku_simulation',
      'inventory_forecast',
      'body_type_prediction',
      'cross_brand_compatibility',
      'sku_improvement'
    ];

    toast.info('Running comprehensive AI analysis...');
    
    for (const type of types) {
      await runAnalysis(type);
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    toast.success('All analyses complete!');
  }, [runAnalysis]);

  return {
    loading,
    results,
    runAnalysis,
    runAllAnalyses,
  };
};
