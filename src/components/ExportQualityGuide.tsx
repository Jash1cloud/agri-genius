import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Globe, Award, BookOpen, TrendingUp, FileCheck, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ExportQualityGuide = () => {
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState("usa");
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const countries = [
    { value: "usa", label: "United States" },
    { value: "eu", label: "European Union" },
    { value: "uk", label: "United Kingdom" },
    { value: "japan", label: "Japan" },
    { value: "uae", label: "United Arab Emirates" },
    { value: "australia", label: "Australia" },
  ];

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "cotton", label: "Cotton" },
    { value: "spices", label: "Spices" },
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
  ];

  const exportGuidelines = {
    usa: {
      pesticides: "Maximum Residue Limit (MRL): FDA regulated, typically 0.01-10 ppm depending on crop",
      packaging: "FDA compliant materials, BPA-free containers, tamper-evident seals required",
      labeling: "English language, nutritional facts, country of origin, allergen warnings mandatory",
      certifications: ["USDA Organic", "FDA Food Facility Registration", "HACCP"],
    },
    eu: {
      pesticides: "EU MRLs (stricter than most): 0.01-0.5 ppm for most substances",
      packaging: "EU Regulation 1935/2004 compliant, recyclable materials preferred",
      labeling: "Multi-language labels, EU organic logo if certified, traceability codes",
      certifications: ["GLOBALG.A.P", "EU Organic", "Rainforest Alliance"],
    },
    uk: {
      pesticides: "Post-Brexit MRLs similar to EU standards",
      packaging: "UKCA marking required, sustainable packaging encouraged",
      labeling: "English language mandatory, traffic light nutrition labels",
      certifications: ["Red Tractor", "LEAF Marque", "Soil Association Organic"],
    },
    japan: {
      pesticides: "Japan Agricultural Standards (JAS) - very strict limits",
      packaging: "JAS compliant, detailed freshness indicators",
      labeling: "Japanese language mandatory, QR codes for traceability",
      certifications: ["JAS Organic", "JGAP"],
    },
    uae: {
      pesticides: "Gulf Standards (GSO) compliant",
      packaging: "Halal certification required for some products",
      labeling: "Arabic and English, expiry dates clearly marked",
      certifications: ["ESMA", "Halal Certification"],
    },
    australia: {
      pesticides: "APVMA regulated MRLs",
      packaging: "Australian standards AS 2070",
      labeling: "English, Australian origin labeling, biosecurity declarations",
      certifications: ["NASAA Organic", "Australian Certified Organic"],
    },
  };

  const cultivationSteps = [
    {
      title: "Soil Preparation",
      description: "Prepare soil according to export quality standards",
      practices: [
        "Test soil pH and nutrient levels (optimal pH 6.0-7.5 for most crops)",
        "Remove chemical residues from previous seasons",
        "Use certified organic compost or approved fertilizers only",
        "Implement proper drainage systems",
        "Maintain soil health with cover crops and crop rotation",
      ],
    },
    {
      title: "Seed Selection",
      description: "Choose certified, high-quality seeds",
      practices: [
        "Use only certified disease-free seeds",
        "Select varieties approved for export markets",
        "Verify seed source documentation",
        "Check germination rates (minimum 85%)",
        "Store seeds in controlled conditions",
      ],
    },
    {
      title: "Irrigation Management",
      description: "Maintain proper water quality and quantity",
      practices: [
        "Use clean, tested water sources (E.coli free)",
        "Implement drip irrigation for water efficiency",
        "Monitor water pH and mineral content",
        "Follow water conservation practices",
        "Document irrigation schedules",
      ],
    },
    {
      title: "Fertilizer Application",
      description: "Use approved fertilizers within limits",
      practices: [
        "Apply only certified organic or approved chemical fertilizers",
        "Follow recommended dosage strictly",
        "Maintain application records",
        "Time applications to minimize residue",
        "Conduct pre-harvest soil tests",
      ],
    },
    {
      title: "Pest Management",
      description: "Integrated pest management for export quality",
      practices: [
        "Use biological controls first (neem, beneficial insects)",
        "Apply only approved pesticides from export country list",
        "Follow pre-harvest intervals (PHI) strictly",
        "Keep detailed spray records",
        "Implement IPM strategies to minimize chemical use",
      ],
    },
    {
      title: "Harvesting",
      description: "Harvest at optimal maturity for export",
      practices: [
        "Harvest at proper maturity stage",
        "Use clean, sanitized equipment",
        "Handle produce gently to avoid damage",
        "Harvest during cool hours (early morning)",
        "Immediately transfer to cleaning/packing facility",
      ],
    },
  ];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      toast({ title: "Playing audio guidance" });
    } else {
      toast({ title: "Text-to-speech not supported", variant: "destructive" });
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const guidelines = exportGuidelines[selectedCountry as keyof typeof exportGuidelines];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-foreground">Export Quality Crop Cultivation Guide</h1>
        <p className="text-muted-foreground text-lg">
          Learn international standards and best practices for growing export-quality crops
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6 mb-8 bg-card">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search guidelines, certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger>
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger>
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              {crops.map((crop) => (
                <SelectItem key={crop.value} value={crop.value}>
                  {crop.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="standards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="standards">Quality Standards</TabsTrigger>
          <TabsTrigger value="cultivation">Cultivation Steps</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
        </TabsList>

        {/* Quality Standards */}
        <TabsContent value="standards">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-primary" />
                Export Standards for {countries.find(c => c.value === selectedCountry)?.label}
              </h2>
              <Button
                onClick={() => isSpeaking ? stopSpeaking() : speakText(`Export standards for ${countries.find(c => c.value === selectedCountry)?.label}`)}
                variant="outline"
                size="sm"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {isSpeaking ? "Stop" : "Listen"}
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Pesticide Limits
                </h3>
                <p className="text-sm">{guidelines.pesticides}</p>
              </Card>

              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold mb-3">Packaging Requirements</h3>
                <p className="text-sm">{guidelines.packaging}</p>
              </Card>

              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold mb-3">Labeling Standards</h3>
                <p className="text-sm">{guidelines.labeling}</p>
              </Card>

              <Card className="p-4 bg-muted/50">
                <h3 className="font-semibold mb-3">Required Certifications</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {guidelines.certifications.map((cert, idx) => (
                    <Badge key={idx} variant="secondary">{cert}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Cultivation Steps */}
        <TabsContent value="cultivation">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Step-by-Step Cultivation Guide
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {cultivationSteps.map((step, idx) => (
                <AccordionItem key={idx} value={`step-${idx}`}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
                        {idx + 1}
                      </span>
                      {step.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-11 pt-2">
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.practices.map((practice, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-sm">{practice}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={() => speakText(`${step.title}. ${step.description}. Best practices: ${step.practices.join('. ')}`)}
                        variant="outline"
                        size="sm"
                        className="mt-4"
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Listen to this section
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>

        {/* Certifications */}
        <TabsContent value="certifications">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-primary" />
              Certification Processes
            </h2>

            <div className="space-y-6">
              <Card className="p-5 bg-muted/50">
                <h3 className="font-semibold text-lg mb-3">GLOBALG.A.P Certification</h3>
                <p className="text-sm mb-3">Internationally recognized farm assurance standard</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Application Process:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Register on GLOBALG.A.P website</li>
                    <li>Undergo initial farm assessment</li>
                    <li>Implement required control points</li>
                    <li>Schedule certification audit</li>
                    <li>Receive certificate (valid 12 months)</li>
                  </ol>
                  <p className="mt-3"><strong>Cost:</strong> $500-$2000 depending on farm size</p>
                  <p><strong>Duration:</strong> 3-6 months from application to certification</p>
                </div>
              </Card>

              <Card className="p-5 bg-muted/50">
                <h3 className="font-semibold text-lg mb-3">Organic Certification</h3>
                <p className="text-sm mb-3">Required for organic product exports</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Application Process:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Select accredited certifying agency</li>
                    <li>Submit organic system plan</li>
                    <li>Complete 3-year transition period</li>
                    <li>Pass on-site inspection</li>
                    <li>Receive organic certificate</li>
                  </ol>
                  <p className="mt-3"><strong>Cost:</strong> $800-$3000 annually</p>
                  <p><strong>Transition Period:</strong> 36 months minimum</p>
                </div>
              </Card>

              <Card className="p-5 bg-muted/50">
                <h3 className="font-semibold text-lg mb-3">HACCP Certification</h3>
                <p className="text-sm mb-3">Food safety management system</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Application Process:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Assemble HACCP team</li>
                    <li>Conduct hazard analysis</li>
                    <li>Establish critical control points</li>
                    <li>Implement monitoring procedures</li>
                    <li>Undergo third-party audit</li>
                  </ol>
                  <p className="mt-3"><strong>Cost:</strong> $1000-$4000</p>
                  <p><strong>Duration:</strong> 4-8 months implementation</p>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Regulations */}
        <TabsContent value="regulations">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Current Export Regulations & Updates</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge className="mt-1">New</Badge>
                  <div>
                    <h3 className="font-semibold mb-1">EU Updates Pesticide MRLs (2025)</h3>
                    <p className="text-sm text-muted-foreground">
                      The European Union has reduced maximum residue limits for 12 pesticides. Farmers exporting to EU must comply by March 2025.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">Updated</Badge>
                  <div>
                    <h3 className="font-semibold mb-1">US FDA Food Traceability Rule</h3>
                    <p className="text-sm text-muted-foreground">
                      New traceability requirements for certain foods. Records must be maintained for 2 years. Effective January 2026.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">Important</Badge>
                  <div>
                    <h3 className="font-semibold mb-1">UK Post-Brexit Import Controls</h3>
                    <p className="text-sm text-muted-foreground">
                      Phytosanitary certificates now required for all plant products. Check DEFRA guidelines before shipping.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Regulatory Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>• US FDA: <span className="text-primary">fda.gov/food</span></li>
                <li>• EU Commission: <span className="text-primary">ec.europa.eu/food</span></li>
                <li>• Codex Alimentarius: <span className="text-primary">fao.org/fao-who-codexalimentarius</span></li>
                <li>• WTO Agriculture: <span className="text-primary">wto.org/agriculture</span></li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExportQualityGuide;
