import { BarChart3, TrendingUp, TrendingDown, Users, ShoppingBag, AlertCircle, Package, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const crossShoppingData = [
    { brand: "Lululemon Align", percentage: 68 },
    { brand: "Athleta Elation", percentage: 54 },
    { brand: "Nike Zenvy", percentage: 47 },
    { brand: "Alo Goddess", percentage: 42 }
  ];

  const bodyTypeConversion = [
    { type: "Hourglass", rate: 70 },
    { type: "Rectangle", rate: 65 },
    { type: "Pear", rate: 64 },
    { type: "Apple", rate: 62 },
  ];

  const topSKUs = [
    { sku: "HIGH-WAIST-MOTO", rate: 86 },
    { sku: "GODDESS-LEGGING", rate: 82 },
    { sku: "AIRLIFT-BRA", rate: 79 },
  ];

  const lowSKUs = [
    { sku: "CROP-TEE", rate: 20, reason: "Fit issues" },
    { sku: "RIBBED-TANK", rate: 22, reason: "Size inconsistency" },
    { sku: "SPORTS-BRA", rate: 24, reason: "Color mismatch" },
  ];

  const priceRangeData = [
    { range: "$0-50", conv: 45 },
    { range: "$50-100", conv: 68 },
    { range: "$100-150", conv: 72 },
    { range: "$150+", conv: 58 },
  ];

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#3B5EEB]">Virtual Try-On Analytics</h1>
            <p className="text-xs text-gray-500">Body-dimension intelligence platform</p>
          </div>
          <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <Card className="bg-white border border-gray-100 shadow-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Total Try-Ons</span>
                <Users className="w-3.5 h-3.5 text-[#3B5EEB]" />
              </div>
              <div className="text-2xl font-bold text-gray-900">23,456</div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="w-3 h-3" />
                +12.5%
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
                <TrendingUp className="w-3 h-3" />
                +5.3%
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
                <TrendingUp className="w-3 h-3" />
                +8.1%
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
                <TrendingDown className="w-3 h-3" />
                -3.2%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid - 3 Columns */}
        <div className="grid grid-cols-3 gap-3 h-[calc(100%-120px)]">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <Card className="bg-white border border-gray-100 shadow-sm flex-1">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Cross-Brand Behavior</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-2">
                  {crossShoppingData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700">{item.brand}</span>
                        <span className="font-medium text-[#3B5EEB]">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="bg-[#3B5EEB] h-1.5 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm flex-1">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Body Type Conversion</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-2">
                  {bodyTypeConversion.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-700">{item.type}</span>
                      <span className="text-sm font-bold text-green-600">{item.rate}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <Card className="bg-white border border-gray-100 shadow-sm flex-1">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <CardTitle className="text-sm font-semibold text-gray-900">Top Converting SKUs</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-2">
                  {topSKUs.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                      <span className="text-xs font-medium text-gray-800">{item.sku}</span>
                      <span className="text-sm font-bold text-green-600">{item.rate}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm flex-1">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <CardTitle className="text-sm font-semibold text-gray-900">Low Converting SKUs</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-2">
                  {lowSKUs.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                      <div>
                        <p className="text-xs font-medium text-gray-800">{item.sku}</p>
                        <p className="text-[10px] text-gray-500">{item.reason}</p>
                      </div>
                      <span className="text-sm font-bold text-red-600">{item.rate}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            <Card className="bg-white border border-gray-100 shadow-sm flex-1">
              <CardHeader className="p-3 pb-2">
                <CardTitle className="text-sm font-semibold text-gray-900">Price Range Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-2">
                  {priceRangeData.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700">{item.range}</span>
                        <span className="font-medium text-[#3B5EEB]">{item.conv}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="bg-[#3B5EEB] h-1.5 rounded-full" 
                          style={{ width: `${item.conv}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm flex-1">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                  <CardTitle className="text-sm font-semibold text-gray-900">Return Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-2">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-800">Hip Ratio &gt; 1.3</p>
                    <p className="text-[10px] text-orange-600">Leggings +18% returns</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-800">Torso &lt; 24"</p>
                    <p className="text-[10px] text-orange-600">Tops +15% returns</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-800">Shoulder &gt; 17"</p>
                    <p className="text-[10px] text-orange-600">Bras +22% returns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
