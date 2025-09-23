import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, MessageSquare, Users, ArrowRight, Tractor, HandHeart, Clock, Handshake } from "lucide-react";
import { Link } from "react-router-dom";

const EquipmentQuickActions = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 mb-6 border shadow-soft">
            <Handshake className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Equipment Sharing Network</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-field bg-clip-text text-transparent">
              Share & Save
            </span>{" "}
            <span className="text-foreground">Together</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of farmers sharing equipment to reduce costs and build sustainable communities
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link to="/equipment" className="group">
            <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 group-hover:shadow-glow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse Equipment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find tractors, harvesters, and tools near you
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Explore Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/add-equipment" className="group">
            <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 group-hover:shadow-glow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-gold/20 transition-colors">
                  <Plus className="w-8 h-8 text-accent-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lend Equipment</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Earn money by renting out your unused equipment
                </p>
                <Button variant="outline" className="w-full group-hover:bg-accent-gold group-hover:text-accent-foreground">
                  List Equipment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/requests" className="group">
            <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 group-hover:shadow-glow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-sky/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sky/20 transition-colors">
                  <MessageSquare className="w-8 h-8 text-sky" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Post Request</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Request specific equipment from the community
                </p>
                <Button variant="outline" className="w-full group-hover:bg-sky group-hover:text-white">
                  Make Request
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link to="/farmers" className="group">
            <Card className="h-full border-2 hover:border-primary/30 transition-all duration-300 group-hover:shadow-glow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/70 transition-colors">
                  <Users className="w-8 h-8 text-secondary-dark" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Farmer Network</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with farmers in your area
                </p>
                <Button variant="outline" className="w-full group-hover:bg-secondary-dark group-hover:text-secondary">
                  Connect Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Tractor className="w-8 h-8 text-primary" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Access Premium Equipment</h4>
            <p className="text-muted-foreground">
              Use expensive machinery without the high purchase cost
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <HandHeart className="w-8 h-8 text-accent-gold" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Support Community</h4>
            <p className="text-muted-foreground">
              Help fellow farmers while earning extra income
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-sky/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-sky" />
            </div>
            <h4 className="text-xl font-semibold mb-2">Save Time & Money</h4>
            <p className="text-muted-foreground">
              Reduce costs by up to 60% and complete work faster
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentQuickActions;