import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Store, ShoppingBag, Users, ArrowRight, LogOut } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1" />
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl">
              <Store className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 flex justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-2">Welcome, {user?.name}!</p>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">POS System</h1>
          <p className="text-xl text-gray-600">
            Professional Point of Sale for Retail & Wholesale
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Retail Card */}
          <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-500 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <ShoppingBag className="w-12 h-12 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Retail</h2>
              
              <p className="text-gray-600 mb-6 text-lg">
                Standard retail pricing for individual customers and walk-in sales
              </p>
              
              <ul className="text-left space-y-3 mb-8 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Consumer pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Quick checkout process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Individual item sales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Receipt generation</span>
                </li>
              </ul>
              
              <Button
                size="lg"
                className="w-full text-lg h-14 group-hover:bg-blue-700"
                onClick={() => navigate('/retail')}
              >
                Open Retail POS
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>

          {/* Wholesale Card */}
          <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-500 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
                <Users className="w-12 h-12 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Wholesale</h2>
              
              <p className="text-gray-600 mb-6 text-lg">
                Discounted wholesale pricing for bulk orders and business customers
              </p>
              
              <ul className="text-left space-y-3 mb-8 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Wholesale pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Bulk order management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Business customer accounts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">✓</span>
                  <span>Volume discounts</span>
                </li>
              </ul>
              
              <Button
                size="lg"
                className="w-full text-lg h-14 bg-purple-600 hover:bg-purple-700"
                onClick={() => navigate('/wholesale')}
              >
                Open Wholesale POS
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>Switch between modes anytime • Track all transactions • Manage inventory</p>
        </div>
      </div>
    </div>
  );
}