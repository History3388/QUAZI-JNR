import { POSScreen } from '../components/POSScreen';
import { Users } from 'lucide-react';

export function WholesalePOS() {
  return (
    <POSScreen
      customerType="wholesale"
      title="Wholesale POS"
      icon={<Users className="w-8 h-8 text-purple-600" />}
    />
  );
}
