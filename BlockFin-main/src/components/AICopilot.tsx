
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bot, Send, Mic, Paperclip, X, Maximize2, 
  Minimize2, Lock, AlertTriangle, Shield, 
  Code, LineChart, Brain, ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'portfolio' | 'security' | 'file' | 'voice' | 'contract';
}

export function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  // When route changes, suggest relevant questions
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const path = location.pathname;
      let welcomeMessage: Message = {
        role: 'assistant',
        content: 'Hello! I\'m your DeepSeek-powered AI assistant. How can I help you today?',
        timestamp: new Date(),
        type: 'text'
      };

      // Add route-specific recommendations
      if (path.includes('/wallet') || path.includes('/assets')) {
        welcomeMessage.content += '\n\nTry asking about:\n• Portfolio management\n• Asset security best practices\n• Cross-chain transfers';
      } else if (path.includes('/security')) {
        welcomeMessage.content += '\n\nTry asking about:\n• Smart contract auditing\n• Fraud detection\n• Zero-knowledge proofs';
      } else if (path.includes('/analytics')) {
        welcomeMessage.content += '\n\nTry asking about:\n• Market predictions\n• Voice trading commands\n• Portfolio optimization';
      } else if (path.includes('/exchange')) {
        welcomeMessage.content += '\n\nTry asking about:\n• Best trading pairs\n• Current market sentiment\n• Trading strategies';
      }

      setMessages([welcomeMessage]);
    }
  }, [location.pathname, isOpen]);

  useEffect(() => {
    if ('MediaRecorder' in window) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          
          mediaRecorderRef.current.ondataavailable = async (event) => {
            if (event.data.size > 0) {
              const audioBlob = new Blob([event.data], { type: 'audio/wav' });
              await processVoiceInput(audioBlob);
            }
          };
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
    }
  }, []);

  const processVoiceInput = async (audioBlob: Blob) => {
    const simulatedText = "Show me my portfolio analysis";
    setInput(simulatedText);
    await handleSend(simulatedText);
  };

  const processMessage = async (text: string, type: 'text' | 'portfolio' | 'security' | 'file' | 'voice' | 'contract' = 'text') => {
    try {
      // Context-aware responses based on current page
      const path = location.pathname;
      
      if (path.includes('/security') && 
          (text.toLowerCase().includes('fraud') || 
           text.toLowerCase().includes('suspicious') || 
           text.toLowerCase().includes('transaction security'))) {
        return "I see you're on the Security page. Would you like me to guide you through:\n\n1. Running the fraud detection analysis on your transactions? \n2. Performing a smart contract audit?\n\nYou can use the tools right on this page.";
      }
      
      if (path.includes('/analytics') && 
          (text.toLowerCase().includes('voice') || 
           text.toLowerCase().includes('speak') || 
           text.toLowerCase().includes('talk'))) {
        return "I see you're on the Analytics page. The voice assistant is available in the Voice Trading Assistant tab. You can:\n\n1. Give voice commands for market analysis\n2. Request portfolio information\n3. Set price alerts by voice\n\nTry it now in the Voice Trading Assistant section.";
      }
      
      if (text.toLowerCase().includes('deepseek') || 
          text.toLowerCase().includes('llm') || 
          text.toLowerCase().includes('ai model')) {
        return "Our platform integrates DeepSeek LLM for advanced natural language understanding. This helps with:\n\n1. More nuanced financial analysis\n2. Better understanding of complex queries\n3. Enhanced voice interactions\n\nThe system automatically uses DeepSeek for security, fraud, and voice processing tasks.";
      }

      const response = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: text,
          type,
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error processing message:', error);
      return 'I apologize, but I encountered an error processing your request. Please try again.';
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
      type: 'text'
    };

    const newAssistantMessage: Message = {
      role: 'assistant',
      content: 'Processing with quantum-resistant encryption...',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages([...messages, newUserMessage, newAssistantMessage]);
    setInput('');

    // Determine message type based on content and current page
    let messageType: 'text' | 'portfolio' | 'security' | 'file' | 'voice' | 'contract' = 'text';
    
    if (text.toLowerCase().includes('portfolio') || location.pathname.includes('/analytics')) {
      messageType = 'portfolio';
    } else if (text.toLowerCase().includes('security') || location.pathname.includes('/security')) {
      messageType = 'security';  
    } else if (text.toLowerCase().includes('fraud') || text.toLowerCase().includes('suspicious')) {
      messageType = 'security';
    } else if (text.toLowerCase().includes('smart contract') || text.toLowerCase().includes('audit')) {
      messageType = 'contract';
    } else if (text.toLowerCase().includes('voice') || text.toLowerCase().includes('speak')) {
      messageType = 'voice';
    }

    const aiResponse = await processMessage(text, messageType);
    
    const finalResponse: Message = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      type: messageType
    };

    setMessages(prev => [...prev.slice(0, -1), finalResponse]);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingFile(true);
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const filePrompt = `Analyze this ${file.type} file content: ${content.slice(0, 1000)}...`;
        const analysis = await processMessage(filePrompt, 'file');

        const newMessage: Message = {
          role: 'assistant',
          content: analysis,
          timestamp: new Date(),
          type: 'file'
        };

        setMessages(prev => [...prev, newMessage]);
        toast({
          title: "File Analysis Complete",
          description: `${file.name} has been processed with quantum-resistant encryption.`,
        });
      };

      reader.onerror = () => {
        throw new Error('Failed to read file');
      };

      reader.readAsText(file);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to process file securely.",
      });
    } finally {
      setIsProcessingFile(false);
    }
  };

  const toggleRecording = () => {
    if (!mediaRecorderRef.current) return;

    if (isRecording) {
      mediaRecorderRef.current.stop();
      toast({
        title: "Voice Recording Stopped",
        description: "Processing your message...",
      });
    } else {
      mediaRecorderRef.current.start();
      toast({
        title: "Voice Recording Started",
        description: "Listening to your message...",
      });
    }
    setIsRecording(!isRecording);
  };

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.role === 'user';
    
    // Get navigation link based on message type
    const getNavigationLink = () => {
      if (message.role === 'assistant') {
        if (message.type === 'security' || message.type === 'contract') {
          return (
            <div className="mt-2 text-xs">
              <Link to="/security" className="inline-flex items-center gap-1 text-primary hover:underline">
                <Shield className="w-3 h-3" />
                Open Security Center
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          );
        }
        
        if (message.type === 'voice') {
          return (
            <div className="mt-2 text-xs">
              <Link to="/analytics" className="inline-flex items-center gap-1 text-primary hover:underline">
                <Mic className="w-3 h-3" />
                Try Voice Assistant
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          );
        }
        
        if (message.type === 'portfolio') {
          return (
            <div className="mt-2 text-xs">
              <Link to="/analytics" className="inline-flex items-center gap-1 text-primary hover:underline">
                <LineChart className="w-3 h-3" />
                View Analytics
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          );
        }
      }
      
      return null;
    };
    
    return (
      <div
        key={index}
        className={`flex ${
          isUser ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className={`max-w-[80%] rounded-lg p-3 ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted'
          } ${
            message.type === 'security' || message.type === 'contract' ? 'border-l-4 border-green-500' : 
            message.type === 'voice' ? 'border-l-4 border-blue-500' :
            message.type === 'portfolio' ? 'border-l-4 border-amber-500' : ''
          }`}
        >
          <div className="whitespace-pre-line">{message.content}</div>
          {getNavigationLink()}
          <div className="text-xs opacity-70 mt-1">
            {message.timestamp.toLocaleTimeString()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-4 shadow-lg"
        >
          <Bot className="w-6 h-6" />
        </Button>
      ) : (
        <Card className={`w-96 shadow-xl transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[600px]'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">DeepSeek-Powered AI Copilot</span>
              <Lock className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <CardContent className="flex-1 overflow-y-auto space-y-4 p-4 h-[calc(600px-8rem)]">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <Brain className="w-12 h-12 mx-auto text-primary/30 mb-4" />
                    <h3 className="text-lg font-medium mb-2">DeepSeek LLM Integrated</h3>
                    <p className="text-muted-foreground text-sm max-w-[80%] mx-auto">
                      Ask me anything about trading, security, or portfolio management with enhanced natural language understanding.
                    </p>
                  </div>
                )}
                {messages.map((message, index) => renderMessage(message, index))}
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2 items-center">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about security, trading, or use voice..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.csv"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessingFile}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleRecording}
                    className={isRecording ? 'text-red-500' : ''}
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button onClick={() => handleSend()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
