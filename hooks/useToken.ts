'use client';

import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract, useBalance } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { KONEQUE_CONTRACTS } from '@/lib/contracts';
import { NATIVE_TOKEN_ABI } from '@/lib/abis/NativeToken';

export function useToken() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Leer balance de tokens KNQ
  const { data: tokenBalance, refetch: refetchBalance } = useReadContract({
    address: KONEQUE_CONTRACTS.NATIVE_TOKEN,
    abi: NATIVE_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Leer información del token
  const { data: tokenName } = useReadContract({
    address: KONEQUE_CONTRACTS.NATIVE_TOKEN,
    abi: NATIVE_TOKEN_ABI,
    functionName: 'name',
  });

  const { data: tokenSymbol } = useReadContract({
    address: KONEQUE_CONTRACTS.NATIVE_TOKEN,
    abi: NATIVE_TOKEN_ABI,
    functionName: 'symbol',
  });

  const { data: tokenDecimals } = useReadContract({
    address: KONEQUE_CONTRACTS.NATIVE_TOKEN,
    abi: NATIVE_TOKEN_ABI,
    functionName: 'decimals',
  });

  // Leer allowance para marketplace
  const { data: marketplaceAllowance, refetch: refetchAllowance } = useReadContract({
    address: KONEQUE_CONTRACTS.NATIVE_TOKEN,
    abi: NATIVE_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, KONEQUE_CONTRACTS.MARKETPLACE_CORE] : undefined,
  });

  // Función para aprobar tokens al marketplace
  const approveMarketplace = useCallback(async (amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔓 Aprobando tokens al marketplace...');
      
      const amountInWei = parseEther(amount);

      await writeContract({
        address: KONEQUE_CONTRACTS.NATIVE_TOKEN,
        abi: NATIVE_TOKEN_ABI,
        functionName: 'approve',
        args: [KONEQUE_CONTRACTS.MARKETPLACE_CORE, amountInWei],
      });

      console.log('✅ Tokens aprobados exitosamente');
      await refetchAllowance();
    } catch (error) {
      console.error('❌ Error aprobando tokens:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract, refetchAllowance]);

  // Función para transferir tokens
  const transferTokens = useCallback(async (to: string, amount: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('💸 Transfiriendo tokens...');
      
      const amountInWei = parseEther(amount);

      await writeContract({
        address: KONEQUE_CONTRACTS.NATIVE_TOKEN,
        abi: NATIVE_TOKEN_ABI,
        functionName: 'transfer',
        args: [to as `0x${string}`, amountInWei],
      });

      console.log('✅ Tokens transferidos exitosamente');
      await refetchBalance();
    } catch (error) {
      console.error('❌ Error transfiriendo tokens:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract, refetchBalance]);

  // Función para verificar si tiene suficiente allowance
  const hasEnoughAllowance = useCallback((requiredAmount: string): boolean => {
    if (!marketplaceAllowance) return false;
    
    try {
      const required = parseEther(requiredAmount);
      return marketplaceAllowance >= required;
    } catch {
      return false;
    }
  }, [marketplaceAllowance]);

  // Función para verificar si tiene suficiente balance
  const hasEnoughBalance = useCallback((requiredAmount: string): boolean => {
    if (!tokenBalance) return false;
    
    try {
      const required = parseEther(requiredAmount);
      return tokenBalance >= required;
    } catch {
      return false;
    }
  }, [tokenBalance]);

  // Formatear balance para mostrar
  const formattedBalance = tokenBalance ? formatEther(tokenBalance) : '0';
  const formattedAllowance = marketplaceAllowance ? formatEther(marketplaceAllowance) : '0';

  return {
    // Estados
    isLoading,
    error,
    
    // Información del token
    tokenName,
    tokenSymbol,
    tokenDecimals,
    
    // Balances
    tokenBalance,
    formattedBalance,
    marketplaceAllowance,
    formattedAllowance,
    
    // Funciones
    approveMarketplace,
    transferTokens,
    hasEnoughAllowance,
    hasEnoughBalance,
    refetchBalance,
    refetchAllowance,
  };
}
