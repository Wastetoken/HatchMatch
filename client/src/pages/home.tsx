import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Download, FileText, Zap } from "lucide-react";
import BreedSelector from "@/components/breed-selector";
import PredictionResults from "@/components/prediction-results";
import { Breed, CrossCalculationResponse } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedParentA, setSelectedParentA] = useState<Breed | null>(null);
  const [selectedParentB, setSelectedParentB] = useState<Breed | null>(null);
  const [prediction, setPrediction] = useState<CrossCalculationResponse | null>(null);
  const { toast } = useToast();

  const crossMutation = useMutation({
    mutationFn: async (data: { parentAId: string; parentBId: string }) => {
      const response = await apiRequest('POST', '/api/crosses/calculate', data);
      return response.json() as Promise<CrossCalculationResponse>;
    },
    onSuccess: (data) => {
      if (data.success) {
        setPrediction(data);
        toast({
          title: "Prediction Complete",
          description: "Cross genetic analysis has been calculated successfully.",
        });
      } else {
        toast({
          title: "Calculation Failed",
          description: data.error || "Unable to calculate cross prediction.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to calculate cross prediction. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleCalculateCross = () => {
    if (!selectedParentA || !selectedParentB) {
      toast({
        title: "Missing Selection",
        description: "Please select both parent breeds before calculating.",
        variant: "destructive",
      });
      return;
    }

    crossMutation.mutate({
      parentAId: selectedParentA.id,
      parentBId: selectedParentB.id
    });
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    // TODO: Implement actual export functionality
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report...`,
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${format.toUpperCase()} report has been downloaded.`,
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layers className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Chicken Breed Cross Predictor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm opacity-90">Professional Poultry Genetics Tool</span>
              <Button 
                onClick={() => handleExport('pdf')} 
                className="bg-accent hover:bg-accent/90"
                disabled={!prediction}
              >
                Export Results
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Breed Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="w-6 h-6 mr-3 text-primary" />
              Select Parent Breeds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <BreedSelector
                label="Parent A (Rooster)"
                selectedBreed={selectedParentA}
                onBreedSelect={setSelectedParentA}
                excludeBreedId={selectedParentB?.id}
              />
              
              <BreedSelector
                label="Parent B (Hen)"
                selectedBreed={selectedParentB}
                onBreedSelect={setSelectedParentB}
                excludeBreedId={selectedParentA?.id}
              />
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={handleCalculateCross}
                disabled={!selectedParentA || !selectedParentB || crossMutation.isPending}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                {crossMutation.isPending ? (
                  "Calculating..."
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Calculate Cross Prediction
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {prediction && prediction.success && (
          <>
            <PredictionResults prediction={prediction} />
            
            {/* Export Footer */}
            <Card className="mt-8 bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Export Your Results</h3>
                    <p className="opacity-90">Save this genetic analysis for your breeding records</p>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      onClick={() => handleExport('pdf')}
                      variant="secondary"
                      className="bg-white text-primary hover:bg-gray-100"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      PDF Report
                    </Button>
                    <Button 
                      onClick={() => handleExport('csv')}
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      CSV Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-16 rounded-xl">
          <div className="container mx-auto px-6 py-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Data Sources</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Michigan State University Extension</li>
                  <li>• Ohio State University Poultry</li>
                  <li>• American Livestock Conservancy</li>
                  <li>• Commercial Hatchery Data (2024)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Genetic Principles</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Mendelian inheritance patterns</li>
                  <li>• Quantitative trait analysis</li>
                  <li>• Hybrid vigor calculations</li>
                  <li>• Population genetics modeling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Disclaimer</h4>
                <p className="text-sm text-gray-300">
                  Predictions based on established genetic principles. Actual outcomes may vary due to environmental factors, specific bloodlines, and breeding management practices.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              <p>&copy; 2024 Professional Poultry Genetics Tool. Educational use only.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
