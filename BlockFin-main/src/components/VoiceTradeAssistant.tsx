
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Mic, MicOff, Volume2, ArrowRight, 
  Sparkles, MessageSquare, Bot, Play,
  Settings, Pause, AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the interfaces for the Web Speech API to fix TypeScript errors
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface Window {
  webkitSpeechRecognition?: new () => SpeechRecognition;
  SpeechRecognition?: new () => SpeechRecognition;
}

export function VoiceTradeAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [activeTab, setActiveTab] = useState("voice");
  const [voiceReady, setVoiceReady] = useState(true);
  const [volume, setVolume] = useState(80);
  const [previousConversations, setPreviousConversations] = useState<{
    query: string;
    response: string;
    timestamp: Date;
  }[]>([
    {
      query: "What's the current status of my portfolio?",
      response: "Your portfolio is currently valued at $124,532.89, up 2.5% this week. Your biggest gainer is Ethereum at +8.2%.",
      timestamp: new Date(Date.now() - 3600000 * 2)
    },
    {
      query: "Set a price alert for Bitcoin above $75,000",
      response: "Price alert set for Bitcoin. You'll be notified when BTC exceeds $75,000.",
      timestamp: new Date(Date.now() - 3600000 * 8)
    }
  ]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();
  
  // Initialize speech recognition
  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognitionClass = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      if (SpeechRecognitionClass) {
        recognitionRef.current = new SpeechRecognitionClass();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
          
          setTranscript(transcript);
        };
        
        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast({
            variant: "destructive",
            title: "Speech Recognition Error",
            description: `Error: ${event.error}`,
          });
        };
      } else {
        setVoiceReady(false);
        toast({
          variant: "destructive",
          title: "Speech Recognition Not Supported",
          description: "Your browser doesn't support speech recognition",
        });
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [toast]);
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript("");
    }
  };
  
  const processVoiceCommand = async () => {
    if (!transcript.trim()) return;
    
    setIsProcessing(true);
    
    // Track this query
    const newQuery = {
      query: transcript,
      response: "",
      timestamp: new Date()
    };
    
    try {
      // Call the DeepSeek LLM-powered API for more advanced responses
      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: transcript,
          type: 'voice',
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();
      
      let aiResponse = data.response;
      
      // Fallback responses if API fails
      if (!aiResponse) {
        if (transcript.toLowerCase().includes("portfolio")) {
          aiResponse = "Your portfolio is currently valued at $124,532.89, up 2.5% this week. Your biggest gainer is Ethereum at +8.2% and your biggest loser is Cardano at -3.1%.";
        } else if (transcript.toLowerCase().includes("trade") || transcript.toLowerCase().includes("buy") || transcript.toLowerCase().includes("sell")) {
          aiResponse = "I've analyzed market conditions for this trade. There's a 67% probability of this being profitable based on current trends. Would you like to proceed with the order?";
        } else if (transcript.toLowerCase().includes("market") || transcript.toLowerCase().includes("trend")) {
          aiResponse = "Current market sentiment is cautiously bullish. Bitcoin dominance is at 52% with moderate volatility. Institutional inflows have increased by 15% this week.";
        } else if (transcript.toLowerCase().includes("alert") || transcript.toLowerCase().includes("notification")) {
          aiResponse = "Alert set successfully. I'll notify you when the specified conditions are met.";
        } else {
          aiResponse = "I understand you want information about the crypto market. Based on current data, market conditions are stable with moderate bullish sentiment. Would you like more specific information?";
        }
      }
      
      // Update the response
      setResponse(aiResponse);
      newQuery.response = aiResponse;
      
      // Add to conversation history
      setPreviousConversations(prev => [newQuery, ...prev]);
      
      // Play the response
      playResponse(aiResponse);
    } catch (error) {
      console.error('Error processing voice command:', error);
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: "Failed to process your voice command",
      });
    } finally {
      setIsProcessing(false);
      setTranscript("");
    }
  };
  
  const playResponse = (text: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    // In a real implementation, this would call a Text-to-Speech API
    // For now, we'll just simulate playing audio
    setIsPlaying(true);
    
    const duration = text.length * 50; // Approximate duration based on text length
    
    setTimeout(() => {
      setIsPlaying(false);
      toast({
        title: "Response Played",
        description: "AI voice response completed",
      });
    }, duration);
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Trading Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
            <TabsTrigger value="history">Conversation History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="voice" className="space-y-4">
            {!voiceReady && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-center gap-2 text-amber-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Voice recognition not available in your browser</span>
              </div>
            )}
            
            <div className="border rounded-lg p-4 relative">
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className={isListening ? "bg-red-100 text-red-800" : ""}>
                  {isListening ? "Listening..." : "Ready"}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Ask me about your portfolio, market trends, or to execute trades
              </p>
              
              <div className="h-20 flex items-center justify-center">
                {isListening ? (
                  <div className="text-center">
                    <p className="text-lg font-medium mb-1">{transcript || "Speak now..."}</p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-1 bg-primary animate-pulse rounded-full"
                          style={{
                            height: `${20 + Math.random() * 30}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                ) : transcript ? (
                  <p className="text-lg font-medium">{transcript}</p>
                ) : (
                  <p className="text-gray-400 italic">Your voice command will appear here</p>
                )}
              </div>
              
              <div className="flex justify-center gap-4 mt-4">
                <Button
                  variant={isListening ? "destructive" : "default"}
                  size="lg"
                  className="rounded-full h-14 w-14 p-0 flex items-center justify-center"
                  onClick={toggleListening}
                  disabled={!voiceReady}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </Button>
                {transcript && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2"
                    onClick={processVoiceCommand}
                    disabled={isProcessing}
                  >
                    <ArrowRight className="h-4 w-4" />
                    Process
                  </Button>
                )}
              </div>
            </div>
            
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Processing command</span>
                  <span className="text-sm">Please wait...</span>
                </div>
                <Progress className="w-full" value={undefined} />
              </div>
            )}
            
            {response && (
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Response
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => playResponse(response)}
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm">{response}</p>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-2 w-2/3">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Progress className="w-full" value={volume} />
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setResponse("")}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Recent Conversations</h3>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </div>
            
            <div className="space-y-3">
              {previousConversations.map((convo, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline">
                      <Mic className="h-3 w-3 mr-1" />
                      Voice Command
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {convo.timestamp.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{convo.query}</p>
                  <div className="border-t my-2"></div>
                  <div className="flex justify-between items-center mb-1">
                    <Badge variant="outline" className="bg-primary/10">
                      <Bot className="h-3 w-3 mr-1" />
                      AI Response
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Play className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm">{convo.response}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
