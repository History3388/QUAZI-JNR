import { POSScreen } from '../components/POSScreen';
import { ShoppingBag } from 'lucide-react';

export function RetailPOS() {
  return (
    <POSScreen
      customerType="retail"
      title="Retail POS"
      icon={<ShoppingBag className="w-8 h-8 text-blue-600" />}
    />
  );
}
