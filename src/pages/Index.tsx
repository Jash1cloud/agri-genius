import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import EquipmentQuickActions from "@/components/EquipmentQuickActions";
import RecommendationForm from "@/components/RecommendationForm";
import CropRecommendations from "@/components/CropRecommendations";
import Navbar from "@/components/Navbar";

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
    </div>
  );
};

export default Index;
