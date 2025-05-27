
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Key, AlertTriangle, FileSearch, Code, Cpu, Brain, Fingerprint } from "lucide-react";
import { BlockchainFraudDetection } from "@/components/BlockchainFraudDetection";
import { SmartContractAudit } from "@/components/SmartContractAudit";
import { AIHoneypot } from "@/components/AIHoneypot";
import { BlackSwanDetection } from "@/components/BlackSwanDetection";
import { BiometricVerification } from "@/components/BiometricVerification";

const Security = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="text-4xl font-bold">Security Center</h1>
      </div>

      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">Protected</p>
              <p className="text-sm text-muted-foreground">All systems secure</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Auth Factors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3/3</p>
              <p className="text-sm text-muted-foreground">Active security factors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Threat Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">Low</p>
              <p className="text-sm text-muted-foreground">No active threats</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="fraud" className="space-y-4">
          <TabsList className="grid grid-cols-2 sm:grid-cols-6 w-full">
            <TabsTrigger value="fraud" className="flex items-center gap-1">
              <FileSearch className="h-4 w-4" />
              Fraud Detection
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-1">
              <Code className="h-4 w-4" />
              Smart Contracts
            </TabsTrigger>
            <TabsTrigger value="honeypot" className="flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              AI Honeypots
            </TabsTrigger>
            <TabsTrigger value="blackswan" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              Black Swan
            </TabsTrigger>
            <TabsTrigger value="biometric" className="flex items-center gap-1">
              <Fingerprint className="h-4 w-4" />
              Biometric AI
            </TabsTrigger>
            <TabsTrigger value="keys">
              <Key className="h-4 w-4" />
              Keys
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fraud" className="grid md:grid-cols-2 gap-6">
            <BlockchainFraudDetection />
            <Card>
              <CardHeader>
                <CardTitle>Transaction Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our system uses quantum-resistant Graph Neural Networks to analyze transaction patterns and detect anomalies in real-time.
                </p>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Pattern Recognition</div>
                    <p className="text-sm text-muted-foreground">Identifies suspicious transaction patterns using advanced machine learning algorithms.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Real-time Monitoring</div>
                    <p className="text-sm text-muted-foreground">Continuously monitors blockchain activity to detect and prevent fraud attempts.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Risk Scoring</div>
                    <p className="text-sm text-muted-foreground">Assigns risk scores to transactions based on multiple security factors.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contracts" className="grid md:grid-cols-2 gap-6">
            <SmartContractAudit />
            <Card>
              <CardHeader>
                <CardTitle>Self-Verifying Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our platform implements AI-driven autonomous auditing with zero-knowledge proofs for privacy-preserving verification.
                </p>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Autonomous Auditing</div>
                    <p className="text-sm text-muted-foreground">AI algorithms continuously verify contract integrity and security.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Zero-Knowledge Proofs</div>
                    <p className="text-sm text-muted-foreground">Privacy-preserving verification that doesn't expose sensitive transaction details.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Formal Verification</div>
                    <p className="text-sm text-muted-foreground">Mathematical validation of contract logic to prevent security flaws.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="honeypot" className="grid md:grid-cols-2 gap-6">
            <AIHoneypot />
            <Card>
              <CardHeader>
                <CardTitle>Honeypot Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI-driven honeypots trap malicious actors by luring them into fake smart contracts with exploit detection.
                </p>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Adaptive Deception</div>
                    <p className="text-sm text-muted-foreground">AI creates convincing decoy contracts that mimic vulnerable systems to attract attackers.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Behavior Analysis</div>
                    <p className="text-sm text-muted-foreground">Records and analyzes hacker techniques to strengthen platform security.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Threat Intelligence</div>
                    <p className="text-sm text-muted-foreground">Shares anonymized attack patterns with the security community.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="blackswan" className="grid md:grid-cols-2 gap-6">
            <BlackSwanDetection />
            <Card>
              <CardHeader>
                <CardTitle>Extreme Event Simulation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our AI simulates rare but high-impact "black swan" events to help you prepare for market extremes.
                </p>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Tail Risk Modeling</div>
                    <p className="text-sm text-muted-foreground">Uses extreme value theory and Monte Carlo simulations to model rare events.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Flash Crash Protection</div>
                    <p className="text-sm text-muted-foreground">Develops automated safeguards against sudden market collapses.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Regulatory Scenario Planning</div>
                    <p className="text-sm text-muted-foreground">Anticipates possible regulatory changes and their impact on your portfolio.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="biometric" className="grid md:grid-cols-2 gap-6">
            <BiometricVerification />
            <Card>
              <CardHeader>
                <CardTitle>Deepfake-Proof Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our advanced biometric AI prevents identity fraud with industry-leading deepfake detection.
                </p>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Multi-Modal Verification</div>
                    <p className="text-sm text-muted-foreground">Combines facial, voice, and behavioral patterns for comprehensive identity confirmation.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Neural ODE Detection</div>
                    <p className="text-sm text-muted-foreground">Uses differential equations to spot the subtle artifacts present in deepfake content.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">GAN Adversarial Detection</div>
                    <p className="text-sm text-muted-foreground">Leverages the same technology used to create deepfakes to detect and prevent them.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="keys">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Private Key Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your private keys are securely stored using quantum-resistant encryption methods.
                  </p>
                  {/* Additional content for private key management */}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recovery Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Multiple secure recovery methods are available to ensure you never lose access to your assets.
                  </p>
                  {/* Additional content for recovery options */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Security;
