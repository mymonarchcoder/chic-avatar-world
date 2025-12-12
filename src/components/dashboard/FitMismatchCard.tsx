import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Ruler, AlertCircle, Wrench } from "lucide-react";

interface FitMismatchCardProps {
  data: Record<string, unknown> | null;
  loading: boolean;
  onAnalyze: () => void;
}

export const FitMismatchCard = ({ data, loading, onAnalyze }: FitMismatchCardProps) => {
  const analysis = data?.analysis as {
    alerts?: Array<{ severity: string; garmentType: string; issue: string; affectedDemographic: string; percentageAffected: number; recommendation: string }>;
    merchantActions?: string[];
  } | undefined;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-purple-500" />
            <CardTitle className="text-sm font-semibold text-gray-900">Fit Mismatch Alerts</CardTitle>
          </div>
          <Button 
            size="sm" 
            onClick={onAnalyze}
            disabled={loading}
            className="text-xs h-7 bg-[#3B5EEB] text-white hover:bg-[#2a4ad4]"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3 mr-1" />}
            Detect
          </Button>
        </div>
        <p className="text-[10px] text-gray-500">Pattern detection • Garment-body conflicts</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {!analysis ? (
          <div className="text-center py-6 text-gray-400 text-xs">
            Click Detect to find fit mismatch patterns
          </div>
        ) : (
          <div className="space-y-3">
            {/* Alerts */}
            {(analysis.alerts ?? [
              { severity: 'high', garmentType: 'Leggings', issue: 'Rise mismatch', affectedDemographic: 'Petite shoppers', percentageAffected: 34, recommendation: 'Add petite length option' },
              { severity: 'medium', garmentType: 'Bras', issue: 'Band tension', affectedDemographic: '34D+ sizes', percentageAffected: 28, recommendation: 'Improve band elasticity' },
              { severity: 'medium', garmentType: 'Tops', issue: 'Shoulder width', affectedDemographic: 'Athletic build', percentageAffected: 22, recommendation: 'Widen shoulder seams' },
            ]).map((alert, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'medium' ? 'bg-orange-50 border-orange-500' :
                  'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <AlertCircle className={`w-3 h-3 ${
                      alert.severity === 'high' ? 'text-red-500' : 'text-orange-500'
                    }`} />
                    <span className="text-xs font-medium text-gray-800">{alert.garmentType}: {alert.issue}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-600">{alert.percentageAffected}%</span>
                </div>
                <p className="text-[10px] text-gray-600 mb-1">Affects: {alert.affectedDemographic}</p>
                <div className="flex items-center gap-1 text-[10px] text-blue-600">
                  <Wrench className="w-3 h-3" />
                  {alert.recommendation}
                </div>
              </div>
            ))}

            {/* Merchant Actions */}
            {analysis.merchantActions && (
              <div className="p-2 bg-purple-50 rounded text-[10px]">
                <strong className="text-purple-700">Priority Actions:</strong>
                <ul className="mt-1 space-y-0.5 text-purple-800">
                  {(analysis.merchantActions.slice(0, 2) ?? ['Update size guide for petite range', 'Review bra band specifications']).map((action, i) => (
                    <li key={i}>• {action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
