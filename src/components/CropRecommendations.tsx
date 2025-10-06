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
  // Generate location and condition-specific recommendations
  const getRecommendations = (): CropData[] => {
    const { soilType, climate, budget, location, farmSize, waterAvailability } = farmData;
    
    // Crop database with conditions and regional suitability
    const cropDatabase = {
      // Tropical/Subtropical crops
      rice: {
        name: "Rice",
        climates: ["tropical", "subtropical"],
        soils: ["clay", "loam"],
        regions: ["asia", "india", "bangladesh", "vietnam", "thailand", "philippines"],
        confidence: 95,
        expectedYield: "4-6 tons/acre",
        growthPeriod: "3-6 months",
        investmentRequired: budget === "low" ? "₹32,000-48,000/acre" : "₹48,000-72,000/acre",
        profitability: "high" as const,
        waterRequirement: "high" as const,
        marketPrice: "₹20,000-25,000/quintal (MSP: ₹21,830)"
      },
      sugarcane: {
        name: "Sugarcane",
        climates: ["tropical", "subtropical"],
        soils: ["loam", "clay"],
        regions: ["brazil", "india", "thailand", "australia", "philippines"],
        confidence: 88,
        expectedYield: "50-80 tons/acre",
        growthPeriod: "12-18 months",
        investmentRequired: budget === "low" ? "₹64,000-96,000/acre" : "₹96,000-1,60,000/acre",
        profitability: "high" as const,
        waterRequirement: "high" as const,
        marketPrice: "₹2,800-3,600/ton"
      },
      // Rabi crops (Winter season)
      wheat: {
        name: "Wheat (गेहूं)",
        climates: ["temperate", "semi-arid", "subtropical"],
        soils: ["alluvial", "black-cotton", "red-laterite"],
        regions: ["punjab", "haryana", "uttar-pradesh", "madhya-pradesh", "rajasthan"],
        confidence: 94,
        expectedYield: "3.5-5 tons/acre",
        growthPeriod: "4-6 months (Nov-Apr)",
        investmentRequired: budget === "low" ? "₹24,000-40,000/acre" : "₹40,000-64,000/acre",
        profitability: "medium" as const,
        waterRequirement: "medium" as const,
        marketPrice: "₹20,000-28,000/quintal (MSP: ₹22,750)"
      },
      maize: {
        name: "Maize (मक्का)",
        climates: ["subtropical", "temperate"],
        soils: ["alluvial", "black-cotton", "red-laterite"],
        regions: ["karnataka", "andhra-pradesh", "telangana", "maharashtra", "bihar"],
        confidence: 91,
        expectedYield: "6-12 tons/acre",
        growthPeriod: "3-4 months (Kharif)",
        investmentRequired: budget === "low" ? "₹32,000-56,000/acre" : "₹56,000-96,000/acre",
        profitability: "high" as const,
        waterRequirement: "medium" as const,
        marketPrice: "₹16,000-22,400/quintal (MSP: ₹19,750)"
      },
      // Cash crops
      cotton: {
        name: "Cotton (कपास)",
        climates: ["semi-arid", "subtropical"],
        soils: ["black-cotton", "alluvial"],
        regions: ["gujarat", "maharashtra", "telangana", "andhra-pradesh", "haryana"],
        confidence: 90,
        expectedYield: "15-25 quintals/acre",
        growthPeriod: "5-6 months (Kharif)",
        investmentRequired: budget === "low" ? "₹48,000-72,000/acre" : "₹72,000-1,20,000/acre",
        profitability: "high" as const,
        waterRequirement: "medium" as const,
        marketPrice: "₹5,500-7,000/quintal (MSP: ₹6,280)"
      },
      bajra: {
        name: "Pearl Millet (बाजरा)",
        climates: ["arid", "semi-arid"],
        soils: ["desert", "red-laterite", "alluvial"],
        regions: ["rajasthan", "gujarat", "haryana", "maharashtra"],
        confidence: 88,
        expectedYield: "1.5-3 tons/acre",
        growthPeriod: "2-4 months (Kharif)",
        investmentRequired: budget === "low" ? "₹16,000-32,000/acre" : "₹32,000-48,000/acre",
        profitability: "medium" as const,
        waterRequirement: "low" as const,
        marketPrice: "₹24,000-32,000/quintal (MSP: ₹28,400)"
      },
      mustard: {
        name: "Mustard (सरसों)",
        climates: ["temperate", "semi-arid"],
        soils: ["alluvial", "black-cotton"],
        regions: ["rajasthan", "haryana", "madhya-pradesh", "uttar-pradesh"],
        confidence: 85,
        expectedYield: "1-2 tons/acre",
        growthPeriod: "3-4 months (Rabi)",
        investmentRequired: budget === "low" ? "₹20,000-35,000/acre" : "₹35,000-55,000/acre",
        profitability: "medium" as const,
        waterRequirement: "low" as const,
        marketPrice: "₹50,000-65,000/quintal (MSP: ₹54,200)"
      },
      // Pulses
      chickpea: {
        name: "Chickpea (चना)",
        climates: ["semi-arid", "temperate"],
        soils: ["black-cotton", "alluvial", "red-laterite"],
        regions: ["madhya-pradesh", "rajasthan", "maharashtra", "andhra-pradesh"],
        confidence: 87,
        expectedYield: "1.5-2.5 tons/acre",
        growthPeriod: "4-5 months (Rabi)",
        investmentRequired: budget === "low" ? "₹25,000-40,000/acre" : "₹40,000-65,000/acre",
        profitability: "high" as const,
        waterRequirement: "low" as const,
        marketPrice: "₹50,000-65,000/quintal (MSP: ₹56,00)"
      },
      soybean: {
        name: "Soybean (सोयाबीन)",
        climates: ["subtropical", "temperate"],
        soils: ["black-cotton", "alluvial"],
        regions: ["madhya-pradesh", "maharashtra", "rajasthan", "chhattisgarh"],
        confidence: 85,
        expectedYield: "2.5-4 tons/acre",
        growthPeriod: "3-4 months (Kharif)",
        investmentRequired: budget === "low" ? "₹30,000-45,000/acre" : "₹45,000-70,000/acre",
        profitability: "high" as const,
        waterRequirement: "medium" as const,
        marketPrice: "₹38,000-48,000/quintal (MSP: ₹42,250)"
      },
    };

    // Match crops based on conditions
    const suitableCrops: CropData[] = [];
    const locationLower = location.toLowerCase();
    
    Object.values(cropDatabase).forEach(crop => {
      let score = 0;
      let reasons: string[] = [];
      
      // Climate match (40% weight)
      if (crop.climates.includes(climate)) {
        score += 40;
        reasons.push(`optimal ${climate} climate conditions`);
      } else {
        score += 10; // Partial compatibility
        reasons.push(`adaptable to ${climate} climate with proper management`);
      }
      
      // Soil match (30% weight)
      if (crop.soils.includes(soilType)) {
        score += 30;
        reasons.push(`excellent ${soilType} soil compatibility`);
      } else {
        score += 5;
        reasons.push(`moderate ${soilType} soil adaptation possible`);
      }
      
      // Regional match (20% weight)
      const regionMatch = crop.regions.some(region => 
        locationLower.includes(region) || region.replace('-', ' ').includes(locationLower.replace('-', ' '))
      );
      if (regionMatch) {
        score += 20;
        reasons.push(`proven success in your region`);
      } else {
        score += 5;
        reasons.push(`emerging crop for your area`);
      }
      
      // Budget compatibility (10% weight)
      const budgetValue = budget === "low" ? 1 : budget === "medium" ? 2 : budget === "high" ? 3 : 4;
      const investmentLevel = crop.investmentRequired.includes("$2000") ? 4 : 
                             crop.investmentRequired.includes("$1000") ? 3 :
                             crop.investmentRequired.includes("$600") ? 2 : 1;
      
      if (budgetValue >= investmentLevel) {
        score += 10;
        reasons.push(`fits within your budget range`);
      }

      // Water availability compatibility (20% weight) - NEW
      if (waterAvailability) {
        const waterScore = calculateWaterScore(crop.waterRequirement, waterAvailability);
        score += waterScore;
        if (waterScore >= 15) {
          reasons.push(`excellent water requirement match`);
        } else if (waterScore >= 10) {
          reasons.push(`good water availability for this crop`);
        } else if (waterScore > 0) {
          reasons.push(`manageable with efficient irrigation`);
        }
      }

      if (score >= 60) { // Minimum threshold (increased from 50 to account for water scoring)
        const risks = generateRisks(crop, climate, soilType);
        const benefits = generateBenefits(crop, climate, soilType, location);
        
        suitableCrops.push({
          name: crop.name,
          confidence: Math.min(95, Math.max(60, score + Math.random() * 10)),
          expectedYield: crop.expectedYield,
          growthPeriod: crop.growthPeriod,
          investmentRequired: crop.investmentRequired,
          profitability: crop.profitability,
          waterRequirement: crop.waterRequirement,
          suitabilityReason: `Perfect match for ${soilType} soil in ${climate} climate zones. ${reasons.join(', ')}.`,
          marketPrice: crop.marketPrice,
          risks,
          benefits
        });
      }
    });

    // Sort by confidence and return top 3
    return suitableCrops
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
  };

  const calculateWaterScore = (cropWaterReq: string, waterAvail: string): number => {
    // Water requirement vs availability scoring matrix
    const scoreMatrix: Record<string, Record<string, number>> = {
      high: { abundant: 20, moderate: 10, limited: 5, scarce: 0 },
      medium: { abundant: 20, moderate: 20, limited: 10, scarce: 5 },
      low: { abundant: 15, moderate: 20, limited: 20, scarce: 15 }
    };
    return scoreMatrix[cropWaterReq]?.[waterAvail] || 0;
  };

  const generateRisks = (crop: any, climate: string, soilType: string): string[] => {
    const risks = [];
    
    if (crop.waterRequirement === "high" && (climate === "arid" || climate === "semi-arid")) {
      risks.push("High water requirements in dry climate");
    }
    if (crop.name === "Rice" && soilType !== "clay") {
      risks.push("Requires proper water management");
    }
    if (climate === "tropical") {
      risks.push("Pest and disease pressure");
    }
    if (crop.profitability === "high") {
      risks.push("Market price volatility");
    }
    
    // Default risks
    risks.push("Weather dependency", "Input cost fluctuations");
    
    return risks.slice(0, 3);
  };

  const generateBenefits = (crop: any, climate: string, soilType: string, location: string): string[] => {
    const benefits = [];
    
    if (crop.profitability === "high") {
      benefits.push("High profit potential");
    }
    if (crop.waterRequirement === "low") {
      benefits.push("Water efficient cultivation");
    }
    if (crop.name === "Soybeans") {
      benefits.push("Nitrogen fixation benefits", "Excellent rotation crop");
    }
    if (location.toLowerCase().includes("punjab") && crop.name.includes("Rice")) {
      benefits.push("Government MSP support", "Well-established supply chain", "Excellent procurement system");
    }
    if (location.toLowerCase().includes("gujarat") && crop.name.includes("Cotton")) {
      benefits.push("Strong cooperative network", "Value-added processing", "Export opportunities");
    }
    if (location.toLowerCase().includes("madhya-pradesh") && crop.name.includes("Soybean")) {
      benefits.push("Soybean processing units nearby", "Government subsidies", "Crop insurance available");
    }
    
    // Default benefits
    benefits.push("Suitable for local conditions", "Market availability");
    
    return benefits.slice(0, 3);
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
            Based on your farm conditions in <strong>{farmData.location}</strong>, here are the most suitable crops for maximum profitability and sustainability.
          </p>
        </div>

        {/* Farm Summary */}
        <Card className="p-6 mb-8 bg-muted/50">
          <div className="grid md:grid-cols-5 gap-4 text-sm">
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
            <div>
              <span className="text-muted-foreground">Water Availability:</span>
              <div className="font-medium capitalize">{farmData.waterAvailability}</div>
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