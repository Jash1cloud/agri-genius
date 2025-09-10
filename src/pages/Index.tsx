import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import RecommendationForm from "@/components/RecommendationForm";
import CropRecommendations from "@/components/CropRecommendations";

const Index = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    // Simulate AI processing delay
    setTimeout(() => {
      setRecommendations(true);
      // Scroll to results
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="min-h-screen">
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
