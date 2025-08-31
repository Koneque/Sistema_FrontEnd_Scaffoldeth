"use client"

import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { baseSepolia } from 'viem/chains'
import { http } from 'viem'
import { createConfig } from 'wagmi'

// Create wagmi config for Base Sepolia
const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
})

// Create react-query client
const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  const onchainKitApiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''
  
  // En tiempo de build, si no hay appId, solo devolver los children
  if (!appId || appId === 'placeholder_privy_app_id') {
    return (
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={onchainKitApiKey}
          chain={baseSepolia}
          config={{
            appearance: {
              mode: 'light',
              theme: 'base',
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={appId}
        config={{
          appearance: {
            theme: 'light',
            accentColor: '#0052ff', // Base blue color
            logo: '/koneque.png',
          },
          embeddedWallets: {
            createOnLogin: 'users-without-wallets',
            requireUserPasswordOnCreate: false,
          },
          loginMethods: ['wallet', 'email', 'sms'],
          supportedChains: [baseSepolia],
          defaultChain: baseSepolia,
        }}
      >
        <WagmiProvider config={config}>
          <OnchainKitProvider
            apiKey={onchainKitApiKey}
            chain={baseSepolia}
            config={{
              appearance: {
                mode: 'light',
                theme: 'base',
              },
            }}
          >
            {children}
          </OnchainKitProvider>
        </WagmiProvider>
      </PrivyProvider>
    </QueryClientProvider>
  )
}
