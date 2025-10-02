import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import EquipmentQuickActions from "@/components/EquipmentQuickActions";
import RecommendationForm from "@/components/RecommendationForm";
import CropRecommendations from "@/components/CropRecommendations";
import Navbar from "@/components/Navbar";
import { Award, TrendingUp, Globe } from "lucide-react";

const Index = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [formData, setFormData] = useState(null);
  const { user, loading } = useAuth();

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    // Simulate AI processing delay
    setTimeout(() => {
      setRecommendations(true);
      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {user && <Navbar />}
      
      {!user && (
        <div className="bg-muted/30 border-b p-4 text-center">
          <p className="mb-4 text-sm text-muted-foreground">Please login to access equipment sharing features</p>
          <Link to="/auth">
            <Button variant="outline" size="sm">Login / Signup</Button>
          </Link>
        </div>
      )}
      
      <HeroSection />
      
      <EquipmentQuickActions />
      
      <div className="py-16">
        <RecommendationForm onSubmit={handleFormSubmit} />
      </div>
      
      {recommendations && formData && (
        <div id="results" className="py-16 bg-muted/20">
          <CropRecommendations farmData={formData} />
        </div>
      )}

      {/* Export Quality Feature Highlight */}
      <div className="py-16 px-4 bg-gradient-earth">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Grow Export-Quality Crops</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn international standards and best practices to cultivate crops that meet global export requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">Country-Specific Standards</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed requirements for USA, EU, UK, Japan, UAE, and more
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">Certification Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step help for GLOBALG.A.P, Organic, and HACCP certifications
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold text-lg mb-2">Best Practices</h3>
              <p className="text-sm text-muted-foreground">
                Learn proper soil prep, irrigation, pest management, and harvesting
              </p>
            </Card>
          </div>

          <div className="text-center">
            <Link to="/export-quality">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Award className="h-5 w-5 mr-2" />
                Explore Export Quality Guide
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
