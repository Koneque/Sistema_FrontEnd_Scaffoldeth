#!/bin/bash

# Script para configurar Base Mini Apps
echo "🚀 Configurando Koneque para Base Mini Apps..."

echo "📦 Instalando OnchainKit CLI..."
npm install -g create-onchain

echo "✅ OnchainKit CLI instalado correctamente"

echo "🔧 Para generar el manifiesto de Farcaster, ejecuta:"
echo "npx create-onchain --manifest"

echo "📋 Pasos siguientes:"
echo "1. Obtén tu API key de Coinbase Developer Platform"
echo "2. Actualiza las variables de entorno en .env.local"
echo "3. Ejecuta 'npx create-onchain --manifest' para generar el manifiesto"
echo "4. Despliega tu app en Vercel"
echo "5. Actualiza NEXT_PUBLIC_URL con tu URL de producción"

echo "🎉 ¡Koneque está listo para Base Mini Apps!"
