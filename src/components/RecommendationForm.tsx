import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Thermometer, CloudRain, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  location: string;
  farmSize: string;
  soilType: string;
  climate: string;
  budget: string;
  previousCrop: string;
  notes: string;
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
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.location || !formData.farmSize || !formData.soilType || !formData.climate) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Analyzing your farm conditions...");
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                <Input
                  id="location"
                  placeholder="e.g., Punjab, India"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmSize" className="text-base font-medium flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Farm Size (acres) *
                </Label>
                <Input
                  id="farmSize"
                  placeholder="e.g., 10"
                  type="number"
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
                    <SelectItem value="clay">Clay Soil</SelectItem>
                    <SelectItem value="sandy">Sandy Soil</SelectItem>
                    <SelectItem value="loam">Loam Soil</SelectItem>
                    <SelectItem value="silt">Silt Soil</SelectItem>
                    <SelectItem value="peat">Peat Soil</SelectItem>
                    <SelectItem value="chalk">Chalk Soil</SelectItem>
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
                    <SelectItem value="tropical">Tropical</SelectItem>
                    <SelectItem value="subtropical">Subtropical</SelectItem>
                    <SelectItem value="temperate">Temperate</SelectItem>
                    <SelectItem value="arid">Arid</SelectItem>
                    <SelectItem value="semi-arid">Semi-Arid</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Budget & Previous Crop */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">Budget Range</Label>
                <Select onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Under $5,000</SelectItem>
                    <SelectItem value="medium">$5,000 - $20,000</SelectItem>
                    <SelectItem value="high">$20,000 - $50,000</SelectItem>
                    <SelectItem value="premium">Above $50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousCrop" className="text-base font-medium">
                  Previous Crop
                </Label>
                <Input
                  id="previousCrop"
                  placeholder="e.g., Wheat, Rice, Corn"
                  value={formData.previousCrop}
                  onChange={(e) => handleInputChange("previousCrop", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base font-medium">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any specific requirements, challenges, or goals for your farm..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="min-h-[100px] resize-none"
              />
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