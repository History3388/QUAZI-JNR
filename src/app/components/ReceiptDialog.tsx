import { Transaction } from '../types/pos';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { format } from 'date-fns';
import { Printer, Download, CheckCircle } from 'lucide-react';

interface ReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export function ReceiptDialog({ open, onOpenChange, transaction }: ReceiptDialogProps) {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <DialogTitle className="text-center">Payment Successful!</DialogTitle>
            <DialogDescription className="text-center">
              Transaction #{transaction.id}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="bg-white p-6 rounded-lg border">
          <div className="text-center mb-4">
            <h3 className="font-bold text-lg">POS System</h3>
            <p className="text-sm text-gray-600">Thank you for your purchase</p>
            <p className="text-xs text-gray-500 mt-1">
              {format(transaction.date, 'MMMM dd, yyyy - HH:mm:ss')}
            </p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2 mb-4">
            {transaction.items.map((item, idx) => {
              const price = transaction.customerType === 'retail' 
                ? item.product.retailPrice 
                : item.product.wholesalePrice;
              return (
                <div key={idx} className="flex justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} x ${price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-medium">${(price * item.quantity).toFixed(2)}</p>
                </div>
              );
            })}
          </div>

          <Separator className="my-4" />

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${transaction.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="font-medium">${transaction.tax.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${transaction.total.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Customer Type:</span>
              <span className="font-medium capitalize">{transaction.customerType}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span className="font-medium capitalize">{transaction.paymentMethod}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row gap-2">
          <Button variant="outline" onClick={handlePrint} className="flex-1">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Save
          </Button>
        </DialogFooter>

        <Button onClick={() => onOpenChange(false)} className="w-full">
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
}
