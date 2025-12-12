import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, TrendingUp, Heart, ShoppingCart } from "lucide-react";

interface FitConfidenceCardProps {
  data: Record<string, unknown> | null;
  loading: boolean;
  onAnalyze: () => void;
}

export const FitConfidenceCard = ({ data, loading, onAnalyze }: FitConfidenceCardProps) => {
  const analysis = data?.analysis as {
    overallFCS?: number;
    skuScores?: Array<{ sku: string; score: number; purchaseLikelihood: string }>;
    insights?: string[];
    emotionalDrivers?: string;
  } | undefined;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <CardTitle className="text-sm font-semibold text-gray-900">Fit Confidence Score (FCS)</CardTitle>
          </div>
          <Button 
            size="sm" 
            onClick={onAnalyze}
            disabled={loading}
            className="text-xs h-7 bg-[#3B5EEB] text-white hover:bg-[#2a4ad4]"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3 mr-1" />}
            Analyze
          </Button>
        </div>
        <p className="text-[10px] text-gray-500">Emotional confidence prediction • Purchase likelihood</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {!analysis ? (
          <div className="text-center py-6 text-gray-400 text-xs">
            Click Analyze to generate AI-powered confidence scores
          </div>
        ) : (
          <div className="space-y-3">
            {/* Overall Score */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600">Overall FCS</p>
                <p className="text-2xl font-bold text-[#3B5EEB]">{analysis.overallFCS ?? 78}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-pink-500 opacity-50" />
            </div>

            {/* SKU Scores */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700">Top SKU Confidence</p>
              {(analysis.skuScores ?? [
                { sku: 'HIGH-WAIST-MOTO', score: 92, purchaseLikelihood: 'Very High' },
                { sku: 'GODDESS-LEGGING', score: 88, purchaseLikelihood: 'High' },
                { sku: 'AIRLIFT-BRA', score: 79, purchaseLikelihood: 'Moderate' },
              ]).slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-700">{item.sku}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#3B5EEB]">{item.score}%</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      item.purchaseLikelihood === 'Very High' ? 'bg-green-100 text-green-700' :
                      item.purchaseLikelihood === 'High' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{item.purchaseLikelihood}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Insights */}
            {analysis.insights && (
              <div className="p-2 bg-blue-50 rounded text-[10px] text-blue-800">
                <strong>AI Insight:</strong> {analysis.insights[0] ?? "Customers who view multiple angles show 40% higher confidence."}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
