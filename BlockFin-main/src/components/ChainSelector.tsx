
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWeb3 } from "@/lib/web3";

const chainConfigs = [
  { id: '1', name: 'Ethereum', symbol: 'ETH', icon: '⟠' },
  { id: '56', name: 'BNB Chain', symbol: 'BNB', icon: '⛓️' },
  { id: '137', name: 'Polygon', symbol: 'MATIC', icon: '⬡' },
  { id: '43114', name: 'Avalanche', symbol: 'AVAX', icon: '🔺' },
];

export function ChainSelector() {
  const { currentChain, switchChain } = useWeb3();

  return (
    <Select
      value={currentChain}
      onValueChange={(value) => switchChain(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select chain" />
      </SelectTrigger>
      <SelectContent>
        {chainConfigs.map((chain) => (
          <SelectItem key={chain.id} value={chain.id}>
            <div className="flex items-center gap-2">
              <span>{chain.icon}</span>
              <span>{chain.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
