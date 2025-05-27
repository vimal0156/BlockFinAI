import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  type: "send" | "receive";
  amount: number;
  currency: string;
  symbol: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.type === "send" ? (
                        <ArrowUpRight className="w-4 h-4 mr-2 text-red-500" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 mr-2 text-green-500" />
                      )}
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={transaction.type === "send" ? "text-red-500" : "text-green-500"}>
                      {transaction.type === "send" ? "-" : "+"}
                      {transaction.symbol}
                      {transaction.amount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}