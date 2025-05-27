
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY') || openAIApiKey; // Fallback to OpenAI key if DeepSeek not set

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type, imageUrl, chartData, newsText, contractAddress, transactionData, currentPage } = await req.json();
    
    let systemPrompt = '';
    let useDeepseek = false;
    
    switch (type) {
      case 'portfolio':
        systemPrompt = 'You are a quantum-safe financial advisor. Analyze portfolios and provide secure recommendations. Reference the current page the user is on if relevant.';
        break;
      case 'security':
        systemPrompt = 'You are a quantum security expert. Provide post-quantum cryptography insights and security recommendations. Be aware of the user\'s current page context.';
        useDeepseek = true; // Use DeepSeek for complex security analysis
        break;
      case 'contract':
        systemPrompt = 'You are a smart contract security auditor. Analyze smart contracts for vulnerabilities and provide remediation advice. Reference relevant sections of the UI if the user is on a specific page.';
        useDeepseek = true; // Use DeepSeek for contract analysis
        break;
      case 'fraud':
        systemPrompt = 'You are a blockchain fraud detection expert. Analyze transaction patterns to identify suspicious activities. If the user is on a specific page, reference its features.';
        useDeepseek = true; // Use DeepSeek for fraud detection
        break;
      case 'file':
        systemPrompt = 'You are a secure file analysis expert. Analyze documents and provide insights while maintaining quantum-resistant security standards.';
        break;
      case 'sentiment':
        systemPrompt = 'You are a financial sentiment analysis expert. Analyze financial news and social media to provide sentiment insights. Connect insights to relevant sections of the application if applicable.';
        break;
      case 'pattern':
        systemPrompt = 'You are a technical chart pattern recognition expert. Identify patterns in financial charts and provide trading insights. Guide users to relevant tools in the application.';
        break;
      case 'multimodal':
        systemPrompt = 'You are a multimodal financial analysis expert. Combine text, image, and numerical data to provide comprehensive financial insights. Reference UI elements when appropriate.';
        break;
      case 'voice':
        systemPrompt = 'You are a voice-powered trading assistant. Respond to voice commands and provide real-time trading assistance with natural conversational style. Be context-aware of which page the user is currently on.';
        useDeepseek = true; // Use DeepSeek for natural voice conversations
        break;
      default:
        systemPrompt = 'You are a quantum-safe AI assistant providing secure financial insights. Be aware of which page the user is currently on and provide contextually relevant information.';
    }

    // Add current page context to system prompt if provided
    if (currentPage) {
      systemPrompt += ` The user is currently on the ${currentPage} page of the application.`;
    }

    // Build the user message content
    let messageContent = prompt || '';
    
    // For multimodal requests with images
    const messages = [
      { role: 'system', content: systemPrompt }
    ];
    
    if (type === 'multimodal' && imageUrl) {
      messages.push({
        role: 'user',
        content: [
          { type: 'text', text: messageContent },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      });
    } else if (type === 'sentiment' && newsText) {
      // For sentiment analysis with news text
      messages.push({
        role: 'user', 
        content: `Analyze the sentiment of this financial news: ${newsText}\n\n${messageContent}`
      });
    } else if (type === 'pattern' && chartData) {
      // For pattern recognition with chart data
      messages.push({
        role: 'user',
        content: `Analyze this financial chart data for patterns: ${JSON.stringify(chartData)}\n\n${messageContent}`
      });
    } else if (type === 'contract' && contractAddress) {
      // For smart contract audit
      messages.push({
        role: 'user',
        content: `Analyze this smart contract at address ${contractAddress} for security vulnerabilities: ${messageContent}`
      });
    } else if (type === 'fraud' && transactionData) {
      // For transaction fraud detection
      messages.push({
        role: 'user',
        content: `Analyze these blockchain transactions for suspicious patterns: ${JSON.stringify(transactionData)}\n\n${messageContent}`
      });
    } else {
      // Standard text-only prompt
      messages.push({ role: 'user', content: messageContent });
    }

    let apiUrl = 'https://api.openai.com/v1/chat/completions';
    let headers = {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    };
    let requestBody = {
      model: type === 'multimodal' ? 'gpt-4o' : 'gpt-4o-mini',
      messages: messages,
    };
    
    // Use DeepSeek LLM for specific types of analysis that benefit from its capabilities
    if (useDeepseek && deepseekApiKey) {
      apiUrl = 'https://api.deepseek.com/v1/chat/completions';
      headers = {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      };
      requestBody = {
        model: 'deepseek-chat',
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048
      };
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    const aiResponse = data.choices && data.choices[0] && data.choices[0].message 
      ? data.choices[0].message.content 
      : "Sorry, I couldn't process that request.";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('AI Insights error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
