'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { useMarketplace } from '@/hooks/useMarketplace';
import { useToken } from '@/hooks/useToken';
import { compressImage } from '@/lib/ipfs';

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  category: number;
  image: File | null;
}

export function ProductListing() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: 0,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const { listProduct, isLoading: marketplaceLoading, error: marketplaceError } = useMarketplace();
  const { 
    approveMarketplace, 
    hasEnoughAllowance, 
    hasEnoughBalance,
    formattedBalance,
    isLoading: tokenLoading 
  } = useToken();

  const categories = [
    'Electronics',
    'Furniture', 
    'Clothing',
    'Vehicles',
    'Others'
  ];

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Comprimir imagen antes de procesar
        const compressedFile = await compressImage(file, 800, 0.8);
        setFormData({ ...formData, image: compressedFile });
        
        // Crear preview
        const previewUrl = URL.createObjectURL(compressedFile);
        setImagePreview(previewUrl);
      } catch (error) {
        console.error('Error comprimiendo imagen:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.image) {
      alert('Por favor selecciona una imagen');
      return;
    }

    if (!hasEnoughBalance(formData.price)) {
      alert(`Balance insuficiente. Balance actual: ${formattedBalance} KNQ`);
      return;
    }

    try {
      // Verificar allowance
      if (!hasEnoughAllowance(formData.price)) {
        console.log('🔓 Aprobando tokens para el marketplace...');
        await approveMarketplace(formData.price);
      }

      // Listar producto
      await listProduct({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        image: formData.image,
        category: formData.category,
      });

      // Limpiar formulario
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 0,
        image: null,
      });
      setImagePreview('');
      
      alert('¡Producto listado exitosamente!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al listar producto. Ver consola para detalles.');
    }
  };

  const isLoading = marketplaceLoading || tokenLoading;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📦 Listar Nuevo Producto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {(marketplaceError) && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={20} />
            <span>{marketplaceError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre del producto */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Producto</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ej. iPhone 15 Pro Max"
              required
            />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe tu producto en detalle..."
              rows={4}
              required
            />
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="price">Precio (KNQ)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              required
            />
            <p className="text-sm text-gray-500">
              Balance disponible: {formattedBalance} KNQ
            </p>
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, category: parseInt(value) })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <Label htmlFor="image">Imagen del Producto</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImagePreview('');
                      setFormData({ ...formData, image: null });
                    }}
                  >
                    Cambiar Imagen
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label htmlFor="image" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Seleccionar imagen
                      </span>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botón de envío */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              'Listar Producto'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
