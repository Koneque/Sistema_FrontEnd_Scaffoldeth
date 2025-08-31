'use client';

import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useEffect, useState } from 'react';

export function MiniKitStatus() {
  const { isFrameReady } = useMiniKit();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isFrameReady 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            isFrameReady ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <span>
            {isFrameReady ? 'Mini App Ready' : 'Initializing...'}
          </span>
        </div>
      </div>
    </div>
  );
}
