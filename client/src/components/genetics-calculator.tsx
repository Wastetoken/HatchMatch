import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Grid, Book, Repeat } from "lucide-react";
import { CrossCalculationResponse } from "@shared/schema";
import { formatPercentage, getDominanceColor } from "@/lib/genetics";

interface GeneticsCalculatorProps {
  parentA: NonNullable<CrossCalculationResponse["prediction"]>["parentA"];
  parentB: NonNullable<CrossCalculationResponse["prediction"]>["parentB"];
  offspring: NonNullable<CrossCalculationResponse["prediction"]>["offspring"];
}

export default function GeneticsCalculator({ parentA, parentB, offspring }: GeneticsCalculatorProps) {
  const geneticBreakdown = offspring.geneticBreakdown || [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Genetic Analysis & Inheritance Patterns</h3>
        <p className="text-muted-foreground">Detailed breakdown of genetic inheritance and cross calculations</p>
      </div>

      {/* Punnett Square Visualization */}
      <Card className="bg-muted">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Grid className="w-5 h-5 mr-2 text-primary" />
            Key Genetic Crosses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feather Color Genetics */}
            <div>
              <h5 className="font-medium text-gray-700 mb-3">Feather Color (E-locus)</h5>
              <div className="bg-white rounded border p-4">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div className="bg-muted p-2 rounded">
                    <strong>×</strong>
                  </div>
                  <div className="bg-success/20 p-2 rounded">
                    <strong>Parent A</strong>
                    <div className="text-xs text-success">{parentA.physicalTraits.featherColor}</div>
                  </div>
                  <div className="bg-success/20 p-2 rounded">
                    <strong>Parent A</strong>
                    <div className="text-xs text-success">{parentA.physicalTraits.featherColor}</div>
                  </div>
                  <div className="bg-destructive/20 p-2 rounded">
                    <strong>Parent B</strong>
                    <div className="text-xs text-destructive">{parentB.physicalTraits.featherColor}</div>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded">
                    <strong>F1</strong>
                    <div className="text-xs">Mixed expression</div>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded">
                    <strong>F1</strong>
                    <div className="text-xs">Mixed expression</div>
                  </div>
                  <div className="bg-destructive/20 p-2 rounded">
                    <strong>Parent B</strong>
                    <div className="text-xs text-destructive">{parentB.physicalTraits.featherColor}</div>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded">
                    <strong>F1</strong>
                    <div className="text-xs">Mixed expression</div>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded">
                    <strong>F1</strong>
                    <div className="text-xs">Mixed expression</div>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <p><strong>Result:</strong> {offspring.physicalTraits.featherColor}</p>
                </div>
              </div>
            </div>

            {/* Comb Type Genetics */}
            <div>
              <h5 className="font-medium text-gray-700 mb-3">Comb Type</h5>
              <div className="bg-white rounded border p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-muted rounded">
                    <span className="capitalize">{parentA.physicalTraits.combType} × {parentB.physicalTraits.combType}</span>
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                      {parentA.physicalTraits.combType === 'single' ? 'rr' : 'R_'} × {parentB.physicalTraits.combType === 'single' ? 'rr' : 'R_'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-success/10 rounded">
                    <span><strong className="capitalize">{offspring.physicalTraits.combType} Comb</strong></span>
                    <span className="bg-success/20 px-2 py-1 rounded text-xs">
                      Predicted outcome
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Inheritance pattern based on comb genetics
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Genetic Breakdown Table */}
      {geneticBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Genetic Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geneticBreakdown.map((trait: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-800">{trait.trait}</h5>
                    <Badge variant="outline">
                      {formatPercentage(trait.probability)} probability
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Parent A Contribution</p>
                      <div className="bg-blue-50 p-2 rounded border">
                        <span className="font-mono">{trait.parentAContribution}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Parent B Contribution</p>
                      <div className="bg-pink-50 p-2 rounded border">
                        <span className="font-mono">{trait.parentBContribution}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-muted-foreground">Dominant Expression</p>
                      <div className="bg-green-50 p-2 rounded border">
                        <span className="font-medium">{trait.dominantExpression}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Genetic Principles */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-600">
            <Book className="w-5 h-5 mr-2" />
            Genetic Principles in This Cross
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Dominant Traits</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Body size inheritance
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Comb type expression
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  Primary feather coloring
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Recessive Traits</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-2"></div>
                  Single comb (when present)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-2"></div>
                  Specific color patterns
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-2"></div>
                  Skin color variations
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-700 mb-2">Hybrid Vigor Effects</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Enhanced growth rate (+{formatPercentage(offspring.hybridVigor.growthRateBoost)})
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Better feed conversion (+{formatPercentage(offspring.hybridVigor.feedConversionImprovement)})
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                  Enhanced disease resistance (+{formatPercentage(offspring.hybridVigor.diseaseResistanceBoost)})
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* F2 Generation Prediction */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-600">
            <Repeat className="w-5 h-5 mr-2" />
            F2 Generation (Breeding F1 × F1)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <p className="text-gray-700 mb-3">If you breed the F1 offspring together, expect genetic segregation:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium mb-2">Color Outcomes (F2)</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Varied phenotype expression expected</li>
                  <li>Some offspring may resemble grandparents</li>
                  <li>Classical Mendelian ratios may appear</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium mb-2">Expected Patterns</h5>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Genetic recombination increases variation</li>
                  <li>Hybrid vigor effects may diminish</li>
                  <li>Individual selection becomes important</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-100 rounded border-l-4 border-yellow-400">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> F2 generation shows increased genetic variation. For consistent traits, consider backcrossing to one of the parent breeds or selecting the best F1 individuals for breeding.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confidence Score */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-800">Prediction Confidence Score</h5>
              <p className="text-sm text-muted-foreground">
                Based on genetic knowledge and breed characteristics
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {formatPercentage(offspring.confidenceScore)}
              </div>
              <Badge 
                variant={offspring.confidenceScore >= 0.8 ? "default" : offspring.confidenceScore >= 0.6 ? "secondary" : "destructive"}
              >
                {offspring.confidenceScore >= 0.8 ? "High" : offspring.confidenceScore >= 0.6 ? "Moderate" : "Low"} Confidence
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
