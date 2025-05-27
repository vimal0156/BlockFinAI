import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TokenizedAssetCardProps {
  name: string;
  symbol: string;
  price: number;
  priceSymbol: string;
  type: string;
  imageUrl: string;
}

export function TokenizedAssetCard({
  name,
  symbol,
  price,
  priceSymbol,
  type,
  imageUrl,
}: TokenizedAssetCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Badge variant="secondary">{type}</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">{symbol}</div>
          <div className="text-lg font-bold">
            {priceSymbol}
            {price.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}