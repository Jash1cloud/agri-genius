import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Award, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface Scheme {
  name: string;
  category: string;
  eligibility: string;
  benefits: string;
  howToApply: string;
  documents: string[];
  priority: "high" | "medium" | "low";
}

interface Analysis {
  eligibleSchemes: Scheme[];
  generalAdvice: string;
  nextSteps: string[];
}

const GovernmentSchemesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const analyzeSchemes = async () => {
    if (!profile) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile first to get scheme recommendations.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-schemes", {
        body: { farmerProfile: profile },
      });

      if (error) throw error;

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "We've found schemes you may be eligible for!",
      });
    } catch (error: any) {
      console.error("Error analyzing schemes:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze schemes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user && <Navbar />}
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Government Schemes for Farmers</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover government schemes and subsidies you're eligible for based on your farm profile
          </p>
        </div>

        {!analysis ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Get Personalized Scheme Recommendations</CardTitle>
              <CardDescription>
                We'll analyze your farm profile and match you with relevant government schemes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile && (
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p className="font-semibold">Your Profile:</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Location: {profile.location || "Not set"}, {profile.state || "Not set"}</div>
                    <div>Farm Size: {profile.farm_size ? `${profile.farm_size} acres` : "Not set"}</div>
                    <div>Farm Type: {profile.farm_type || "Not set"}</div>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={analyzeSchemes} 
                disabled={loading || !profile}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Your Eligibility...
                  </>
                ) : (
                  <>
                    <Award className="mr-2 h-5 w-5" />
                    Find Eligible Schemes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Eligible Schemes</h2>
              <Button onClick={() => setAnalysis(null)} variant="outline">
                Analyze Again
              </Button>
            </div>

            {analysis.generalAdvice && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    General Advice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{analysis.generalAdvice}</p>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {analysis.eligibleSchemes.map((scheme, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl">{scheme.name}</CardTitle>
                      <Badge className={getPriorityColor(scheme.priority)}>
                        {scheme.priority}
                      </Badge>
                    </div>
                    <Badge variant="outline">{scheme.category}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Eligibility
                      </h4>
                      <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Award className="h-4 w-4 text-primary" />
                        Benefits
                      </h4>
                      <p className="text-sm text-muted-foreground">{scheme.benefits}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4" />
                        How to Apply
                      </h4>
                      <p className="text-sm text-muted-foreground">{scheme.howToApply}</p>
                    </div>

                    {scheme.documents && scheme.documents.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Required Documents:</h4>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {scheme.documents.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {analysis.nextSteps && analysis.nextSteps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysis.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernmentSchemesPage;