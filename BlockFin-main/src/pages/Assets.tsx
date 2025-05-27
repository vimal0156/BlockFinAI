import { TokenizedAssetCard } from "@/components/TokenizedAssetCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockAssets = [
  {
    name: "Manhattan Real Estate Fund",
    symbol: "MRE",
    price: 250000,
    priceSymbol: "$",
    type: "Real Estate",
    imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600",
  },
  {
    name: "Digital Art Collection",
    symbol: "DAC",
    price: 15000,
    priceSymbol: "$",
    type: "Art",
    imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=600",
  },
  {
    name: "Green Energy Fund",
    symbol: "GEF",
    price: 75000,
    priceSymbol: "$",
    type: "Energy",
    imageUrl: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=600",
  },
];

const Assets = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">Tokenized Assets</h1>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Asset
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockAssets.map((asset, index) => (
          <TokenizedAssetCard key={index} {...asset} />
        ))}
      </div>
    </div>
  );
};

export default Assets;