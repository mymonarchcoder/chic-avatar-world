import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingBag, Repeat, Brain, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAIAnalytics } from "@/hooks/useAIAnalytics";
import { FitConfidenceCard } from "@/components/dashboard/FitConfidenceCard";
import { ReturnRiskCard } from "@/components/dashboard/ReturnRiskCard";
import { FitMismatchCard } from "@/components/dashboard/FitMismatchCard";
import { InventoryForecastCard } from "@/components/dashboard/InventoryForecastCard";
import { BodyTypePredictionCard } from "@/components/dashboard/BodyTypePredictionCard";
import { SKUAnalysisCard } from "@/components/dashboard/SKUAnalysisCard";
import { AvatarPathwayCard } from "@/components/dashboard/AvatarPathwayCard";
import { CrossBrandCard } from "@/components/dashboard/CrossBrandCard";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { loading, results, runAnalysis, runAllAnalyses } = useAIAnalytics();

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#3B5EEB]">Virtual Try-On Analytics</h1>
            <p className="text-xs text-gray-500">AI-powered body-dimension intelligence platform</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={runAllAnalyses}
              className="bg-[#3B5EEB] hover:bg-[#2a4ad4] text-white text-xs h-8"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Run All AI Analysis
            </Button>
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
        </div>
      </header>

      {/* Key Metrics Row */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-4 gap-3 mb-3">
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Total Try-Ons</span>
                <Users className="w-3.5 h-3.5 text-[#3B5EEB]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">23,456</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />+12.5%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Conversion Rate</span>
                <BarChart3 className="w-3.5 h-3.5 text-[#3B5EEB]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">68.2%</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />+5.3%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Avg Order Value</span>
                <ShoppingBag className="w-3.5 h-3.5 text-[#3B5EEB]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">$127</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />+8.1%
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Return Rate</span>
                <Repeat className="w-3.5 h-3.5 text-[#3B5EEB]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">8.4%</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingDown className="w-3 h-3" />-3.2%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col px-4 pb-4 overflow-hidden">
        <TabsList className="bg-gray-100 h-9 mb-3">
          <TabsTrigger value="overview" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#3B5EEB]">Overview</TabsTrigger>
          <TabsTrigger value="ai-insights" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#3B5EEB]">
            <Brain className="w-3 h-3 mr-1" />AI Insights
          </TabsTrigger>
          <TabsTrigger value="predictions" className="text-xs data-[state=active]:bg-white data-[state=active]:text-[#3B5EEB]">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="flex-1 overflow-auto m-0">
          <div className="grid grid-cols-3 gap-3">
            <FitConfidenceCard data={results.fit_confidence} loading={loading.fit_confidence} onAnalyze={() => runAnalysis('fit_confidence')} />
            <ReturnRiskCard data={results.return_risk} loading={loading.return_risk} onAnalyze={() => runAnalysis('return_risk')} />
            <FitMismatchCard data={results.fit_mismatch} loading={loading.fit_mismatch} onAnalyze={() => runAnalysis('fit_mismatch')} />
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="flex-1 overflow-auto m-0">
          <div className="grid grid-cols-3 gap-3">
            <AvatarPathwayCard data={results.avatar_pathway} loading={loading.avatar_pathway} onAnalyze={() => runAnalysis('avatar_pathway')} />
            <CrossBrandCard data={results.cross_brand_compatibility} loading={loading.cross_brand_compatibility} onAnalyze={() => runAnalysis('cross_brand_compatibility')} />
            <SKUAnalysisCard 
              simulationData={results.sku_simulation} 
              improvementData={results.sku_improvement}
              simulationLoading={loading.sku_simulation}
              improvementLoading={loading.sku_improvement}
              onAnalyzeSimulation={() => runAnalysis('sku_simulation')}
              onAnalyzeImprovement={() => runAnalysis('sku_improvement')}
            />
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="flex-1 overflow-auto m-0">
          <div className="grid grid-cols-2 gap-3">
            <InventoryForecastCard data={results.inventory_forecast} loading={loading.inventory_forecast} onAnalyze={() => runAnalysis('inventory_forecast')} />
            <BodyTypePredictionCard data={results.body_type_prediction} loading={loading.body_type_prediction} onAnalyze={() => runAnalysis('body_type_prediction')} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
