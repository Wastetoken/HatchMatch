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
                  src={`/api/breeds/${selectedBreed.id}/image`}
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
