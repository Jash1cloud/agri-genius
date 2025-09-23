import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Leaf, TrendingUp, Search, Plus, Users, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Modern sustainable agriculture with AI technology" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 border shadow-soft">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">AI-Powered Agriculture & Equipment Sharing</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Smart Farming
                </span>
                <br />
                <span className="text-foreground">Solutions</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Get AI-powered crop recommendations AND share equipment with fellow farmers. Maximize your yield, reduce costs, and build a sustainable farming community.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => document.getElementById('recommendation-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Crop Recommendations (फसल सुझाव पाएं)
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/equipment">
                <Button variant="outline" size="lg" className="group w-full sm:w-auto">
                  Browse Equipment (उपकरण देखें)
                  <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm rounded-full px-4 py-2 border">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm">Sustainable Farming (टिकाऊ खेती)</span>
              </div>
              <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm rounded-full px-4 py-2 border">
                <Handshake className="w-4 h-4 text-primary" />
                <span className="text-sm">Equipment Sharing (उपकरण साझाकरण)</span>
              </div>
              <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm rounded-full px-4 py-2 border">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-sm">Cost Reduction (लागत कम करें)</span>
              </div>
            </div>
          </div>

          {/* Right side - Stats Cards */}
          <div className="lg:block hidden">
            <div className="grid grid-cols-2 gap-6 animate-float">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border shadow-card">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Equipment Available</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border shadow-card mt-8">
                <div className="text-3xl font-bold text-accent-gold">45%</div>
                <div className="text-sm text-muted-foreground">Cost Savings</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border shadow-card -mt-4">
                <div className="text-3xl font-bold text-sky">5K+</div>
                <div className="text-sm text-muted-foreground">Active Farmers</div>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border shadow-card mt-4">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;