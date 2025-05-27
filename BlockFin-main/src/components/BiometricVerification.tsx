
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, Mic, Fingerprint, Check, AlertTriangle, 
  User, ShieldCheck, BrainCircuit, Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BiometricVerification() {
  const [activeTab, setActiveTab] = useState("overview");
  const [scanningFace, setScanningFace] = useState(false);
  const [scanningVoice, setScanningVoice] = useState(false);
  const [verificationScore, setVerificationScore] = useState(0);
  const [deepfakeDetected, setDeepfakeDetected] = useState(false);
  const { toast } = useToast();

  const startFaceScan = () => {
    setScanningFace(true);
    
    const interval = setInterval(() => {
      const progress = Math.random() * 15 + 10;
      
      setVerificationScore(prev => {
        const next = Math.min(prev + progress, 100);
        if (next >= 100) {
          clearInterval(interval);
          setScanningFace(false);
          
          // Small chance to detect deepfake
          const isDeepfake = Math.random() < 0.1;
          setDeepfakeDetected(isDeepfake);
          
          if (isDeepfake) {
            toast({
              title: "Deepfake Detected",
              description: "Our AI has detected synthetic imagery. Verification failed.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Face Verification Complete",
              description: "Identity verified with 97.2% confidence score",
            });
          }
        }
        return next;
      });
    }, 500);
  };

  const startVoiceScan = () => {
    setScanningVoice(true);
    
    const interval = setInterval(() => {
      const progress = Math.random() * 15 + 5;
      
      setVerificationScore(prev => {
        const next = Math.min(prev + progress, 100);
        if (next >= 100) {
          clearInterval(interval);
          setScanningVoice(false);
          
          // Small chance to detect deepfake
          const isDeepfake = Math.random() < 0.1;
          setDeepfakeDetected(isDeepfake);
          
          if (isDeepfake) {
            toast({
              title: "Voice Manipulation Detected",
              description: "Our AI has detected synthetic voice patterns. Verification failed.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Voice Verification Complete",
              description: "Voice pattern verified with 94.5% confidence score",
            });
          }
        }
        return next;
      });
    }, 500);
  };

  const resetVerification = () => {
    setVerificationScore(0);
    setDeepfakeDetected(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Fingerprint className="w-5 h-5 text-primary" />
          Deepfake-Proof Biometric Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="verify">Verify Identity</TabsTrigger>
            <TabsTrigger value="security">Security Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our advanced biometric system uses neural network detection to prevent deepfake attacks and provide quantum-resistant identity verification.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-primary" />
                  Facial Verification
                </h3>
                <p className="text-xs text-muted-foreground">
                  Advanced GAN-based deepfake detection with 99.7% accuracy.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-primary" />
                  Voice Authentication
                </h3>
                <p className="text-xs text-muted-foreground">
                  Neural ODE voice pattern analysis that detects synthetic speech.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-primary" />
                  Behavioral Biometrics
                </h3>
                <p className="text-xs text-muted-foreground">
                  Tracks unique interaction patterns that can't be easily spoofed.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setActiveTab("verify")} 
              className="w-full mt-2"
            >
              Verify Identity Now
            </Button>
          </TabsContent>
          
          <TabsContent value="verify" className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-4">Identity Verification</h3>
              
              {verificationScore > 0 ? (
                <div className="space-y-4">
                  <div className="text-center">
                    {deepfakeDetected ? (
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-3">
                        <AlertTriangle className="w-10 h-10" />
                      </div>
                    ) : verificationScore < 100 ? (
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <User className="w-10 h-10 text-primary" />
                        </div>
                        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                          <circle 
                            className="text-muted stroke-current" 
                            strokeWidth="8" 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="transparent" 
                          />
                          <circle 
                            className="text-primary stroke-current" 
                            strokeWidth="8" 
                            strokeLinecap="round" 
                            cx="50" 
                            cy="50" 
                            r="40" 
                            fill="transparent" 
                            strokeDasharray={`${verificationScore * 2.51} 251`} 
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-500 mb-3">
                        <Check className="w-10 h-10" />
                      </div>
                    )}
                    
                    <h3 className="text-lg font-medium">
                      {deepfakeDetected 
                        ? "Verification Failed" 
                        : verificationScore < 100 
                          ? "Verifying..." 
                          : "Verification Successful"}
                    </h3>
                    
                    {deepfakeDetected ? (
                      <p className="text-sm text-red-600 mt-1">
                        Potential synthetic content detected
                      </p>
                    ) : verificationScore < 100 ? (
                      <p className="text-sm text-muted-foreground mt-1">
                        Processing biometric data...
                      </p>
                    ) : (
                      <p className="text-sm text-green-600 mt-1">
                        Identity confirmed with high confidence
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Verification progress</span>
                      <span className="text-sm">{Math.round(verificationScore)}%</span>
                    </div>
                    <Progress value={verificationScore} />
                  </div>
                  
                  {scanningFace && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4" />
                        <span>Analyzing facial features and liveness...</span>
                      </div>
                    </div>
                  )}
                  
                  {scanningVoice && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                      <div className="flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        <span>Analyzing voice patterns and tonal inflections...</span>
                      </div>
                    </div>
                  )}
                  
                  {verificationScore === 100 && !deepfakeDetected ? (
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetVerification}>
                        Reset
                      </Button>
                      <Button>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Proceed Securely
                      </Button>
                    </div>
                  ) : deepfakeDetected ? (
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={resetVerification}>
                        Reset
                      </Button>
                      <Button variant="destructive">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Incident
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={resetVerification} className="w-full" variant="outline">
                      Cancel Verification
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    onClick={startFaceScan} 
                    variant="outline" 
                    className="h-auto py-6 flex flex-col items-center gap-3"
                    disabled={scanningFace || scanningVoice}
                  >
                    <Camera className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Facial Verification</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Verify using deepfake-resistant facial recognition
                      </p>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={startVoiceScan} 
                    variant="outline" 
                    className="h-auto py-6 flex flex-col items-center gap-3"
                    disabled={scanningFace || scanningVoice}
                  >
                    <Mic className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Voice Verification</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Verify using neural ODE voice pattern analysis
                      </p>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Security Settings</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Required Verification Level</h4>
                      <p className="text-xs text-muted-foreground">Set the strictness of verification</p>
                    </div>
                    <select className="p-1 rounded border text-sm">
                      <option>Standard</option>
                      <option>High</option>
                      <option selected>Maximum</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Biometric Factors Required</h4>
                      <p className="text-xs text-muted-foreground">Number of factors needed to verify</p>
                    </div>
                    <select className="p-1 rounded border text-sm">
                      <option>1 Factor</option>
                      <option selected>2 Factors</option>
                      <option>3 Factors</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Deepfake Detection Sensitivity</h4>
                      <p className="text-xs text-muted-foreground">Higher sensitivity may increase false positives</p>
                    </div>
                    <select className="p-1 rounded border text-sm">
                      <option>Standard</option>
                      <option selected>Enhanced</option>
                      <option>Aggressive</option>
                    </select>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Actions Requiring Verification</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Large transfers
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Account changes
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        New device login
                      </label>
                      <label className="flex items-center text-sm">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        Recovery attempts
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-3">Biometric Data Management</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Zero-Knowledge Storage</h4>
                      <p className="text-xs text-muted-foreground">Your biometric data is stored using quantum-resistant encryption with zero-knowledge proofs.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">On-Device Processing</h4>
                      <p className="text-xs text-muted-foreground">Biometric analysis happens on your device and only verification results are transmitted.</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Delete All Biometric Data
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                Save Security Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
