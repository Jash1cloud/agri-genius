import Navbar from "@/components/Navbar";
import ExportQualityGuide from "@/components/ExportQualityGuide";
import { useAuth } from "@/hooks/useAuth";

const ExportQualityPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {user && <Navbar />}
      <ExportQualityGuide />
    </div>
  );
};

export default ExportQualityPage;
