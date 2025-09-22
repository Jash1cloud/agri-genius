import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Calendar, IndianRupee, MapPin, Plus, Search, Clock } from "lucide-react";

interface EquipmentRequest {
  id: string;
  farmer_id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  state: string;
  budget_per_day: number;
  required_date: string;
  duration_days: number;
  is_fulfilled: boolean;
  created_at: string;
  farmer_profile: {
    full_name: string;
    phone: string;
  };
}

const EQUIPMENT_CATEGORIES = [
  "All Categories",
  "ट्रैक्टर / Tractor",
  "हल / Plough", 
  "बुआई मशीन / Seeder",
  "कटाई मशीन / Harvester",
  "थ्रेशर / Thresher",
  "पंप सेट / Pump Set",
  "कल्टिवेटर / Cultivator",
  "अन्य / Other"
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const EquipmentRequests = () => {
  const [requests, setRequests] = useState<EquipmentRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<EquipmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    state: "",
    budget_per_day: "",
    required_date: "",
    duration_days: "1"
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [requests, searchTerm, selectedCategory]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("equipment_requests")
        .select(`
          *,
          farmer_profile:profiles!farmer_id (full_name, phone)
        `)
        .eq("is_fulfilled", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests((data as any) || []);
    } catch (error: any) {
      toast({
        title: "त्रुटि / Error",
        description: "उपकरण अनुरोध लोड करने में समस्या हुई।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(request => request.category === selectedCategory);
    }

    setFilteredRequests(filtered);
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "लॉगिन आवश्यक / Login Required",
        description: "कृपया पहले लॉगिन करें।",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("equipment_requests")
        .insert({
          farmer_id: user.id,
          title: newRequest.title,
          description: newRequest.description,
          category: newRequest.category,
          location: newRequest.location,
          state: newRequest.state,
          budget_per_day: newRequest.budget_per_day ? parseFloat(newRequest.budget_per_day) : null,
          required_date: newRequest.required_date,
          duration_days: parseInt(newRequest.duration_days)
        });

      if (error) throw error;

      toast({
        title: "अनुरोध जमा हुआ! / Request Submitted!",
        description: "आपका उपकरण अनुरोध सफलतापूर्वक जमा हो गया है।",
      });

      setNewRequest({
        title: "",
        description: "",
        category: "",
        location: "",
        state: "",
        budget_per_day: "",
        required_date: "",
        duration_days: "1"
      });
      setIsDialogOpen(false);
      fetchRequests();
    } catch (error: any) {
      toast({
        title: "त्रुटि / Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('hi-IN');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg">उपकरण अनुरोध लोड हो रहे हैं... / Loading Equipment Requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">उपकरण अनुरोध / Equipment Requests</h1>
          <p className="text-muted-foreground">जरूरी उपकरण खोजें या अपनी आवश्यकता पोस्ट करें</p>
        </div>
        
        {user && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                नया अनुरोध / New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>उपकरण अनुरोध करें / Request Equipment</DialogTitle>
                <DialogDescription>
                  जिस उपकरण की आपको जरूरत है उसकी जानकारी दें
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">शीर्षक / Title</Label>
                  <Input
                    id="title"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                    placeholder="जैसे: ट्रैक्टर चाहिए जुताई के लिए"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">श्रेणी / Category</Label>
                  <Select
                    value={newRequest.category}
                    onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="श्रेणी चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      {EQUIPMENT_CATEGORIES.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">स्थान / Location</Label>
                    <Input
                      id="location"
                      value={newRequest.location}
                      onChange={(e) => setNewRequest({ ...newRequest, location: e.target.value })}
                      placeholder="गाँव/शहर"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">राज्य / State</Label>
                    <Select
                      value={newRequest.state}
                      onValueChange={(value) => setNewRequest({ ...newRequest, state: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="राज्य" />
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="required_date">आवश्यक दिनांक / Required Date</Label>
                    <Input
                      id="required_date"
                      type="date"
                      value={newRequest.required_date}
                      onChange={(e) => setNewRequest({ ...newRequest, required_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">अवधि (दिन) / Duration (Days)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={newRequest.duration_days}
                      onChange={(e) => setNewRequest({ ...newRequest, duration_days: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">बजट प्रति दिन / Budget Per Day (₹)</Label>
                  <Input
                    id="budget"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newRequest.budget_per_day}
                    onChange={(e) => setNewRequest({ ...newRequest, budget_per_day: e.target.value })}
                    placeholder="500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">विवरण / Description</Label>
                  <Textarea
                    id="description"
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    placeholder="अतिरिक्त जानकारी या विशिष्ट आवश्यकताएं"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    रद्द करें / Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    अनुरोध जमा करें / Submit Request
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="शीर्षक या स्थान से खोजें..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
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

      {/* Results Info */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredRequests.length} अनुरोध मिले / {filteredRequests.length} requests found
        </p>
      </div>

      {/* Request Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{request.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {request.location}, {request.state}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge variant="secondary">{request.category}</Badge>
              
              {request.description && (
                <p className="text-sm text-muted-foreground">{request.description}</p>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>आवश्यक: {formatDate(request.required_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{request.duration_days} दिन / {request.duration_days} days</span>
                </div>
                {request.budget_per_day && (
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <span>बजट: ₹{request.budget_per_day}/दिन</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-muted-foreground mb-2">अनुरोधकर्ता / Requested by:</p>
                <p className="font-medium">{request.farmer_profile?.full_name}</p>
                {request.farmer_profile?.phone && (
                  <p className="text-sm text-muted-foreground">{request.farmer_profile.phone}</p>
                )}
              </div>

              <Button className="w-full" size="sm">
                सहायता करें / Help
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && !loading && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">कोई अनुरोध नहीं मिला / No Requests Found</h3>
          <p className="text-muted-foreground">
            अपने खोज मानदंडों को बदलने का प्रयास करें या बाद में फिर से जांचें।
          </p>
        </div>
      )}
    </div>
  );
};

export default EquipmentRequests;