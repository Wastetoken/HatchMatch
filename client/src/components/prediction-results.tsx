import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  Dna, 
  BarChart3, 
  DollarSign, 
  Thermometer, 
  Heart, 
  Shield, 
  Calendar,
  TrendingUp,
  Grid,
  Book,
  Repeat,
  Target,
  Calculator,
  ShoppingCart
} from "lucide-react";
import { CrossCalculationResponse } from "@shared/schema";
import GeneticsCalculator from "./genetics-calculator";
import { formatCurrency, getTraitColor, formatPercentage } from "@/lib/genetics";

interface PredictionResultsProps {
  prediction: CrossCalculationResponse;
}

export default function PredictionResults({ prediction }: PredictionResultsProps) {
  const [activeTab, setActiveTab] = useState("visual");

  if (!prediction.success || !prediction.prediction) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No prediction data available</p>
        </CardContent>
      </Card>
    );
  }

  const { parentA, parentB, offspring } = prediction.prediction;

  return (
    <Card className="overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-border">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="visual" 
              className="flex items-center space-x-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Eye className="w-4 h-4" />
              <span>Visual Prediction</span>
            </TabsTrigger>
            <TabsTrigger 
              value="genetics" 
              className="flex items-center space-x-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <Dna className="w-4 h-4" />
              <span>Genetics Breakdown</span>
            </TabsTrigger>
            <TabsTrigger 
              value="traits" 
              className="flex items-center space-x-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Trait Analysis</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pricing" 
              className="flex items-center space-x-2 py-4 px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              <DollarSign className="w-4 h-4" />
              <span>Pricing Data</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="visual" className="mt-0 space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Predicted Offspring Appearance</h3>
              <p className="text-muted-foreground">Visual prediction based on genetic inheritance patterns</p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Parent A Visual */}
              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-4">Parent A (Rooster)</h4>
                <div className="prediction-visual mb-4">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-400"
                      style={{ 
                        backgroundColor: getTraitColor(parentA.physicalTraits.featherColor)
                      }}
                    ></div>
                    <p className="text-sm font-medium text-gray-600">{parentA.name}</p>
                    <p className="text-xs text-gray-500">{parentA.physicalTraits.featherColor}</p>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Comb:</span>
                    <span className="font-medium capitalize">{parentA.physicalTraits.combType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium capitalize">{parentA.physicalTraits.bodySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color:</span>
                    <span className="font-medium">{parentA.physicalTraits.featherColor}</span>
                  </div>
                </div>
              </div>

              {/* Offspring Prediction */}
              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-4">Predicted Offspring</h4>
                <div className="prediction-visual active mb-4">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-accent"
                      style={{ 
                        background: `linear-gradient(45deg, ${getTraitColor(parentA.physicalTraits.featherColor)}, ${getTraitColor(parentB.physicalTraits.featherColor)})`
                      }}
                    ></div>
                    <p className="text-sm font-medium text-gray-700">F1 Cross</p>
                    <p className="text-xs text-gray-600">{offspring.physicalTraits.featherColor}</p>
                  </div>
                </div>
                <div className="bg-accent/10 p-3 rounded-lg text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span className="font-medium">{formatPercentage(offspring.confidenceScore)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium capitalize">{offspring.physicalTraits.bodySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hybrid Vigor:</span>
                    <span className="font-medium text-success">Expected</span>
                  </div>
                </div>
              </div>

              {/* Parent B Visual */}
              <div className="text-center">
                <h4 className="font-medium text-gray-700 mb-4">Parent B (Hen)</h4>
                <div className="prediction-visual mb-4">
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-gray-400"
                      style={{ 
                        backgroundColor: getTraitColor(parentB.physicalTraits.featherColor)
                      }}
                    ></div>
                    <p className="text-sm font-medium text-gray-600">{parentB.name}</p>
                    <p className="text-xs text-gray-500">{parentB.physicalTraits.featherColor}</p>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Comb:</span>
                    <span className="font-medium capitalize">{parentB.physicalTraits.combType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium capitalize">{parentB.physicalTraits.bodySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color:</span>
                    <span className="font-medium">{parentB.physicalTraits.featherColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Appearance Breakdown */}
            <div className="bg-muted rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">Detailed Appearance Breakdown</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Physical Characteristics</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Feather Pattern:</span>
                      <span className="font-medium">{offspring.physicalTraits.pattern || "Variable expression"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Comb Type:</span>
                      <span className="font-medium capitalize">{offspring.physicalTraits.combType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Leg Color:</span>
                      <span className="font-medium">{offspring.physicalTraits.legColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skin Color:</span>
                      <span className="font-medium">{offspring.physicalTraits.skinColor}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Size & Production</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Adult Weight:</span>
                      <span className="font-medium">{offspring.productionTraits.meatWeight} lbs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Egg Production:</span>
                      <span className="font-medium">
                        {offspring.productionTraits.eggProductionMin}-{offspring.productionTraits.eggProductionMax} eggs/year
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Egg Color:</span>
                      <span className="font-medium">{offspring.physicalTraits.eggColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth Rate:</span>
                      <span className="font-medium text-success">
                        Enhanced (+{formatPercentage(offspring.hybridVigor.growthRateBoost)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="genetics" className="mt-0">
            <GeneticsCalculator 
              parentA={parentA}
              parentB={parentB}
              offspring={offspring}
            />
          </TabsContent>

          <TabsContent value="traits" className="mt-0 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Comprehensive Trait Analysis</h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Production Traits */}
              <div className="space-y-6">
                <Card className="bg-success/5 border-success/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-success">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Production Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Egg Production (Annual)</span>
                        <span className="text-sm text-muted-foreground">
                          {offspring.productionTraits.eggProductionMin}-{offspring.productionTraits.eggProductionMax} eggs
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(100, (offspring.productionTraits.eggProductionMax / 350) * 100)} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Expected hybrid vigor: +{formatPercentage(offspring.hybridVigor.eggProductionBoost)}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Feed Conversion</span>
                        <span className="text-sm text-muted-foreground">
                          {offspring.productionTraits.feedConversion.toFixed(1)}:1
                        </span>
                      </div>
                      <Progress 
                        value={Math.max(0, 100 - ((offspring.productionTraits.feedConversion - 2) * 50))} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Improvement: +{formatPercentage(offspring.hybridVigor.feedConversionImprovement)}
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Growth Rate</span>
                        <span className="text-sm text-muted-foreground">Enhanced</span>
                      </div>
                      <Progress value={80} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Faster than either parent breed
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600">
                      <Thermometer className="w-5 h-5 mr-2" />
                      Climate Adaptability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cold Hardiness</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < offspring.behaviorTraits.coldHardiness 
                                ? 'bg-blue-500' 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Heat Tolerance</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < offspring.behaviorTraits.heatTolerance 
                                ? 'bg-orange-500' 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Hardiness</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < Math.round((offspring.behaviorTraits.coldHardiness + offspring.behaviorTraits.heatTolerance) / 2)
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Behavioral & Health Traits */}
              <div className="space-y-6">
                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-600">
                      <Heart className="w-5 h-5 mr-2" />
                      Temperament & Behavior
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Docility</span>
                      <Badge 
                        variant={offspring.behaviorTraits.temperament === 'docile' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {offspring.behaviorTraits.temperament}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Foraging Ability</span>
                      <Badge 
                        variant={offspring.behaviorTraits.foraging === 'excellent' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {offspring.behaviorTraits.foraging}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Broodiness</span>
                      <Badge 
                        variant="outline"
                        className="capitalize"
                      >
                        {offspring.productionTraits.broodiness}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Confinement Tolerance</span>
                      <Badge 
                        variant={offspring.behaviorTraits.confinementTolerance === 'excellent' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {offspring.behaviorTraits.confinementTolerance}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-600">
                      <Shield className="w-5 h-5 mr-2" />
                      Health & Disease Resistance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Overall Hardiness</span>
                      <Badge variant="default" className="bg-success">
                        Excellent
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Disease Resistance</span>
                      <Badge variant="default" className="bg-success">
                        Enhanced (+{formatPercentage(offspring.hybridVigor.diseaseResistanceBoost)})
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Immune System</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < offspring.behaviorTraits.diseaseResistance 
                                ? 'bg-green-500' 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="flex items-center text-muted-foreground">
                      <Calendar className="w-5 h-5 mr-2" />
                      Timeline & Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>First Egg:</span>
                      <span className="font-medium">{offspring.productionTraits.maturityWeeks - 2}-{offspring.productionTraits.maturityWeeks} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Production:</span>
                      <span className="font-medium">{offspring.productionTraits.maturityWeeks + 2}-{offspring.productionTraits.maturityWeeks + 6} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Adult Weight:</span>
                      <span className="font-medium">{Math.round(offspring.productionTraits.maturityWeeks * 0.7)}-{offspring.productionTraits.maturityWeeks} weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Weight:</span>
                      <span className="font-medium">{Math.round(offspring.productionTraits.maturityWeeks * 0.4)}-{Math.round(offspring.productionTraits.maturityWeeks * 0.6)} weeks</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="mt-0 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Market Pricing & Economic Analysis</h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Current Market Prices */}
              <div className="space-y-6">
                <Card className="bg-success/5 border-success/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-success">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Parent Breed Pricing (2024)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-success/20">
                      <h5 className="font-medium text-gray-800 mb-2">{parentA.name} (Parent A)</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Day-old chicks:</p>
                          <p className="font-semibold text-success">
                            {formatCurrency(parentA.pricing.dayOldChickMin)}-{formatCurrency(parentA.pricing.dayOldChickMax)} each
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Started pullets:</p>
                          <p className="font-semibold text-success">
                            {formatCurrency(parentA.pricing.startedPulletMin)}-{formatCurrency(parentA.pricing.startedPulletMax)} each
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Breeding quality:</p>
                          <p className="font-semibold text-success">
                            {formatCurrency(parentA.pricing.breedingQualityMin)}-{formatCurrency(parentA.pricing.breedingQualityMax)} each
                          </p>
                        </div>
                        {parentA.pricing.showQualityMin && (
                          <div>
                            <p className="text-muted-foreground">Show quality:</p>
                            <p className="font-semibold text-success">
                              {formatCurrency(parentA.pricing.showQualityMin)}-{formatCurrency(parentA.pricing.showQualityMax || 0)} each
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border border-success/20">
                      <h5 className="font-medium text-gray-800 mb-2">{parentB.name} (Parent B)</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Day-old chicks:</p>
                          <p className="font-semibold text-success">
                            {formatCurrency(parentB.pricing.dayOldChickMin)}-{formatCurrency(parentB.pricing.dayOldChickMax)} each
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Started pullets:</p>
                          <p className="font-semibold text-success">
                            {formatCurrency(parentB.pricing.startedPulletMin)}-{formatCurrency(parentB.pricing.startedPulletMax)} each
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Breeding quality:</p>
                          <p className="font-semibold text-success">
                            {formatCurrency(parentB.pricing.breedingQualityMin)}-{formatCurrency(parentB.pricing.breedingQualityMax)} each
                          </p>
                        </div>
                        {parentB.pricing.showQualityMin && (
                          <div>
                            <p className="text-muted-foreground">Show quality:</p>
                            <p className="font-semibold text-success">
                              {formatCurrency(parentB.pricing.showQualityMin)}-{formatCurrency(parentB.pricing.showQualityMax || 0)} each
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-blue-600">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Market Trends & Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span>Spring Premium (Mar-May):</span>
                      <span className="font-medium text-blue-700">+15-25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fall Discount (Sep-Nov):</span>
                      <span className="font-medium text-success">-10-20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping Costs:</span>
                      <span className="font-medium">$25-45 per order</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Minimum Orders:</span>
                      <span className="font-medium">6-25 chicks</span>
                    </div>
                    
                    <div className="mt-4 p-3 bg-white rounded border-l-4 border-blue-400">
                      <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> Prices vary significantly by hatchery reputation, vaccination status, and regional availability. Premium bloodlines command 200-500% markup.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cross Value Analysis */}
              <div className="space-y-6">
                <Card className="bg-accent/10 border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-accent">
                      <Target className="w-5 h-5 mr-2" />
                      Predicted Cross Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-orange-200">
                      <h5 className="font-medium text-gray-800 mb-2">F1 Cross Pricing Estimate</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Day-old chicks:</p>
                          <p className="font-semibold text-accent">
                            {formatCurrency(offspring.estimatedPricing.dayOldChickMin)}-{formatCurrency(offspring.estimatedPricing.dayOldChickMax)} each
                          </p>
                          <p className="text-xs text-muted-foreground">Lower due to hybrid status</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Started pullets:</p>
                          <p className="font-semibold text-accent">
                            {formatCurrency(offspring.estimatedPricing.startedPulletMin)}-{formatCurrency(offspring.estimatedPricing.startedPulletMax)} each
                          </p>
                          <p className="text-xs text-muted-foreground">Production value</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Production birds:</p>
                          <p className="font-semibold text-accent">
                            {formatCurrency(offspring.estimatedPricing.breedingQualityMin)}-{formatCurrency(offspring.estimatedPricing.breedingQualityMax)} each
                          </p>
                          <p className="text-xs text-muted-foreground">High egg production</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Meat birds:</p>
                          <p className="font-semibold text-accent">
                            {formatCurrency(Math.round(offspring.estimatedPricing.breedingQualityMin * 0.6))}-{formatCurrency(Math.round(offspring.estimatedPricing.breedingQualityMax * 0.6))} each
                          </p>
                          <p className="text-xs text-muted-foreground">Processing weight</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 rounded border-l-4 border-yellow-400 p-4">
                      <h6 className="font-medium text-gray-800 mb-2">Value Proposition</h6>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Enhanced egg production (+{formatPercentage(offspring.hybridVigor.eggProductionBoost)})</li>
                        <li>• Superior feed conversion</li>
                        <li>• Improved disease resistance</li>
                        <li>• Better climate adaptability</li>
                        <li>• Faster growth to market weight</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="flex items-center text-muted-foreground">
                      <Calculator className="w-5 h-5 mr-2" />
                      Economic Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="bg-white rounded border p-3">
                      <h6 className="font-medium mb-2">Cost of Production (Per Bird)</h6>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Initial chick cost:</span>
                          <span>{formatCurrency((offspring.estimatedPricing.dayOldChickMin + offspring.estimatedPricing.dayOldChickMax) / 2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Feed to lay ({offspring.productionTraits.maturityWeeks} weeks):</span>
                          <span>{formatCurrency(offspring.productionTraits.maturityWeeks * 0.6)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Healthcare & misc:</span>
                          <span>$2.00</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total cost to production:</span>
                          <span>{formatCurrency(((offspring.estimatedPricing.dayOldChickMin + offspring.estimatedPricing.dayOldChickMax) / 2) + (offspring.productionTraits.maturityWeeks * 0.6) + 2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded border p-3">
                      <h6 className="font-medium mb-2">Annual Revenue Potential</h6>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Eggs/year (avg {Math.round((offspring.productionTraits.eggProductionMin + offspring.productionTraits.eggProductionMax) / 2)}):</span>
                          <span>{formatCurrency(Math.round((offspring.productionTraits.eggProductionMin + offspring.productionTraits.eggProductionMax) / 2) * 0.30)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meat value ({offspring.productionTraits.meatWeight} lbs):</span>
                          <span>{formatCurrency(offspring.productionTraits.meatWeight * 7)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium text-success">
                          <span>ROI (Year 1):</span>
                          <span>
                            {Math.round((((Math.round((offspring.productionTraits.eggProductionMin + offspring.productionTraits.eggProductionMax) / 2) * 0.30) + (offspring.productionTraits.meatWeight * 7)) / (((offspring.estimatedPricing.dayOldChickMin + offspring.estimatedPricing.dayOldChickMax) / 2) + (offspring.productionTraits.maturityWeeks * 0.6) + 2) - 1) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-600">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Where to Purchase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="bg-white rounded border p-3">
                      <h6 className="font-medium text-gray-800">Recommended Hatcheries</h6>
                      <ul className="mt-2 space-y-1 text-muted-foreground">
                        <li>• <strong>Cackle Hatchery:</strong> Wide breed selection, good pricing</li>
                        <li>• <strong>Murray McMurray:</strong> Quality birds, established reputation</li>
                        <li>• <strong>Meyer Hatchery:</strong> Specialty breeds, good health guarantee</li>
                        <li>• <strong>Hoover's Hatchery:</strong> Competitive pricing, quick shipping</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded border p-3">
                      <h6 className="font-medium text-gray-800">Local Options</h6>
                      <ul className="mt-2 space-y-1 text-muted-foreground">
                        <li>• Farm stores (spring season)</li>
                        <li>• Local breeders (check poultry clubs)</li>
                        <li>• Auction barns (variable quality)</li>
                        <li>• Online marketplaces (verify seller)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
