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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Virtual Try-On Analytics</h1>
              <p className="text-sm text-muted-foreground mt-1">Body-dimension-level intelligence platform</p>
            </div>
            <div className="flex items-center gap-4">
              <select className="px-4 py-2 border border-input bg-background rounded-lg text-sm text-foreground">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last 12 Months</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Try-Ons</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">13,453</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+12.5%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Conversion</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">67.8%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+5.2%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">8,234</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+8.1%</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Order Value</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$127.50</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+15.3%</span> from last period
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cross-Shopping Intelligence */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Cross-Shopping Intelligence
              </CardTitle>
              <CardDescription>Users who try on your products also try on...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crossShoppingData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{item.brand}</div>
                      <div className="text-sm text-muted-foreground">{item.users.toLocaleString()} users</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-48 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground w-12 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Customer Brands */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Best Customer Overlap
              </CardTitle>
              <CardDescription>Your best customers also shop at...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bestCustomerBrands.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{item.brand}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-48 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.overlap}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-foreground w-12 text-right">{item.overlap}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Body Type Conversion */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Body Type Conversion Analysis
              </CardTitle>
              <CardDescription>Actual body types that convert the most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Body Type</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Try-Ons</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Conversions</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Rate</th>
                      <th className="py-3 px-4 text-sm font-medium text-muted-foreground">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bodyTypeConversion.map((item, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="py-3 px-4 font-medium text-foreground">{item.type}</td>
                        <td className="py-3 px-4 text-right text-foreground">{item.tryOns.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-foreground">{item.conversions.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right font-semibold text-foreground">{item.rate}%</td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${item.rate}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Size Intelligence */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                Size Intelligence
              </CardTitle>
              <CardDescription>Try-On vs Purchase Size Patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Try-On Sizes</h4>
                  {sizingInsights.filter(s => s.category === "Try-On Size").map((item, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Size {item.size}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground w-10 text-right">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Purchase Sizes</h4>
                  {sizingInsights.filter(s => s.category === "Purchase Size").map((item, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Size {item.size}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-foreground w-10 text-right">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Range Analysis */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Price Range Performance
              </CardTitle>
              <CardDescription>Target avatar frequently tries items in...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {priceRangeData.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item.range}</span>
                      <span className="text-sm font-semibold text-foreground">{item.conversions}% conversion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.conversions}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{item.tryOns.toLocaleString()} tries</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing SKUs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Performing SKUs
              </CardTitle>
              <CardDescription>Highest conversion rates and lowest return rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">SKU</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Try-Ons</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Purchases</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Conversion</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Returns</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSKUs.map((item, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="py-3 px-4 font-medium text-foreground">{item.sku}</td>
                        <td className="py-3 px-4 text-right text-foreground">{item.tryOns.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-foreground">{item.purchases.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            {item.conversionRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            {item.returns}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Low Conversion SKUs - Action Required */}
          <Card className="lg:col-span-2 border-orange-200 bg-orange-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertCircle className="w-5 h-5" />
                Low Conversion Alert
              </CardTitle>
              <CardDescription className="text-orange-700">High try-on but low purchase rates - potential fit or quality issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-orange-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-orange-900">SKU</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-orange-900">Try-Ons</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-orange-900">Purchases</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-orange-900">Conversion</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-orange-900">Likely Issue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowConversionSKUs.map((item, index) => (
                      <tr key={index} className="border-b border-orange-200 last:border-0">
                        <td className="py-3 px-4 font-medium text-orange-950">{item.sku}</td>
                        <td className="py-3 px-4 text-right text-orange-950">{item.tryOns.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-orange-950">{item.purchases.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                            {item.conversionRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-orange-950">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
