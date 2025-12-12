import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface InventoryForecastCardProps {
  data: Record<string, unknown> | null;
  loading: boolean;
  onAnalyze: () => void;
}

export const InventoryForecastCard = ({ data, loading, onAnalyze }: InventoryForecastCardProps) => {
  const analysis = data?.analysis as {
    demandTrending?: Array<{ sku: string; size: string; color: string; velocityChange: number; prediction: string }>;
    stockoutRisks?: Array<{ sku: string; size: string; daysToStockout: number }>;
    overstockRisks?: Array<{ sku: string; size: string; tryOnToConversion: number }>;
    sizeCurveOptimization?: Record<string, number>;
  } | undefined;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-500" />
            <CardTitle className="text-sm font-semibold text-gray-900">Inventory Demand Forecast</CardTitle>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onAnalyze}
            disabled={loading}
            className="text-xs h-7 border-[#3B5EEB] text-[#3B5EEB] hover:bg-[#3B5EEB]/10"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3 mr-1" />}
            Forecast
          </Button>
        </div>
        <p className="text-[10px] text-gray-500">Try-on velocity • Size curve optimization</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {!analysis ? (
          <div className="text-center py-6 text-gray-400 text-xs">
            Click Forecast to predict inventory demand
          </div>
        ) : (
          <div className="space-y-3">
            {/* Trending Up */}
            <div>
              <p className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2">
                <TrendingUp className="w-3 h-3 text-green-500" />
                Trending Up (Stockout Risk)
              </p>
              <div className="space-y-1">
                {(analysis.stockoutRisks ?? [
                  { sku: 'AIRLIFT-BRA', size: 'M', daysToStockout: 8 },
                  { sku: 'HIGH-WAIST-MOTO', size: 'S', daysToStockout: 12 },
                ]).slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-orange-500" />
                      <span className="text-xs text-gray-700">{item.sku} - {item.size}</span>
                    </div>
                    <span className="text-xs font-medium text-orange-600">{item.daysToStockout} days left</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overstock Risk */}
            <div>
              <p className="text-xs font-medium text-gray-700 flex items-center gap-1 mb-2">
                <TrendingDown className="w-3 h-3 text-red-500" />
                Overstock Risk (Low Conversion)
              </p>
              <div className="space-y-1">
                {(analysis.overstockRisks ?? [
                  { sku: 'CROP-TEE', size: 'XS', tryOnToConversion: 12 },
                  { sku: 'RIBBED-TANK', size: 'XL', tryOnToConversion: 18 },
                ]).slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded">
                    <span className="text-xs text-gray-700">{item.sku} - {item.size}</span>
                    <span className="text-xs font-medium text-red-600">{item.tryOnToConversion}% conv</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Curve */}
            <div className="p-2 bg-indigo-50 rounded">
              <p className="text-xs font-medium text-indigo-700 mb-2">Optimal Size Curve (Next Order)</p>
              <div className="flex gap-2 text-center">
                {(() => {
                  const sizeCurve = analysis.sizeCurveOptimization ?? { XS: 10, S: 22, M: 35, L: 23, XL: 10 };
                  // Handle if it's an array of objects or a plain object
                  if (Array.isArray(sizeCurve)) {
                    return sizeCurve.map((item: { size?: string; sku?: string; percentage?: number; recommendation?: string }, idx: number) => (
                      <div key={idx} className="flex-1">
                        <div className="text-sm font-bold text-indigo-600">{item.percentage ?? 0}%</div>
                        <div className="text-[10px] text-gray-600">{item.size ?? item.sku ?? 'N/A'}</div>
                      </div>
                    ));
                  }
                  return Object.entries(sizeCurve).map(([size, pct]) => (
                    <div key={size} className="flex-1">
                      <div className="text-sm font-bold text-indigo-600">{typeof pct === 'number' ? pct : 0}%</div>
                      <div className="text-[10px] text-gray-600">{size}</div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
