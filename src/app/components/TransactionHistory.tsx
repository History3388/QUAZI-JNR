import { Transaction } from '../types/pos';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Receipt, Calendar, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const sortedTransactions = [...transactions].sort((a, b) => 
    b.date.getTime() - a.date.getTime()
  );

  const getPaymentIcon = (method: Transaction['paymentMethod']) => {
    switch (method) {
      case 'cash':
        return '💵';
      case 'card':
        return '💳';
      case 'digital':
        return '📱';
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Receipt className="w-5 h-5" />
        Recent Transactions
      </h2>

      <ScrollArea className="h-[600px]">
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTransactions.map((transaction) => (
              <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-sm">{transaction.id}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      {format(transaction.date, 'MMM dd, yyyy HH:mm')}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${transaction.total.toFixed(2)}</p>
                    <div className="flex gap-1 mt-1 justify-end">
                      <Badge variant={transaction.customerType === 'retail' ? 'default' : 'secondary'} className="text-xs">
                        {transaction.customerType}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  {transaction.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-medium">
                        ${((transaction.customerType === 'retail' 
                          ? item.product.retailPrice 
                          : item.product.wholesalePrice) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>{getPaymentIcon(transaction.paymentMethod)}</span>
                    <span className="capitalize">{transaction.paymentMethod}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {transaction.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
