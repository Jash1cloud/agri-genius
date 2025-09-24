import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Search } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI-Powered Agriculture & Equipment Sharing</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary">Smart Farming</span>
              <br />
              <span className="text-foreground">Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get AI-powered crop recommendations and share equipment with fellow farmers. Maximize your yield, reduce costs, and build a sustainable farming community.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="group"
              onClick={() => document.getElementById('recommendation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Crop Recommendations
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/equipment">
              <Button variant="outline" size="lg" className="group">
                Browse Equipment
                <Search className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Equipment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">45%</div>
              <div className="text-sm text-muted-foreground">Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;