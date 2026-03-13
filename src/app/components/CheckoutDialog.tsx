import { useState } from 'react';
import { CartItem, CustomerType, Transaction } from '../types/pos';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CreditCard, Banknote, Smartphone } from 'lucide-react';

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  customerType: CustomerType;
  subtotal: number;
  tax: number;
  total: number;
  onComplete: (transaction: Transaction) => void;
}

export function CheckoutDialog({
  open,
  onOpenChange,
  items,
  customerType,
  subtotal,
  tax,
  total,
  onComplete,
}: CheckoutDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'digital'>('card');
  const [processing, setProcessing] = useState(false);

  const handleCheckout = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const transaction: Transaction = {
        id: `TXN-${Date.now()}`,
        date: new Date(),
        customerType,
        items,
        subtotal,
        tax,
        total,
        paymentMethod,
      };
      
      onComplete(transaction);
      setProcessing(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Select a payment method to complete the transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <Label className="mb-3 block">Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <CreditCard className="w-5 h-5" />
                  <span>Credit/Debit Card</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <Banknote className="w-5 h-5" />
                  <span>Cash</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                <RadioGroupItem value="digital" id="digital" />
                <Label htmlFor="digital" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <Smartphone className="w-5 h-5" />
                  <span>Digital Wallet</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={processing}>
            Cancel
          </Button>
          <Button onClick={handleCheckout} disabled={processing}>
            {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
