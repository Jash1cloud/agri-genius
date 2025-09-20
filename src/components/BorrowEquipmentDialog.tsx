import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IndianRupee, Calendar } from "lucide-react";

interface Equipment {
  id: string;
  name: string;
  rental_price_per_day: number;
  profiles: {
    full_name: string;
    phone: string;
  };
}

interface BorrowEquipmentDialogProps {
  equipment: Equipment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (equipmentId: string, startDate: string, endDate: string, notes: string) => void;
}

const BorrowEquipmentDialog = ({ equipment, isOpen, onClose, onSubmit }: BorrowEquipmentDialogProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(1, days) * equipment.rental_price_per_day;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    
    onSubmit(equipment.id, startDate, endDate, notes);
    
    // Reset form
    setStartDate("");
    setEndDate("");
    setNotes("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>उधार अनुरोध / Borrow Request</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>उपकरण / Equipment</Label>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold">{equipment.name}</div>
              <div className="text-sm text-muted-foreground">
                मालिक / Owner: {equipment.profiles?.full_name}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <IndianRupee className="h-4 w-4" />
                {equipment.rental_price_per_day}/दिन
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">शुरू की तारीख / Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">समाप्ति तारीख / End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          {startDate && endDate && (
            <div className="p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                <IndianRupee className="h-5 w-5" />
                कुल राशि / Total: ₹{calculateTotal()}
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} दिन / days
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">टिप्पणी / Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="कोई विशेष आवश्यकता या संदेश..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              रद्द करें / Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={!startDate || !endDate}>
              अनुरोध भेजें / Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowEquipmentDialog;