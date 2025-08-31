'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ProductListing } from '@/components/ProductListing';
import { ProductPurchase } from '@/components/ProductPurchase';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { MiniKitStatus } from '@/components/MiniKitStatus';

type Tab = 'marketplace' | 'sell' | 'wallet';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<Tab>('marketplace');
  const { setFrameReady, isFrameReady } = useMiniKit();

  // Initialize MiniKit when the app is ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  const tabs = [
    { id: 'marketplace' as Tab, label: '🛍️ Marketplace', description: 'Comprar productos' },
    { id: 'sell' as Tab, label: '💰 Vender', description: 'Listar productos' },
    { id: 'wallet' as Tab, label: '👛 Wallet', description: 'Gestionar tokens' },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/koneque.png"
                alt="Koneque"
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Bienvenido a Koneque
            </CardTitle>
            <p className="text-gray-600">
              Marketplace descentralizado en Base Sepolia
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Características:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Compra y venta de productos</li>
                <li>• Pagos con tokens KNQ</li>
                <li>• Sistema de referidos</li>
                <li>• Transacciones seguras</li>
                <li>• IPFS para almacenamiento</li>
              </ul>
            </div>
            
            <Separator />
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Conecta tu wallet para comenzar
              </p>
              <ConnectWallet />
            </div>
            
            <div className="text-center">
              <Badge variant="outline" className="text-xs">
                Base Sepolia Testnet
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/koneque.png"
                alt="Koneque"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h1 className="text-xl font-bold text-gray-800">Koneque</h1>
              <Badge variant="outline" className="text-xs">
                Base Sepolia
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              <Wallet>
                <ConnectWallet />
              </Wallet>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm p-1 rounded-lg border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <div className="text-center">
                <div className="font-medium">{tab.label}</div>
                <div className="text-xs opacity-75">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'marketplace' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Marketplace
              </h2>
              <p className="text-gray-600">
                Descubre y compra productos únicos
              </p>
            </div>
            <ProductPurchase />
          </div>
        )}

        {activeTab === 'sell' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Vender Producto
              </h2>
              <p className="text-gray-600">
                Lista tu producto en el marketplace
              </p>
            </div>
            <ProductListing />
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Gestión de Wallet
              </h2>
              <p className="text-gray-600">
                Administra tus tokens y transacciones
              </p>
            </div>
            
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Estado de la Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-800">Dirección</h3>
                    <p className="text-sm text-blue-600 font-mono">
                      {address}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-800">Red</h3>
                    <p className="text-sm text-green-600">
                      Base Sepolia Testnet
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">
                    Funciones adicionales próximamente...
                  </p>
                  <Button variant="outline" disabled>
                    Ver Historial de Transacciones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* MiniKit Status Indicator */}
      <MiniKitStatus />
    </div>
  );
}
