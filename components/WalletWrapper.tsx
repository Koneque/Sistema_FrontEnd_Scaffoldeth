"use client"

import { 
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity'
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth'
import { useDisconnect } from 'wagmi'

export function WalletWrapper() {
  const { ready, authenticated } = usePrivy()
  const { login } = useLogin()
  const { logout } = useLogout()
  const { disconnect } = useDisconnect()

  const handleDisconnect = async () => {
    disconnect()
    await logout()
  }

  if (!ready) {
    return <div>Loading...</div>
  }

  if (!authenticated) {
    return (
      <div className="flex items-center gap-4">
        <button 
          onClick={login}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownBasename />
          <WalletDropdownLink
            icon="wallet"
            href="https://keys.coinbase.com"
          >
            Wallet
          </WalletDropdownLink>
          <WalletDropdownFundLink />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
      <button 
        onClick={handleDisconnect}
        className="text-red-600 hover:text-red-700 px-2 py-1 text-sm"
      >
        Disconnect
      </button>
    </div>
  )
}
