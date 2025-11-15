import { BarChart3, TrendingUp, Users, ShoppingBag, Ruler, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  // Sample data - in production this would come from your API
  const crossShoppingData = [
    { brand: "Lululemon Align Pant", percentage: 68, users: 2340 },
    { brand: "Athleta Elation Tight", percentage: 54, users: 1856 },
    { brand: "Nike Zenvy Legging", percentage: 47, users: 1615 },
    { brand: "Alo Goddess Legging", percentage: 42, users: 1442 }
  ];

  const bestCustomerBrands = [
    { brand: "Outdoor Voices", overlap: 72 },
    { brand: "Free People Movement", overlap: 65 },
    { brand: "Vuori", overlap: 58 },
    { brand: "Girlfriend Collective", overlap: 51 }
  ];

  const bodyTypeConversion = [
    { type: "Hourglass", tryOns: 3420, conversions: 2394, rate: 70 },
    { type: "Rectangle", tryOns: 2890, conversions: 1878, rate: 65 },
    { type: "Pear", tryOns: 2654, conversions: 1699, rate: 64 },
    { type: "Apple", tryOns: 2123, conversions: 1316, rate: 62 },
    { type: "Inverted Triangle", tryOns: 1876, conversions: 1088, rate: 58 }
  ];

  const sizingInsights = [
    { category: "Try-On Size", size: "M", percentage: 42 },
    { category: "Try-On Size", size: "S", percentage: 28 },
    { category: "Try-On Size", size: "L", percentage: 18 },
    { category: "Purchase Size", size: "M", percentage: 38 },
    { category: "Purchase Size", size: "L", percentage: 26 },
    { category: "Purchase Size", size: "S", percentage: 24 }
  ];

  const topSKUs = [
    { sku: "HIGH-WAIST-MOTO-BLK", tryOns: 4523, purchases: 3894, conversionRate: 86, returns: 8 },
    { sku: "GODDESS-LEGGING-NAVY", tryOns: 3890, purchases: 3192, conversionRate: 82, returns: 12 },
    { sku: "AIRLIFT-INTRIGUE-BRA", tryOns: 3456, purchases: 2738, conversionRate: 79, returns: 15 },
    { sku: "ACCOLADE-ZIP-PULL", tryOns: 2890, purchases: 2198, conversionRate: 76, returns: 11 }
  ];

  const lowConversionSKUs = [
    { sku: "CROP-TEE-WHITE", tryOns: 2890, purchases: 578, conversionRate: 20, reason: "Fit issues" },
    { sku: "RIBBED-TANK-GREY", tryOns: 2456, purchases: 540, conversionRate: 22, reason: "Size inconsistency" },
    { sku: "SPORTS-BRA-CORAL", tryOns: 2123, purchases: 509, conversionRate: 24, reason: "Color mismatch" }
  ];

  const priceRangeData = [
    { range: "$0-50", tryOns: 1234, conversions: 45 },
    { range: "$50-100", tryOns: 3456, conversions: 68 },
    { range: "$100-150", tryOns: 4890, conversions: 72 },
    { range: "$150-200", tryOns: 2345, conversions: 65 },
    { range: "$200+", tryOns: 1567, conversions: 58 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">Virtual Try-On Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Body-dimension-level intelligence platform</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last 12 Months</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3">
              <CardTitle className="text-xs font-medium text-gray-600">Total Try-Ons</CardTitle>
              <Users className="w-3 h-3 text-gray-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-xl font-bold text-black">23,456</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12.5%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3">
              <CardTitle className="text-xs font-medium text-gray-600">Conversion Rate</CardTitle>
              <BarChart3 className="w-3 h-3 text-gray-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-xl font-bold text-black">68.2%</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +5.3%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3">
              <CardTitle className="text-xs font-medium text-gray-600">Avg Order Value</CardTitle>
              <ShoppingBag className="w-3 h-3 text-gray-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-xl font-bold text-black">$127.45</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +8.1%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3">
              <CardTitle className="text-xs font-medium text-gray-600">Return Rate</CardTitle>
              <AlertCircle className="w-3 h-3 text-gray-500" />
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-xl font-bold text-black">8.4%</div>
              <p className="text-xs text-red-600 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 rotate-180" />
                -3.2%
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Intelligence Grid - All on One Page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Cross-Shopping Intelligence */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Cross-Brand Try-On Behavior</CardTitle>
              <CardDescription className="text-xs">Users who try your products also try these brands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {crossShoppingData.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-black">{item.brand}</span>
                      <span className="text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitive Intelligence */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Competitive Intelligence</CardTitle>
              <CardDescription className="text-xs">Your high-value customers also shop at</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bestCustomerBrands.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-black">{item.brand}</p>
                      <p className="text-xs text-gray-600">{item.overlap}% overlap</p>
                    </div>
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Body Type & Sizing Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Body Type Conversion */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Body Type Conversion Rates</CardTitle>
              <CardDescription className="text-xs">Real body dimension analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bodyTypeConversion.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{item.type}</p>
                      <p className="text-xs text-gray-500">{item.conversions.toLocaleString()} / {item.tryOns.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-600">{item.rate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sizing Intelligence */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Try-On vs Purchase Sizing</CardTitle>
              <CardDescription className="text-xs">Size behavior patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Try-On Sizes</p>
                  <div className="flex gap-2">
                    {sizingInsights.filter(s => s.category === "Try-On Size").map((item, idx) => (
                      <div key={idx} className="flex-1 text-center p-2 bg-blue-50 rounded">
                        <p className="text-xs font-medium text-black">{item.size}</p>
                        <p className="text-xs text-gray-600">{item.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Purchase Sizes</p>
                  <div className="flex gap-2">
                    {sizingInsights.filter(s => s.category === "Purchase Size").map((item, idx) => (
                      <div key={idx} className="flex-1 text-center p-2 bg-green-50 rounded">
                        <p className="text-xs font-medium text-black">{item.size}</p>
                        <p className="text-xs text-gray-600">{item.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SKU Performance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Top Performing SKUs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Top Converting SKUs</CardTitle>
              <CardDescription className="text-xs">High try-on to purchase conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topSKUs.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{item.sku}</p>
                      <p className="text-xs text-gray-600">{item.tryOns.toLocaleString()} try-ons · {item.returns}% returns</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{item.conversionRate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Conversion SKUs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Low Converting SKUs</CardTitle>
              <CardDescription className="text-xs">High try-on but low purchase - action needed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowConversionSKUs.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">{item.sku}</p>
                      <p className="text-xs text-gray-600">{item.tryOns.toLocaleString()} try-ons · {item.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">{item.conversionRate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Price Range & Measurement Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Price Range Insights */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Price Range Performance</CardTitle>
              <CardDescription className="text-xs">Target avatar purchasing patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {priceRangeData.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-black">{item.range}</span>
                      <span className="text-gray-600">{item.conversions}% conversion</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-purple-600 h-1.5 rounded-full transition-all" 
                        style={{ width: `${item.conversions}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{item.tryOns.toLocaleString()} try-ons</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Measurement Correlations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-black">Measurement Return Correlations</CardTitle>
              <CardDescription className="text-xs">Body measurements linked to high returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-black">Hip-to-Waist Ratio &gt; 1.3</p>
                  <p className="text-xs text-gray-600 mb-1">Leggings return 18% higher</p>
                  <p className="text-xs text-orange-600 font-medium">Recommendation: Offer wider hip options</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-black">Torso Length &lt; 24"</p>
                  <p className="text-xs text-gray-600 mb-1">Tops return 15% higher</p>
                  <p className="text-xs text-orange-600 font-medium">Recommendation: Add petite sizing</p>
                </div>
                <div className="p-2 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-black">Shoulder Width &gt; 17"</p>
                  <p className="text-xs text-gray-600 mb-1">Sports bras return 22% higher</p>
                  <p className="text-xs text-orange-600 font-medium">Recommendation: Adjust strap placement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
