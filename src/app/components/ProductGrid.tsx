import { Product, CustomerType } from '../types/pos';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Plus, Package } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  customerType: CustomerType;
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  selectedCategory: string;
}

export function ProductGrid({ products, customerType, onAddToCart, searchQuery, selectedCategory }: ProductGridProps) {
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getPrice = (product: Product) => {
    return customerType === 'retail' ? product.retailPrice : product.wholesalePrice;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex flex-col h-full">
            <div className="bg-gray-100 rounded-lg flex items-center justify-center h-32 mb-3">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">SKU: {product.sku}</p>
              
              <div className="flex items-center justify-between mb-2">
                <Badge variant={product.stock > 20 ? "default" : product.stock > 0 ? "outline" : "destructive"}>
                  {product.stock} in stock
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-lg">${getPrice(product).toFixed(2)}</p>
                  {customerType === 'wholesale' && (
                    <p className="text-xs text-gray-500 line-through">${product.retailPrice.toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>
            
            <Button
              onClick={() => onAddToCart(product)}
              disabled={product.stock === 0}
              className="mt-3 w-full"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </Card>
      ))}
      
      {filteredProducts.length === 0 && (
        <div className="col-span-full text-center py-12 text-gray-500">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}
