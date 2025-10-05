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

  // Country-Crop specific export guidelines
  const exportGuidelines: Record<string, Record<string, any>> = {
    usa: {
      rice: {
        pesticides: "MRL: Carbofuran ≤0.05 ppm, Chlorpyrifos ≤0.01 ppm (FDA regulated)",
        packaging: "Food-grade bags with moisture barrier, vacuum sealed for premium grade",
        labeling: "USDA grade, enriched vitamins if applicable, country of origin mandatory",
        certifications: ["USDA Organic", "Non-GMO Project", "FDA Facility Registration"],
      },
      wheat: {
        pesticides: "MRL: Glyphosate ≤30 ppm, Chlorpyrifos-methyl ≤10 ppm",
        packaging: "Bulk containers or 25kg bags, fumigation-free certification",
        labeling: "Protein content %, falling number, country of origin",
        certifications: ["USDA Organic", "Whole Grain Council", "Kosher"],
      },
      cotton: {
        pesticides: "No pesticide residue requirements (non-food crop)",
        packaging: "Standard cotton bales, compressed and wrapped",
        labeling: "Fiber length, micronaire reading, trash content",
        certifications: ["USDA Organic", "Better Cotton Initiative", "OEKO-TEX"],
      },
      spices: {
        pesticides: "MRL varies: Black pepper ≤0.01 ppm DDT, Turmeric lead ≤2 ppm",
        packaging: "Sterilized bags, nitrogen flushing, moisture-proof",
        labeling: "ASTA cleanliness specs, steam sterilization if done",
        certifications: ["USDA Organic", "Fair Trade", "Steam Sterilization Certificate"],
      },
      fruits: {
        pesticides: "MRL: Varies by fruit - Apple Thiabendazole ≤10 ppm, Grape Captan ≤50 ppm",
        packaging: "Cold chain packaging, modified atmosphere, individual wrapping",
        labeling: "PLU codes, variety, size grade, harvest date",
        certifications: ["USDA Organic", "Primus GFS", "Rainforest Alliance"],
      },
      vegetables: {
        pesticides: "MRL: Spinach Permethrin ≤2 ppm, Tomato Imidacloprid ≤0.5 ppm",
        packaging: "Clamshells or vented boxes, cold storage required",
        labeling: "Lot codes, packed date, cooling method",
        certifications: ["USDA Organic", "Primus GFS", "GLOBALG.A.P"],
      },
    },
    eu: {
      rice: {
        pesticides: "Strict EU MRLs: Most pesticides ≤0.01 ppm, heavy metals Arsenic ≤0.2 mg/kg",
        packaging: "EU Regulation 1935/2004 compliant, recyclable materials",
        labeling: "Traceability code, EU organic logo if certified, allergen-free statement",
        certifications: ["GLOBALG.A.P", "EU Organic", "IFS Food"],
      },
      wheat: {
        pesticides: "Glyphosate ≤10 ppm (stricter than US), Chlorpyrifos banned",
        packaging: "Eco-friendly jute or paper bags, plastic use discouraged",
        labeling: "Lot traceability, mycotoxin testing results",
        certifications: ["GLOBALG.A.P", "EU Organic", "Donau Soja (for feed wheat)"],
      },
      cotton: {
        pesticides: "REACH compliance for textile chemicals",
        packaging: "Recycled wrapping materials preferred",
        labeling: "Fiber quality, OEKO-TEX compliance",
        certifications: ["GOTS (Global Organic Textile)", "Better Cotton", "Fairtrade"],
      },
      spices: {
        pesticides: "Extremely strict: Aflatoxin ≤5 μg/kg, most pesticides ≤0.01 ppm",
        packaging: "Vacuum sealed, nitrogen flushed, UV-protected",
        labeling: "Multi-language, irradiation status, origin traceability",
        certifications: ["EU Organic", "IFS Food", "ESG Certification"],
      },
      fruits: {
        pesticides: "Chlorpyrifos banned, strict MRLs on all approved pesticides",
        packaging: "100% recyclable, minimal plastic use",
        labeling: "Carbon footprint label, variety, class I/II designation",
        certifications: ["GLOBALG.A.P", "EU Organic", "Rainforest Alliance"],
      },
      vegetables: {
        pesticides: "Nitrate limits: Spinach ≤3000 mg/kg, Lettuce ≤2500 mg/kg",
        packaging: "Compostable materials, zero-waste approach",
        labeling: "Harvest date, storage temperature, nitrate content",
        certifications: ["GLOBALG.A.P", "EU Organic", "Planet-Proof"],
      },
    },
    uk: {
      rice: {
        pesticides: "Post-Brexit MRLs similar to EU, Arsenic ≤0.2 mg/kg",
        packaging: "UKCA marking, recyclable packaging",
        labeling: "UK origin logo if applicable, Red Tractor mark",
        certifications: ["Red Tractor", "LEAF Marque", "Soil Association"],
      },
      wheat: {
        pesticides: "Aligned with EU standards for trading purposes",
        packaging: "Sustainable UK-sourced packaging",
        labeling: "UK milling wheat specifications, protein %",
        certifications: ["Red Tractor", "LEAF", "AHDB Assured"],
      },
      cotton: {
        pesticides: "REACH UK compliance",
        packaging: "UK sustainability standards",
        labeling: "Fiber quality, UK textile standards",
        certifications: ["Soil Association", "Better Cotton", "GOTS"],
      },
      spices: {
        pesticides: "Aligned with EU MRLs, aflatoxin ≤5 μg/kg",
        packaging: "Tamper-proof seals, moisture control",
        labeling: "English only, clear origin statement",
        certifications: ["Organic Farmers & Growers", "Fairtrade UK"],
      },
      fruits: {
        pesticides: "UK follows EU standards for main trading",
        packaging: "Traffic light nutrition on processed fruit",
        labeling: "Best before dates, UK/imported clearly marked",
        certifications: ["Red Tractor", "LEAF Marque", "Organic UK"],
      },
      vegetables: {
        pesticides: "Nitrate and pesticide levels similar to EU",
        packaging: "Reduced plastic initiative compliance",
        labeling: "Traffic light labels, origin clearly shown",
        certifications: ["Red Tractor", "LEAF Marque", "Soil Association"],
      },
    },
    japan: {
      rice: {
        pesticides: "JAS: Extremely strict, most at ≤0.01 ppm level",
        packaging: "Vacuum-sealed small bags, freshness indicators",
        labeling: "Japanese language mandatory, production year (令和), QR code",
        certifications: ["JAS Organic", "JGAP", "Special Cultivation Label"],
      },
      wheat: {
        pesticides: "Very low MRLs, mycotoxin DON ≤1.0 mg/kg",
        packaging: "Moisture-proof bags with silica gel",
        labeling: "Japanese specs, protein content, ash content",
        certifications: ["JAS", "JGAP", "Japan Food Safety"],
      },
      cotton: {
        pesticides: "Textile safety law compliance",
        packaging: "Compressed bales, moisture controlled",
        labeling: "Fiber specs in Japanese, country of origin",
        certifications: ["JAS Organic for textile", "JOCA"],
      },
      spices: {
        pesticides: "Zero tolerance for many substances, strict aflatoxin limits",
        packaging: "Individual packets, tamper-proof seals",
        labeling: "Japanese language, radiation testing certificate",
        certifications: ["JAS Organic", "Japan Food Safety", "Halal (for some buyers)"],
      },
      fruits: {
        pesticides: "Very strict MRLs, appearance and uniformity critical",
        packaging: "Individual fruit wrapping, premium presentation",
        labeling: "Farm ID, sweetness level (Brix), size grade",
        certifications: ["JGAP", "JAS Organic", "Prefecture-specific standards"],
      },
      vegetables: {
        pesticides: "Strict MRLs, nitrate limits enforced",
        packaging: "Freshness packaging, individual wrapping common",
        labeling: "Production method (organic/special cultivation), farm name",
        certifications: ["JGAP", "JAS Organic", "Special Cultivation Certification"],
      },
    },
    uae: {
      rice: {
        pesticides: "GSO standards, halal compliance check",
        packaging: "Halal-certified packaging materials",
        labeling: "Arabic and English, expiry dates in Hijri calendar option",
        certifications: ["ESMA", "Halal Certification", "GSO Mark"],
      },
      wheat: {
        pesticides: "GSO compliant MRLs",
        packaging: "Climate-appropriate moisture barriers",
        labeling: "Arabic/English bilingual, nutritional info",
        certifications: ["ESMA", "GSO Certification", "Halal"],
      },
      cotton: {
        pesticides: "GSO textile standards",
        packaging: "Standard export bales",
        labeling: "Arabic/English, quality grade",
        certifications: ["GSO", "OEKO-TEX", "Better Cotton"],
      },
      spices: {
        pesticides: "Halal slaughter proximity rules (for facilities)",
        packaging: "Halal-certified, tamper-proof",
        labeling: "Arabic/English, halal logo prominent",
        certifications: ["Halal Certification", "ESMA", "ISO 22000"],
      },
      fruits: {
        pesticides: "GSO MRLs, premium appearance required",
        packaging: "Cold chain certified, high-end presentation",
        labeling: "Arabic/English, import permit visible, Hijri and Gregorian dates",
        certifications: ["ESMA", "Halal", "ISO 22000"],
      },
      vegetables: {
        pesticides: "GSO standards, freshness critical in hot climate",
        packaging: "Advanced cold chain packaging",
        labeling: "Arabic/English bilingual, storage temp",
        certifications: ["ESMA", "GLOBALG.A.P", "Organic where applicable"],
      },
    },
    australia: {
      rice: {
        pesticides: "APVMA regulated, biosecurity strict",
        packaging: "Biosecurity-compliant materials",
        labeling: "Australian origin labeling, biosecurity declarations",
        certifications: ["NASAA Organic", "Australian Certified Organic", "SQF"],
      },
      wheat: {
        pesticides: "Low MRLs, high grain quality standards",
        packaging: "Bulk or bagged, fumigation records",
        labeling: "ASW/APW grade specifications",
        certifications: ["Australian Certified Organic", "SQF", "BRC"],
      },
      cotton: {
        pesticides: "Strict water use reporting, chemical tracking",
        packaging: "Australian cotton bale standards",
        labeling: "myBMP compliance, water efficiency data",
        certifications: ["myBMP", "Better Cotton", "Australian Organic"],
      },
      spices: {
        pesticides: "APVMA limits, biosecurity inspection mandatory",
        packaging: "Fumigation-free preferred, sealed packaging",
        labeling: "Biosecurity import conditions, country of origin",
        certifications: ["Australian Certified Organic", "HACCP", "SQF"],
      },
      fruits: {
        pesticides: "Strict biosecurity, fruit fly protocols",
        packaging: "Biosecurity-approved treatment records",
        labeling: "Variety, region, treatment method (e.g., HTFA)",
        certifications: ["Freshcare", "GLOBALG.A.P", "Organic Certified"],
      },
      vegetables: {
        pesticides: "APVMA MRLs, biosecurity compliance",
        packaging: "Biosecurity declarations, pest-free certification",
        labeling: "Origin, biosecurity treatment if applicable",
        certifications: ["Freshcare", "Australian Certified Organic", "HARPS"],
      },
    },
  };

  // Crop-specific cultivation steps
  const cultivationSteps: Record<string, any[]> = {
    rice: [
      {
        title: "Land Preparation & Leveling",
        description: "Prepare paddy fields for optimal water management",
        practices: [
          "Laser level fields for uniform water distribution (±2cm variation)",
          "Test soil pH (optimal 5.5-7.0 for rice)",
          "Plow 15-20cm deep and puddle soil for water retention",
          "Create proper bunds for water management",
          "Remove stubble and incorporate organic matter",
        ],
      },
      {
        title: "Seed Selection & Treatment",
        description: "Use certified high-yielding varieties",
        practices: [
          "Select certified disease-resistant varieties (e.g., Pusa Basmati, IR64)",
          "Treat seeds with fungicide (Carbendazim 2g/kg seed)",
          "Maintain seed rate: 20-25kg/hectare for transplanting",
          "Test germination rate (should be >85%)",
          "Use salt water method for selection of healthy seeds",
        ],
      },
      {
        title: "Water Management",
        description: "Maintain optimal water levels throughout growth",
        practices: [
          "Maintain 5-7cm standing water during vegetative stage",
          "Implement alternate wetting and drying (AWD) to save water",
          "Drain field 10-15 days before harvest",
          "Use clean water sources (E.coli <1 CFU/100ml)",
          "Monitor water salinity (<2 dS/m for rice)",
        ],
      },
      {
        title: "Fertilizer Management",
        description: "Balanced nutrition for export quality rice",
        practices: [
          "Apply NPK as per soil test (typically 120:60:40 kg/ha)",
          "Split nitrogen: 50% basal, 25% tillering, 25% panicle initiation",
          "Use zinc sulfate if soil is deficient (25 kg/ha)",
          "Avoid excessive nitrogen to prevent lodging",
          "Stop fertilizers 30 days before harvest",
        ],
      },
      {
        title: "Pest & Disease Management",
        description: "Integrated pest management for export quality",
        practices: [
          "Use pheromone traps for stem borer and leaf folder",
          "Apply only approved pesticides: Chlorantraniliprole for stem borer",
          "Maintain 30-day pre-harvest interval (PHI) for all pesticides",
          "Monitor blast disease; use Tricyclazole if needed",
          "Keep detailed spray records with dates and chemicals",
        ],
      },
      {
        title: "Harvesting & Post-Harvest",
        description: "Harvest at optimal moisture for premium quality",
        practices: [
          "Harvest when grain moisture is 20-22%",
          "Use combine harvester or careful manual harvesting",
          "Dry to 12-14% moisture within 24 hours",
          "Clean and grade rice to remove damaged grains",
          "Store in cool, dry conditions with proper ventilation",
        ],
      },
    ],
    wheat: [
      {
        title: "Soil Preparation",
        description: "Deep tillage for wheat root development",
        practices: [
          "Conduct soil testing for NPK and micronutrients",
          "Deep plow to 20-25cm depth",
          "Optimal pH range: 6.0-7.5",
          "Ensure good drainage to prevent waterlogging",
          "Incorporate farmyard manure (10-15 tons/ha)",
        ],
      },
      {
        title: "Seed Selection",
        description: "Choose high protein wheat varieties",
        practices: [
          "Use certified seeds of high-protein varieties (>12% protein)",
          "Seed rate: 100-125 kg/ha depending on variety",
          "Treat seeds with fungicide (Tebuconazole @ 1.5g/kg)",
          "Ensure >90% germination rate",
          "Select varieties suited for your export market (e.g., durum for pasta)",
        ],
      },
      {
        title: "Irrigation Management",
        description: "Critical irrigation stages for wheat",
        practices: [
          "Provide 4-6 irrigations: CRI, tillering, jointing, flowering, grain filling",
          "Avoid waterlogging; ensure good drainage",
          "Use drip or sprinkler for water efficiency",
          "Stop irrigation 10-12 days before harvest",
          "Monitor soil moisture at 30-60cm depth",
        ],
      },
      {
        title: "Fertilizer Application",
        description: "Balanced nutrition for protein content",
        practices: [
          "Apply 120:60:40 NPK kg/ha (adjust per soil test)",
          "100% phosphorus and potassium at sowing",
          "Split nitrogen: 50% basal, 25% at CRI, 25% at tillering",
          "Foliar spray of zinc sulfate if deficiency observed",
          "Maintain records for export documentation",
        ],
      },
      {
        title: "Pest Management",
        description: "Control pests while maintaining export standards",
        practices: [
          "Monitor aphids and apply Imidacloprid if threshold reached",
          "Control termites with Chlorpyrifos at sowing (within limits)",
          "Use fungicides for rust: Tebuconazole or Propiconazole",
          "Maintain minimum 30-day PHI before harvest",
          "Keep spray records with dates and dosages",
        ],
      },
      {
        title: "Harvesting",
        description: "Timely harvest for optimal grain quality",
        practices: [
          "Harvest when moisture content is 12-14%",
          "Use clean harvesting equipment",
          "Harvest on dry days to prevent mold",
          "Clean and grade to remove foreign matter",
          "Store in dry, ventilated warehouses (<14% moisture)",
        ],
      },
    ],
    cotton: [
      {
        title: "Land Preparation",
        description: "Deep soil preparation for cotton root growth",
        practices: [
          "Deep plow to 30-40cm for tap root penetration",
          "Soil pH: 5.5-8.0 (optimal 6.0-7.0)",
          "Create ridges and furrows for drainage",
          "Ensure field is weed-free before planting",
          "Apply farmyard manure 3-4 weeks before planting",
        ],
      },
      {
        title: "Seed Selection & Planting",
        description: "Bt cotton or hybrid varieties for export",
        practices: [
          "Use certified Bt cotton seeds or organic varieties",
          "Seed rate: 12-15 kg/ha",
          "Treat seeds with fungicide and insecticide",
          "Plant at 60-90cm row spacing",
          "Optimal planting depth: 3-5cm",
        ],
      },
      {
        title: "Irrigation",
        description: "Critical irrigation stages",
        practices: [
          "Provide irrigation at squaring, flowering, and boll development",
          "Use drip irrigation for 40% water saving",
          "Avoid excess water to prevent boll rot",
          "Stop irrigation 20-25 days before picking",
          "Maintain consistent moisture during boll formation",
        ],
      },
      {
        title: "Fertilizer Management",
        description: "Balanced nutrition for fiber quality",
        practices: [
          "Apply 100:50:50 NPK kg/ha (adjust as per soil test)",
          "Split nitrogen: 25% basal, 25% squaring, 50% flowering",
          "Avoid excessive nitrogen (reduces fiber quality)",
          "Foliar spray boron at flowering for boll retention",
          "Stop fertilization 45 days before first picking",
        ],
      },
      {
        title: "Pest Management",
        description: "IPM for bollworm and sucking pests",
        practices: [
          "Use pheromone traps for bollworm monitoring",
          "Apply only approved pesticides for export markets",
          "Control whitefly and jassids with Acetamiprid",
          "Avoid pesticides 30 days before last picking",
          "Document all pesticide applications",
        ],
      },
      {
        title: "Harvesting & Ginning",
        description: "Quality picking for premium fiber",
        practices: [
          "Pick when bolls are fully open and dry",
          "Avoid contamination with leaf, bark, or soil",
          "Use clean cotton bags for collection",
          "Gin within 2-3 days to prevent quality loss",
          "Grade cotton by fiber length and micronaire",
        ],
      },
    ],
    spices: [
      {
        title: "Site Selection & Soil Prep",
        description: "Ideal conditions for spice cultivation",
        practices: [
          "Select well-drained loamy soil with organic matter",
          "pH range: 5.5-7.5 depending on spice",
          "Avoid waterlogged areas to prevent root diseases",
          "Test soil for heavy metals (export requirement)",
          "Prepare raised beds for good drainage",
        ],
      },
      {
        title: "Planting Material",
        description: "Disease-free quality planting material",
        practices: [
          "Use certified disease-free seeds or cuttings",
          "Treat with bio-fungicides (Trichoderma)",
          "Select high-yielding, aromatic varieties",
          "Maintain proper spacing for air circulation",
          "Keep records of planting material source",
        ],
      },
      {
        title: "Water Management",
        description: "Controlled irrigation for flavor intensity",
        practices: [
          "Use drip irrigation for precise water control",
          "Avoid overwatering which dilutes essential oils",
          "Ensure water is free from pathogens and heavy metals",
          "Reduce irrigation before harvest for concentrated flavor",
          "Maintain soil moisture at 60-70% field capacity",
        ],
      },
      {
        title: "Organic Fertilization",
        description: "Organic inputs preferred for export spices",
        practices: [
          "Use well-decomposed organic manure (10-15 tons/ha)",
          "Apply bio-fertilizers (Azospirillum, Phosphobacteria)",
          "Foliar spray of seaweed extract for quality",
          "Avoid synthetic fertilizers 60 days before harvest",
          "Maintain organic certification if targeting premium markets",
        ],
      },
      {
        title: "Pest & Disease Control",
        description: "Organic/bio-control methods preferred",
        practices: [
          "Use neem-based products for pest control",
          "Apply Trichoderma for soil-borne diseases",
          "Employ sticky traps for flying insects",
          "Absolutely no prohibited pesticides (check export country list)",
          "If pesticides needed, use only approved ones with 60-day PHI",
        ],
      },
      {
        title: "Harvesting & Processing",
        description: "Timing critical for essential oil content",
        practices: [
          "Harvest at peak essential oil stage (varies by spice)",
          "Use clean, sanitized equipment",
          "Dry immediately to prevent aflatoxin formation",
          "Maintain <12% moisture during storage",
          "Test for aflatoxin, heavy metals, and pesticide residues before export",
        ],
      },
    ],
    fruits: [
      {
        title: "Orchard Establishment",
        description: "Long-term planning for fruit cultivation",
        practices: [
          "Select varieties approved for target export market",
          "Ensure proper spacing for sunlight and air circulation",
          "Install drip irrigation and fertigation system",
          "Conduct soil and water testing annually",
          "Maintain pH 6.0-7.0 for most fruit crops",
        ],
      },
      {
        title: "Pruning & Training",
        description: "Shape trees for quality fruit production",
        practices: [
          "Prune annually for light penetration and air flow",
          "Remove diseased and dead wood",
          "Train trees for easy harvesting and spraying",
          "Maintain tree height at 2.5-3m for management",
          "Thin fruits for larger size and better quality",
        ],
      },
      {
        title: "Fertigation",
        description: "Nutrient management through drip system",
        practices: [
          "Apply nutrients based on leaf and soil analysis",
          "Use water-soluble fertilizers through drip system",
          "Provide calcium and boron for fruit quality",
          "Stop nitrogen 45 days before harvest for color development",
          "Maintain records for traceability",
        ],
      },
      {
        title: "Integrated Pest Management",
        description: "Minimize chemical residues on fruit",
        practices: [
          "Use pheromone traps for fruit flies and moths",
          "Apply bagging for fruits (mango, apple) to avoid sprays",
          "Use biocontrol agents (Trichogramma, NPV)",
          "Apply only export-approved pesticides",
          "Strictly follow PHI of 15-30 days (fruit dependent)",
        ],
      },
      {
        title: "Quality Monitoring",
        description: "Pre-harvest quality checks",
        practices: [
          "Monitor fruit size, color development, and sugar content (Brix)",
          "Check for pest and disease damage",
          "Conduct pre-harvest pesticide residue testing",
          "Grade fruits by size and appearance",
          "Remove damaged fruits from orchard",
        ],
      },
      {
        title: "Harvesting & Cold Chain",
        description: "Careful handling for long shelf life",
        practices: [
          "Harvest at optimal maturity (not overripe)",
          "Use sharp, clean tools to prevent bruising",
          "Harvest in early morning when cool",
          "Immediately transfer to cold storage (fruit-specific temp)",
          "Pack in export-grade boxes with proper cushioning",
        ],
      },
    ],
    vegetables: [
      {
        title: "Raised Bed Preparation",
        description: "Optimal soil structure for vegetables",
        practices: [
          "Create raised beds (15-20cm height) for drainage",
          "Incorporate compost or vermicompost (5-10 tons/ha)",
          "Test soil pH (optimal 6.0-7.0 for most vegetables)",
          "Ensure soil is free from heavy metals and contaminants",
          "Install drip irrigation on raised beds",
        ],
      },
      {
        title: "Seed/Seedling Selection",
        description: "Disease-free planting material",
        practices: [
          "Use certified F1 hybrid or OP varieties",
          "Treat seeds with bio-agents (Trichoderma)",
          "Raise seedlings in sterilized media",
          "Harden seedlings before transplanting",
          "Select varieties with uniform size and appearance",
        ],
      },
      {
        title: "Drip Irrigation & Mulching",
        description: "Water and weed management",
        practices: [
          "Install inline drip system (2-4 liters/hour)",
          "Use plastic mulch to conserve moisture and prevent weeds",
          "Monitor soil moisture with tensiometers",
          "Irrigate based on crop stage and weather",
          "Use clean, tested water (microbial and chemical testing)",
        ],
      },
      {
        title: "Fertigation Program",
        description: "Precise nutrient application",
        practices: [
          "Apply water-soluble fertilizers through drip",
          "Provide 100-150-100 NPK kg/ha (crop-specific)",
          "Split application: weekly fertigation schedule",
          "Include micronutrients (Fe, Zn, B) as per crop needs",
          "Stop fertilization 15 days before harvest",
        ],
      },
      {
        title: "IPM for Export Quality",
        description: "Minimal chemical residue approach",
        practices: [
          "Use colored sticky traps for whitefly and thrips",
          "Install insect-proof nets in nursery and main field",
          "Apply bio-pesticides (Bt, NPV, neem) first",
          "Use approved chemicals only if threshold exceeded",
          "Follow strict PHI of 3-7 days for vegetables",
        ],
      },
      {
        title: "Harvesting & Packing",
        description: "Maintain cold chain from field to pack house",
        practices: [
          "Harvest at optimal maturity (not overripe)",
          "Use sanitized bins and tools",
          "Transfer to pack house within 2 hours",
          "Pre-cool immediately (hydro-cooling or forced air)",
          "Pack in perforated boxes and maintain cold chain",
        ],
      },
    ],
  };

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

  const guidelines = exportGuidelines[selectedCountry]?.[selectedCrop] || {
    pesticides: "Please select a country and crop combination",
    packaging: "Standards will be displayed based on your selection",
    labeling: "Requirements vary by country and crop",
    certifications: ["Select country and crop"],
  };

  const cropSteps = cultivationSteps[selectedCrop] || [];

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
                {crops.find(c => c.value === selectedCrop)?.label} Export Standards for {countries.find(c => c.value === selectedCountry)?.label}
              </h2>
              <Button
                onClick={() => isSpeaking ? stopSpeaking() : speakText(`Export standards for ${crops.find(c => c.value === selectedCrop)?.label} to ${countries.find(c => c.value === selectedCountry)?.label}. Pesticide limits: ${guidelines.pesticides}. Packaging: ${guidelines.packaging}. Labeling: ${guidelines.labeling}.`)}
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
                {crops.find(c => c.value === selectedCrop)?.label} Cultivation Guide for Export Quality
              </h2>
            </div>

            {cropSteps.length > 0 ? (
              <Accordion type="single" collapsible className="space-y-4">
                {cropSteps.map((step, idx) => (
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
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Please select a crop to view cultivation guidelines</p>
              </Card>
            )}
          </Card>
        </TabsContent>

        {/* Certifications */}
        <TabsContent value="certifications">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6">
              <Award className="h-6 w-6 text-primary" />
              Recommended Certifications for {crops.find(c => c.value === selectedCrop)?.label} to {countries.find(c => c.value === selectedCountry)?.label}
            </h2>

            <div className="mb-6 p-4 bg-accent rounded-lg">
              <h3 className="font-semibold mb-2">Required Certifications for Your Selection:</h3>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(guidelines.certifications) && guidelines.certifications.map((cert, idx) => (
                  <Badge key={idx} className="text-sm">{cert}</Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-5 bg-muted/50">
                <h3 className="font-semibold text-lg mb-3">GLOBALG.A.P Certification</h3>
                <p className="text-sm mb-3">Internationally recognized farm assurance standard (Essential for EU, UK markets)</p>
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
                <p className="text-sm mb-3">Required for organic product exports (Premium price advantage for {selectedCrop})</p>
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
            <h2 className="text-2xl font-semibold mb-6">
              Current Export Regulations: {crops.find(c => c.value === selectedCrop)?.label} to {countries.find(c => c.value === selectedCountry)?.label}
            </h2>
            
            <div className="space-y-4">
              {selectedCountry === "eu" && (
                <>
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <Badge className="mt-1">New</Badge>
                      <div>
                        <h3 className="font-semibold mb-1">EU Updates Pesticide MRLs (2025)</h3>
                        <p className="text-sm text-muted-foreground">
                          The European Union has reduced maximum residue limits for 12 pesticides affecting {selectedCrop}. Farmers exporting to EU must comply by March 2025.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">Critical</Badge>
                      <div>
                        <h3 className="font-semibold mb-1">Deforestation Regulation (EUDR)</h3>
                        <p className="text-sm text-muted-foreground">
                          New traceability requirements for agricultural products. GPS coordinates of production sites may be required starting 2025.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {selectedCountry === "usa" && (
                <>
                  <div className="p-4 bg-accent rounded-lg">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">Updated</Badge>
                      <div>
                        <h3 className="font-semibold mb-1">US FDA Food Traceability Rule (FSMA 204)</h3>
                        <p className="text-sm text-muted-foreground">
                          New traceability requirements for {selectedCrop} and certain other foods. Records must be maintained for 2 years. Effective January 2026.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {selectedCountry === "uk" && (
                <div className="p-4 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">Important</Badge>
                    <div>
                      <h3 className="font-semibold mb-1">UK Post-Brexit Import Controls</h3>
                      <p className="text-sm text-muted-foreground">
                        Phytosanitary certificates now required for all plant products including {selectedCrop}. Check DEFRA guidelines before shipping.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedCountry === "japan" && (
                <div className="p-4 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">Strict</Badge>
                    <div>
                      <h3 className="font-semibold mb-1">Japan Import Quarantine</h3>
                      <p className="text-sm text-muted-foreground">
                        All {selectedCrop} shipments require phytosanitary certificate and may undergo fumigation at port. Radiation testing certificates required post-2011.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedCountry === "uae" && (
                <div className="p-4 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">Required</Badge>
                    <div>
                      <h3 className="font-semibold mb-1">ESMA Certification</h3>
                      <p className="text-sm text-muted-foreground">
                        Emirates Authority for Standardization requires pre-export certification for {selectedCrop}. Halal certification may be needed for certain products.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedCountry === "australia" && (
                <div className="p-4 bg-accent rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">Biosecurity</Badge>
                    <div>
                      <h3 className="font-semibold mb-1">Strict Biosecurity Controls</h3>
                      <p className="text-sm text-muted-foreground">
                        All {selectedCrop} imports must meet Australia's strict biosecurity standards. Fumigation and inspection at border mandatory.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-muted rounded-lg mt-4">
                <h3 className="font-semibold mb-1">General Update</h3>
                <p className="text-sm text-muted-foreground">
                  Always verify the latest requirements for {selectedCrop} exports to {countries.find(c => c.value === selectedCountry)?.label} before shipping. Regulations change frequently.
                </p>
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
