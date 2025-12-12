import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Package, Wrench, TrendingUp, Star } from "lucide-react";

interface SKUAnalysisCardProps {
  simulationData: Record<string, unknown> | null;
  improvementData: Record<string, unknown> | null;
  simulationLoading: boolean;
  improvementLoading: boolean;
  onAnalyzeSimulation: () => void;
  onAnalyzeImprovement: () => void;
}

export const SKUAnalysisCard = ({ 
  simulationData, 
  improvementData, 
  simulationLoading, 
  improvementLoading,
  onAnalyzeSimulation,
  onAnalyzeImprovement 
}: SKUAnalysisCardProps) => {
  const simulationAnalysis = simulationData?.analysis as {
    rankings?: Array<{ sku: string; simulationStrength: number; conversionUplift: number; investmentPriority: string }>;
  } | undefined;

  const improvementAnalysis = improvementData?.analysis as {
    improvements?: Array<{ sku: string; currentConversion: number; issues: string[]; suggestedFixes: string[]; predictedUpliftIfFixed: number; priority: string }>;
    quickWins?: string[];
  } | undefined;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm col-span-2">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-amber-500" />
            <CardTitle className="text-sm font-semibold text-gray-900">SKU Intelligence Hub</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onAnalyzeSimulation}
              disabled={simulationLoading}
              className="text-xs h-7 border-[#3B5EEB] text-[#3B5EEB] hover:bg-[#3B5EEB]/10"
            >
              {simulationLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Star className="w-3 h-3 mr-1" />}
              Rank Simulations
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onAnalyzeImprovement}
              disabled={improvementLoading}
              className="text-xs h-7 border-[#3B5EEB] text-[#3B5EEB] hover:bg-[#3B5EEB]/10"
            >
              {improvementLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wrench className="w-3 h-3 mr-1" />}
              Suggest Fixes
            </Button>
          </div>
        </div>
        <p className="text-[10px] text-gray-500">Simulation strength • Improvement opportunities • Predicted uplift</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-2 gap-4">
          {/* Simulation Strength */}
          <div>
            <p className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2">
              <Star className="w-3 h-3 text-amber-500" />
              Simulation Strength Rankings
            </p>
            {!simulationAnalysis ? (
              <div className="text-center py-4 text-gray-400 text-[10px]">Click to rank simulations</div>
            ) : (
              <div className="space-y-2">
                {(simulationAnalysis.rankings ?? [
                  { sku: 'HIGH-WAIST-MOTO', simulationStrength: 94, conversionUplift: 32, investmentPriority: 'Keep' },
                  { sku: 'GODDESS-LEGGING', simulationStrength: 89, conversionUplift: 28, investmentPriority: 'Keep' },
                  { sku: 'CROP-TEE', simulationStrength: 45, conversionUplift: 8, investmentPriority: 'Improve 3D' },
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-amber-50 rounded">
                    <div>
                      <span className="text-xs font-medium text-gray-800">{item.sku}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-[10px] text-green-600">+{item.conversionUplift}% conv</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-amber-600">{item.simulationStrength}%</span>
                      <p className={`text-[10px] ${item.investmentPriority === 'Keep' ? 'text-green-600' : 'text-orange-600'}`}>
                        {item.investmentPriority}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Improvement Suggestions */}
          <div>
            <p className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2">
              <Wrench className="w-3 h-3 text-blue-500" />
              Improvement Opportunities
            </p>
            {!improvementAnalysis ? (
              <div className="text-center py-4 text-gray-400 text-[10px]">Click to get AI suggestions</div>
            ) : (
              <div className="space-y-2">
                {(improvementAnalysis.improvements ?? [
                  { sku: 'CROP-TEE', currentConversion: 20, suggestedFixes: ['Add length options', 'Improve fabric sim'], predictedUpliftIfFixed: 45, priority: 'High' },
                  { sku: 'RIBBED-TANK', currentConversion: 22, suggestedFixes: ['Update size guide'], predictedUpliftIfFixed: 28, priority: 'Medium' },
                ]).slice(0, 2).map((item, idx) => (
                  <div key={idx} className={`p-2 rounded border-l-4 ${item.priority === 'High' ? 'bg-red-50 border-red-500' : 'bg-orange-50 border-orange-500'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-800">{item.sku}</span>
                      <span className="text-[10px] text-gray-500">{item.currentConversion}% conv</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {item.suggestedFixes.map((fix, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">{fix}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] ${item.priority === 'High' ? 'text-red-600' : 'text-orange-600'}`}>{item.priority} Priority</span>
                      <span className="text-xs font-bold text-green-600">+{item.predictedUpliftIfFixed}% if fixed</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
