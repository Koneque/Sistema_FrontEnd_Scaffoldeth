"use client"

import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OnchainKitProvider } from '@coinbase/onchainkit'
import { base } from 'viem/chains'
import { http } from 'viem'
import { createConfig } from 'wagmi'

// Create wagmi config
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
})

// Create react-query client
const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID
  const onchainKitApiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''
  
  if (!appId) {
    throw new Error('NEXT_PUBLIC_PRIVY_APP_ID is not defined in environment variables')
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
          supportedChains: [base],
          defaultChain: base,
        }}
      >
        <WagmiProvider config={config}>
          <OnchainKitProvider
            apiKey={onchainKitApiKey}
            chain={base}
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
