import { useEffect, useState } from 'react';
import { useWeb3 } from '@/lib/web3';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Balance {
  crypto: string;
  fiat: string;
  currency: string;
}

export function WalletBalance() {
  const { getBalances, isConnected } = useWeb3();
  const [balances, setBalances] = useState<Balance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBalances = async () => {
      try {
        const data = await getBalances();
        setBalances(data);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) loadBalances();
  }, [isConnected]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Balances</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {balances.map((balance) => (
              <div key={balance.crypto} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{balance.crypto}</span>
                  <span className="text-lg font-semibold">
                    {balance.currency} {parseFloat(balance.fiat).toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full">
                  <div 
                    className="bg-primary h-full rounded-full transition-all"
                    style={{ 
                      width: `${Math.min((parseFloat(balance.fiat) / 100000) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}