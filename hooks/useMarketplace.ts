'use client';

import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract, usePublicClient } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { KONEQUE_CONTRACTS } from '@/lib/contracts';
import { MARKETPLACE_CORE_ABI } from '@/lib/abis/MarketplaceCore';
import { uploadImageToIPFS, uploadProductMetadata } from '@/lib/ipfs';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  seller: string;
  isActive: boolean;
  createdAt: number;
}

interface Transaction {
  id: string;
  productId: string;
  buyer: string;
  seller: string;
  amount: string;
  status: number;
  createdAt: number;
  updatedAt: number;
}

export function useMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const publicClient = usePublicClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Leer productos activos
  const { data: activeItemIds, refetch: refetchActiveItems } = useReadContract({
    address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
    abi: MARKETPLACE_CORE_ABI,
    functionName: 'getActiveItems',
  });

  // Función para listar un producto
  const listProduct = useCallback(async (productData: {
    name: string;
    description: string;
    price: string;
    image: File;
    category: number;
  }) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('🚀 Iniciando listado de producto...');

      // 1. Subir imagen a IPFS
      console.log('📤 Subiendo imagen a IPFS...');
      const imageHash = await uploadImageToIPFS(productData.image);

      // 2. Subir metadata a IPFS
      console.log('📤 Subiendo metadata a IPFS...');
      const metadataHash = await uploadProductMetadata({
        name: productData.name,
        description: productData.description,
        imageHash,
        category: getCategoryName(productData.category),
      });

      // 3. Listar producto en el contrato
      console.log('📝 Listando producto en blockchain...');
      const priceInWei = parseEther(productData.price);

      await writeContract({
        address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
        abi: MARKETPLACE_CORE_ABI,
        functionName: 'listItem',
        args: [
          productData.name,
          productData.description,
          priceInWei,
          metadataHash,
          productData.category
        ],
      });

      console.log('✅ Producto listado exitosamente');
      await refetchActiveItems();
      
      return { imageHash, metadataHash };
    } catch (error) {
      console.error('❌ Error listando producto:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract, refetchActiveItems]);

  // Función para comprar un producto
  const buyProduct = useCallback(async (itemId: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('🛒 Iniciando compra de producto...');

      await writeContract({
        address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
        abi: MARKETPLACE_CORE_ABI,
        functionName: 'buyItem',
        args: [BigInt(itemId)],
      });

      console.log('✅ Producto comprado exitosamente');
      await refetchActiveItems();
    } catch (error) {
      console.error('❌ Error comprando producto:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract, refetchActiveItems]);

  // Función para confirmar entrega
  const confirmDelivery = useCallback(async (transactionId: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('📦 Confirmando entrega...');

      await writeContract({
        address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
        abi: MARKETPLACE_CORE_ABI,
        functionName: 'confirmDelivery',
        args: [BigInt(transactionId)],
      });

      console.log('✅ Entrega confirmada exitosamente');
    } catch (error) {
      console.error('❌ Error confirmando entrega:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract]);

  // Función para finalizar transacción
  const finalizeTransaction = useCallback(async (transactionId: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('✅ Finalizando transacción...');

      await writeContract({
        address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
        abi: MARKETPLACE_CORE_ABI,
        functionName: 'finalizeTransaction',
        args: [BigInt(transactionId)],
      });

      console.log('✅ Transacción finalizada exitosamente');
    } catch (error) {
      console.error('❌ Error finalizando transacción:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract]);

  // Función para iniciar disputa
  const initiateDispute = useCallback(async (transactionId: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('⚖️ Iniciando disputa...');

      await writeContract({
        address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
        abi: MARKETPLACE_CORE_ABI,
        functionName: 'initiateDispute',
        args: [BigInt(transactionId)],
      });

      console.log('✅ Disputa iniciada exitosamente');
    } catch (error) {
      console.error('❌ Error iniciando disputa:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract]);

  // Función para obtener productos activos con detalles completos
  const getActiveProducts = useCallback(async () => {
    if (!activeItemIds || !publicClient) return [];
    
    try {
      const products = await Promise.all(
        activeItemIds.map(async (id) => {
          const product = await publicClient.readContract({
            address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
            abi: MARKETPLACE_CORE_ABI,
            functionName: 'getItem',
            args: [id],
          });

          // Obtener metadata de IPFS
          let imageUrl = '/diverse-products-still-life.png';
          try {
            const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${product.imageHash}`;
            const response = await fetch(ipfsUrl);
            if (response.ok) {
              imageUrl = ipfsUrl;
            }
          } catch (error) {
            console.error('Error obteniendo imagen de IPFS:', error);
          }

          return {
            id: Number(id),
            name: product.name,
            description: product.description,
            price: formatEther(product.price),
            imageUrl,
            category: Number(product.category),
            seller: product.seller,
            isActive: product.isActive,
          };
        })
      );

      return products.filter(p => p.isActive);
    } catch (error) {
      console.error('Error obteniendo productos activos:', error);
      throw error;
    }
  }, [activeItemIds, publicClient]);

  // Función para comprar producto
  const purchaseProduct = useCallback(async (productId: number) => {
    if (!address) {
      throw new Error('Wallet no conectada');
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🛒 Iniciando compra de producto...');

      // Obtener detalles del producto
      if (!publicClient) throw new Error('Client no disponible');
      
      const product = await publicClient.readContract({
        address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
        abi: MARKETPLACE_CORE_ABI,
        functionName: 'getItem',
        args: [BigInt(productId)],
      });

      if (!product.isActive) {
        throw new Error('Producto no disponible');
      }

      // Ejecutar compra
      await writeContract({
        address: KONEQUE_CONTRACTS.MARKETPLACE_CORE,
        abi: MARKETPLACE_CORE_ABI,
        functionName: 'buyItem',
        args: [BigInt(productId)],
      });

      console.log('✅ Producto comprado exitosamente');
      
      // Actualizar lista de items activos
      await refetchActiveItems();

    } catch (error) {
      console.error('❌ Error comprando producto:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract, refetchActiveItems, publicClient]);

  return {
    // Estados
    isLoading,
    error,
    activeItemIds,
    
    // Funciones
    listProduct,
    buyProduct,
    getActiveProducts,
    purchaseProduct,
    confirmDelivery,
    finalizeTransaction,
    initiateDispute,
    refetchActiveItems,
  };
}

// Función auxiliar para obtener nombre de categoría
function getCategoryName(category: number): string {
  const categories = ['Electronics', 'Furniture', 'Clothing', 'Vehicles', 'Others'];
  return categories[category] || 'Others';
}
