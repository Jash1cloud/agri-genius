import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
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
    return <div className="flex items-center justify-center min-h-screen">लोड हो रहा है... / Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {user && <Navbar />}
      
      {!user && (
        <div className="bg-primary/10 p-4 text-center">
          <p className="mb-4">कृषि उपकरण किराए पर लेने या देने के लिए लॉगिन करें</p>
          <Link to="/auth">
            <Button>लॉगिन / साइनअप करें / Login / Signup</Button>
          </Link>
        </div>
      )}
      
      <HeroSection />
      
      <RecommendationForm onSubmit={handleFormSubmit} />
      
      {recommendations && formData && (
        <div id="results">
          <CropRecommendations farmData={formData} />
        </div>
      )}
    </div>
  );
};

export default Index;
