import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Genetic traits schema
export const geneticTraitSchema = z.object({
  gene: z.string(),
  allele1: z.string(),
  allele2: z.string(),
  dominance: z.enum(['dominant', 'recessive', 'codominant', 'incomplete']),
  expression: z.string()
});

// Physical characteristics schema
export const physicalTraitsSchema = z.object({
  featherColor: z.string(),
  combType: z.enum(['single', 'rose', 'pea', 'walnut', 'buttercup', 'v-shaped']),
  bodySize: z.enum(['small', 'medium', 'large', 'giant']),
  legColor: z.string(),
  skinColor: z.string(),
  eggColor: z.string(),
  pattern: z.string().optional()
});

// Production traits schema
export const productionTraitsSchema = z.object({
  eggProductionMin: z.number(),
  eggProductionMax: z.number(),
  eggSizeOz: z.number(),
  meatWeight: z.number(),
  feedConversion: z.number(),
  broodiness: z.enum(['low', 'moderate', 'high']),
  maturityWeeks: z.number()
});

// Climate and behavior schema
export const behaviorTraitsSchema = z.object({
  temperament: z.enum(['docile', 'calm', 'active', 'aggressive', 'flighty']),
  coldHardiness: z.number().min(1).max(5),
  heatTolerance: z.number().min(1).max(5),
  foraging: z.enum(['poor', 'moderate', 'excellent']),
  confinementTolerance: z.enum(['poor', 'moderate', 'excellent']),
  diseaseResistance: z.number().min(1).max(5)
});

// Pricing schema
export const pricingSchema = z.object({
  dayOldChickMin: z.number(),
  dayOldChickMax: z.number(),
  startedPulletMin: z.number(),
  startedPulletMax: z.number(),
  breedingQualityMin: z.number(),
  breedingQualityMax: z.number(),
  showQualityMin: z.number().optional(),
  showQualityMax: z.number().optional(),
  rarityPremium: z.number().default(1.0)
});

// Main breed schema
export const breeds = pgTable("breeds", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // 'layer', 'dual-purpose', 'meat', 'ornamental', 'exotic'
  origin: text("origin").notNull(),
  description: text("description").notNull(),
  conservationStatus: text("conservation_status"), // 'common', 'watch', 'threatened', 'critical'
  physicalTraits: jsonb("physical_traits").$type<z.infer<typeof physicalTraitsSchema>>().notNull(),
  productionTraits: jsonb("production_traits").$type<z.infer<typeof productionTraitsSchema>>().notNull(),
  behaviorTraits: jsonb("behavior_traits").$type<z.infer<typeof behaviorTraitsSchema>>().notNull(),
  geneticTraits: jsonb("genetic_traits").$type<z.infer<typeof geneticTraitSchema>[]>().notNull(),
  pricing: jsonb("pricing").$type<z.infer<typeof pricingSchema>>().notNull(),
  imageUrl: text("image_url"),
  isExotic: boolean("is_exotic").default(false)
});

// Cross prediction schema
export const crossPredictions = pgTable("cross_predictions", {
  id: varchar("id").primaryKey(),
  parentAId: varchar("parent_a_id").references(() => breeds.id).notNull(),
  parentBId: varchar("parent_b_id").references(() => breeds.id).notNull(),
  predictedTraits: jsonb("predicted_traits").$type<{
    physical: z.infer<typeof physicalTraitsSchema>;
    production: z.infer<typeof productionTraitsSchema>;
    behavior: z.infer<typeof behaviorTraitsSchema>;
    genetics: z.infer<typeof geneticTraitSchema>[];
    probabilities: Record<string, number>;
    hybridVigor: {
      eggProductionBoost: number;
      growthRateBoost: number;
      diseaseResistanceBoost: number;
    };
  }>().notNull(),
  estimatedPricing: jsonb("estimated_pricing").$type<z.infer<typeof pricingSchema>>().notNull(),
  confidenceScore: real("confidence_score").notNull()
});

// Insert schemas
export const insertBreedSchema = createInsertSchema(breeds).omit({
  id: true
});

export const insertCrossPredictionSchema = createInsertSchema(crossPredictions).omit({
  id: true
});

// Types
export type Breed = typeof breeds.$inferSelect;
export type InsertBreed = z.infer<typeof insertBreedSchema>;
export type CrossPrediction = typeof crossPredictions.$inferSelect;
export type InsertCrossPrediction = z.infer<typeof insertCrossPredictionSchema>;
export type PhysicalTraits = z.infer<typeof physicalTraitsSchema>;
export type ProductionTraits = z.infer<typeof productionTraitsSchema>;
export type BehaviorTraits = z.infer<typeof behaviorTraitsSchema>;
export type GeneticTrait = z.infer<typeof geneticTraitSchema>;
export type Pricing = z.infer<typeof pricingSchema>;

// Cross calculation request/response schemas
export const crossCalculationRequestSchema = z.object({
  parentAId: z.string(),
  parentBId: z.string()
});

export const crossCalculationResponseSchema = z.object({
  success: z.boolean(),
  prediction: z.object({
    parentA: z.object({
      id: z.string(),
      name: z.string(),
      physicalTraits: physicalTraitsSchema,
      pricing: pricingSchema
    }),
    parentB: z.object({
      id: z.string(),
      name: z.string(),
      physicalTraits: physicalTraitsSchema,
      pricing: pricingSchema
    }),
    offspring: z.object({
      physicalTraits: physicalTraitsSchema,
      productionTraits: productionTraitsSchema,
      behaviorTraits: behaviorTraitsSchema,
      geneticBreakdown: z.array(z.object({
        trait: z.string(),
        parentAContribution: z.string(),
        parentBContribution: z.string(),
        dominantExpression: z.string(),
        probability: z.number()
      })),
      hybridVigor: z.object({
        eggProductionBoost: z.number(),
        growthRateBoost: z.number(),
        diseaseResistanceBoost: z.number(),
        feedConversionImprovement: z.number()
      }),
      estimatedPricing: pricingSchema,
      confidenceScore: z.number()
    })
  }).optional(),
  error: z.string().optional()
});

export type CrossCalculationRequest = z.infer<typeof crossCalculationRequestSchema>;
export type CrossCalculationResponse = z.infer<typeof crossCalculationResponseSchema>;
