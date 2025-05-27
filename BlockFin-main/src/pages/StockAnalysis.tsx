
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  ChartLine, 
  TrendingUp, 
  FileImage,
  Brain,
  ArrowUpRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TechnicalAnalysisReport } from "@/components/TechnicalAnalysisReport";

export default function StockAnalysis() {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<string[]>([]);
  const [chartImage, setChartImage] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setChartImage(fileReader.result);
        }
      };
      fileReader.readAsDataURL(e.target.files[0]);

      toast({
        title: "File Selected",
        description: `Selected ${e.target.files[0].name}`,
      });
    }
  };

  const analyzeChart = () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please upload a chart image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResults([]);
    setConfidence(null);

    // Simulate analysis delay
    setTimeout(() => {
      // Mock analysis results
      const mockResults = [
        "Bullish engulfing pattern detected on the daily timeframe",
        "Price broke above the 50-day moving average with strong volume",
        "RSI indicator shows upward momentum at 65, not yet overbought",
        "Support level at $42,800 has been confirmed with multiple tests",
        "Target price of $52,500 based on measured move from the pattern",
        "Stop loss recommended at $41,200 below the pattern low",
        "MACD shows bullish crossover, confirming trend change"
      ];
      
      setAnalysisResults(mockResults);
      setConfidence(87);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: "Technical analysis completed successfully",
      });
    }, 3000);
  };

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Stock Chart Analysis</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="upload">Upload Chart</TabsTrigger>
              <TabsTrigger value="capture">Capture Screen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Chart Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <Input 
                      id="chart-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="chart-upload" className="cursor-pointer">
                      <FileImage className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">
                        {selectedFile ? selectedFile.name : "Drag and drop or click to upload"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supported formats: PNG, JPG, GIF
                      </p>
                    </label>
                  </div>
                  
                  {chartImage && (
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={chartImage} 
                        alt="Uploaded chart" 
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  
                  <Button 
                    onClick={analyzeChart} 
                    disabled={!selectedFile || isAnalyzing}
                    className="w-full"
                  >
                    <ChartLine className="mr-2 h-4 w-4" />
                    {isAnalyzing ? "Analyzing..." : "Analyze Chart"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="capture" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Capture Trading Chart
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm mb-4">
                      Capture any chart from your trading platform by taking a screenshot and uploading it.
                    </p>
                    <Button variant="outline">
                      <FileImage className="mr-2 h-4 w-4" />
                      Select Screenshot
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-2">
                    <h3 className="font-medium">Supported Platforms</h3>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        TradingView
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        MetaTrader 4/5
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        Thinkorswim
                      </li>
                      <li className="flex items-center gap-2">
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        Any charting software
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Analysis Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Timeframe</label>
                  <select className="w-full p-2 rounded-md border">
                    <option>Daily</option>
                    <option>4 Hour</option>
                    <option>1 Hour</option>
                    <option>15 Minute</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Analysis Type</label>
                  <select className="w-full p-2 rounded-md border">
                    <option>Technical Analysis</option>
                    <option>Pattern Recognition</option>
                    <option>Support/Resistance</option>
                    <option>Trend Analysis</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 flex items-center justify-between">
                  <span>Include Price Targets</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 flex items-center justify-between">
                  <span>Include Stop Loss</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {analysisResults.length > 0 ? (
            <TechnicalAnalysisReport 
              results={analysisResults} 
              chartImage={chartImage}
              confidence={confidence}
            />
          ) : (
            <Card className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <ChartLine className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
                <h3 className="text-xl font-medium mb-2">No Analysis Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a chart image and click "Analyze Chart" to get started
                </p>
                <Button variant="outline" onClick={() => document.getElementById('chart-upload')?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Chart
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
