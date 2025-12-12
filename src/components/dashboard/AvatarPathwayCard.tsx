import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Loader2, Activity, MousePointer, Target, Zap } from "lucide-react";

interface AvatarPathwayCardProps {
  data: Record<string, unknown> | null;
  loading: boolean;
  onAnalyze: () => void;
}

export const AvatarPathwayCard = ({ data, loading, onAnalyze }: AvatarPathwayCardProps) => {
  const analysis = data?.analysis as {
    pathwayInsights?: Array<{ behavior: string; conversionMultiplier: number; insight: string }>;
    intentSignals?: string[];
    conversionNudges?: string[];
    avatarEngagementScore?: number;
  } | undefined;

  return (
    <Card className="bg-white border border-gray-100 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-500" />
            <CardTitle className="text-sm font-semibold text-gray-900">Avatar-to-Purchase Pathway</CardTitle>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onAnalyze}
            disabled={loading}
            className="text-xs h-7 border-[#3B5EEB] text-[#3B5EEB] hover:bg-[#3B5EEB]/10"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3 mr-1" />}
            Analyze
          </Button>
        </div>
        <p className="text-[10px] text-gray-500">Behavioral signals • Intent prediction • Conversion nudges</p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {!analysis ? (
          <div className="text-center py-6 text-gray-400 text-xs">
            Click Analyze to track avatar behavior patterns
          </div>
        ) : (
          <div className="space-y-3">
            {/* Engagement Score */}
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-600">Avatar Engagement Score</p>
                <p className="text-2xl font-bold text-[#3B5EEB]">{analysis.avatarEngagementScore ?? 82}</p>
              </div>
              <Target className="w-8 h-8 text-cyan-500 opacity-50" />
            </div>

            {/* Pathway Insights */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-700">Behavior → Conversion</p>
              {(analysis.pathwayInsights ?? [
                { behavior: 'Waist adjustment', conversionMultiplier: 3.2, insight: 'Strong fit-seeking signal' },
                { behavior: 'Multi-color try-on', conversionMultiplier: 1.8, insight: 'High purchase intent' },
                { behavior: 'Size comparison', conversionMultiplier: 2.4, insight: 'Decision-making stage' },
              ]).slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <MousePointer className="w-3 h-3 text-cyan-500" />
                    <span className="text-xs text-gray-700">{item.behavior}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-cyan-600">{item.conversionMultiplier}x</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Nudges */}
            {analysis.conversionNudges && (
              <div className="p-2 bg-cyan-50 rounded">
                <p className="text-xs font-medium text-cyan-700 flex items-center gap-1 mb-1">
                  <Zap className="w-3 h-3" />
                  Conversion Nudges
                </p>
                <ul className="space-y-0.5">
                  {(analysis.conversionNudges.slice(0, 2) ?? ['Show size comparison after 2nd try-on', 'Trigger color suggestion after waist adjust']).map((nudge, i) => (
                    <li key={i} className="text-[10px] text-cyan-800">• {nudge}</li>
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
