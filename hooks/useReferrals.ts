'use client';

import { useState, useCallback } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { KONEQUE_CONTRACTS } from '@/lib/contracts';
import { REFERRAL_SYSTEM_ABI } from '@/lib/abis/ReferralSystem';

interface ReferralCodeInfo {
  code: string;
  referrer: string;
  expiresAt: bigint;
  maxUsage: bigint;
  currentUsage: bigint;
  isActive: boolean;
}

export function useReferrals() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Leer referidos del usuario
  const { data: userReferrals, refetch: refetchReferrals } = useReadContract({
    address: KONEQUE_CONTRACTS.REFERRAL_SYSTEM,
    abi: REFERRAL_SYSTEM_ABI,
    functionName: 'getUserReferrals',
    args: address ? [address] : undefined,
  });

  // Función para crear código de referido
  const createReferralCode = useCallback(async (codeData: {
    code: string;
    validityPeriodDays: number;
    maxUsage: number;
  }) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 Creando código de referido...');
      
      // Convertir días a segundos
      const validityPeriodSeconds = BigInt(codeData.validityPeriodDays * 24 * 60 * 60);
      
      await writeContract({
        address: KONEQUE_CONTRACTS.REFERRAL_SYSTEM,
        abi: REFERRAL_SYSTEM_ABI,
        functionName: 'createReferralCode',
        args: [
          codeData.code,
          validityPeriodSeconds,
          BigInt(codeData.maxUsage)
        ],
      });

      console.log('✅ Código de referido creado exitosamente');
    } catch (error) {
      console.error('❌ Error creando código de referido:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract]);

  // Función para registrar referido con código
  const registerWithReferralCode = useCallback(async (code: string, referredAddress: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    setIsLoading(true);
    setError(null);

    try {
      console.log('👥 Registrando referido...');
      
      await writeContract({
        address: KONEQUE_CONTRACTS.REFERRAL_SYSTEM,
        abi: REFERRAL_SYSTEM_ABI,
        functionName: 'registerReferralWithCode',
        args: [code, referredAddress as `0x${string}`],
      });

      console.log('✅ Referido registrado exitosamente');
      await refetchReferrals();
    } catch (error) {
      console.error('❌ Error registrando referido:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract, refetchReferrals]);

  // Función para verificar si un código es válido
  const checkReferralCode = useCallback(async (code: string): Promise<boolean> => {
    try {
      const isValid = await useReadContract({
        address: KONEQUE_CONTRACTS.REFERRAL_SYSTEM,
        abi: REFERRAL_SYSTEM_ABI,
        functionName: 'isReferralCodeValid',
        args: [code],
      });
      
      return isValid.data as boolean;
    } catch (error) {
      console.error('❌ Error verificando código:', error);
      return false;
    }
  }, []);

  // Función para obtener información de un código
  const getReferralCodeInfo = useCallback(async (code: string): Promise<ReferralCodeInfo | null> => {
    try {
      const info = await useReadContract({
        address: KONEQUE_CONTRACTS.REFERRAL_SYSTEM,
        abi: REFERRAL_SYSTEM_ABI,
        functionName: 'getReferralCodeInfo',
        args: [code],
      });
      
      return info.data as ReferralCodeInfo;
    } catch (error) {
      console.error('❌ Error obteniendo información del código:', error);
      return null;
    }
  }, []);

  // Función para generar código aleatorio
  const generateRandomCode = useCallback((): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }, []);

  // Función para validar formato de código
  const validateCodeFormat = useCallback((code: string): { isValid: boolean; error?: string } => {
    if (!code) {
      return { isValid: false, error: 'El código no puede estar vacío' };
    }
    
    if (code.length < 4 || code.length > 20) {
      return { isValid: false, error: 'El código debe tener entre 4 y 20 caracteres' };
    }
    
    if (!/^[A-Za-z0-9]+$/.test(code)) {
      return { isValid: false, error: 'El código solo puede contener letras y números' };
    }
    
    return { isValid: true };
  }, []);

  return {
    // Estados
    isLoading,
    error,
    userReferrals,
    
    // Funciones
    createReferralCode,
    registerWithReferralCode,
    checkReferralCode,
    getReferralCodeInfo,
    generateRandomCode,
    validateCodeFormat,
    refetchReferrals,
  };
}
