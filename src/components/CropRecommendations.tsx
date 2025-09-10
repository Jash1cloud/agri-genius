import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Droplets,
  Sun,
  AlertCircle,
  CheckCircle2,
  Star
} from "lucide-react";

interface CropData {
  name: string;
  confidence: number;
  expectedYield: string;
  growthPeriod: string;
  investmentRequired: string;
  profitability: "high" | "medium" | "low";
  waterRequirement: "high" | "medium" | "low";
  suitabilityReason: string;
  marketPrice: string;
  risks: string[];
  benefits: string[];
}

interface CropRecommendationsProps {
  farmData: any;
}

const CropRecommendations = ({ farmData }: CropRecommendationsProps) => {
  // Simulated AI recommendations based on form data
  const getRecommendations = (): CropData[] => {
    const { soilType, climate, budget } = farmData;
    
    // This would be replaced with actual AI API call
    const recommendations: CropData[] = [
      {
        name: "Organic Wheat",
        confidence: 95,
        expectedYield: "3.5-4.2 tons/acre",
        growthPeriod: "4-6 months",
        investmentRequired: "$800-1,200/acre",
        profitability: "high",
        waterRequirement: "medium",
        suitabilityReason: `Excellent match for ${soilType} soil and ${climate} climate. High market demand for organic varieties.`,
        marketPrice: "$650-750/ton",
        risks: ["Weather dependency", "Pest management"],
        benefits: ["High market value", "Sustainable farming", "Government subsidies available"]
      },
      {
        name: "Hybrid Corn",
        confidence: 88,
        expectedYield: "8-10 tons/acre",
        growthPeriod: "3-4 months",
        investmentRequired: "$600-900/acre",
        profitability: "high",
        waterRequirement: "medium",
        suitabilityReason: `Well-suited for your farm size and climate conditions. Proven high yields in similar regions.`,
        marketPrice: "$280-320/ton",
        risks: ["Market price fluctuation"],
        benefits: ["High yield potential", "Reliable market", "Multiple harvest seasons"]
      },
      {
        name: "Soybeans",
        confidence: 82,
        expectedYield: "2.8-3.2 tons/acre",
        growthPeriod: "4-5 months",
        investmentRequired: "$450-650/acre",
        profitability: "medium",
        waterRequirement: "low",
        suitabilityReason: `Good nitrogen-fixing crop for soil health improvement. Moderate water requirements suit your region.`,
        marketPrice: "$520-580/ton",
        risks: ["Lower profit margins"],
        benefits: ["Soil improvement", "Low water needs", "Rotation crop benefits"]
      }
    ];

    return recommendations;
  };

  const recommendations = getRecommendations();

  const getProfitabilityColor = (profitability: string) => {
    switch (profitability) {
      case "high": return "text-primary";
      case "medium": return "text-accent-gold";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getWaterColor = (requirement: string) => {
    switch (requirement) {
      case "high": return "text-sky";
      case "medium": return "text-accent";
      case "low": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Analysis Complete</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Your <span className="text-primary">AI-Generated</span> Crop Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your farm conditions in <strong>{farmData.location}</strong>, here are the most suitable crops for maximum profitability.
          </p>
        </div>

        {/* Farm Summary */}
        <Card className="p-6 mb-8 bg-muted/50">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Location:</span>
              <div className="font-medium">{farmData.location}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Farm Size:</span>
              <div className="font-medium">{farmData.farmSize} acres</div>
            </div>
            <div>
              <span className="text-muted-foreground">Soil Type:</span>
              <div className="font-medium capitalize">{farmData.soilType}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Climate:</span>
              <div className="font-medium capitalize">{farmData.climate}</div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <div className="grid gap-8">
          {recommendations.map((crop, index) => (
            <Card key={crop.name} className={`p-8 shadow-card ${index === 0 ? 'ring-2 ring-primary/20 bg-primary/5' : 'bg-card'}`}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${index === 0 ? 'bg-primary' : 'bg-muted'}`}>
                    <Sprout className={`w-6 h-6 ${index === 0 ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{crop.name}</h3>
                      {index === 0 && (
                        <Badge variant="default" className="bg-primary text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Best Match
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Confidence Score:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${crop.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-primary">{crop.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mb-6">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Expected Yield</span>
                  </div>
                  <div className="text-lg font-bold">{crop.expectedYield}</div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-accent-gold" />
                    <span className="text-sm font-medium">Growth Period</span>
                  </div>
                  <div className="text-lg font-bold">{crop.growthPeriod}</div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className={`w-4 h-4 ${getProfitabilityColor(crop.profitability)}`} />
                    <span className="text-sm font-medium">Investment</span>
                  </div>
                  <div className="text-lg font-bold">{crop.investmentRequired}</div>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className={`w-4 h-4 ${getWaterColor(crop.waterRequirement)}`} />
                    <span className="text-sm font-medium">Water Need</span>
                  </div>
                  <div className="text-lg font-bold capitalize">{crop.waterRequirement}</div>
                </div>
              </div>

              {/* Suitability Reason */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-accent-gold" />
                  Why This Crop is Suitable
                </h4>
                <p className="text-muted-foreground leading-relaxed">{crop.suitabilityReason}</p>
              </div>

              {/* Benefits and Risks */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                    Benefits
                  </h4>
                  <ul className="space-y-2">
                    {crop.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2 text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    Risks to Consider
                  </h4>
                  <ul className="space-y-2">
                    {crop.risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Market Price */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <span className="text-sm text-muted-foreground">Current Market Price:</span>
                  <div className="text-lg font-bold text-primary">{crop.marketPrice}</div>
                </div>
                <Button variant={index === 0 ? "hero" : "outline"}>
                  Get Detailed Plan
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-muted/30 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Need More Detailed Analysis?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get comprehensive farming plans, planting schedules, and ongoing support from our agricultural experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              Get Expert Consultation
            </Button>
            <Button variant="outline" size="lg">
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CropRecommendations;