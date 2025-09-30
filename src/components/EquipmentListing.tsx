import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, IndianRupee, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import BorrowEquipmentDialog from "./BorrowEquipmentDialog";

interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  rental_price_per_day: number;
  location: string;
  state: string;
  is_available: boolean;
  specifications: any;
  created_at: string;
  owner_id: string;
}

const EquipmentListing = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEquipment((data as any) || []);
    } catch (error: any) {
      toast({
        title: "त्रुटि / Error",
        description: "उपकरण लोड करने में समस्या हुई।",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const handleBorrowRequest = async (equipmentId: string, startDate: string, endDate: string, notes: string) => {
    if (!user) return;

    try {
      const equipment = await supabase
        .from("equipment")
        .select("owner_id, rental_price_per_day")
        .eq("id", equipmentId)
        .single();

      if (equipment.error) throw equipment.error;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const totalAmount = days * equipment.data.rental_price_per_day;

      const { error } = await supabase.from("borrowing_transactions").insert({
        equipment_id: equipmentId,
        borrower_id: user.id,
        owner_id: equipment.data.owner_id,
        start_date: startDate,
        end_date: endDate,
        total_amount: totalAmount,
        borrower_notes: notes,
      });

      if (error) throw error;

      toast({
        title: "अनुरोध भेजा गया! / Request Sent!",
        description: "आपका उधार अनुरोध मालिक को भेजा गया है।",
      });

      setSelectedEquipment(null);
      fetchEquipment();
    } catch (error: any) {
      toast({
        title: "त्रुटि / Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">लोड हो रहा है... / Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">उपकरण किराए पर लें / Rent Equipment</h1>
        <p className="text-muted-foreground">
          अन्य किसानों से कृषि उपकरण किराए पर लें / Rent farming equipment from other farmers
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {item.name}
                <Badge variant="secondary">{item.category}</Badge>
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {item.location}, {item.state}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                Owner ID: {item.owner_id.substring(0, 8)}...
              </div>

              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <IndianRupee className="h-5 w-5" />
                {item.rental_price_per_day}/दिन
              </div>

              {item.specifications && (
                <div className="text-sm">
                  <strong>विवरण / Specifications:</strong>
                  <pre className="text-xs mt-1 p-2 bg-muted rounded">
                    {JSON.stringify(item.specifications, null, 2)}
                  </pre>
                </div>
              )}

              <Button
                onClick={() => setSelectedEquipment(item)}
                className="w-full"
                disabled={!user}
              >
                किराए पर लें / Borrow
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {equipment.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            कोई उपकरण उपलब्ध नहीं है। / No equipment available at the moment.
          </p>
        </div>
      )}

      {selectedEquipment && (
        <BorrowEquipmentDialog
          equipment={selectedEquipment}
          isOpen={!!selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
          onSubmit={handleBorrowRequest}
        />
      )}
    </div>
  );
};

export default EquipmentListing;