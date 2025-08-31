# 📱 Base Mini Apps Setup Guide

Este documento explica cómo configurar y desplegar Koneque como una Base Mini App.

## 🔧 Configuración Requerida

### 1. Variables de Entorno

Copia `.env.example` a `.env.local` y completa las siguientes variables:

```bash
# Requeridas para Base Mini Apps
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Koneque Marketplace
NEXT_PUBLIC_URL=https://tu-app.vercel.app
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_cdp_client_api_key

# Configuración de Farcaster (se genera automáticamente)
FARCASTER_HEADER=base64_header
FARCASTER_PAYLOAD=base64_payload  
FARCASTER_SIGNATURE=hex_signature
```

### 2. Obtener API Key de Coinbase Developer Platform

1. Ve a [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Obtén tu API key y agrégala a `NEXT_PUBLIC_ONCHAINKIT_API_KEY`

### 3. Generar Manifiesto de Farcaster

```bash
# Instala OnchainKit CLI globalmente
npm install -g create-onchain

# Genera el manifiesto para Farcaster
npm run generate-manifest
```

Este comando generará automáticamente las variables `FARCASTER_*` necesarias.

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conecta tu repositorio a Vercel**
2. **Configura las variables de entorno** en el dashboard de Vercel
3. **Despliega** tu aplicación
4. **Actualiza `NEXT_PUBLIC_URL`** con tu URL de producción
5. **Re-ejecuta el manifiesto** con la URL correcta

### Variables de Entorno en Vercel

```bash
NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Koneque Marketplace
NEXT_PUBLIC_URL=https://tu-app.vercel.app
NEXT_PUBLIC_ONCHAINKIT_API_KEY=tu_cdp_client_api_key
FARCASTER_HEADER=valor_generado
FARCASTER_PAYLOAD=valor_generado
FARCASTER_SIGNATURE=valor_generado
```

## 🔍 Verificación

Una vez desplegado, verifica:

1. ✅ **MiniKit Status**: Debe mostrar "Mini App Ready" en la esquina inferior derecha
2. ✅ **Wallet Connection**: Funciona correctamente con Farcaster
3. ✅ **Base Network**: Conectado a Base mainnet
4. ✅ **OnchainKit**: Componentes funcionando

## 📋 Checklist de Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] API key de CDP obtenida
- [ ] Manifiesto de Farcaster generado
- [ ] Imágenes OG optimizadas
- [ ] URL de producción actualizada
- [ ] Tests pasando
- [ ] Build exitoso

## 🐛 Troubleshooting

### Error: "MiniKit not ready"
- Verifica que `NEXT_PUBLIC_ONCHAINKIT_API_KEY` esté configurada
- Asegúrate de que el MiniKitProvider esté correctamente configurado

### Error: "Invalid manifest"
- Re-ejecuta `npm run generate-manifest`
- Verifica que `NEXT_PUBLIC_URL` sea correcto

### Error de conexión de wallet
- Confirma que estás en Base network
- Verifica la configuración de Privy

## 📚 Recursos

- [Base Mini Apps Documentation](https://docs.base.org/mini-apps/)
- [OnchainKit Documentation](https://onchainkit.xyz/)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)
- [Farcaster Documentation](https://docs.farcaster.xyz/)

## 🤝 Soporte

Si tienes problemas, puedes:
1. Revisar la consola del navegador para errores
2. Verificar el status indicator de MiniKit
3. Consultar la documentación oficial
4. Abrir un issue en el repositorio
