'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShoppingCart, AlertCircle, Search } from 'lucide-react';
import { useMarketplace } from '@/hooks/useMarketplace';
import { useToken } from '@/hooks/useToken';
import { CategoryFilter } from '@/lib/contracts';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: number;
  seller: string;
  isActive: boolean;
}

export function ProductPurchase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(CategoryFilter.ALL);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const { 
    getActiveProducts, 
    purchaseProduct, 
    isLoading: marketplaceLoading, 
    error: marketplaceError 
  } = useMarketplace();
  
  const { 
    approveMarketplace, 
    hasEnoughAllowance, 
    hasEnoughBalance,
    formattedBalance,
    isLoading: tokenLoading 
  } = useToken();

  const categories = [
    { value: CategoryFilter.ALL, label: 'Todas' },
    { value: CategoryFilter.ELECTRONICS, label: 'Electronics' },
    { value: CategoryFilter.FURNITURE, label: 'Furniture' },
    { value: CategoryFilter.CLOTHING, label: 'Clothing' },
    { value: CategoryFilter.VEHICLES, label: 'Vehicles' },
    { value: CategoryFilter.OTHERS, label: 'Others' },
  ];

  // Cargar productos activos
  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const activeProducts = await getActiveProducts();
      setProducts(activeProducts);
      setFilteredProducts(activeProducts);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [getActiveProducts]);

  // Filtrar productos
  useEffect(() => {
    let filtered = products;

    // Filtrar por categoría
    if (selectedCategory !== CategoryFilter.ALL) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handlePurchase = async (product: Product) => {
    if (!hasEnoughBalance(product.price)) {
      alert(`Balance insuficiente. Balance actual: ${formattedBalance} KNQ`);
      return;
    }

    try {
      // Verificar allowance
      if (!hasEnoughAllowance(product.price)) {
        console.log('🔓 Aprobando tokens para el marketplace...');
        await approveMarketplace(product.price);
      }

      // Realizar compra
      await purchaseProduct(product.id);
      
      // Recargar productos para actualizar estado
      await loadProducts();
      
      alert('¡Compra realizada exitosamente!');
    } catch (error) {
      console.error('Error en la compra:', error);
      alert('Error al realizar la compra. Ver consola para detalles.');
    }
  };

  const getCategoryName = (categoryIndex: number) => {
    const category = categories.find(cat => cat.value === categoryIndex);
    return category ? category.label : 'Unknown';
  };

  const isLoading = marketplaceLoading || tokenLoading;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🛍️ Marketplace de Productos
          </CardTitle>
          <p className="text-sm text-gray-500">
            Balance disponible: {formattedBalance} KNQ
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {marketplaceError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={20} />
              <span>{marketplaceError}</span>
            </div>
          )}

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <Label htmlFor="search">Buscar productos</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="search"
                  type="text"
                  placeholder="Buscar por nombre o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtro de categoría */}
            <div className="sm:w-48">
              <Label>Categoría</Label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(parseInt(e.target.value) as CategoryFilter)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón recargar */}
            <div className="flex items-end">
              <Button
                onClick={loadProducts}
                disabled={isLoadingProducts}
                variant="outline"
              >
                {isLoadingProducts ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Recargar'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de productos */}
      {isLoadingProducts ? (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin mr-2" />
            <span>Cargando productos...</span>
          </CardContent>
        </Card>
      ) : filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="text-center p-8">
            <p className="text-gray-500">
              {products.length === 0 
                ? 'No hay productos disponibles en el marketplace' 
                : 'No se encontraron productos con los filtros aplicados'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/diverse-products-still-life.png';
                  }}
                />
                <Badge 
                  className="absolute top-2 right-2"
                  variant={product.isActive ? "default" : "secondary"}
                >
                  {getCategoryName(product.category)}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price} KNQ
                  </span>
                </div>
                
                <p className="text-xs text-gray-500 mb-3">
                  Vendedor: {`${product.seller.slice(0, 6)}...${product.seller.slice(-4)}`}
                </p>
                
                <Button
                  onClick={() => handlePurchase(product)}
                  disabled={isLoading || !product.isActive}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Comprar
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
