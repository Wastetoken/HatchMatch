import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GeneticsCalculator } from "./services/genetics";
import { crossCalculationRequestSchema, type CrossCalculationResponse } from "@shared/schema";
import { z } from "zod";
import path from "path";

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

  // Serve breed images
  app.get("/api/breeds/:id/image", async (req, res) => {
    const breed = await storage.getBreedById(req.params.id);
    if (!breed) {
      return res.status(404).json({ error: "Breed not found" });
    }

    // Map breed IDs to image paths in public directory
    const breedImageMap: Record<string, string> = {
      'ancona': 'ancona-chickens/ancona-chickens-3.jpg',
      'ameraucana': 'araucana-chickens/araucana-chickens-3.jpg',
      'easter-egger': 'araucana-chickens/araucana-chickens-4.jpg',
      'asil': 'asil-chickens/asil-chickens-3.jpg',
      'wyandotte': 'wyandotte-chickens/wyandotte-chickens-3.jpg',
      'barred-plymouth-rock': 'wyandotte-chickens/wyandotte-chickens-3.jpg',
      'plymouth-rock': 'wyandotte-chickens/wyandotte-chickens-3.jpg',
      'cochin': 'cochin-chickens/cochin-chickens-3.jpg',
      'buff-brahma': 'cochin-chickens/cochin-chickens-3.jpg',
      'brahma': 'cochin-chickens/cochin-chickens-3.jpg',
      'croad-langshan': 'croad-langshan-chickens/croad-langshan-chickens-3.jpg',
      'faverolles': 'faverolles-chickens/faverolles-chickens-3.jpg',
      'indian-game': 'indian-game/indian-game-3.jpg',
      'la-fleche': 'la-fleche-chickens/la-fleche-chickens-3.jpg',
      'leghorn': 'leghorn-chickens/leghorn-chickens-3.jpg',
      'white-leghorn': 'leghorn-chickens/leghorn-chickens-4.jpg',
      'marans': 'marans-chickens/marans-chickens-3.jpg',
      'black-copper-marans': 'marans-chickens/marans-chickens-3.jpg',
      'norfolk-grey': 'norfolk-grey-chickens/norfolk-grey-chickens-3.jpg',
      'orpington': 'orpington-chickens/orpington-chickens-3.jpg',
      'buff-orpington': 'orpington-chickens/orpington-chickens-3.jpg',
      'polish': 'poland-chickens/poland-chickens-3.jpg',
      'rhode-island-red': 'rhode-island-red-chickens/rhode-island-red-chickens-3.jpg',
      'sebright': 'sebright-bantams/sebright-bantams-3.png',
      'silkie': 'silkie-chickens/silkie-chickens-3.jpg',
      'sussex': 'sussex-chickens/sussex-chickens-3.jpg',
      'australorp': 'rhode-island-red-chickens/rhode-island-red-chickens-3.jpg',
      'minorca': 'leghorn-chickens/leghorn-chickens-3.jpg',
      'dorking': 'sussex-chickens/sussex-chickens-3.jpg',
      'new-hampshire-red': 'rhode-island-red-chickens/rhode-island-red-chickens-3.jpg',
      'welsummer': 'marans-chickens/marans-chickens-3.jpg',
      'ixworth': 'sussex-chickens/sussex-chickens-3.jpg',
      'ayam-cemani': 'silkie-chickens/silkie-chickens-3.jpg',
      'sultan': 'silkie-chickens/silkie-chickens-3.jpg'
    };

    const imagePath = breedImageMap[req.params.id] || 'hybrid/hybrid-3.jpg';
    const fullPath = path.join(__dirname, '../client/public/images', imagePath);

    res.sendFile(fullPath, (err) => {
      if (err) {
        res.status(404).json({ error: "Image not found" });
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}