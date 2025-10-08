import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Loader2, Camera, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Disease {
  name: string;
  confidence: number;
  severity: "mild" | "moderate" | "severe";
  description: string;
}

interface Analysis {
  cropType: string;
  healthStatus: "healthy" | "diseased" | "pest_damage" | "nutrient_deficiency" | "unknown";
  confidence: number;
  diseases: Disease[];
  treatments: string[];
  preventiveMeasures: string[];
  urgency: "immediate" | "monitor" | "routine";
  additionalNotes?: string;
}

const CropDiseaseDetectionPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-crop", {
        body: { imageData: selectedImage },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Crop disease detection completed successfully",
      });
    } catch (error: any) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "diseased":
        return "bg-red-500";
      case "pest_damage":
        return "bg-orange-500";
      case "nutrient_deficiency":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "moderate":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "severe":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "monitor":
        return <Info className="h-5 w-5 text-orange-500" />;
      case "routine":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user && <Navbar />}
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3">Crop Disease Detection</h1>
            <p className="text-muted-foreground text-lg">
              Upload a photo of your crop to identify diseases and get treatment recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Upload Crop Image
                </CardTitle>
                <CardDescription>
                  Take or upload a clear photo of the affected crop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!selectedImage ? (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-12 w-12 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or WEBP (Max 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                ) : (
                  <div className="space-y-4">
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={selectedImage}
                        alt="Selected crop"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <label className="flex-1">
                        <Button variant="outline" className="w-full" asChild>
                          <span>Change Image</span>
                        </Button>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <Button
                        onClick={analyzeImage}
                        disabled={analyzing}
                        className="flex-1"
                      >
                        {analyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Crop"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Take a Clear Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      Capture the affected area in good lighting
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Upload & Analyze</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI will identify the crop and any diseases
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Get Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive treatment suggestions and preventive measures
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Overview Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Analysis Results</CardTitle>
                    <Badge variant="outline" className={getHealthStatusColor(analysis.healthStatus)}>
                      {analysis.healthStatus.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Crop Type</p>
                      <p className="font-semibold text-lg">{analysis.cropType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                      <p className="font-semibold text-lg">{analysis.confidence}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Action Required</p>
                      <div className="flex items-center gap-2">
                        {getUrgencyIcon(analysis.urgency)}
                        <p className="font-semibold text-lg capitalize">{analysis.urgency}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Diseases Detected */}
              {analysis.diseases.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Diseases Detected</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysis.diseases.map((disease, index) => (
                      <Alert key={index} className="border-l-4">
                        <AlertDescription>
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-base">{disease.name}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline" className={getSeverityColor(disease.severity)}>
                                {disease.severity}
                              </Badge>
                              <Badge variant="outline">{disease.confidence}% confidence</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{disease.description}</p>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Treatment Recommendations */}
              {analysis.treatments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Treatments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.treatments.map((treatment, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-primary font-semibold">•</span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Preventive Measures */}
              {analysis.preventiveMeasures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preventive Measures</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.preventiveMeasures.map((measure, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="text-primary font-semibold">•</span>
                          <span>{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Additional Notes */}
              {analysis.additionalNotes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{analysis.additionalNotes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CropDiseaseDetectionPage;
