import { CartItem, CustomerType } from '../types/pos';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Badge } from './ui/badge';

interface CartProps {
  items: CartItem[];
  customerType: CustomerType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, customerType, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const TAX_RATE = 0.08; // 8% tax

  const getPrice = (item: CartItem) => {
    return customerType === 'retail' ? item.product.retailPrice : item.product.wholesalePrice;
  };

  const subtotal = items.reduce((sum, item) => sum + getPrice(item) * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart
        </h2>
        <Badge variant={customerType === 'retail' ? 'default' : 'secondary'}>
          {customerType === 'retail' ? 'Retail' : 'Wholesale'}
        </Badge>
      </div>

      <Separator className="mb-4" />

      <div className="flex-1 overflow-auto space-y-3 mb-4">
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Cart is empty</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.product.id} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.product.name}</h4>
                  <p className="text-xs text-gray-500">{item.product.sku}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.product.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-medium w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(getPrice(item) * item.quantity).toFixed(2)}</p>
                  <p className="text-xs text-gray-500">${getPrice(item).toFixed(2)} each</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <>
          <Separator className="mb-4" />
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax (8%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            size="lg"
            className="w-full"
          >
            Checkout
          </Button>
        </>
      )}
    </Card>
  );
}
