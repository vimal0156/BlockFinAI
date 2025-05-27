
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, ChartLine, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TechnicalAnalysisReport } from "@/components/TechnicalAnalysisReport";

export function ChartScan() {
  const [chartImage, setChartImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number | null>(null);
  const { toast } = useToast();

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
      });
      return;
    }
    
    // Convert to base64 for preview and analysis
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setChartImage(result);
    };
    reader.readAsDataURL(file);
  };

  // Analyze chart pattern
  const analyzeChart = async () => {
    if (!chartImage) return;
    
    setLoading(true);
    try {
      // Send to backend for comprehensive analysis
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'multimodal',
          prompt: 'Analyze this stock chart and provide detailed technical analysis. Identify patterns, trend directions, support/resistance levels, momentum, and specific buy/sell signals with price targets and stop loss levels. Format as numbered points.',
          imageUrl: chartImage,
          currentPage: 'Chart Scan'
        }),
      });
      
      if (!response.ok) throw new Error('Failed to analyze chart');
      
      const data = await response.json();
      
      // Extract patterns from the response
      const analysis = data.response;
      const patterns = analysis.split('\n')
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.trim());
      
      // Extract a confidence score if present in the response
      const confidenceMatch = analysis.match(/confidence[:]\s*(\d+)%/i);
      const confidence = confidenceMatch && confidenceMatch[1] 
        ? parseInt(confidenceMatch[1]) 
        : 85; // Default confidence
      
      setAnalysisResults(patterns);
      setConfidence(confidence);
      
      toast({
        title: "Analysis Complete",
        description: "Technical analysis report generated successfully.",
      });
    } catch (error) {
      console.error("Error analyzing chart:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to analyze chart. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="border-primary/20 shadow-md">
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5" />
            ChartScan AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="chart-upload">Upload Trading Chart</Label>
            <Input 
              id="chart-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
            />
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" />
              Upload a clear screenshot of a stock chart for best analysis results
            </p>
          </div>
          
          {chartImage && (
            <div className="space-y-4">
              <div className="rounded-md overflow-hidden border">
                <img 
                  src={chartImage} 
                  alt="Chart for analysis" 
                  className="w-full object-contain max-h-[300px]"
                />
              </div>
              
              <Button 
                onClick={analyzeChart} 
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Chart...
                  </>
                ) : (
                  <>
                    <ChartLine className="mr-2 h-4 w-4" />
                    Generate Technical Analysis
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResults.length > 0 ? (
        <TechnicalAnalysisReport 
          results={analysisResults} 
          chartImage={chartImage || ""}
          confidence={confidence}
        />
      ) : (
        <Card className="border-primary/20 shadow-md h-full flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <ChartLine className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload a chart image and click "Generate Technical Analysis" to get started
            </p>
            <p className="text-sm text-muted-foreground">
              Our AI will analyze your chart to identify patterns, support/resistance levels, 
              trend directions, and provide specific trading recommendations
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
