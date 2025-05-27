import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, Shield, Globe, Coins, 
  Wallet, Receipt, CreditCard, 
  BarChart3, ArrowLeftRight, Bot,
  AlertTriangle, TrendingUp, Lock,
  Brain, Fingerprint, FileText, LineChart,
  Cpu, Network, MessageSquare, ScrollText, ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { AIInsights } from "@/components/AIInsights";
import { PortfolioAnalytics } from "@/components/PortfolioAnalytics";
import { motion, MotionConfig } from "framer-motion";

const Index = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MotionConfig>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
        {/* Hero Section */}
        <section className="container py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
              Next-Generation Blockchain Financial Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience seamless crypto trading across Solana, Ethereum, Polygon, and Lightning Network with advanced AI-powered insights
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                <Link to="/signup">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Connect Wallet</Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* AI Technology Section */}
        <section className="bg-muted/30 py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">Powered by Advanced AI Technologies</h2>
            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="text-center">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">DeepSeek LLM Integration</h3>
                <p className="text-gray-600">Enhanced natural language understanding for security, fraud detection and voice interactions</p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quantum AI</h3>
                <p className="text-gray-600">Quantum-resistant algorithms for secure transactions and advanced portfolio optimization</p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <div className="rounded-full bg-primary/10 p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Network className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Graph Neural Networks</h3>
                <p className="text-gray-600">Blockchain anomaly detection and fraud prevention system</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20">
          <div className="container">
            <motion.div 
              className="text-center mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-4xl font-bold mb-4">Complete Service Suite</h2>
              <p className="text-xl text-gray-600">Comprehensive blockchain financial services with cutting-edge AI integration</p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Trading Services */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowLeftRight className="h-5 w-5 text-primary" />
                      Trading Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Cross-Chain Trading</h3>
                      <p className="text-sm text-muted-foreground">Seamless trading across multiple blockchain networks</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Quantum HFT</h3>
                      <p className="text-sm text-muted-foreground">High-frequency trading powered by quantum algorithms</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Portfolio Optimization</h3>
                      <p className="text-sm text-muted-foreground">AI-driven portfolio balancing and risk management</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/exchange" className="flex items-center justify-between">
                        Explore Trading <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Security Services */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Security Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Fraud Detection</h3>
                      <p className="text-sm text-muted-foreground">AI-powered blockchain transaction monitoring</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Smart Contract Auditing</h3>
                      <p className="text-sm text-muted-foreground">Automated vulnerability detection in smart contracts</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Zero-Knowledge Proofs</h3>
                      <p className="text-sm text-muted-foreground">Privacy-preserving transaction verification</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/security" className="flex items-center justify-between">
                        Explore Security <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* AI Assistants */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      AI Assistants
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">DeepSeek-Powered Copilot</h3>
                      <p className="text-sm text-muted-foreground">Advanced AI assistant with natural language processing</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Voice Trading Assistant</h3>
                      <p className="text-sm text-muted-foreground">Execute trades and get insights through voice commands</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Portfolio Management Bot</h3>
                      <p className="text-sm text-muted-foreground">Personalized investment recommendations</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/analytics" className="flex items-center justify-between">
                        Explore AI Tools <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            
            {/* Second row of services */}
            <motion.div 
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Asset Management */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-primary" />
                      Asset Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-1">Multi-Chain Wallet</h3>
                        <p className="text-sm text-muted-foreground">Unified wallet for all blockchain assets</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">NFT Management</h3>
                        <p className="text-sm text-muted-foreground">Track and trade non-fungible tokens</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Token Management</h3>
                        <p className="text-sm text-muted-foreground">Manage ERC-20, BEP-20 tokens and more</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">DeFi Integration</h3>
                        <p className="text-sm text-muted-foreground">Access staking, lending, and yield farming</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/assets" className="flex items-center justify-between">
                        Manage Assets <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Analytics & Insights */}
              <motion.div variants={itemVariants}>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-primary" />
                      Analytics & Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-1">Market Predictions</h3>
                        <p className="text-sm text-muted-foreground">AI-driven price forecasting</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Sentiment Analysis</h3>
                        <p className="text-sm text-muted-foreground">News and social media sentiment tracking</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Pattern Recognition</h3>
                        <p className="text-sm text-muted-foreground">Technical chart pattern identification</p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Backtesting Engine</h3>
                        <p className="text-sm text-muted-foreground">Test strategies against historical data</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link to="/analytics" className="flex items-center justify-between">
                        View Analytics <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Demo & Preview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">See Our AI in Action</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <AIInsights />
              <PortfolioAnalytics />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container">
            <motion.div 
              className="grid md:grid-cols-4 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-4xl font-bold text-primary mb-2">$5B+</h3>
                <p className="text-gray-600">Trading Volume</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-4xl font-bold text-primary mb-2">250K+</h3>
                <p className="text-gray-600">Active Users</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-4xl font-bold text-primary mb-2">4</h3>
                <p className="text-gray-600">Blockchain Networks</p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-4xl font-bold text-primary mb-2">99.9%</h3>
                <p className="text-gray-600">Security Uptime</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-20">
          <div className="container text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Start Trading?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust our platform for secure multi-chain trading with AI-powered insights
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/signup">Create Account</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white hover:text-primary" asChild>
                  <Link to="/login">Connect Wallet</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
};

export default Index;
