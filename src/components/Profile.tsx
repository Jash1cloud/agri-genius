import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { User, Tractor, Calendar, IndianRupee } from "lucide-react";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Profile = () => {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    location: "",
    state: "",
    farm_size: "",
    farm_type: ""
  });
  const [myEquipment, setMyEquipment] = useState<any[]>([]);
  const [myTransactions, setMyTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchMyEquipment();
      fetchMyTransactions();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          location: data.location || "",
          state: data.state || "",
          farm_size: data.farm_size?.toString() || "",
          farm_type: data.farm_type || ""
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile.",
        variant: "destructive",
      });
    }
  };

  const fetchMyEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .eq("owner_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMyEquipment(data || []);
    } catch (error: any) {
      console.error("Error fetching equipment:", error);
    }
  };

  const fetchMyTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("borrowing_transactions")
        .select(`
          *,
          equipment (name, category),
          borrower_profile:profiles!borrower_id (full_name),
          owner_profile:profiles!owner_id (full_name)
        `)
        .or(`borrower_id.eq.${user?.id},owner_id.eq.${user?.id}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMyTransactions((data as any) || []);
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          user_id: user?.id,
          full_name: profile.full_name,
          phone: profile.phone,
          location: profile.location,
          state: profile.state,
          farm_size: profile.farm_size ? parseFloat(profile.farm_size) : null,
          farm_type: profile.farm_type
        });

      if (error) throw error;

      toast({
        title: "Profile Updated!",
        description: "Your information has been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTransactionStatus = async (transactionId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("borrowing_transactions")
        .update({ status })
        .eq("id", transactionId);

      if (error) throw error;

      toast({
        title: "Status Updated!",
        description: `Transaction status updated to ${status}`,
      });

      fetchMyTransactions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved": return "default";
      case "active": return "secondary";
      case "completed": return "outline";
      case "rejected": case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your information and activity</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="equipment">My Equipment</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">City/Village</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="Your city or village"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={profile.state}
                      onValueChange={(value) => setProfile({ ...profile, state: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
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

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size (Acres)</Label>
                    <Input
                      id="farmSize"
                      type="number"
                      step="0.1"
                      value={profile.farm_size}
                      onChange={(e) => setProfile({ ...profile, farm_size: e.target.value })}
                      placeholder="5.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmType">Farm Type</Label>
                    <Input
                      id="farmType"
                      value={profile.farm_type}
                      onChange={(e) => setProfile({ ...profile, farm_type: e.target.value })}
                      placeholder="e.g., Rice, Wheat, Vegetables"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tractor className="h-5 w-5" />
                My Equipment ({myEquipment.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myEquipment.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Badge variant={item.is_available ? "default" : "secondary"}>
                        {item.is_available ? "Available" : "Rented"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />
                        ₹{item.rental_price_per_day}/day
                      </span>
                      <span>{item.category}</span>
                      <span>{item.location}, {item.state}</span>
                    </div>
                  </div>
                ))}
                {myEquipment.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No equipment added yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Transaction History ({myTransactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTransactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{transaction.equipment?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {transaction.borrower_id === user?.id ? "You borrowed" : "You lent"} • 
                          {transaction.borrower_id === user?.id 
                            ? ` from: ${transaction.owner_profile?.full_name}`
                            : ` to: ${transaction.borrower_profile?.full_name}`
                          }
                        </p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Start:</span><br />
                        {new Date(transaction.start_date).toLocaleDateString('en-IN')}
                      </div>
                      <div>
                        <span className="text-muted-foreground">End:</span><br />
                        {new Date(transaction.end_date).toLocaleDateString('en-IN')}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Amount:</span><br />
                        ₹{transaction.total_amount}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status:</span><br />
                        {transaction.status}
                      </div>
                    </div>
                    
                    {transaction.owner_id === user?.id && transaction.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          onClick={() => updateTransactionStatus(transaction.id, 'approved')}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateTransactionStatus(transaction.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {myTransactions.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No transaction history found.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;