
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Code, CheckCircle2, AlertTriangle, 
  ShieldAlert, LockKeyhole, FileWarning 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VulnerabilityIssue {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  lineNumber?: number;
}

export function SmartContractAudit() {
  const [contractAddress, setContractAddress] = useState("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [auditResult, setAuditResult] = useState<{
    score: number;
    issues: VulnerabilityIssue[];
    zeroKnowledgeVerified: boolean;
  } | null>(null);
  const { toast } = useToast();

  const runAudit = () => {
    setIsAnalyzing(true);
    setProgress(0);
    setAuditResult(null);
    
    // Simulate audit process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 5, 100);
        if (newProgress === 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          generateMockAuditResults();
          toast({
            title: "Smart Contract Audit Complete",
            description: "AI analysis completed with zero-knowledge verification",
          });
        }
        return newProgress;
      });
    }, 400);
  };

  const generateMockAuditResults = () => {
    // Simulate vulnerability findings
    const mockIssues: VulnerabilityIssue[] = [
      {
        id: "SC-01",
        severity: "medium",
        title: "Unprotected Ether Withdrawal",
        description: "The contract allows ether withdrawal without proper role verification. Implement access controls."
      },
      {
        id: "SC-02",
        severity: "high",
        title: "Reentrancy Risk in External Call",
        description: "External call is made before state changes, creating potential reentrancy attack vector."
      },
      {
        id: "SC-03",
        severity: "low",
        title: "Inefficient Gas Usage",
        description: "Multiple redundant storage operations increase gas cost unnecessarily."
      }
    ];
    
    // 30% chance to have a critical vulnerability
    if (Math.random() < 0.3) {
      mockIssues.push({
        id: "SC-04",
        severity: "critical",
        title: "Unchecked Return Value",
        description: "Failed transfers don't revert, potentially leading to loss of funds."
      });
    }
    
    // Calculate security score based on issues
    const securityScore = Math.max(20, 100 - (
      mockIssues.filter(i => i.severity === "critical").length * 35 +
      mockIssues.filter(i => i.severity === "high").length * 15 +
      mockIssues.filter(i => i.severity === "medium").length * 8 +
      mockIssues.filter(i => i.severity === "low").length * 3
    ));
    
    setAuditResult({
      score: securityScore,
      issues: mockIssues,
      zeroKnowledgeVerified: Math.random() > 0.2 // 80% chance of ZKP verification
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          Smart Contract AI Audit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          AI-powered audit with zero-knowledge proof verification for smart contract security analysis.
        </div>
        
        <div className="flex items-center gap-2">
          <Input
            value={contractAddress}
            onChange={e => setContractAddress(e.target.value)}
            placeholder="Smart contract address"
            className="font-mono text-sm"
          />
          <Button 
            onClick={runAudit} 
            disabled={isAnalyzing || !contractAddress}
          >
            Audit
          </Button>
        </div>
        
        {isAnalyzing && (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Audit Progress</span>
              <span className="text-sm">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              {progress < 20 ? "Downloading contract bytecode..." : 
              progress < 40 ? "Decompiling contract..." : 
              progress < 60 ? "Analyzing control flow..." : 
              progress < 80 ? "Checking for vulnerabilities..." : 
              "Verifying with ZK proofs..."}
            </p>
          </div>
        )}
        
        {auditResult && (
          <div className="space-y-4">
            <div className="flex flex-col items-center p-4 border rounded-lg">
              <div className="text-2xl font-bold mb-2">{auditResult.score}/100</div>
              <div className={`text-sm font-medium ${
                auditResult.score > 80 ? "text-green-500" : 
                auditResult.score > 60 ? "text-amber-500" : 
                "text-red-500"
              }`}>
                {auditResult.score > 80 ? "Secure" : 
                 auditResult.score > 60 ? "Needs Attention" : 
                 "High Risk"}
              </div>
              <div className="flex items-center mt-2 text-xs">
                {auditResult.zeroKnowledgeVerified ? (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <LockKeyhole className="h-3 w-3" />
                    ZK Verified
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1 bg-amber-100">
                    <ShieldAlert className="h-3 w-3" />
                    ZK Verification Failed
                  </Badge>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Security Issues ({auditResult.issues.length})</h3>
              <div className="space-y-2">
                {auditResult.issues.map((issue, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="font-mono text-xs">{issue.id}</div>
                      <Badge 
                        variant={
                          issue.severity === "critical" ? "destructive" : 
                          issue.severity === "high" ? "destructive" : 
                          issue.severity === "medium" ? "outline" : 
                          "default"
                        }
                        className={
                          issue.severity === "critical" ? "bg-red-500" : 
                          issue.severity === "high" ? "bg-red-400" : 
                          issue.severity === "medium" ? "bg-amber-100 text-amber-800" : 
                          "bg-green-100 text-green-800"
                        }
                      >
                        {issue.severity === "critical" || issue.severity === "high" ? 
                          <AlertTriangle className="mr-1 h-3 w-3" /> : 
                          issue.severity === "medium" ? 
                          <FileWarning className="mr-1 h-3 w-3" /> : 
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        }
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium text-sm">{issue.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{issue.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
