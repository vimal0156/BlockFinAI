
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Code, Eye, EyeOff, Shield, Terminal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AIHoneypot() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDeployed, setIsDeployed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  const { toast } = useToast();

  const handleDeploy = () => {
    setIsDeployed(true);
    toast({
      title: "Honeypot Deployed",
      description: "AI-generated honeypot has been deployed to the network",
    });
    
    // Simulate attack detection
    const interval = setInterval(() => {
      setDetectionCount(prev => {
        const newCount = prev + 1;
        toast({
          title: "Attack Attempt Detected",
          description: `Honeypot has detected an intrusion attempt from IP 175.45.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          variant: "destructive",
        });
        return newCount;
      });
    }, 15000);
    
    return () => clearInterval(interval);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            AI-Generated Honeypot System
          </CardTitle>
          {isDeployed && (
            <Badge variant="outline" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configure">Configure</TabsTrigger>
            <TabsTrigger value="detections">Detections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Our AI Honeypot system autonomously creates decoy smart contracts that appear vulnerable but actually detect and analyze attack attempts.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-medium mb-2">Active Traps</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{isDeployed ? '3' : '0'}</span>
                  <Badge>{isDeployed ? 'Monitoring' : 'Inactive'}</Badge>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-medium mb-2">Detected Attempts</h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{detectionCount}</span>
                  <Badge variant="outline" className={detectionCount > 0 ? "bg-red-100 text-red-800" : ""}>
                    {detectionCount > 0 ? 'Threats Detected' : 'No Threats'}
                  </Badge>
                </div>
              </div>
            </div>
            
            {!isDeployed ? (
              <Button onClick={handleDeploy} className="w-full mt-2">Deploy Honeypot System</Button>
            ) : (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button variant="outline" onClick={() => setShowDetails(!showDetails)}>
                  {showDetails ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </>
                  )}
                </Button>
                <Button variant="destructive" onClick={() => {
                  setIsDeployed(false);
                  toast({
                    title: "Honeypot Deactivated",
                    description: "Honeypot system has been shut down",
                  });
                }}>
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Deactivate
                </Button>
              </div>
            )}
            
            {showDetails && (
              <div className="mt-4 p-4 rounded-lg bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto">
                <div className="flex items-center text-zinc-500 mb-2">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span>Honeypot Contract</span>
                </div>
                <pre>{`// AI-GENERATED HONEYPOT CONTRACT
contract VulnerableWallet {
    mapping(address => uint) public balances;
    
    // Seemingly vulnerable function with overflow
    function deposit() public payable {
        balances[msg.sender] += msg.value;
        // Hidden monitoring code
        LogAttackAttempt(msg.sender);
    }
    
    // Function that appears to have reentrancy vulnerability
    function withdraw(uint _amount) public {
        require(balances[msg.sender] >= _amount);
        // This line appears to send ETH before updating state
        (bool success, ) = msg.sender.call{value: _amount}("");
        // But actually contains hidden protection
        if(success) {
            RecordWithdrawalPattern(msg.sender);
            balances[msg.sender] -= _amount;
        }
    }
    
    // Hidden functions not visible in bytecode
    function LogAttackAttempt(address attacker) internal { ... }
    function RecordWithdrawalPattern(address user) internal { ... }
}`}</pre>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="configure" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Honeypot Type</label>
                <select className="w-full p-2 rounded-md border mt-1">
                  <option>Standard Honeypot (Reentrancy Bait)</option>
                  <option>Flash Loan Vulnerability Simulation</option>
                  <option>Governance Attack Surface</option>
                  <option>Oracle Manipulation Bait</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Deployment Network</label>
                <select className="w-full p-2 rounded-md border mt-1">
                  <option>Ethereum Mainnet</option>
                  <option>Polygon</option>
                  <option>Avalanche</option>
                  <option>Arbitrum</option>
                  <option>Binance Smart Chain</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Response Mode</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Button variant="outline" className="justify-start">
                    <Code className="w-4 h-4 mr-2" />
                    Passive Monitoring
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Active Counterattack
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Advanced Settings</label>
                <div className="p-3 border rounded-lg mt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Log all interactions</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Alert on detection</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Share intelligence data</span>
                    <input type="checkbox" className="rounded" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detections" className="space-y-4">
            {detectionCount > 0 ? (
              <div className="space-y-3">
                {[...Array(detectionCount)].map((_, index) => (
                  <div key={index} className="p-3 rounded-lg border border-red-200 bg-red-50">
                    <div className="flex justify-between items-center mb-1">
                      <Badge variant="destructive" className="font-mono">
                        IP 175.45.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(Date.now() - 1000 * 60 * index).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">Attack Pattern: {
                      ['Reentrancy Exploit Attempt', 'Flash Loan Attack', 'Access Control Bypass', 'Integer Overflow Exploit'][index % 4]
                    }</p>
                    <div className="flex justify-between items-center mt-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">Block Address</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Attacks Detected</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Your honeypot system will log any detected attack attempts here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
