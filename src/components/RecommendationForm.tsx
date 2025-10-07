import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Thermometer, CloudRain, DollarSign, Globe, Droplets } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  location: string;
  farmSize: string;
  soilType: string;
  climate: string;
  budget: string;
  previousCrop: string;
  notes: string;
  language: string;
  waterAvailability: string;
}

interface RecommendationFormProps {
  onSubmit: (data: FormData) => void;
}

const RecommendationForm = ({ onSubmit }: RecommendationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    location: "",
    farmSize: "",
    soilType: "",
    climate: "",
    budget: "",
    previousCrop: "",
    notes: "",
    language: "english",
    waterAvailability: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.location || !formData.farmSize || !formData.soilType || !formData.climate || !formData.waterAvailability) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Analyzing your farm conditions...");
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Reset budget when farm size changes
      if (field === "farmSize") {
        updated.budget = "";
      }
      return updated;
    });
  };

  // Dynamic budget ranges based on farm size
  const getBudgetOptions = () => {
    const size = parseFloat(formData.farmSize) || 0;
    
    if (size === 0) {
      return [
        { value: "low", label: "Under ₹4,00,000" },
        { value: "medium", label: "₹4,00,000 - ₹15,00,000" },
        { value: "high", label: "₹15,00,000 - ₹40,00,000" },
        { value: "premium", label: "Above ₹40,00,000" }
      ];
    } else if (size <= 2) {
      // Small farms (0-2 acres)
      return [
        { value: "low", label: "Under ₹50,000" },
        { value: "medium", label: "₹50,000 - ₹2,00,000" },
        { value: "high", label: "₹2,00,000 - ₹5,00,000" },
        { value: "premium", label: "Above ₹5,00,000" }
      ];
    } else if (size <= 5) {
      // Medium farms (2-5 acres)
      return [
        { value: "low", label: "Under ₹2,00,000" },
        { value: "medium", label: "₹2,00,000 - ₹8,00,000" },
        { value: "high", label: "₹8,00,000 - ₹20,00,000" },
        { value: "premium", label: "Above ₹20,00,000" }
      ];
    } else if (size <= 10) {
      // Large farms (5-10 acres)
      return [
        { value: "low", label: "Under ₹4,00,000" },
        { value: "medium", label: "₹4,00,000 - ₹15,00,000" },
        { value: "high", label: "₹15,00,000 - ₹40,00,000" },
        { value: "premium", label: "Above ₹40,00,000" }
      ];
    } else {
      // Very large farms (10+ acres)
      return [
        { value: "low", label: "Under ₹10,00,000" },
        { value: "medium", label: "₹10,00,000 - ₹30,00,000" },
        { value: "high", label: "₹30,00,000 - ₹80,00,000" },
        { value: "premium", label: "Above ₹80,00,000" }
      ];
    }
  };

  return (
    <section id="recommendation-form" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Get Your <span className="text-primary">Personalized</span> Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us about your farm conditions and we'll analyze the best crops for your specific situation using advanced AI algorithms.
          </p>
        </div>

        <Card className="p-8 shadow-card bg-card/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Location & Farm Size */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Location *
                </Label>
                <Select onValueChange={(value) => handleInputChange("location", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your state/region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                    <SelectItem value="rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="telangana">Telangana</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="west-bengal">West Bengal</SelectItem>
                    <SelectItem value="bihar">Bihar</SelectItem>
                    <SelectItem value="odisha">Odisha</SelectItem>
                    <SelectItem value="assam">Assam</SelectItem>
                    <SelectItem value="jharkhand">Jharkhand</SelectItem>
                    <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmSize" className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Farm Size (acres) *
                </Label>
                <Input
                  id="farmSize"
                  placeholder="e.g., 2.5 (bigha to acres converter available)"
                  type="number"
                  step="0.1"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Soil Type & Climate */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">Soil Type *</Label>
                <Select onValueChange={(value) => handleInputChange("soilType", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alluvial">Alluvial Soil (गंगा-यमुना दोआब)</SelectItem>
                    <SelectItem value="black-cotton">Black Cotton Soil (काली मिट्टी)</SelectItem>
                    <SelectItem value="red-laterite">Red & Laterite Soil (लाल मिट्टी)</SelectItem>
                    <SelectItem value="desert">Desert Soil (रेगिस्तानी मिट्टी)</SelectItem>
                    <SelectItem value="mountain">Mountain Soil (पहाड़ी मिट्टी)</SelectItem>
                    <SelectItem value="saline-alkaline">Saline-Alkaline Soil (खारी मिट्टी)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-primary" />
                  Climate Type *
                </Label>
                <Select onValueChange={(value) => handleInputChange("climate", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select climate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tropical">Tropical (उष्णकटिबंधीय)</SelectItem>
                    <SelectItem value="subtropical">Subtropical (उपोष्णकटिबंधीय)</SelectItem>
                    <SelectItem value="temperate">Temperate (समशीतोष्ण)</SelectItem>
                    <SelectItem value="arid">Arid (शुष्क)</SelectItem>
                    <SelectItem value="semi-arid">Semi-Arid (अर्ध-शुष्क)</SelectItem>
                    <SelectItem value="humid">Humid (आर्द्र)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Water Availability */}
            <div className="space-y-2">
              <Label className="text-base font-medium flex items-center gap-2">
                <Droplets className="w-4 h-4 text-primary" />
                Water Availability *
              </Label>
              <Select onValueChange={(value) => handleInputChange("waterAvailability", value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select water availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="abundant">Abundant - Canal/River/Good Rainfall (प्रचुर जल)</SelectItem>
                  <SelectItem value="moderate">Moderate - Tube well/Seasonal rain (मध्यम जल)</SelectItem>
                  <SelectItem value="limited">Limited - Borewells/Uncertain rain (सीमित जल)</SelectItem>
                  <SelectItem value="scarce">Scarce - Rain-dependent only (कम जल)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Budget & Previous Crop */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Budget Range {formData.farmSize && `(for ${formData.farmSize} acres)`}
                </Label>
                <Select 
                  value={formData.budget} 
                  onValueChange={(value) => handleInputChange("budget", value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {getBudgetOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousCrop" className="text-base font-medium">
                  Previous Crop
                </Label>
                <Input
                  id="previousCrop"
                  placeholder="e.g., गेहूं (Wheat), धान (Rice), मक्का (Corn)"
                  value={formData.previousCrop}
                  onChange={(e) => handleInputChange("previousCrop", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Language & Additional Notes */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Preferred Language
                </Label>
                <Select onValueChange={(value) => handleInputChange("language", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                    <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                    <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                    <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base font-medium">
                  Additional Notes (अतिरिक्त जानकारी)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific requirements, irrigation facilities, government schemes..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button type="submit" variant="hero" size="lg" className="w-full md:w-auto min-w-[300px]">
                <CloudRain className="w-5 h-5 mr-2" />
                Get AI Recommendations
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default RecommendationForm;