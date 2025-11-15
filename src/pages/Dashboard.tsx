import { BarChart3, TrendingUp, Users, ShoppingBag, Ruler, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Try-Ons</CardTitle>
              <Users className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">34,582</div>
              <p className="text-xs text-green-600 mt-1">↑ 12.5% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">68.4%</div>
              <p className="text-xs text-green-600 mt-1">↑ 5.2% from last period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Unique Body Types</CardTitle>
              <Ruler className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">12,963</div>
              <p className="text-xs text-gray-600 mt-1">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Basket Size</CardTitle>
              <ShoppingBag className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-black">$186</div>
              <p className="text-xs text-green-600 mt-1">↑ 8.3% from last period</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cross-shopping" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="cross-shopping">Cross-Shopping</TabsTrigger>
            <TabsTrigger value="body-types">Body Type Analytics</TabsTrigger>
            <TabsTrigger value="sizing">Sizing Intelligence</TabsTrigger>
            <TabsTrigger value="sku-performance">SKU Performance</TabsTrigger>
            <TabsTrigger value="price-range">Price Insights</TabsTrigger>
          </TabsList>

          {/* Cross-Shopping Intelligence */}
          <TabsContent value="cross-shopping" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Cross-Brand Try-On Behavior</CardTitle>
                  <CardDescription>Users who try your products also try these brands</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {crossShoppingData.map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-black">{item.brand}</span>
                          <span className="text-gray-600">{item.percentage}% overlap</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">{item.users.toLocaleString()} users</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Best Customer Brand Affinity</CardTitle>
                  <CardDescription>Your high-value customers also shop at</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bestCustomerBrands.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-black">{item.brand}</p>
                          <p className="text-sm text-gray-600">{item.overlap}% customer overlap</p>
                        </div>
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Body Type Analytics */}
          <TabsContent value="body-types" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Conversion by Body Type</CardTitle>
                <CardDescription>Real body dimension data showing what shapes convert best</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bodyTypeConversion.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-black">{item.type}</p>
                          <p className="text-xs text-gray-600">
                            {item.tryOns.toLocaleString()} try-ons → {item.conversions.toLocaleString()} purchases
                          </p>
                        </div>
                        <span className="text-2xl font-bold text-black">{item.rate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all" 
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-black">Silhouette Performance by Body Type</CardTitle>
                <CardDescription>What styles work best for different proportions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-black mb-2">High-Waist Styles</p>
                    <p className="text-xs text-gray-600 mb-3">Best for: Pear, Hourglass</p>
                    <p className="text-2xl font-bold text-blue-600">73% conversion</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-black mb-2">A-Line Cuts</p>
                    <p className="text-xs text-gray-600 mb-3">Best for: Apple, Rectangle</p>
                    <p className="text-2xl font-bold text-green-600">69% conversion</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium text-black mb-2">Fitted Styles</p>
                    <p className="text-xs text-gray-600 mb-3">Best for: Hourglass, Rectangle</p>
                    <p className="text-2xl font-bold text-purple-600">71% conversion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sizing Intelligence */}
          <TabsContent value="sizing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Try-On vs Purchase Sizing</CardTitle>
                  <CardDescription>Understanding size selection behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-black mb-3">Try-On Size Distribution</p>
                      <div className="space-y-2">
                        {sizingInsights.filter(s => s.category === "Try-On Size").map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="w-8 text-sm font-medium text-black">{item.size}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-8">
                              <div 
                                className="bg-blue-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-xs font-medium" 
                                style={{ width: `${item.percentage}%` }}
                              >
                                {item.percentage}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black mb-3">Actual Purchase Size Distribution</p>
                      <div className="space-y-2">
                        {sizingInsights.filter(s => s.category === "Purchase Size").map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="w-8 text-sm font-medium text-black">{item.size}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-8">
                              <div 
                                className="bg-green-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-xs font-medium" 
                                style={{ width: `${item.percentage}%` }}
                              >
                                {item.percentage}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Measurement Correlation to Returns</CardTitle>
                  <CardDescription>Body dimensions linked to high return rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-black mb-1">Hip-to-Waist Ratio 1.4+</p>
                          <p className="text-sm text-gray-600 mb-2">38% higher return rate on straight-leg styles</p>
                          <p className="text-xs text-red-600 font-medium">Recommendation: Suggest bootcut or flare styles</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-black mb-1">Bust-to-Band Difference 4"+</p>
                          <p className="text-sm text-gray-600 mb-2">42% return rate on standard sports bras</p>
                          <p className="text-xs text-amber-600 font-medium">Recommendation: High-support bra styles</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-black mb-1">Inseam Variance 2"+</p>
                          <p className="text-sm text-gray-600 mb-2">31% return on full-length leggings</p>
                          <p className="text-xs text-orange-600 font-medium">Recommendation: Offer 7/8 and cropped options</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SKU Performance */}
          <TabsContent value="sku-performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Top Performing SKUs</CardTitle>
                <CardDescription>Highest try-on to purchase conversion rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">SKU</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Try-Ons</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Purchases</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Conversion</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Return Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topSKUs.map((sku, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-black">{sku.sku}</td>
                          <td className="py-3 px-4 text-right text-gray-600">{sku.tryOns.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right text-gray-600">{sku.purchases.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {sku.conversionRate}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">{sku.returns}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-black">High Try-On, Low Conversion SKUs</CardTitle>
                <CardDescription>Items with engagement but poor conversion - action required</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowConversionSKUs.map((sku, idx) => (
                    <div key={idx} className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-black">{sku.sku}</p>
                          <p className="text-sm text-gray-600">{sku.tryOns.toLocaleString()} try-ons → {sku.purchases.toLocaleString()} purchases</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {sku.conversionRate}% conversion
                        </span>
                      </div>
                      <p className="text-sm text-red-600 font-medium">⚠️ Primary Issue: {sku.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Price Range Insights */}
          <TabsContent value="price-range" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-black">Price Range Performance</CardTitle>
                <CardDescription>Target avatar try-on and conversion behavior by price point</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priceRangeData.map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-black">{item.range}</p>
                          <p className="text-sm text-gray-600">{item.tryOns.toLocaleString()} try-ons</p>
                        </div>
                        <span className="text-lg font-bold text-black">{item.conversions}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all" 
                          style={{ width: `${item.conversions}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-black mb-2">💡 Key Insight</p>
                  <p className="text-sm text-gray-600">
                    Sweet spot: $100-150 range shows highest engagement (4,890 try-ons) AND conversion (72%). 
                    Consider expanding product offerings in this range.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Avg. Try-On Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-black">$127</p>
                  <p className="text-xs text-gray-600 mt-1">Across all body types</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Avg. Purchase Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-black">$142</p>
                  <p className="text-xs text-green-600 mt-1">↑ 11.8% higher than try-on</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Premium Adoption</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-black">34%</p>
                  <p className="text-xs text-gray-600 mt-1">Purchase $150+ items</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
