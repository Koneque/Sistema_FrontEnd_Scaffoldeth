"use client"

import { WalletWrapper } from '@/components/WalletWrapper'
import { TransactionComponents } from '@/components/TransactionComponents'
import { usePrivy } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Zap, CreditCard } from 'lucide-react'

export default function HomePage() {
  const { ready, authenticated } = usePrivy()

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Koñeque...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/koneque.png" alt="Koñeque" className="h-8 w-auto mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Koñeque</h1>
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Base Network
              </span>
            </div>
            <WalletWrapper />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!authenticated ? (
          /* Welcome Section */
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Welcome to Koñeque
              </h2>
              <p className="text-xl mb-6">
                The decentralized marketplace powered by Base network
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-3 text-yellow-300" />
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-blue-100">Instant transactions on Base</p>
                </div>
                <div className="text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-3 text-green-300" />
                  <h3 className="font-semibold mb-2">Low Fees</h3>
                  <p className="text-blue-100">Minimal transaction costs</p>
                </div>
                <div className="text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-pink-300" />
                  <h3 className="font-semibold mb-2">Secure Shopping</h3>
                  <p className="text-blue-100">Crypto payments made easy</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard for authenticated users */
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4">Welcome back!</h2>
              <p className="text-gray-600 mb-4">
                Your wallet is connected to Base network. Start shopping with crypto!
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <ShoppingBag className="h-6 w-6 mb-2" />
                  Browse Products
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <CreditCard className="h-6 w-6 mb-2" />
                  Payment History
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Zap className="h-6 w-6 mb-2" />
                  Quick Buy
                </Button>
              </div>
            </div>

            {/* Transaction Components */}
            <TransactionComponents />
          </div>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Fast Payments</h3>
            <p className="text-gray-600 text-sm">Lightning-fast crypto payments with Base network</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Low Fees</h3>
            <p className="text-gray-600 text-sm">Minimal transaction costs compared to other networks</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Secure Shopping</h3>
            <p className="text-gray-600 text-sm">Built on Base blockchain for maximum security</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600 text-sm">Simple interface powered by OnchainKit</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Powered by <span className="font-semibold text-blue-600">Base Network</span> & 
              <span className="font-semibold text-purple-600"> OnchainKit</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
