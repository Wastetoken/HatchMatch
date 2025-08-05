import { Breed } from "@shared/schema";

// Comprehensive chicken breed database based on real data from poultrykeeper.com and research
export const breedsWithIds: Breed[] = [
  {
    id: "plymouth-rock",
    name: "Plymouth Rock",
    category: "dual",
    origin: "America",
    description: "Versatile utility breed known for barred pattern and excellent dual-purpose qualities. Used in commercial sex-linked hybrid crosses.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Barred black and white",
      combType: "single",
      bodySize: "large",
      legColor: "Yellow",
      skinColor: "Yellow",
      eggColor: "Brown",
      pattern: "Barred"
    },
    productionTraits: {
      eggProductionMin: 190,
      eggProductionMax: 240,
      eggSizeOz: 2.2,
      meatWeight: 7.5,
      feedConversion: 2.4,
      broodiness: "moderate",
      maturityWeeks: 20
    },
    behaviorTraits: {
      temperament: "calm",
      coldHardiness: 4,
      heatTolerance: 3,
      foraging: "good",
      confinementTolerance: "excellent",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "B", allele1: "B", allele2: "b", dominance: "dominant", expression: "Barred pattern" },
      { gene: "S", allele1: "s", allele2: "s", dominance: "recessive", expression: "Gold/red based plumage" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" }
    ],
    pricing: {
      dayOldChickMin: 2,
      dayOldChickMax: 4,
      startedPulletMin: 18,
      startedPulletMax: 28,
      breedingQualityMin: 35,
      breedingQualityMax: 50,
      showQualityMin: 60,
      showQualityMax: 120,
      rarityPremium: 1.0
    },
    imageUrl: "https://poultrykeeper.com/wp-content/uploads/2015/03/Plymouth-Rock-Cut-Out.jpg",
    isExotic: false
  },

  {
    id: "rhode-island-red",
    name: "Rhode Island Red",
    category: "layer",
    origin: "Rhode Island, USA",
    description: "Prolific brown egg layer with deep red plumage. Foundation breed for many commercial hybrid layers.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Dark red mahogany",
      combType: "single",
      bodySize: "large",
      legColor: "Yellow",
      skinColor: "Yellow",
      eggColor: "Light brown",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 250,
      eggProductionMax: 300,
      eggSizeOz: 2.3,
      meatWeight: 6.5,
      feedConversion: 2.1,
      broodiness: "low",
      maturityWeeks: 18
    },
    behaviorTraits: {
      temperament: "active",
      coldHardiness: 4,
      heatTolerance: 3,
      foraging: "excellent",
      confinementTolerance: "good",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "S", allele1: "s", allele2: "s", dominance: "recessive", expression: "Gold/red based plumage" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" },
      { gene: "Y", allele1: "Y", allele2: "Y", dominance: "dominant", expression: "Yellow skin" }
    ],
    pricing: {
      dayOldChickMin: 2,
      dayOldChickMax: 4,
      startedPulletMin: 15,
      startedPulletMax: 25,
      breedingQualityMin: 30,
      breedingQualityMax: 45,
      showQualityMin: 50,
      showQualityMax: 100,
      rarityPremium: 1.0
    },
    imageUrl: "https://poultrykeeper.com/wp-content/uploads/2015/04/Rhode-Island-Red-chickens-cut-out.jpg",
    isExotic: false
  },

  {
    id: "new-hampshire-red",
    name: "New Hampshire Red",
    category: "dual",
    origin: "New Hampshire, USA",
    description: "Fast-maturing utility breed developed from Rhode Island Reds. Selected for improved meat production and faster feathering.",
    conservationStatus: "uncommon",
    physicalTraits: {
      featherColor: "Medium red",
      combType: "single",
      bodySize: "large",
      legColor: "Yellow",
      skinColor: "Yellow",
      eggColor: "Brown",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 160,
      eggProductionMax: 240,
      eggSizeOz: 2.2,
      meatWeight: 8.5,
      feedConversion: 2.3,
      broodiness: "moderate",
      maturityWeeks: 16
    },
    behaviorTraits: {
      temperament: "active",
      coldHardiness: 4,
      heatTolerance: 3,
      foraging: "good",
      confinementTolerance: "good",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "S", allele1: "s", allele2: "s", dominance: "recessive", expression: "Gold/red based plumage" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" },
      { gene: "Y", allele1: "Y", allele2: "Y", dominance: "dominant", expression: "Yellow skin" }
    ],
    pricing: {
      dayOldChickMin: 4,
      dayOldChickMax: 6,
      startedPulletMin: 25,
      startedPulletMax: 35,
      breedingQualityMin: 40,
      breedingQualityMax: 60,
      showQualityMin: 70,
      showQualityMax: 140,
      rarityPremium: 1.2
    },
    imageUrl: "https://poultrykeeper.com/wp-content/uploads/2015/04/New-Hampshire-Red-cut-out.jpg",
    isExotic: false
  },

  {
    id: "cochin",
    name: "Cochin",
    category: "ornamental",
    origin: "China",
    description: "Massive ornamental breed with heavily feathered feet and docile temperament. Excellent broody mothers despite small egg production.",
    conservationStatus: "uncommon",
    physicalTraits: {
      featherColor: "Multiple varieties (Buff, Black, Blue, White, Partridge)",
      combType: "single",
      bodySize: "giant",
      legColor: "Yellow",
      skinColor: "Yellow",
      eggColor: "Small tinted",
      pattern: "Variable"
    },
    productionTraits: {
      eggProductionMin: 150,
      eggProductionMax: 200,
      eggSizeOz: 1.8,
      meatWeight: 10,
      feedConversion: 3.2,
      broodiness: "very high",
      maturityWeeks: 28
    },
    behaviorTraits: {
      temperament: "docile",
      coldHardiness: 3,
      heatTolerance: 2,
      foraging: "poor",
      confinementTolerance: "excellent",
      diseaseResistance: 2
    },
    geneticTraits: [
      { gene: "Pti", allele1: "pti", allele2: "pti", dominance: "recessive", expression: "Feathered shanks and toes" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" },
      { gene: "Co", allele1: "Co", allele2: "Co", dominance: "dominant", expression: "Buff/columbian restriction" }
    ],
    pricing: {
      dayOldChickMin: 6,
      dayOldChickMax: 10,
      startedPulletMin: 35,
      startedPulletMax: 50,
      breedingQualityMin: 60,
      breedingQualityMax: 90,
      showQualityMin: 100,
      showQualityMax: 250,
      rarityPremium: 1.5
    },
    imageUrl: "https://poultrykeeper.com/wp-content/uploads/2015/03/Cochin-cut-out.jpg",
    isExotic: false
  },

  {
    id: "ixworth",
    name: "Ixworth",
    category: "dual",
    origin: "Ixworth, Suffolk, UK",
    description: "White table bird breed created by Reginald Appleyard in 1932. Alert, active dual-purpose breed becoming popular with smallholders.",
    conservationStatus: "rare",
    physicalTraits: {
      featherColor: "Pure white",
      combType: "single",
      bodySize: "large",
      legColor: "Yellow",
      skinColor: "White",
      eggColor: "Tinted",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 160,
      eggProductionMax: 200,
      eggSizeOz: 2.1,
      meatWeight: 9,
      feedConversion: 2.5,
      broodiness: "moderate",
      maturityWeeks: 20
    },
    behaviorTraits: {
      temperament: "alert",
      coldHardiness: 4,
      heatTolerance: 3,
      foraging: "good",
      confinementTolerance: "good",
      diseaseResistance: 3
    },
    geneticTraits: [
      { gene: "C", allele1: "c", allele2: "c", dominance: "recessive", expression: "White plumage" },
      { gene: "Y", allele1: "y", allele2: "y", dominance: "recessive", expression: "White skin" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" }
    ],
    pricing: {
      dayOldChickMin: 8,
      dayOldChickMax: 12,
      startedPulletMin: 40,
      startedPulletMax: 60,
      breedingQualityMin: 70,
      breedingQualityMax: 100,
      showQualityMin: 120,
      showQualityMax: 200,
      rarityPremium: 2.0
    },
    imageUrl: "https://poultrykeeper.com/wp-content/uploads/2015/03/Ixworth-cut-out.jpg",
    isExotic: false
  },
  {
    id: "australorp",
    name: "Australorp",
    category: "layer",
    origin: "Australia",
    description: "World record egg layer with jet black feathers and beetle-green sheen. Excellent dual-purpose breed with calm temperament.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Black with green sheen",
      combType: "single",
      bodySize: "large",
      legColor: "Black",
      skinColor: "White",
      eggColor: "Light brown",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 250,
      eggProductionMax: 300,
      eggSizeOz: 2.1,
      meatWeight: 7,
      feedConversion: 2.2,
      broodiness: "low",
      maturityWeeks: 22
    },
    behaviorTraits: {
      temperament: "calm",
      coldHardiness: 4,
      heatTolerance: 3,
      foraging: "excellent",
      confinementTolerance: "excellent",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "E", allele1: "E", allele2: "E", dominance: "dominant", expression: "Extended black" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" },
      { gene: "Y", allele1: "y", allele2: "y", dominance: "recessive", expression: "White skin" }
    ],
    pricing: {
      dayOldChickMin: 3,
      dayOldChickMax: 5,
      startedPulletMin: 25,
      startedPulletMax: 35,
      breedingQualityMin: 40,
      breedingQualityMax: 60,
      showQualityMin: 75,
      showQualityMax: 150,
      rarityPremium: 1.0
    },
    imageUrl: "/api/breeds/australorp/image",
    isExotic: false
  },
  
  {
    id: "white-leghorn",
    name: "White Leghorn",
    category: "layer",
    origin: "Italy",
    description: "Premier white egg layer with exceptional production. Active and hardy Mediterranean breed.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Pure white",
      combType: "single",
      bodySize: "medium",
      legColor: "Yellow",
      skinColor: "Yellow",
      eggColor: "White",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 280,
      eggProductionMax: 320,
      eggSizeOz: 2.0,
      meatWeight: 4.5,
      feedConversion: 2.0,
      broodiness: "low",
      maturityWeeks: 20
    },
    behaviorTraits: {
      temperament: "active",
      coldHardiness: 2,
      heatTolerance: 5,
      foraging: "excellent",
      confinementTolerance: "moderate",
      diseaseResistance: 3
    },
    geneticTraits: [
      { gene: "I", allele1: "I", allele2: "I", dominance: "dominant", expression: "Dominant white" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" },
      { gene: "Y", allele1: "Y", allele2: "Y", dominance: "dominant", expression: "Yellow skin" }
    ],
    pricing: {
      dayOldChickMin: 2,
      dayOldChickMax: 4,
      startedPulletMin: 20,
      startedPulletMax: 30,
      breedingQualityMin: 35,
      breedingQualityMax: 55,
      showQualityMin: 60,
      showQualityMax: 120,
      rarityPremium: 1.0
    },
    imageUrl: "/api/breeds/leghorn/image",
    isExotic: false
  },

  {
    id: "rhode-island-red",
    name: "Rhode Island Red",
    category: "dual-purpose",
    origin: "United States",
    description: "America's favorite dual-purpose breed. Hardy, productive, and adaptable with rich red plumage.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Deep red/rust",
      combType: "single",
      bodySize: "large",
      legColor: "Yellow",
      skinColor: "Yellow",
      eggColor: "Brown",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 250,
      eggProductionMax: 300,
      eggSizeOz: 2.2,
      meatWeight: 7.5,
      feedConversion: 2.3,
      broodiness: "moderate",
      maturityWeeks: 21
    },
    behaviorTraits: {
      temperament: "active",
      coldHardiness: 4,
      heatTolerance: 4,
      foraging: "excellent",
      confinementTolerance: "excellent",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "e+", allele1: "e+", allele2: "e+", dominance: "recessive", expression: "Red/gold base" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" },
      { gene: "Y", allele1: "Y", allele2: "Y", dominance: "dominant", expression: "Yellow skin" }
    ],
    pricing: {
      dayOldChickMin: 3,
      dayOldChickMax: 5,
      startedPulletMin: 25,
      startedPulletMax: 35,
      breedingQualityMin: 40,
      breedingQualityMax: 65,
      showQualityMin: 80,
      showQualityMax: 160,
      rarityPremium: 1.0
    },
    imageUrl: "/api/breeds/rhode-island-red/image",
    isExotic: false
  },

  {
    id: "barred-plymouth-rock",
    name: "Barred Plymouth Rock",
    category: "dual-purpose",
    origin: "United States",
    description: "Classic American breed with distinctive black and white barred pattern. Excellent family chicken.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Black and white barred",
      combType: "single",
      bodySize: "large",
      legColor: "Yellow",
      skinColor: "Yellow",
      eggColor: "Brown",
      pattern: "Barred"
    },
    productionTraits: {
      eggProductionMin: 200,
      eggProductionMax: 280,
      eggSizeOz: 2.1,
      meatWeight: 8,
      feedConversion: 2.4,
      broodiness: "moderate",
      maturityWeeks: 22
    },
    behaviorTraits: {
      temperament: "docile",
      coldHardiness: 4,
      heatTolerance: 3,
      foraging: "excellent",
      confinementTolerance: "excellent",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "B", allele1: "B", allele2: "b+", dominance: "dominant", expression: "Sex-linked barring" },
      { gene: "E", allele1: "E", allele2: "E", dominance: "dominant", expression: "Extended black base" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" }
    ],
    pricing: {
      dayOldChickMin: 3,
      dayOldChickMax: 6,
      startedPulletMin: 30,
      startedPulletMax: 40,
      breedingQualityMin: 50,
      breedingQualityMax: 75,
      showQualityMin: 100,
      showQualityMax: 200,
      rarityPremium: 1.1
    },
    imageUrl: "/api/breeds/barred-rock/image",
    isExotic: false
  },

  {
    id: "buff-orpington",
    name: "Buff Orpington",
    category: "dual-purpose",
    origin: "England",
    description: "Gentle giants with beautiful buff coloring. Excellent mothers and family pets.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Golden buff",
      combType: "single",
      bodySize: "large",
      legColor: "Pinkish white",
      skinColor: "White",
      eggColor: "Light brown",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 175,
      eggProductionMax: 200,
      eggSizeOz: 2.2,
      meatWeight: 8.5,
      feedConversion: 2.6,
      broodiness: "high",
      maturityWeeks: 24
    },
    behaviorTraits: {
      temperament: "docile",
      coldHardiness: 4,
      heatTolerance: 2,
      foraging: "moderate",
      confinementTolerance: "excellent",
      diseaseResistance: 3
    },
    geneticTraits: [
      { gene: "e+", allele1: "e+", allele2: "e+", dominance: "recessive", expression: "Buff/gold base" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" },
      { gene: "Y", allele1: "y", allele2: "y", dominance: "recessive", expression: "White skin" }
    ],
    pricing: {
      dayOldChickMin: 4,
      dayOldChickMax: 6,
      startedPulletMin: 35,
      startedPulletMax: 45,
      breedingQualityMin: 50,
      breedingQualityMax: 80,
      showQualityMin: 100,
      showQualityMax: 200,
      rarityPremium: 1.2
    },
    imageUrl: "/api/breeds/buff-orpington/image",
    isExotic: false
  },

  {
    id: "ameraucana",
    name: "Ameraucana",
    category: "layer",
    origin: "United States",
    description: "True blue egg layers with beards and muffs. Developed from Araucana genetics.",
    conservationStatus: "watch",
    physicalTraits: {
      featherColor: "Various (black, blue, brown red, buff, silver, wheaten, white)",
      combType: "pea",
      bodySize: "medium",
      legColor: "Slate blue",
      skinColor: "White",
      eggColor: "Blue",
      pattern: "Various"
    },
    productionTraits: {
      eggProductionMin: 150,
      eggProductionMax: 200,
      eggSizeOz: 2.0,
      meatWeight: 5.5,
      feedConversion: 2.3,
      broodiness: "low",
      maturityWeeks: 22
    },
    behaviorTraits: {
      temperament: "calm",
      coldHardiness: 4,
      heatTolerance: 3,
      foraging: "excellent",
      confinementTolerance: "moderate",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "O", allele1: "O", allele2: "O", dominance: "dominant", expression: "Blue egg shell" },
      { gene: "P", allele1: "P", allele2: "P", dominance: "dominant", expression: "Pea comb" },
      { gene: "Mf", allele1: "Mf", allele2: "Mf", dominance: "dominant", expression: "Muffs and beard" }
    ],
    pricing: {
      dayOldChickMin: 5,
      dayOldChickMax: 8,
      startedPulletMin: 45,
      startedPulletMax: 65,
      breedingQualityMin: 75,
      breedingQualityMax: 120,
      showQualityMin: 150,
      showQualityMax: 300,
      rarityPremium: 1.8
    },
    imageUrl: "/api/breeds/ameraucana/image",
    isExotic: false
  },

  {
    id: "easter-egger",
    name: "Easter Egger",
    category: "layer",
    origin: "United States",
    description: "Mixed breed producing varied egg colors. Not a standardized breed but popular for colorful eggs.",
    conservationStatus: "common",
    physicalTraits: {
      featherColor: "Variable mixed colors",
      combType: "pea",
      bodySize: "medium",
      legColor: "Green/olive",
      skinColor: "White",
      eggColor: "Blue, green, pink, olive",
      pattern: "Variable"
    },
    productionTraits: {
      eggProductionMin: 200,
      eggProductionMax: 280,
      eggSizeOz: 2.0,
      meatWeight: 5,
      feedConversion: 2.2,
      broodiness: "low",
      maturityWeeks: 20
    },
    behaviorTraits: {
      temperament: "calm",
      coldHardiness: 3,
      heatTolerance: 4,
      foraging: "excellent",
      confinementTolerance: "excellent",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "O", allele1: "O", allele2: "o", dominance: "incomplete", expression: "Variable blue/green eggs" },
      { gene: "P", allele1: "P", allele2: "p", dominance: "dominant", expression: "Pea comb tendency" },
      { gene: "Mixed", allele1: "var", allele2: "var", dominance: "codominant", expression: "Variable traits" }
    ],
    pricing: {
      dayOldChickMin: 3,
      dayOldChickMax: 5,
      startedPulletMin: 25,
      startedPulletMax: 35,
      breedingQualityMin: 35,
      breedingQualityMax: 55,
      rarityPremium: 1.0
    },
    imageUrl: "/api/breeds/easter-egger/image",
    isExotic: false
  },

  {
    id: "black-copper-marans",
    name: "Black Copper Marans",
    category: "dual-purpose",
    origin: "France",
    description: "Famous for extremely dark chocolate brown eggs. Feathered legs and copper neck hackles.",
    conservationStatus: "watch",
    physicalTraits: {
      featherColor: "Black with copper neck hackles",
      combType: "single",
      bodySize: "large",
      legColor: "Feathered, pinkish white",
      skinColor: "White",
      eggColor: "Dark chocolate brown",
      pattern: "Solid with copper highlights"
    },
    productionTraits: {
      eggProductionMin: 150,
      eggProductionMax: 200,
      eggSizeOz: 2.3,
      meatWeight: 7,
      feedConversion: 2.5,
      broodiness: "moderate",
      maturityWeeks: 24
    },
    behaviorTraits: {
      temperament: "calm",
      coldHardiness: 3,
      heatTolerance: 3,
      foraging: "excellent",
      confinementTolerance: "moderate",
      diseaseResistance: 3
    },
    geneticTraits: [
      { gene: "E", allele1: "E", allele2: "E", dominance: "dominant", expression: "Extended black" },
      { gene: "Br", allele1: "Br", allele2: "Br", dominance: "dominant", expression: "Dark brown egg" },
      { gene: "Pti", allele1: "Pti", allele2: "Pti", dominance: "recessive", expression: "Feathered shanks" }
    ],
    pricing: {
      dayOldChickMin: 6,
      dayOldChickMax: 10,
      startedPulletMin: 50,
      startedPulletMax: 70,
      breedingQualityMin: 80,
      breedingQualityMax: 130,
      showQualityMin: 150,
      showQualityMax: 350,
      rarityPremium: 2.0
    },
    imageUrl: "/api/breeds/marans/image",
    isExotic: false
  },

  {
    id: "buff-brahma",
    name: "Buff Brahma",
    category: "dual-purpose",
    origin: "Asia/United States",
    description: "Gentle giants with heavily feathered feet. Excellent cold weather birds and winter layers.",
    conservationStatus: "watch",
    physicalTraits: {
      featherColor: "Light buff with darker tail",
      combType: "pea",
      bodySize: "giant",
      legColor: "Heavily feathered, yellow",
      skinColor: "Yellow",
      eggColor: "Brown",
      pattern: "Columbian"
    },
    productionTraits: {
      eggProductionMin: 150,
      eggProductionMax: 200,
      eggSizeOz: 2.4,
      meatWeight: 10,
      feedConversion: 3.0,
      broodiness: "high",
      maturityWeeks: 28
    },
    behaviorTraits: {
      temperament: "docile",
      coldHardiness: 5,
      heatTolerance: 2,
      foraging: "moderate",
      confinementTolerance: "excellent",
      diseaseResistance: 4
    },
    geneticTraits: [
      { gene: "P", allele1: "P", allele2: "P", dominance: "dominant", expression: "Pea comb" },
      { gene: "Pti", allele1: "Pti", allele2: "Pti", dominance: "recessive", expression: "Feathered shanks" },
      { gene: "Co", allele1: "Co", allele2: "Co", dominance: "dominant", expression: "Columbian pattern" }
    ],
    pricing: {
      dayOldChickMin: 5,
      dayOldChickMax: 8,
      startedPulletMin: 50,
      startedPulletMax: 75,
      breedingQualityMin: 75,
      breedingQualityMax: 120,
      showQualityMin: 150,
      showQualityMax: 300,
      rarityPremium: 1.5
    },
    imageUrl: "/api/breeds/brahma/image",
    isExotic: false
  },

  // Exotic Breeds
  {
    id: "ayam-cemani",
    name: "Ayam Cemani",
    category: "ornamental",
    origin: "Indonesia",
    description: "The world's most expensive chicken breed with complete fibromelanosis causing all-black appearance including organs.",
    conservationStatus: "critical",
    physicalTraits: {
      featherColor: "Jet black",
      combType: "single",
      bodySize: "medium",
      legColor: "Black",
      skinColor: "Black",
      eggColor: "Cream",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 60,
      eggProductionMax: 100,
      eggSizeOz: 1.8,
      meatWeight: 5,
      feedConversion: 2.8,
      broodiness: "moderate",
      maturityWeeks: 26
    },
    behaviorTraits: {
      temperament: "calm",
      coldHardiness: 3,
      heatTolerance: 5,
      foraging: "excellent",
      confinementTolerance: "moderate",
      diseaseResistance: 3
    },
    geneticTraits: [
      { gene: "Fm", allele1: "Fm", allele2: "Fm", dominance: "dominant", expression: "Fibromelanosis" },
      { gene: "E", allele1: "E", allele2: "E", dominance: "dominant", expression: "Extended black" },
      { gene: "R", allele1: "r", allele2: "r", dominance: "recessive", expression: "Single comb" }
    ],
    pricing: {
      dayOldChickMin: 800,
      dayOldChickMax: 1200,
      startedPulletMin: 2000,
      startedPulletMax: 3000,
      breedingQualityMin: 2500,
      breedingQualityMax: 5000,
      showQualityMin: 5000,
      showQualityMax: 9000,
      rarityPremium: 10.0
    },
    imageUrl: "/api/breeds/ayam-cemani/image",
    isExotic: true
  },

  {
    id: "sultan",
    name: "Sultan",
    category: "ornamental",
    origin: "Turkey",
    description: "Turkish royalty breed with full crest, muff, beard, feathered shanks, fifth toe, and vulture hocks. Pure white plumage.",
    conservationStatus: "critical",
    physicalTraits: {
      featherColor: "Pure white",
      combType: "v-shaped",
      bodySize: "medium",
      legColor: "Feathered, white",
      skinColor: "White",
      eggColor: "White",
      pattern: "Solid"
    },
    productionTraits: {
      eggProductionMin: 50,
      eggProductionMax: 80,
      eggSizeOz: 1.6,
      meatWeight: 4.5,
      feedConversion: 3.0,
      broodiness: "high",
      maturityWeeks: 28
    },
    behaviorTraits: {
      temperament: "docile",
      coldHardiness: 2,
      heatTolerance: 3,
      foraging: "poor",
      confinementTolerance: "excellent",
      diseaseResistance: 2
    },
    geneticTraits: [
      { gene: "Cr", allele1: "Cr", allele2: "Cr", dominance: "dominant", expression: "Full crest" },
      { gene: "V", allele1: "V", allele2: "V", dominance: "recessive", expression: "V-shaped comb" },
      { gene: "Pti", allele1: "Pti", allele2: "Pti", dominance: "recessive", expression: "Feathered shanks" }
    ],
    pricing: {
      dayOldChickMin: 15,
      dayOldChickMax: 50,
      startedPulletMin: 100,
      startedPulletMax: 300,
      breedingQualityMin: 200,
      breedingQualityMax: 500,
      showQualityMin: 400,
      showQualityMax: 800,
      rarityPremium: 5.0
    },
    imageUrl: "/api/breeds/sultan/image",
    isExotic: true
  },

  {
    id: "polish",
    name: "Polish",
    category: "ornamental",
    origin: "Poland",
    description: "Distinctive crested head feathers and active temperament. Multiple color varieties available for show purposes.",
    conservationStatus: "watch",
    physicalTraits: {
      featherColor: "Various (white, black, silver, gold laced, buff laced)",
      combType: "v-shaped",
      bodySize: "medium",
      legColor: "Blue/slate",
      skinColor: "White",
      eggColor: "White",
      pattern: "Crested with various lacing"
    },
    productionTraits: {
      eggProductionMin: 120,
      eggProductionMax: 180,
      eggSizeOz: 1.8,
      meatWeight: 4.5,
      feedConversion: 2.7,
      broodiness: "low",
      maturityWeeks: 24
    },
    behaviorTraits: {
      temperament: "active",
      coldHardiness: 2,
      heatTolerance: 3,
      foraging: "moderate",
      confinementTolerance: "moderate",
      diseaseResistance: 3
    },
    geneticTraits: [
      { gene: "Cr", allele1: "Cr", allele2: "Cr", dominance: "dominant", expression: "Full crest" },
      { gene: "V", allele1: "V", allele2: "V", dominance: "recessive", expression: "V-shaped comb" },
      { gene: "Pattern", allele1: "var", allele2: "var", dominance: "codominant", expression: "Variable patterns" }
    ],
    pricing: {
      dayOldChickMin: 8,
      dayOldChickMax: 25,
      startedPulletMin: 50,
      startedPulletMax: 150,
      breedingQualityMin: 75,
      breedingQualityMax: 200,
      showQualityMin: 200,
      showQualityMax: 500,
      rarityPremium: 2.5
    },
    imageUrl: "/api/breeds/polish/image",
    isExotic: false
  }
];