import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const EQUIPMENT_CATEGORIES = [
  "ट्रैक्टर / Tractor", "हार्वेस्टर / Harvester", "प्लो / Plow", "कल्टीवेटर / Cultivator",
  "सीड ड्रिल / Seed Drill", "स्प्रेयर / Sprayer", "थ्रेशर / Thresher", 
  "इरिगेशन / Irrigation", "टिलेज / Tillage", "अन्य / Other"
];

const AddEquipment = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    rentalPrice: "",
    location: "",
    state: "",
    specifications: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      let specifications = null;
      if (formData.specifications) {
        try {
          specifications = JSON.parse(formData.specifications);
        } catch {
          specifications = { description: formData.specifications };
        }
      }

      const { error } = await supabase.from("equipment").insert({
        name: formData.name,
        category: formData.category,
        description: formData.description,
        rental_price_per_day: parseFloat(formData.rentalPrice),
        location: formData.location,
        state: formData.state,
        owner_id: user.id,
        specifications: specifications
      });

      if (error) throw error;

      toast({
        title: "उपकरण जोड़ा गया! / Equipment Added!",
        description: "आपका उपकरण सफलतापूर्वक सूची में जोड़ा गया है।",
      });

      navigate("/equipment");
    } catch (error: any) {
      toast({
        title: "त्रुटि / Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>उपकरण जोड़ें / Add Equipment</CardTitle>
          <CardDescription>
            अपने कृषि उपकरण को किराए पर देने के लिए सूची में जोड़ें
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">उपकरण का नाम / Equipment Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="जैसे: जॉन डियर ट्रैक्टर"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">श्रेणी / Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="श्रेणी चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {EQUIPMENT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">विवरण / Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="उपकरण के बारे में विस्तार से बताएं..."
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rentalPrice">किराया (₹/दिन) / Rental Price (₹/day) *</Label>
                <Input
                  id="rentalPrice"
                  type="number"
                  min="1"
                  step="0.01"
                  value={formData.rentalPrice}
                  onChange={(e) => setFormData({ ...formData, rentalPrice: e.target.value })}
                  placeholder="500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">राज्य / State *</Label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => setFormData({ ...formData, state: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="राज्य चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">शहर/गाँव / City/Village *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="जैसे: अहमदाबाद, पुणे, जयपुर"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">तकनीकी विवरण / Technical Specifications (JSON)</Label>
              <Textarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                placeholder='{"horsepower": "50HP", "year": "2020", "condition": "Good"}'
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                JSON format में या सामान्य टेक्स्ट में विवरण दें
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "जोड़ा जा रहा है..." : "उपकरण जोड़ें / Add Equipment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEquipment;