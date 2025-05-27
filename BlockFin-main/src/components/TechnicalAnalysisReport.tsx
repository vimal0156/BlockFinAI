
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, TrendingDown, Target } from "lucide-react";

interface TechnicalAnalysisReportProps {
  results: string[];
  chartImage: string;
  confidence: number | null;
}

export function TechnicalAnalysisReport({ results, chartImage, confidence }: TechnicalAnalysisReportProps) {
  // Extract key insights from the analysis
  const buySignal = results.some(result => 
    result.toLowerCase().includes("buy") || 
    result.toLowerCase().includes("long") || 
    result.toLowerCase().includes("bullish")
  );
  
  const sellSignal = results.some(result => 
    result.toLowerCase().includes("sell") || 
    result.toLowerCase().includes("short") || 
    result.toLowerCase().includes("bearish")
  );

  // Extract price targets if present
  const priceTargetMatch = results.join(' ').match(/target[s]?[:of\s]+(\$?[\d,.]+)/i);
  const priceTarget = priceTargetMatch ? priceTargetMatch[1] : null;
  
  // Extract stop loss if present
  const stopLossMatch = results.join(' ').match(/stop[- ]?loss[:of\s]+(\$?[\d,.]+)/i);
  const stopLoss = stopLossMatch ? stopLossMatch[1] : null;
  
  return (
    <Card className="border-primary/20 shadow-md h-full">
      <CardHeader className="bg-primary/5 rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Technical Analysis Report
          </div>
          {confidence !== null && (
            <Badge variant={confidence > 80 ? "default" : "outline"} className="ml-2">
              {confidence}% Confidence
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Signal Summary */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="text-sm font-medium">Signal:</div>
          {buySignal && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Buy/Long
            </Badge>
          )}
          {sellSignal && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              Sell/Short
            </Badge>
          )}
          {!buySignal && !sellSignal && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              Neutral/Consolidating
            </Badge>
          )}
        </div>
        
        {/* Price Targets */}
        {(priceTarget || stopLoss) && (
          <div className="grid grid-cols-2 gap-4">
            {priceTarget && (
              <div className="p-3 rounded-lg border border-green-100 bg-green-50">
                <div className="text-xs text-green-600 font-medium mb-1 flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  PRICE TARGET
                </div>
                <div className="text-green-800 font-bold">{priceTarget}</div>
              </div>
            )}
            {stopLoss && (
              <div className="p-3 rounded-lg border border-red-100 bg-red-50">
                <div className="text-xs text-red-600 font-medium mb-1 flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  STOP LOSS
                </div>
                <div className="text-red-800 font-bold">{stopLoss}</div>
              </div>
            )}
          </div>
        )}
        
        {/* Detailed Analysis */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-medium">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Analysis Details:
          </div>
          <ul className="space-y-2 text-sm">
            {results.map((result, index) => (
              <li key={index} className="border-b border-gray-100 pb-2 last:border-0">
                {result}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
