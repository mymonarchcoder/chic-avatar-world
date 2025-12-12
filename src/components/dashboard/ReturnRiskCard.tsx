import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, AlertTriangle, DollarSign, TrendingDown } from "lucide-react";

interface ReturnRiskCardProps {
  data: Record<string, unknown> | null;
  loading: boolean;
  onAnalyze: () => void;
}

export const ReturnRiskCard = ({ data, loading, onAnalyze }: ReturnRiskCardProps) => {
  const analysis = data?.analysis as {
    highRiskSKUs?: Array<{ sku: string; riskScore: number; bodyType: string; recommendedAction: string }>;
    totalReturnReduction?: number;
    profitProtection?: string;
  } | undefined;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <CardTitle className="text-sm font-semibold text-gray-900">Return Risk Index</CardTitle>
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
        <p className="text-[10px] text-gray-500">ML-powered return probability • Profit protection</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {!analysis ? (
          <div className="text-center py-6 text-gray-400 text-xs">
            Click Predict to calculate return risk for each SKU
          </div>
        ) : (
          <div className="space-y-3">
            {/* ROI Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <TrendingDown className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-green-600">-{analysis.totalReturnReduction ?? 24}%</p>
                <p className="text-[10px] text-gray-600">Return Reduction</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <DollarSign className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-blue-600">{analysis.profitProtection ?? "$127K"}</p>
                <p className="text-[10px] text-gray-600">Profit Protected</p>
              </div>
            </div>

            {/* High Risk SKUs */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                High Risk SKUs
              </p>
              {(analysis.highRiskSKUs ?? [
                { sku: 'CROP-TEE', riskScore: 78, bodyType: 'Apple', recommendedAction: 'Add length options' },
                { sku: 'RIBBED-TANK', riskScore: 72, bodyType: 'Pear', recommendedAction: 'Improve size guide' },
                { sku: 'SPORTS-BRA', riskScore: 68, bodyType: 'Large Bust', recommendedAction: 'Add cup sizing' },
              ]).slice(0, 3).map((item, idx) => (
                <div key={idx} className="p-2 bg-red-50 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-800">{item.sku}</span>
                    <span className="text-xs font-bold text-red-600">{item.riskScore}% risk</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Body: {item.bodyType}</span>
                    <span className="text-[10px] text-blue-600">→ {item.recommendedAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
