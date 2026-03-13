import { useState } from 'react';
import { Product, CartItem, CustomerType, Transaction } from '../types/pos';
import { sampleProducts } from '../data/products';
import { ProductGrid } from './ProductGrid';
import { Cart } from './Cart';
import { CheckoutDialog } from './CheckoutDialog';
import { ReceiptDialog } from './ReceiptDialog';
import { TransactionHistory } from './TransactionHistory';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Search, Store, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

interface POSScreenProps {
  customerType: CustomerType;
  title: string;
  icon: React.ReactNode;
}

export function POSScreen({ customerType, title, icon }: POSScreenProps) {
  const navigate = useNavigate();
  const [products] = useState<Product[]>(sampleProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const TAX_RATE = 0.08;

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast.error('Not enough stock available');
        return;
      }
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart(cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const handleRemoveItem = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
    toast.info('Item removed from cart');
  };

  const getPrice = (item: CartItem) => {
    return customerType === 'retail' ? item.product.retailPrice : item.product.wholesalePrice;
  };

  const subtotal = cart.reduce((sum, item) => sum + getPrice(item) * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    setCheckoutOpen(true);
  };

  const handleCompleteTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions]);
    setLastTransaction(transaction);
    setCart([]);
    setCheckoutOpen(false);
    setReceiptOpen(true);
    toast.success('Transaction completed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="mr-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                {icon}
                <div>
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="text-sm text-gray-600">Point of Sale System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge 
                variant={customerType === 'retail' ? 'default' : 'secondary'}
                className="text-base px-4 py-2"
              >
                {customerType === 'retail' ? 'Retail Pricing' : 'Wholesale Pricing'}
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="history">Transaction History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="space-y-4">
                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Product Grid */}
                <ProductGrid
                  products={products}
                  customerType={customerType}
                  onAddToCart={handleAddToCart}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                />
              </TabsContent>

              <TabsContent value="history">
                <TransactionHistory transactions={transactions} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Section */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Cart
              items={cart}
              customerType={customerType}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </main>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        items={cart}
        customerType={customerType}
        subtotal={subtotal}
        tax={tax}
        total={total}
        onComplete={handleCompleteTransaction}
      />

      {/* Receipt Dialog */}
      <ReceiptDialog
        open={receiptOpen}
        onOpenChange={setReceiptOpen}
        transaction={lastTransaction}
      />
    </div>
  );
}
