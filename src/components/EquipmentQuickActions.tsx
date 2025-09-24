import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, MessageSquare, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EquipmentQuickActions = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Equipment Sharing</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Connect with fellow farmers to share resources and reduce costs
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/equipment" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Browse Equipment</h3>
                <p className="text-sm text-muted-foreground">
                  Find equipment near you
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/add-equipment" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Lend Equipment</h3>
                <p className="text-sm text-muted-foreground">
                  Earn by renting out equipment
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/requests" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Post Request</h3>
                <p className="text-sm text-muted-foreground">
                  Request specific equipment
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/farmers" className="group">
            <Card className="h-full hover:shadow-lg transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Farmer Network</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with local farmers
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EquipmentQuickActions;