# 🛍️ Koneque - Marketplace Descentralizado

Marketplace descentralizado construido para **Base Mini Apps** usando **Next.js 14**, **OnchainKit**, y contratos inteligentes desplegados en **Base Sepolia**.

![Koneque Banner](public/koneque.png)

## ✨ Características

### 🎯 Core Features
- **🛍️ Marketplace Descentralizado**: Compra y venta de productos únicos
- **💰 Pagos con Token KNQ**: Sistema de pagos nativo con token ERC-20
- **📱 Base Mini Apps Ready**: Optimizado para Base Mini Apps ecosystem
- **🔐 Smart Wallet Integration**: Compatible con OnchainKit wallet
- **📦 IPFS Storage**: Almacenamiento descentralizado con Pinata

### 🌟 Advanced Features
- **🎁 Sistema de Referidos**: Programa de referidos automático
- **⚖️ Resolución de Disputas**: Sistema integrado de disputas
- **🔒 Escrow Inteligente**: Transacciones seguras con escrow automático
- **📊 Fee Management**: Gestión inteligente de comisiones
- **🚀 Paymaster Integration**: Transacciones sin fricción

## 🏗️ Arquitectura Técnica

### Frontend Stack
- **Next.js 14** con App Router
- **TypeScript** para type safety
- **Tailwind CSS** + **shadcn/ui** para UI
- **OnchainKit 0.38.19** para wallet integration
- **Wagmi + Viem** para blockchain interactions

### Blockchain Stack
- **Base Sepolia Testnet** (Chain ID: 84532)
- **Smart Contracts** desplegados y verificados
- **IPFS** con Pinata para storage descentralizado
- **ERC-20 Token** (KNQ) para pagos nativos

### Smart Contracts Desplegados

```typescript
const KONEQUE_CONTRACTS = {
  MARKETPLACE_CORE: "0x7fe5708061E76C271a1A9466f73D7667ed0C7Ddd",
  NATIVE_TOKEN: "0x697943EF354BFc7c12169D5303cbbB23b133dc53", 
  REFERRAL_SYSTEM: "0x747EEC46f064763726603c9C5fC928f99926a209",
  ESCROW: "0x8bbDDc3fcb74CdDB7050552b4DE01415C9966133",
  FEE_MANAGER: "0x2212FBb6C244267c23a5710E7e6c4769Ea423beE",
  DISPUTE_RESOLUTION: "0xD53df29C516D08e1F244Cb5912F0224Ea22B60E1",
  // ... más contratos
};
```

## 🚀 Quick Start

### 1. Clonar y Setup
```bash
git clone <your-repo>
cd Sistema_FrontEnd_Scaffoldeth
npm install
```

### 2. Configurar Environment Variables
```bash
cp .env.example .env.local
```

Configurar en `.env.local`:
```env
# Base Sepolia RPC
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org

# Pinata IPFS Configuration
NEXT_PUBLIC_PINATA_JWT=tu_pinata_jwt_aqui
NEXT_PUBLIC_PINATA_GATEWAY=https://gateway.pinata.cloud

# Contratos (ya configurados)
NEXT_PUBLIC_MARKETPLACE_CONTRACT=0x7fe5708061E76C271a1A9466f73D7667ed0C7Ddd
NEXT_PUBLIC_TOKEN_CONTRACT=0x697943EF354BFc7c12169D5303cbbB23b133dc53
# ... más contratos
```

### 3. Desarrollo Local
```bash
npm run dev
```

### 4. Build para Producción
```bash
npm run build
npm start
```

## 🛍️ Funcionalidades del Usuario

### Para Compradores
1. **Conectar Wallet** - Compatible con Base Sepolia
2. **Explorar Marketplace** - Browse productos por categoría
3. **Comprar Productos** - Pagos seguros con tokens KNQ
4. **Gestionar Transacciones** - Confirmar entregas y finalizar compras

### Para Vendedores
1. **Listar Productos** - Subir fotos a IPFS automáticamente
2. **Gestionar Inventario** - Ver productos activos/vendidos
3. **Recibir Pagos** - Automático via smart contracts
4. **Sistema de Escrow** - Protección para vendedores

### Para Desarrolladores
1. **Hooks Customizados** - `useMarketplace`, `useToken`, `useReferrals`
2. **Componentes Reutilizables** - UI components para marketplace
3. **IPFS Integration** - Upload y gestión automática
4. **Type Safety** - TypeScript en toda la app

## 📁 Estructura del Proyecto

```
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Homepage con tabs
│   └── globals.css              # Estilos globales
├── components/                   # Componentes React
│   ├── ui/                      # shadcn/ui components
│   ├── ProductListing.tsx       # Listar productos
│   ├── ProductPurchase.tsx      # Comprar productos
│   ├── MiniKitProvider.tsx      # Base Mini Apps provider
│   └── providers.tsx            # Wagmi + OnchainKit config
├── hooks/                       # Custom React hooks
│   ├── useMarketplace.ts        # Marketplace operations
│   ├── useToken.ts              # Token operations
│   └── useReferrals.ts          # Referral system
├── lib/                         # Utilities y configuración
│   ├── contracts.ts             # Direcciones de contratos
│   ├── ipfs.ts                  # Pinata IPFS integration
│   ├── abis/                    # Contract ABIs
│   └── utils.ts                 # Utilities generales
└── public/                      # Assets estáticos
    ├── koneque.png             # Logo principal
    └── images/                  # Imágenes de productos
```

## 🔧 Base Mini Apps Integration

### MiniKit Configuration
```typescript
// components/MiniKitProvider.tsx
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { baseSepolia } from 'wagmi/chains';

export function MiniKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <OnchainKitProvider 
      chain={baseSepolia}
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
    >
      {children}
    </OnchainKitProvider>
  );
}
```

### Wallet Integration
```typescript
// Usando OnchainKit Wallet
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';

<Wallet>
  <ConnectWallet />
</Wallet>
```

## 🎨 UI/UX Features

### Responsive Design
- ✅ Mobile-first approach
- ✅ Tablet y desktop optimized
- ✅ Base Mini Apps compatible

### User Experience
- ✅ Loading states en todas las operaciones
- ✅ Error handling con mensajes claros
- ✅ Success feedback con toast notifications
- ✅ Optimistic UI updates

### Accessibility
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Screen reader friendly

## 🔐 Seguridad

### Smart Contract Security
- ✅ Escrow automático para transacciones
- ✅ Sistema de disputas integrado
- ✅ Timeouts para prevenir fondos bloqueados
- ✅ Role-based access control

### Frontend Security
- ✅ Environment variables para API keys
- ✅ Input validation y sanitization
- ✅ HTTPS enforced en producción
- ✅ No private keys en frontend

## 📊 Performance

### Optimizaciones
- ✅ Next.js Image optimization
- ✅ Code splitting automático
- ✅ Tree shaking para bundles pequeños
- ✅ Lazy loading de componentes

### Métricas
- ✅ First Load JS: ~553 kB
- ✅ Build size optimizado
- ✅ Static generation donde posible

## 🚀 Deployment

### Base Mini Apps
```bash
# Build optimizado para producción
npm run build

# Deploy en tu plataforma preferida
# (Vercel, Netlify, Railway, etc.)
```

### Environment Setup
- Configurar todas las variables de entorno
- Verificar conexión a Base Sepolia
- Testear funcionalidad de IPFS
- Validar contratos desplegados

## 🧪 Testing

### Para probar localmente:
1. Conectar wallet a Base Sepolia
2. Obtener testnet ETH de [faucet](https://faucet.base.org)
3. Interactuar con contratos desplegados
4. Probar flujo completo de compra/venta

## 🤝 Contribución

### Desarrollo Local
```bash
# 1. Fork el repositorio
# 2. Crear branch para feature
git checkout -b feature/nueva-funcionalidad

# 3. Desarrollar y testear
npm run dev

# 4. Build y verificar
npm run build

# 5. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# 6. Crear Pull Request
```

## 📝 Roadmap

### Phase 1: MVP ✅
- [x] Base Mini Apps integration
- [x] Basic marketplace functionality
- [x] IPFS integration
- [x] Smart contract deployment

### Phase 2: Enhanced Features 🚧
- [ ] Advanced search y filtros
- [ ] User profiles y ratings
- [ ] Mobile app optimization
- [ ] Analytics dashboard

### Phase 3: Ecosystem 🔮
- [ ] Multi-chain support
- [ ] API para terceros
- [ ] Plugin ecosystem
- [ ] DAO governance

## 📄 Licencia

MIT License - Ver `LICENSE` file para detalles.

## 🆘 Soporte

### Documentación
- [Base Mini Apps Docs](https://docs.base.org/mini-apps)
- [OnchainKit Documentation](https://onchainkit.xyz)
- [Wagmi Documentation](https://wagmi.sh)

### Community
- Discord: [Base Community](https://discord.gg/base)
- Twitter: [@base](https://twitter.com/base)

### Issues
Para reportar bugs o solicitar features, crear un [issue](../../issues).

---

**Built with ❤️ for Base Mini Apps Ecosystem**
