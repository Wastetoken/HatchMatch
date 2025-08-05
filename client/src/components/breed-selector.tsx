import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown } from "lucide-react";
import { Breed } from "@shared/schema";

interface BreedSelectorProps {
  label: string;
  selectedBreed: Breed | null;
  onBreedSelect: (breed: Breed | null) => void;
  excludeBreedId?: string;
}

// Helper function to map breed names to image paths
const getBreedImagePath = (breed: Breed): string => {
  const breedImageMap: Record<string, string> = {
    'ancona': '/images/ancona-chickens/ancona-chickens-3.jpg',
    'ameraucana': '/images/araucana-chickens/araucana-chickens-3.jpg',
    'easter-egger': '/images/araucana-chickens/araucana-chickens-4.jpg',
    'asil': '/images/asil-chickens/asil-chickens-3.jpg',
    'wyandotte': '/images/wyandotte-chickens/wyandotte-chickens-3.jpg',
    'barred-plymouth-rock': '/images/wyandotte-chickens/wyandotte-chickens-3.jpg',
    'plymouth-rock': '/images/wyandotte-chickens/wyandotte-chickens-3.jpg',
    'cochin': '/images/cochin-chickens/cochin-chickens-3.jpg',
    'buff-brahma': '/images/cochin-chickens/cochin-chickens-3.jpg',
    'brahma': '/images/cochin-chickens/cochin-chickens-3.jpg',
    'croad-langshan': '/images/croad-langshan-chickens/croad-langshan-chickens-3.jpg',
    'faverolles': '/images/faverolles-chickens/faverolles-chickens-3.jpg',
    'indian-game': '/images/indian-game/indian-game-3.jpg',
    'la-fleche': '/images/la-fleche-chickens/la-fleche-chickens-3.jpg',
    'leghorn': '/images/leghorn-chickens/leghorn-chickens-3.jpg',
    'white-leghorn': '/images/leghorn-chickens/leghorn-chickens-4.jpg',
    'marans': '/images/marans-chickens/marans-chickens-3.jpg',
    'black-copper-marans': '/images/marans-chickens/marans-chickens-3.jpg',
    'norfolk-grey': '/images/norfolk-grey-chickens/norfolk-grey-chickens-3.jpg',
    'orpington': '/images/orpington-chickens/orpington-chickens-3.jpg',
    'buff-orpington': '/images/orpington-chickens/orpington-chickens-3.jpg',
    'polish': '/images/poland-chickens/poland-chickens-3.jpg',
    'rhode-island-red': '/images/rhode-island-red-chickens/rhode-island-red-chickens-3.jpg',
    'sebright': '/images/sebright-bantams/sebright-bantams-3.png',
    'silkie': '/images/silkie-chickens/silkie-chickens-3.jpg',
    'sussex': '/images/sussex-chickens/sussex-chickens-3.jpg',
    'australorp': '/images/rhode-island-red-chickens/rhode-island-red-chickens-3.jpg',
    'minorca': '/images/leghorn-chickens/leghorn-chickens-3.jpg',
    'dorking': '/images/sussex-chickens/sussex-chickens-3.jpg',
    'new-hampshire-red': '/images/rhode-island-red-chickens/rhode-island-red-chickens-3.jpg',
    'welsummer': '/images/marans-chickens/marans-chickens-3.jpg',
    'ixworth': '/images/sussex-chickens/sussex-chickens-3.jpg',
    'ayam-cemani': '/images/silkie-chickens/silkie-chickens-3.jpg',
    'sultan': '/images/silkie-chickens/silkie-chickens-3.jpg'
  };

  return breedImageMap[breed.id] || '/images/hybrid/hybrid-3.jpg';
};

export default function BreedSelector({ 
  label, 
  selectedBreed, 
  onBreedSelect, 
  excludeBreedId 
}: BreedSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: breeds = [], isLoading } = useQuery<Breed[]>({
    queryKey: ['/api/breeds'],
    enabled: true
  });

  const filteredBreeds = breeds.filter((breed) => {
    if (excludeBreedId && breed.id === excludeBreedId) return false;
    if (!searchTerm) return true;
    return breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           breed.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
           breed.origin.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const groupedBreeds = filteredBreeds.reduce((acc: Record<string, Breed[]>, breed: Breed) => {
    const category = breed.category.charAt(0).toUpperCase() + breed.category.slice(1).replace('-', ' ');
    if (!acc[category]) acc[category] = [];
    acc[category].push(breed);
    return acc;
  }, {});

  const handleBreedSelect = (breedId: string) => {
    const breed = breeds.find((b) => b.id === breedId);
    onBreedSelect(breed || null);
  };

  const formatPrice = (min: number, max: number) => {
    if (min >= 1000) {
      return `$${(min/1000).toFixed(1)}k-${(max/1000).toFixed(1)}k`;
    }
    return `$${min}-${max}`;
  };

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-gray-700">{label}</label>
      
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search breeds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Breed Selection */}
      <Select onValueChange={handleBreedSelect} value={selectedBreed?.id || ""}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select breed..." />
        </SelectTrigger>
        <SelectContent className="max-h-96">
          {isLoading ? (
            <SelectItem value="loading" disabled>Loading breeds...</SelectItem>
          ) : (
            Object.entries(groupedBreeds).map(([category, categoryBreeds]) => (
              <div key={category}>
                <div className="px-2 py-1 text-sm font-semibold text-muted-foreground bg-muted/50">
                  {category}
                </div>
                {categoryBreeds.map((breed: Breed) => (
                  <SelectItem key={breed.id} value={breed.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{breed.name}</span>
                        {breed.isExotic && (
                          <Badge variant="secondary" className="text-xs">Exotic</Badge>
                        )}
                        {breed.conservationStatus === 'critical' && (
                          <Badge variant="destructive" className="text-xs">Critical</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">
                        {formatPrice(breed.pricing.dayOldChickMin, breed.pricing.dayOldChickMax)}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </div>
            ))
          )}
        </SelectContent>
      </Select>

      {/* Selected Breed Preview */}
      {selectedBreed && (
        <Card className="breed-card">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <img 
                  src={getBreedImagePath(selectedBreed)}
                  alt={selectedBreed.name}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden text-xs text-muted-foreground text-center">
                  {selectedBreed.name}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-800">{selectedBreed.name}</h4>
                  {selectedBreed.isExotic && (
                    <Badge variant="secondary">Exotic</Badge>
                  )}
                  {selectedBreed.conservationStatus === 'critical' && (
                    <Badge variant="destructive">Critical</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {selectedBreed.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Origin:</span>
                    <span className="ml-1 font-medium">{selectedBreed.origin}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-1 font-medium capitalize">{selectedBreed.category}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Eggs/year:</span>
                    <span className="ml-1 font-medium">
                      {selectedBreed.productionTraits.eggProductionMin}-{selectedBreed.productionTraits.eggProductionMax}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Chick price:</span>
                    <span className="ml-1 font-medium text-primary">
                      {formatPrice(selectedBreed.pricing.dayOldChickMin, selectedBreed.pricing.dayOldChickMax)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
