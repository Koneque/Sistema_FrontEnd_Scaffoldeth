// Configuración de contratos desplegados en Base Sepolia
export const KONEQUE_CONTRACTS = {
  MARKETPLACE_CORE: "0x7fe5708061E76C271a1A9466f73D7667ed0C7Ddd",
  SMART_ACCOUNT_FACTORY: "0x030850c3DEa419bB1c76777F0C2A65c34FB60392",
  REFERRAL_SYSTEM: "0x747EEC46f064763726603c9C5fC928f99926a209",
  NATIVE_TOKEN: "0x697943EF354BFc7c12169D5303cbbB23b133dc53",
  ESCROW: "0x8bbDDc3fcb74CdDB7050552b4DE01415C9966133",
  FEE_MANAGER: "0x2212FBb6C244267c23a5710E7e6c4769Ea423beE",
  PAYMASTER: "0x44b89ba09a381F3b598a184A90F039948913dC72",
  DISPUTE_RESOLUTION: "0xD53df29C516D08e1F244Cb5912F0224Ea22B60E1",
  ACCOUNT_FACTORY: "0x422478a088ce4d9D9418d4D2C9D99c78fC23393f",
  SMART_ACCOUNT_IMPL: "0xf24e12Ef8aAcB99FC5843Fc56BEA0BFA5B039BFF",
  ORACLE_REGISTRY: "0x3Dd8A23983b94bC208D614C4325D937b710B6E4B"
} as const;

// Configuración de Base Sepolia
export const CHAIN_CONFIG = {
  chainId: 84532,
  name: 'Base Sepolia',
  rpcUrl: 'https://sepolia.base.org',
  blockExplorer: 'https://sepolia.basescan.org',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
} as const;

// Estados de transacciones según contratos
export enum TransactionStatus {
  PAYMENT_COMPLETED = 0,
  PRODUCT_DELIVERED = 1,
  FINALIZED = 2,
  IN_DISPUTE = 3,
  REFUNDED = 4
}

// Tipos de productos
export enum ProductCategory {
  ELECTRONICS = 0,
  FURNITURE = 1,
  CLOTHING = 2,
  VEHICLES = 3,
  OTHERS = 4
}

// Filtros de categoría para UI
export enum CategoryFilter {
  ALL = -1,
  ELECTRONICS = 0,
  FURNITURE = 1,
  CLOTHING = 2,
  VEHICLES = 3,
  OTHERS = 4
}

// Interfaces de tipos
export interface ContractProduct {
  id: bigint;
  seller: `0x${string}`;
  buyer: `0x${string}`;
  price: bigint;
  name: string;
  description: string;
  imageHash: string;
  category: ProductCategory;
  isActive: boolean;
  createdAt: bigint;
}

export interface ContractTransaction {
  id: bigint;
  productId: bigint;
  buyer: `0x${string}`;
  seller: `0x${string}`;
  amount: bigint;
  status: TransactionStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface ReferralCode {
  code: string;
  referrer: `0x${string}`;
  expiresAt: bigint;
  maxUsage: bigint;
  currentUsage: bigint;
  isActive: boolean;
}
