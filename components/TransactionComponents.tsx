"use client"

import {
  Transaction,
  TransactionButton,
  TransactionSponsor,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction'
import { TokenChip, Token } from '@coinbase/onchainkit/token'
import { usePrivy } from '@privy-io/react-auth'
import { base } from 'viem/chains'
import { useState } from 'react'

export function TransactionComponents() {
  const { authenticated } = usePrivy()
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)

  if (!authenticated) {
    return (
      <div className="text-center p-4">
        <p>Please connect your wallet to use transaction features</p>
      </div>
    )
  }

  const baseTokens: Token[] = [
    {
      name: 'Ethereum',
      address: '' as `0x${string}`,
      symbol: 'ETH',
      decimals: 18,
      image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
      chainId: base.id,
    },
    {
      name: 'USD Coin',
      address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      symbol: 'USDC',
      decimals: 6,
      image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/usdc_288.png',
      chainId: base.id,
    }
  ]

  return (
    <div className="space-y-6">
      {/* Transaction Status */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Transaction Status</h3>
        <Transaction chainId={base.id}>
          <TransactionButton />
          <TransactionSponsor />
          <TransactionStatus>
            <TransactionStatusLabel />
            <TransactionStatusAction />
          </TransactionStatus>
        </Transaction>
      </div>

      {/* Token Display */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Supported Tokens</h3>
        <div className="flex flex-wrap gap-2">
          {baseTokens.map((token) => (
            <div
              key={token.symbol}
              className="cursor-pointer"
              onClick={() => setSelectedToken(token)}
            >
              <TokenChip token={token} />
            </div>
          ))}
        </div>
        {selectedToken && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium">Selected Token:</h4>
            <p>{selectedToken.name} ({selectedToken.symbol})</p>
          </div>
        )}
      </div>

      {/* Payment Instructions */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-900">Base Network Ready</h3>
        <p className="text-blue-800 mb-4">
          Your app is now configured for Base network transactions with low fees and fast confirmations.
        </p>
        <div className="space-y-2 text-sm text-blue-700">
          <p>• Network: Base Mainnet</p>
          <p>• Chain ID: 8453</p>
          <p>• Native Token: ETH</p>
          <p>• Primary Stablecoin: USDC</p>
        </div>
      </div>
    </div>
  )
}
