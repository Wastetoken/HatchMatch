import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GeneticsCalculator } from "./services/genetics";
import { crossCalculationRequestSchema, type CrossCalculationResponse } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const geneticsCalculator = new GeneticsCalculator();

  // Get all breeds
  app.get("/api/breeds", async (req, res) => {
    try {
      const breeds = await storage.getAllBreeds();
      res.json(breeds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch breeds" });
    }
  });

  // Search breeds
  app.get("/api/breeds/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const breeds = await storage.searchBreeds(query);
      res.json(breeds);
    } catch (error) {
      res.status(500).json({ error: "Failed to search breeds" });
    }
  });

  // Get breeds by category
  app.get("/api/breeds/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const breeds = await storage.getBreedsByCategory(category);
      res.json(breeds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch breeds by category" });
    }
  });

  // Get single breed
  app.get("/api/breeds/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const breed = await storage.getBreedById(id);
      
      if (!breed) {
        return res.status(404).json({ error: "Breed not found" });
      }
      
      res.json(breed);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch breed" });
    }
  });

  // Calculate cross prediction
  app.post("/api/crosses/calculate", async (req, res) => {
    try {
      const validatedData = crossCalculationRequestSchema.parse(req.body);
      const { parentAId, parentBId } = validatedData;

      // Check if prediction already exists
      let prediction = await storage.getCrossPrediction(parentAId, parentBId);
      
      if (!prediction) {
        // Get parent breeds
        const parentA = await storage.getBreedById(parentAId);
        const parentB = await storage.getBreedById(parentBId);

        if (!parentA || !parentB) {
          return res.status(404).json({ 
            success: false, 
            error: "One or both parent breeds not found" 
          });
        }

        // Calculate cross prediction
        const crossResult = geneticsCalculator.calculateCross(parentA, parentB);

        // Save prediction
        prediction = await storage.saveCrossPrediction({
          parentAId,
          parentBId,
          predictedTraits: {
            physical: crossResult.physicalTraits,
            production: crossResult.productionTraits,
            behavior: crossResult.behaviorTraits,
            genetics: [], // Simplified for storage
            probabilities: {},
            hybridVigor: crossResult.hybridVigor
          },
          estimatedPricing: crossResult.estimatedPricing,
          confidenceScore: crossResult.confidenceScore
        });

        // Return full calculation result
        const response: CrossCalculationResponse = {
          success: true,
          prediction: {
            parentA: {
              id: parentA.id,
              name: parentA.name,
              physicalTraits: parentA.physicalTraits,
              pricing: parentA.pricing
            },
            parentB: {
              id: parentB.id,
              name: parentB.name,
              physicalTraits: parentB.physicalTraits,
              pricing: parentB.pricing
            },
            offspring: {
              physicalTraits: crossResult.physicalTraits,
              productionTraits: crossResult.productionTraits,
              behaviorTraits: crossResult.behaviorTraits,
              geneticBreakdown: crossResult.geneticBreakdown,
              hybridVigor: crossResult.hybridVigor,
              estimatedPricing: crossResult.estimatedPricing,
              confidenceScore: crossResult.confidenceScore
            }
          }
        };

        res.json(response);
      } else {
        // Return cached prediction (simplified response)
        const response: CrossCalculationResponse = {
          success: true,
          prediction: {
            parentA: {
              id: parentAId,
              name: "Cached Parent A",
              physicalTraits: prediction.predictedTraits.physical,
              pricing: prediction.estimatedPricing
            },
            parentB: {
              id: parentBId,
              name: "Cached Parent B", 
              physicalTraits: prediction.predictedTraits.physical,
              pricing: prediction.estimatedPricing
            },
            offspring: {
              physicalTraits: prediction.predictedTraits.physical,
              productionTraits: prediction.predictedTraits.production,
              behaviorTraits: prediction.predictedTraits.behavior,
              geneticBreakdown: [],
              hybridVigor: prediction.predictedTraits.hybridVigor,
              estimatedPricing: prediction.estimatedPricing,
              confidenceScore: prediction.confidenceScore
            }
          }
        };

        res.json(response);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          error: "Invalid request data", 
          details: error.errors 
        });
      }
      
      console.error("Cross calculation error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to calculate cross prediction" 
      });
    }
  });

  // Get breed categories
  app.get("/api/breeds/categories", async (req, res) => {
    try {
      const breeds = await storage.getAllBreeds();
      const categorySet = new Set(breeds.map(breed => breed.category));
      const categories = Array.from(categorySet).sort();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Placeholder for breed images (in a real app, you'd serve actual images)
  app.get("/api/breeds/:breedId/image", async (req, res) => {
    // Return a placeholder SVG
    const svg = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="#f0f0f0"/>
        <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" 
              font-family="Arial" font-size="14" fill="#666">
          ${req.params.breedId}
        </text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);
  return httpServer;
}
