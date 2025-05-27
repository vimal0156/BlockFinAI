
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioAnalytics } from "@/components/PortfolioAnalytics";
import { SentimentAnalysis } from "@/components/SentimentAnalysis";
import { ChartPatternRecognition } from "@/components/ChartPatternRecognition";
import { TradingAgent } from "@/components/TradingAgent";
import { VoiceTradeAssistant } from "@/components/VoiceTradeAssistant";
import { AITradingDAO } from "@/components/AITradingDAO";
import { ChartScan } from "@/components/ChartScan";
import { LineChart, BarChart3, Brain, Mic, TrendingUp, Bot, Sparkles, ChartLine } from "lucide-react";

const Analytics = () => {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <LineChart className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">Analytics & AI Trading</h1>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-8">
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 w-full max-w-5xl bg-background/80 backdrop-blur-sm p-1 rounded-xl">
          <TabsTrigger value="portfolio" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-indigo-500/80 data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="agent" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-indigo-500/80 data-[state=active]:text-white">
            <Brain className="h-4 w-4" />
            RL Agent
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-indigo-500/80 data-[state=active]:text-white">
            <Mic className="h-4 w-4" />
            Voice Trading
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-indigo-500/80 data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4" />
            Patterns
          </TabsTrigger>
          <TabsTrigger value="sentiment" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-indigo-500/80 data-[state=active]:text-white">
            <Sparkles className="h-4 w-4" />
            Sentiment
          </TabsTrigger>
          <TabsTrigger value="chart-scan" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-indigo-500/80 data-[state=active]:text-white">
            <ChartLine className="h-4 w-4" />
            ChartScan
          </TabsTrigger>
          <TabsTrigger value="ai-dao" className="flex items-center gap-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/80 data-[state=active]:to-indigo-500/80 data-[state=active]:text-white">
            <Bot className="h-4 w-4" />
            AI-DAO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <div className="grid gap-6">
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <PortfolioAnalytics />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agent">
          <div className="grid gap-6">
            <TradingAgent />
          </div>
        </TabsContent>

        <TabsContent value="voice">
          <div className="grid gap-6">
            <VoiceTradeAssistant />
          </div>
        </TabsContent>

        <TabsContent value="patterns">
          <div className="grid gap-6">
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle>Chart Pattern Recognition</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartPatternRecognition />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="chart-scan">
          <div className="grid gap-6">
            <ChartScan />
          </div>
        </TabsContent>

        <TabsContent value="sentiment">
          <div className="grid gap-6">
            <Card className="border-primary/20 shadow-md">
              <CardHeader className="bg-primary/5 rounded-t-lg">
                <CardTitle>Market Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <SentimentAnalysis />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-dao">
          <div className="grid gap-6">
            <AITradingDAO />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
