'use client';
import { MiniKitProvider } from '@coinbase/onchainkit/minikit';
import { ReactNode } from 'react';
import { baseSepolia } from 'wagmi/chains';

export function MiniKitContextProvider({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
  
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_ONCHAINKIT_API_KEY is not defined');
  }

  return (
    <MiniKitProvider 
      apiKey={apiKey || ''} 
      chain={baseSepolia}
    >
      {children}
    </MiniKitProvider>
  );
}
