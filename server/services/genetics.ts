import { Breed, GeneticTrait, PhysicalTraits, ProductionTraits, BehaviorTraits, Pricing } from "@shared/schema";

export interface GeneticCalculation {
  trait: string;
  parentAContribution: string;
  parentBContribution: string;
  dominantExpression: string;
  probability: number;
}

export interface HybridVigor {
  eggProductionBoost: number;
  growthRateBoost: number;
  diseaseResistanceBoost: number;
  feedConversionImprovement: number;
}

export interface CrossPredictionResult {
  physicalTraits: PhysicalTraits;
  productionTraits: ProductionTraits;
  behaviorTraits: BehaviorTraits;
  geneticBreakdown: GeneticCalculation[];
  hybridVigor: HybridVigor;
  estimatedPricing: Pricing;
  confidenceScore: number;
}

export class GeneticsCalculator {
  
  calculateCross(parentA: Breed, parentB: Breed): CrossPredictionResult {
    const geneticBreakdown = this.calculateGeneticTraits(parentA, parentB);
    const physicalTraits = this.predictPhysicalTraits(parentA, parentB, geneticBreakdown);
    const productionTraits = this.predictProductionTraits(parentA, parentB);
    const behaviorTraits = this.predictBehaviorTraits(parentA, parentB);
    const hybridVigor = this.calculateHybridVigor(parentA, parentB);
    const estimatedPricing = this.estimateCrossPricing(parentA, parentB);
    const confidenceScore = this.calculateConfidenceScore(parentA, parentB);

    return {
      physicalTraits,
      productionTraits,
      behaviorTraits,
      geneticBreakdown,
      hybridVigor,
      estimatedPricing,
      confidenceScore
    };
  }

  private calculateGeneticTraits(parentA: Breed, parentB: Breed): GeneticCalculation[] {
    const calculations: GeneticCalculation[] = [];

    // Feather color genetics (E-locus system)
    const colorCalc = this.calculateColorGenetics(parentA, parentB);
    calculations.push(colorCalc);

    // Comb type genetics
    const combCalc = this.calculateCombGenetics(parentA, parentB);
    calculations.push(combCalc);

    // Skin color genetics
    const skinCalc = this.calculateSkinGenetics(parentA, parentB);
    calculations.push(skinCalc);

    // Egg color genetics (if applicable)
    if (parentA.physicalTraits.eggColor !== parentB.physicalTraits.eggColor) {
      const eggCalc = this.calculateEggColorGenetics(parentA, parentB);
      calculations.push(eggCalc);
    }

    // Size genetics
    const sizeCalc = this.calculateSizeGenetics(parentA, parentB);
    calculations.push(sizeCalc);

    return calculations;
  }

  private calculateColorGenetics(parentA: Breed, parentB: Breed): GeneticCalculation {
    // Simplified E-locus genetics
    const aHasExtendedBlack = parentA.physicalTraits.featherColor.toLowerCase().includes('black');
    const bHasExtendedBlack = parentB.physicalTraits.featherColor.toLowerCase().includes('black');

    let dominantExpression: string;
    let probability: number;

    if (aHasExtendedBlack && bHasExtendedBlack) {
      dominantExpression = "Black feathers (homozygous dominant)";
      probability = 1.0;
    } else if (aHasExtendedBlack || bHasExtendedBlack) {
      dominantExpression = "Black feathers (heterozygous)";
      probability = 1.0; // Extended black is dominant
    } else {
      dominantExpression = "Non-black base color expression";
      probability = 1.0;
    }

    return {
      trait: "Feather Color (E-locus)",
      parentAContribution: aHasExtendedBlack ? "E (Extended Black)" : "e+ (Red/Gold base)",
      parentBContribution: bHasExtendedBlack ? "E (Extended Black)" : "e+ (Red/Gold base)",
      dominantExpression,
      probability
    };
  }

  private calculateCombGenetics(parentA: Breed, parentB: Breed): GeneticCalculation {
    const combTypes: Record<string, { rose: boolean; pea: boolean }> = {
      'single': { rose: false, pea: false },
      'rose': { rose: true, pea: false },
      'pea': { rose: false, pea: true },
      'walnut': { rose: true, pea: true },
      'buttercup': { rose: true, pea: false },
      'v-shaped': { rose: false, pea: false }
    };

    const aComb = combTypes[parentA.physicalTraits.combType] || combTypes.single;
    const bComb = combTypes[parentB.physicalTraits.combType] || combTypes.single;

    let dominantExpression: string;
    let probability: number;

    if (aComb.rose && aComb.pea && bComb.rose && bComb.pea) {
      dominantExpression = "Walnut comb (RR PP)";
      probability = 1.0;
    } else if ((aComb.rose || bComb.rose) && (aComb.pea || bComb.pea)) {
      dominantExpression = "Walnut comb (R_ P_)";
      probability = 0.75; // Assuming heterozygous parents
    } else if (aComb.rose || bComb.rose) {
      dominantExpression = "Rose comb (R_ pp)";
      probability = aComb.pea || bComb.pea ? 0.25 : 0.75;
    } else if (aComb.pea || bComb.pea) {
      dominantExpression = "Pea comb (rr P_)";
      probability = 0.75;
    } else {
      dominantExpression = "Single comb (rr pp)";
      probability = 1.0;
    }

    return {
      trait: "Comb Type",
      parentAContribution: `${aComb.rose ? 'R' : 'r'}${aComb.pea ? 'P' : 'p'}`,
      parentBContribution: `${bComb.rose ? 'R' : 'r'}${bComb.pea ? 'P' : 'p'}`,
      dominantExpression,
      probability
    };
  }

  private calculateSkinGenetics(parentA: Breed, parentB: Breed): GeneticCalculation {
    const aYellow = parentA.physicalTraits.skinColor.toLowerCase().includes('yellow');
    const bYellow = parentB.physicalTraits.skinColor.toLowerCase().includes('yellow');

    let dominantExpression: string;
    let probability: number;

    if (aYellow && bYellow) {
      dominantExpression = "Yellow skin (dominant)";
      probability = 1.0;
    } else if (aYellow || bYellow) {
      dominantExpression = "Yellow skin (heterozygous)";
      probability = 1.0; // Yellow is dominant
    } else {
      dominantExpression = "White skin (recessive)";
      probability = 1.0;
    }

    return {
      trait: "Skin Color",
      parentAContribution: aYellow ? "Y (Yellow)" : "y (White)",
      parentBContribution: bYellow ? "Y (Yellow)" : "y (White)",
      dominantExpression,
      probability
    };
  }

  private calculateEggColorGenetics(parentA: Breed, parentB: Breed): GeneticCalculation {
    const eggColors = {
      'white': 0,
      'brown': 1,
      'blue': 2,
      'green': 3,
      'olive': 3,
      'dark brown': 2,
      'chocolate': 2
    };

    const aColor = this.getEggColorScore(parentA.physicalTraits.eggColor);
    const bColor = this.getEggColorScore(parentB.physicalTraits.eggColor);

    let dominantExpression: string;
    
    if (aColor >= 2 || bColor >= 2) {
      if (aColor === 2 && bColor === 1 || aColor === 1 && bColor === 2) {
        dominantExpression = "Green/olive eggs (blue + brown)";
      } else if (Math.max(aColor, bColor) === 2) {
        dominantExpression = "Blue egg expression (dominant over white/brown)";
      } else {
        dominantExpression = "Brown egg expression";
      }
    } else if (aColor === 1 || bColor === 1) {
      dominantExpression = "Brown egg expression (dominant over white)";
    } else {
      dominantExpression = "White eggs";
    }

    return {
      trait: "Egg Color",
      parentAContribution: this.getEggColorGenotype(parentA.physicalTraits.eggColor),
      parentBContribution: this.getEggColorGenotype(parentB.physicalTraits.eggColor),
      dominantExpression,
      probability: 0.75
    };
  }

  private getEggColorScore(color: string): number {
    const lowerColor = color.toLowerCase();
    if (lowerColor.includes('blue')) return 2;
    if (lowerColor.includes('green') || lowerColor.includes('olive')) return 3;
    if (lowerColor.includes('brown') || lowerColor.includes('chocolate')) return 1;
    return 0; // white
  }

  private getEggColorGenotype(color: string): string {
    const lowerColor = color.toLowerCase();
    if (lowerColor.includes('blue')) return "O (Blue)";
    if (lowerColor.includes('brown')) return "Br (Brown)";
    if (lowerColor.includes('green')) return "O + Br (Blue + Brown)";
    return "o (White)";
  }

  private calculateSizeGenetics(parentA: Breed, parentB: Breed): GeneticCalculation {
    const sizeValues = { 'small': 1, 'medium': 2, 'large': 3, 'giant': 4 };
    const aSize = sizeValues[parentA.physicalTraits.bodySize];
    const bSize = sizeValues[parentB.physicalTraits.bodySize];
    const avgSize = (aSize + bSize) / 2;

    let dominantExpression: string;
    if (avgSize <= 1.5) dominantExpression = "Small body size";
    else if (avgSize <= 2.5) dominantExpression = "Medium body size";
    else if (avgSize <= 3.5) dominantExpression = "Large body size";
    else dominantExpression = "Giant body size";

    return {
      trait: "Body Size",
      parentAContribution: `${parentA.physicalTraits.bodySize} (${aSize})`,
      parentBContribution: `${parentB.physicalTraits.bodySize} (${bSize})`,
      dominantExpression,
      probability: 0.8
    };
  }

  private predictPhysicalTraits(parentA: Breed, parentB: Breed, genetics: GeneticCalculation[]): PhysicalTraits {
    // Extract predictions from genetic calculations
    const colorCalc = genetics.find(g => g.trait.includes('Color'));
    const combCalc = genetics.find(g => g.trait === 'Comb Type');
    const skinCalc = genetics.find(g => g.trait === 'Skin Color');
    const sizeCalc = genetics.find(g => g.trait === 'Body Size');

    // Predict feather color
    let featherColor = "Variable expression";
    if (colorCalc?.dominantExpression.includes('Black')) {
      featherColor = "Black with possible secondary colors";
    } else {
      featherColor = "Mixed red/gold base with variable patterns";
    }

    // Predict comb type
    let combType: any = 'single';
    if (combCalc?.dominantExpression.includes('Walnut')) combType = 'walnut';
    else if (combCalc?.dominantExpression.includes('Rose')) combType = 'rose';
    else if (combCalc?.dominantExpression.includes('Pea')) combType = 'pea';

    // Predict other traits
    const legColor = this.blendColors(parentA.physicalTraits.legColor, parentB.physicalTraits.legColor);
    const skinColor = skinCalc?.dominantExpression.includes('Yellow') ? "Yellow" : "White";
    const eggColor = this.predictEggColor(parentA, parentB);

    return {
      featherColor,
      combType,
      bodySize: sizeCalc?.dominantExpression.includes('Large') ? 'large' : 
                sizeCalc?.dominantExpression.includes('Medium') ? 'medium' : 
                sizeCalc?.dominantExpression.includes('Giant') ? 'giant' : 'medium',
      legColor,
      skinColor,
      eggColor,
      pattern: "Variable hybrid expression"
    };
  }

  private blendColors(colorA: string, colorB: string): string {
    if (colorA === colorB) return colorA;
    if (colorA.toLowerCase().includes('yellow') || colorB.toLowerCase().includes('yellow')) {
      return "Yellow to light yellow";
    }
    return "Intermediate coloring";
  }

  private predictEggColor(parentA: Breed, parentB: Breed): string {
    const aColor = parentA.physicalTraits.eggColor.toLowerCase();
    const bColor = parentB.physicalTraits.eggColor.toLowerCase();

    if (aColor.includes('blue') && bColor.includes('brown') || 
        aColor.includes('brown') && bColor.includes('blue')) {
      return "Green to olive";
    }
    if (aColor.includes('blue') || bColor.includes('blue')) {
      return "Blue to light blue";
    }
    if (aColor.includes('brown') || bColor.includes('brown')) {
      return "Light to medium brown";
    }
    return "White to cream";
  }

  private predictProductionTraits(parentA: Breed, parentB: Breed): ProductionTraits {
    // Calculate averages with hybrid vigor
    const eggProdMin = Math.round((parentA.productionTraits.eggProductionMin + parentB.productionTraits.eggProductionMin) / 2 * 1.15);
    const eggProdMax = Math.round((parentA.productionTraits.eggProductionMax + parentB.productionTraits.eggProductionMax) / 2 * 1.15);
    
    return {
      eggProductionMin: eggProdMin,
      eggProductionMax: eggProdMax,
      eggSizeOz: (parentA.productionTraits.eggSizeOz + parentB.productionTraits.eggSizeOz) / 2,
      meatWeight: (parentA.productionTraits.meatWeight + parentB.productionTraits.meatWeight) / 2,
      feedConversion: (parentA.productionTraits.feedConversion + parentB.productionTraits.feedConversion) / 2 * 0.9, // Improved efficiency
      broodiness: this.averageBroodiness(parentA.productionTraits.broodiness, parentB.productionTraits.broodiness),
      maturityWeeks: Math.round((parentA.productionTraits.maturityWeeks + parentB.productionTraits.maturityWeeks) / 2 * 0.95) // Faster maturity
    };
  }

  private averageBroodiness(a: string, b: string): 'low' | 'moderate' | 'high' {
    const values = { low: 1, moderate: 2, high: 3 };
    const avg = (values[a as keyof typeof values] + values[b as keyof typeof values]) / 2;
    if (avg <= 1.5) return 'low';
    if (avg <= 2.5) return 'moderate';
    return 'high';
  }

  private predictBehaviorTraits(parentA: Breed, parentB: Breed): BehaviorTraits {
    return {
      temperament: this.averageTemperament(parentA.behaviorTraits.temperament, parentB.behaviorTraits.temperament),
      coldHardiness: Math.round((parentA.behaviorTraits.coldHardiness + parentB.behaviorTraits.coldHardiness) / 2),
      heatTolerance: Math.round((parentA.behaviorTraits.heatTolerance + parentB.behaviorTraits.heatTolerance) / 2),
      foraging: this.averageForaging(parentA.behaviorTraits.foraging, parentB.behaviorTraits.foraging),
      confinementTolerance: this.averageConfinement(parentA.behaviorTraits.confinementTolerance, parentB.behaviorTraits.confinementTolerance),
      diseaseResistance: Math.min(5, Math.round((parentA.behaviorTraits.diseaseResistance + parentB.behaviorTraits.diseaseResistance) / 2 * 1.1)) // Hybrid vigor
    };
  }

  private averageTemperament(a: string, b: string): 'docile' | 'calm' | 'active' | 'aggressive' | 'flighty' {
    const values = { docile: 1, calm: 2, active: 3, aggressive: 4, flighty: 5 };
    const avg = (values[a as keyof typeof values] + values[b as keyof typeof values]) / 2;
    if (avg <= 1.5) return 'docile';
    if (avg <= 2.5) return 'calm';
    if (avg <= 3.5) return 'active';
    if (avg <= 4.5) return 'aggressive';
    return 'flighty';
  }

  private averageForaging(a: string, b: string): 'poor' | 'moderate' | 'excellent' {
    const values = { poor: 1, moderate: 2, excellent: 3 };
    const avg = (values[a as keyof typeof values] + values[b as keyof typeof values]) / 2;
    if (avg <= 1.5) return 'poor';
    if (avg <= 2.5) return 'moderate';
    return 'excellent';
  }

  private averageConfinement(a: string, b: string): 'poor' | 'moderate' | 'excellent' {
    const values = { poor: 1, moderate: 2, excellent: 3 };
    const avg = (values[a as keyof typeof values] + values[b as keyof typeof values]) / 2;
    if (avg <= 1.5) return 'poor';
    if (avg <= 2.5) return 'moderate';
    return 'excellent';
  }

  private calculateHybridVigor(parentA: Breed, parentB: Breed): HybridVigor {
    // Calculate genetic distance as basis for hybrid vigor
    const geneticDistance = this.calculateGeneticDistance(parentA, parentB);
    
    return {
      eggProductionBoost: Math.min(0.25, geneticDistance * 0.15), // Up to 25% boost
      growthRateBoost: Math.min(0.20, geneticDistance * 0.12), // Up to 20% boost
      diseaseResistanceBoost: Math.min(0.30, geneticDistance * 0.18), // Up to 30% boost
      feedConversionImprovement: Math.min(0.15, geneticDistance * 0.10) // Up to 15% improvement
    };
  }

  private calculateGeneticDistance(parentA: Breed, parentB: Breed): number {
    let distance = 0;
    
    // Compare origins
    if (parentA.origin !== parentB.origin) distance += 0.3;
    
    // Compare categories
    if (parentA.category !== parentB.category) distance += 0.2;
    
    // Compare physical traits
    if (parentA.physicalTraits.combType !== parentB.physicalTraits.combType) distance += 0.1;
    if (parentA.physicalTraits.bodySize !== parentB.physicalTraits.bodySize) distance += 0.1;
    if (parentA.physicalTraits.featherColor !== parentB.physicalTraits.featherColor) distance += 0.1;
    
    // Compare production differences
    const eggDiff = Math.abs(parentA.productionTraits.eggProductionMin - parentB.productionTraits.eggProductionMin);
    distance += Math.min(0.2, eggDiff / 1000); // Normalize egg production difference
    
    return Math.min(1.0, distance); // Cap at 1.0
  }

  private estimateCrossPricing(parentA: Breed, parentB: Breed): Pricing {
    // Cross pricing is typically lower than purebreds but varies by production value
    const avgDayOld = (parentA.pricing.dayOldChickMin + parentB.pricing.dayOldChickMin) / 2 * 0.7;
    const avgPullet = (parentA.pricing.startedPulletMin + parentB.pricing.startedPulletMin) / 2 * 0.8;
    const avgBreeding = (parentA.pricing.breedingQualityMin + parentB.pricing.breedingQualityMin) / 2 * 0.6;

    return {
      dayOldChickMin: Math.round(avgDayOld),
      dayOldChickMax: Math.round(avgDayOld * 1.5),
      startedPulletMin: Math.round(avgPullet),
      startedPulletMax: Math.round(avgPullet * 1.3),
      breedingQualityMin: Math.round(avgBreeding),
      breedingQualityMax: Math.round(avgBreeding * 1.5),
      rarityPremium: 0.8 // Crosses are less rare than pure breeds
    };
  }

  private calculateConfidenceScore(parentA: Breed, parentB: Breed): number {
    let confidence = 0.8; // Base confidence
    
    // Higher confidence for well-established breeds
    if (parentA.conservationStatus === 'common') confidence += 0.1;
    if (parentB.conservationStatus === 'common') confidence += 0.1;
    
    // Lower confidence for exotic breeds
    if (parentA.isExotic || parentB.isExotic) confidence -= 0.2;
    
    // Higher confidence for similar breed types
    if (parentA.category === parentB.category) confidence += 0.1;
    
    return Math.min(1.0, Math.max(0.3, confidence));
  }
}
