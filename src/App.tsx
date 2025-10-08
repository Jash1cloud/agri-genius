import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import EquipmentPage from "./pages/EquipmentPage";
import AddEquipmentPage from "./pages/AddEquipmentPage";
import ProfilePage from "./pages/ProfilePage";
import FarmerDirectoryPage from "./pages/FarmerDirectoryPage";
import EquipmentRequestsPage from "./pages/EquipmentRequestsPage";
import ExportQualityPage from "./pages/ExportQualityPage";
import CropDiseaseDetectionPage from "./pages/CropDiseaseDetectionPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/farmers" element={<FarmerDirectoryPage />} />
            <Route path="/requests" element={<EquipmentRequestsPage />} />
            <Route path="/add-equipment" element={<AddEquipmentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/export-quality" element={<ExportQualityPage />} />
            <Route path="/crop-disease" element={<CropDiseaseDetectionPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
