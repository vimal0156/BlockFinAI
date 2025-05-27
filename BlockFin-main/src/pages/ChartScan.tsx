import AnimatedBackground from "@/components/AnimatedBackground";
import { ChartLine } from "lucide-react";

export default function ChartScanPage() {
  return (
    <div className="container py-8 relative z-10">
      <AnimatedBackground />
      
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 rounded-lg bg-primary/10">
          <ChartLine className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
          ChartScan AI
        </h1>
      </div>
      
      <div className="max-w-screen-xl mx-auto">
        <p className="text-lg mb-8 max-w-2xl">
          Upload your trading chart images and our advanced AI will analyze them for patterns, trends, 
          support/resistance levels, and provide detailed technical analysis with buy/sell signals.
        </p>
        
        <div className="w-full h-[800px]">
          <iframe
            title="ChartScanAI"
            src="http://localhost:8502"
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </div>
  );
}
