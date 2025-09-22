import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Tractor, Wheat, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Farmer {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  location: string;
  state: string;
  farm_size: number;
  farm_type: string;
  equipment_count: number;
}

const INDIAN_STATES = [
  "All States", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const FarmerDirectory = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [filteredFarmers, setFilteredFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const { toast } = useToast();

  useEffect(() => {
    fetchFarmers();
  }, []);

  useEffect(() => {
    filterFarmers();
  }, [farmers, searchTerm, selectedState]);

  const fetchFarmers = async () => {
    try {
      // First get all farmers
      const { data: farmersData, error: farmersError } = await supabase
        .from("profiles")
        .select("*")
        .not("full_name", "is", null)
        .not("location", "is", null);

      if (farmersError) throw farmersError;

      // Then get equipment counts for each farmer
      const farmersWithEquipmentCount = await Promise.all(
        (farmersData || []).map(async (farmer) => {
          const { count } = await supabase
            .from("equipment")
            .select("*", { count: "exact", head: true })
            .eq("owner_id", farmer.user_id);
          
          return {
            ...farmer,
            equipment_count: count || 0
          };
        })
      );

      setFarmers(farmersWithEquipmentCount);
    } catch (error: any) {
      toast({
        title: "त्रुटि / Error",
        description: "किसान डायरेक्टरी लोड करने में समस्या हुई।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterFarmers = () => {
    let filtered = farmers;

    if (searchTerm) {
      filtered = filtered.filter(farmer =>
        farmer.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.farm_type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedState !== "All States") {
      filtered = filtered.filter(farmer => farmer.state === selectedState);
    }

    setFilteredFarmers(filtered);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg">किसान डायरेक्टरी लोड हो रही है... / Loading Farmer Directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">किसान डायरेक्टरी / Farmer Directory</h1>
        <p className="text-muted-foreground">अपने क्षेत्र के अन्य किसानों से जुड़ें और उपकरण साझा करें</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="नाम, स्थान या फसल के प्रकार से खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger className="w-full md:w-[200px]">
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

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredFarmers.length} किसान मिले / {filteredFarmers.length} farmers found
        </p>
      </div>

      {/* Farmer Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Wheat className="h-4 w-4 text-primary" />
                </div>
                {farmer.full_name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {farmer.location}, {farmer.state}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Farm Info */}
              <div className="space-y-2">
                {farmer.farm_type && (
                  <div className="flex items-center gap-2">
                    <Wheat className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">फसल / Crop: {farmer.farm_type}</span>
                  </div>
                )}
                {farmer.farm_size && (
                  <div className="text-sm text-muted-foreground">
                    खेत का आकार / Farm Size: {farmer.farm_size} एकड़ / acres
                  </div>
                )}
              </div>

              {/* Equipment Count */}
              <div className="flex items-center gap-2">
                <Tractor className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {farmer.equipment_count} उपकरण उपलब्ध / {farmer.equipment_count} equipment available
                </span>
              </div>

              {/* Contact Info */}
              {farmer.phone && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-mono">{farmer.phone}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  संपर्क करें / Contact
                </Button>
                <Button variant="secondary" size="sm" className="flex-1">
                  उपकरण देखें / View Equipment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFarmers.length === 0 && !loading && (
        <div className="text-center py-12">
          <Wheat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">कोई किसान नहीं मिला / No Farmers Found</h3>
          <p className="text-muted-foreground">
            अपने खोज मानदंडों को बदलने का प्रयास करें या बाद में फिर से जांचें।
          </p>
        </div>
      )}
    </div>
  );
};

export default FarmerDirectory;