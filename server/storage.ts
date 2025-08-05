import { type Breed, type InsertBreed, type CrossPrediction, type InsertCrossPrediction } from "@shared/schema";
import { breedsWithIds } from "./data/breeds";

export interface IStorage {
  // Breed operations
  getAllBreeds(): Promise<Breed[]>;
  getBreedById(id: string): Promise<Breed | undefined>;
  getBreedsByCategory(category: string): Promise<Breed[]>;
  searchBreeds(query: string): Promise<Breed[]>;
  
  // Cross prediction operations
  getCrossPrediction(parentAId: string, parentBId: string): Promise<CrossPrediction | undefined>;
  saveCrossPrediction(prediction: InsertCrossPrediction): Promise<CrossPrediction>;
}

export class MemStorage implements IStorage {
  private breeds: Map<string, Breed>;
  private crossPredictions: Map<string, CrossPrediction>;

  constructor() {
    this.breeds = new Map();
    this.crossPredictions = new Map();
    
    // Initialize with breed data
    breedsWithIds.forEach(breed => {
      this.breeds.set(breed.id, breed);
    });
  }

  async getAllBreeds(): Promise<Breed[]> {
    return Array.from(this.breeds.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  async getBreedById(id: string): Promise<Breed | undefined> {
    return this.breeds.get(id);
  }

  async getBreedsByCategory(category: string): Promise<Breed[]> {
    return Array.from(this.breeds.values())
      .filter(breed => breed.category === category)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async searchBreeds(query: string): Promise<Breed[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.breeds.values())
      .filter(breed => 
        breed.name.toLowerCase().includes(searchTerm) ||
        breed.description.toLowerCase().includes(searchTerm) ||
        breed.origin.toLowerCase().includes(searchTerm) ||
        breed.category.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  async getCrossPrediction(parentAId: string, parentBId: string): Promise<CrossPrediction | undefined> {
    // Create a normalized key (alphabetical order to handle A x B = B x A)
    const key = [parentAId, parentBId].sort().join('_');
    return this.crossPredictions.get(key);
  }

  async saveCrossPrediction(prediction: InsertCrossPrediction): Promise<CrossPrediction> {
    const key = [prediction.parentAId, prediction.parentBId].sort().join('_');
    const id = `cross_${key}_${Date.now()}`;
    
    const newPrediction: CrossPrediction = {
      id,
      ...prediction
    };
    
    this.crossPredictions.set(key, newPrediction);
    return newPrediction;
  }
}

export const storage = new MemStorage();
