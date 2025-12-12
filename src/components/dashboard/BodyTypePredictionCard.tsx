import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Users, ArrowUp, ArrowDown } from "lucide-react";

interface BodyTypePredictionCardProps {
  data: Record<string, unknown> | null;
  loading: boolean;
  onAnalyze: () => void;
}

export const BodyTypePredictionCard = ({ data, loading, onAnalyze }: BodyTypePredictionCardProps) => {
  const analysis = data?.analysis as {
    predictions?: Array<{ 
      bodyType: string; 
      currentConversion: number; 
      predictedNextMonth: number; 
      predictedChange: number;
      recommendedStyles: string[];
      predictedUplift: number;
    }>;
    styleRecommendations?: Record<string, string[]>;
  } | undefined;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-500" />
            <CardTitle className="text-sm font-semibold text-gray-900">Body Type Conversion Forecast</CardTitle>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onAnalyze}
            disabled={loading}
            className="text-xs h-7 border-[#3B5EEB] text-[#3B5EEB] hover:bg-[#3B5EEB]/10"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3 mr-1" />}
            Predict
          </Button>
        </div>
        <p className="text-[10px] text-gray-500">Predictive • Not historical • Style optimization</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {!analysis ? (
          <div className="text-center py-6 text-gray-400 text-xs">
            Click Predict for body-type specific forecasts
          </div>
        ) : (
          <div className="space-y-2">
            {(analysis.predictions ?? [
              { bodyType: 'Hourglass', currentConversion: 70, predictedNextMonth: 78, predictedChange: 12, recommendedStyles: ['Wrap dresses', 'High-waist'], predictedUplift: 18 },
              { bodyType: 'Rectangle', currentConversion: 65, predictedNextMonth: 70, predictedChange: 7, recommendedStyles: ['A-line', 'Peplum'], predictedUplift: 14 },
              { bodyType: 'Pear', currentConversion: 64, predictedNextMonth: 68, predictedChange: 6, recommendedStyles: ['Flared pants', 'V-neck'], predictedUplift: 12 },
              { bodyType: 'Apple', currentConversion: 62, predictedNextMonth: 66, predictedChange: 6, recommendedStyles: ['Empire waist', 'Straight leg'], predictedUplift: 10 },
            ]).map((item, idx) => (
              <div key={idx} className="p-3 bg-gradient-to-r from-gray-50 to-teal-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-800">{item.bodyType}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{item.currentConversion}%</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-sm font-bold text-teal-600">{item.predictedNextMonth}%</span>
                    <span className={`flex items-center text-[10px] ${item.predictedChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.predictedChange > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                      {Math.abs(item.predictedChange)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {item.recommendedStyles.map((style, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded">{style}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-green-600">+{item.predictedUplift}% uplift</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
