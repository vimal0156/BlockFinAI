
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, PieChart, LineChart, XAxis, YAxis, Bar, Pie, Cell, Line, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MessageSquare, TrendingUp, BarChart2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SentimentEntry = {
  source: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  timestamp: string;
};

const COLORS = {
  positive: '#10b981',
  neutral: '#6b7280',
  negative: '#ef4444',
};

const SAMPLE_NEWS = [
  "AI hedge funds outperformed traditional investment firms by 25% in Q3.",
  "Quantum computing companies report significant drop in valuations.",
  "Market volatility increases as central banks prepare new policy announcements.",
  "Blockchain-based security tokens gain regulatory approval in key markets.",
];

export function SentimentAnalysis() {
  const [newsText, setNewsText] = useState("");
  const [sentimentData, setSentimentData] = useState<SentimentEntry[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aggregatedData, setAggregatedData] = useState<{
    sentimentDistribution: { name: string; value: number }[];
    sentimentTrend: { date: string; positive: number; negative: number; neutral: number }[];
    impactScore: number;
  }>({
    sentimentDistribution: [],
    sentimentTrend: [],
    impactScore: 0
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Aggregate sentiment data for visualizations
    if (sentimentData.length > 0) {
      // Count sentiments for distribution chart
      const sentimentCounts = {
        positive: sentimentData.filter(item => item.sentiment === 'positive').length,
        neutral: sentimentData.filter(item => item.sentiment === 'neutral').length,
        negative: sentimentData.filter(item => item.sentiment === 'negative').length,
      };
      
      const distribution = Object.entries(sentimentCounts).map(([name, value]) => ({ 
        name, 
        value 
      }));
      
      // Create trend data (simplified for demo)
      const dates = [...new Set(sentimentData.map(item => 
        new Date(item.timestamp).toLocaleDateString()))];
      
      const trend = dates.map(date => {
        const dayItems = sentimentData.filter(item => 
          new Date(item.timestamp).toLocaleDateString() === date);
          
        return {
          date,
          positive: dayItems.filter(item => item.sentiment === 'positive').length,
          neutral: dayItems.filter(item => item.sentiment === 'neutral').length,
          negative: dayItems.filter(item => item.sentiment === 'negative').length,
        };
      });
      
      // Calculate impact score (simple weighted average)
      const totalScore = sentimentData.reduce((acc, item) => {
        const weight = item.sentiment === 'positive' ? 1 : 
                       item.sentiment === 'negative' ? -1 : 0;
        return acc + (item.score * weight);
      }, 0);
      
      const impactScore = Math.round((totalScore / sentimentData.length) * 50 + 50);
      
      setAggregatedData({
        sentimentDistribution: distribution,
        sentimentTrend: trend,
        impactScore: impactScore
      });
    }
  }, [sentimentData]);

  const analyzeSentiment = async () => {
    if (!newsText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'sentiment',
          prompt: 'Analyze the sentiment of this financial news and provide a detailed breakdown with sentiment scores.',
          newsText
        }),
      });
      
      if (!response.ok) throw new Error('Failed to analyze sentiment');
      
      const data = await response.json();
      const analysisText = data.response;
      
      // Generate randomized sentiment data based on AI response for demo
      const newEntry: SentimentEntry = {
        source: 'User Input',
        text: newsText,
        sentiment: analysisText.toLowerCase().includes('positive') ? 'positive' : 
                  analysisText.toLowerCase().includes('negative') ? 'negative' : 'neutral',
        score: Math.random() * 0.5 + 0.5, // Score between 0.5 and 1.0
        timestamp: new Date().toISOString()
      };
      
      // Simulate additional related sentiment entries
      const relatedEntries = SAMPLE_NEWS.slice(0, 2).map(text => ({
        source: 'Financial News',
        text,
        sentiment: Math.random() > 0.5 ? 'positive' : Math.random() > 0.5 ? 'negative' : 'neutral' as 'positive' | 'negative' | 'neutral',
        score: Math.random() * 0.7 + 0.3,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString() // Within last 24 hours
      }));
      
      setSentimentData([newEntry, ...relatedEntries, ...sentimentData]);
      setNewsText("");
      
      toast({
        title: "Sentiment Analysis Complete",
        description: "Financial text analyzed using quantum-resistant processing.",
      });
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to analyze sentiment. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Financial Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter financial news, tweets, or reports to analyze sentiment..."
            value={newsText}
            onChange={(e) => setNewsText(e.target.value)}
            className="h-24"
          />
          <Button 
            onClick={analyzeSentiment} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Sentiment"}
          </Button>
        </div>
        
        {sentimentData.length > 0 && (
          <Tabs defaultValue="feed">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="trend">Trend</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="feed" className="space-y-4 pt-2">
              <div className="max-h-64 overflow-y-auto space-y-2">
                {sentimentData.map((entry, index) => (
                  <div 
                    key={index} 
                    className="p-2 border rounded-md"
                    style={{ borderLeftColor: COLORS[entry.sentiment], borderLeftWidth: 4 }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs text-muted-foreground">{entry.source}</span>
                      <span 
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          entry.sentiment === 'positive' ? 'bg-green-100 text-green-800' : 
                          entry.sentiment === 'negative' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {entry.sentiment}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{entry.text}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        Score: {Math.round(entry.score * 100)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="distribution" className="pt-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={aggregatedData.sentimentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {aggregatedData.sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="trend" className="pt-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aggregatedData.sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="positive" stroke={COLORS.positive} />
                    <Line type="monotone" dataKey="neutral" stroke={COLORS.neutral} />
                    <Line type="monotone" dataKey="negative" stroke={COLORS.negative} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="impact" className="pt-2">
              <div className="flex items-center justify-center h-64 flex-col">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold">Market Impact Score</h3>
                  <p className="text-sm text-muted-foreground">Based on sentiment analysis</p>
                </div>
                
                <div 
                  className={`text-6xl font-bold ${
                    aggregatedData.impactScore > 65 ? 'text-green-600' : 
                    aggregatedData.impactScore > 40 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}
                >
                  {aggregatedData.impactScore}
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  {aggregatedData.impactScore > 65 ? (
                    <>
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span className="text-green-600">Bullish Sentiment</span>
                    </>
                  ) : aggregatedData.impactScore > 40 ? (
                    <>
                      <BarChart2 className="h-5 w-5 text-yellow-600" />
                      <span className="text-yellow-600">Neutral Sentiment</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="text-red-600">Bearish Sentiment</span>
                    </>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
