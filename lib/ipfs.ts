import { PinataSDK } from 'pinata-web3';

// Configuración de Pinata
const PINATA_CONFIG = {
  API_URL: 'https://api.pinata.cloud',
  GATEWAY_URL: 'https://gateway.pinata.cloud/ipfs/',
  JWT: process.env.NEXT_PUBLIC_PINATA_JWT,
};

// Interfaces
interface ProductMetadata {
  name: string;
  description: string;
  imageHash: string;
  category: string;
  timestamp: number;
}

// Inicializar cliente de Pinata
export const pinata = new PinataSDK({
  pinataJwt: PINATA_CONFIG.JWT,
  pinataGateway: "gateway.pinata.cloud"
});

// Función para subir imagen a IPFS
export async function uploadImageToIPFS(file: File): Promise<string> {
  try {
    console.log('📤 Subiendo imagen a IPFS...');
    
    // Subir archivo a Pinata
    const upload = await pinata.upload.file(file);
    
    console.log('✅ Imagen subida exitosamente:', upload.IpfsHash);
    return upload.IpfsHash;
  } catch (error) {
    console.error('❌ Error subiendo imagen a IPFS:', error);
    throw new Error('Error al subir imagen a IPFS');
  }
}

// Función para subir metadata de producto a IPFS
export async function uploadProductMetadata(metadata: {
  name: string;
  description: string;
  imageHash: string;
  category: string;
  attributes?: Array<{ trait_type: string; value: string | number }>;
}): Promise<string> {
  try {
    console.log('📤 Subiendo metadata a IPFS...');
    
    // Crear objeto metadata completo
    const productMetadata = {
      name: metadata.name,
      description: metadata.description,
      image: `${PINATA_CONFIG.GATEWAY_URL}${metadata.imageHash}`,
      category: metadata.category,
      attributes: metadata.attributes || [],
      timestamp: Date.now(),
      version: '1.0'
    };
    
    // Subir metadata como JSON
    const upload = await pinata.upload.json(productMetadata);
    
    console.log('✅ Metadata subida exitosamente:', upload.IpfsHash);
    return upload.IpfsHash;
  } catch (error) {
    console.error('❌ Error subiendo metadata a IPFS:', error);
    throw new Error('Error al subir metadata a IPFS');
  }
}

// Función para obtener URL completa de IPFS
export function getIPFSUrl(hash: string): string {
  return `${PINATA_CONFIG.GATEWAY_URL}${hash}`;
}

// Función para obtener metadata desde IPFS
export async function getProductMetadata(hash: string): Promise<ProductMetadata> {
  try {
    const response = await fetch(getIPFSUrl(hash));
    if (!response.ok) {
      throw new Error('Error al obtener metadata de IPFS');
    }
    return await response.json();
  } catch (error) {
    console.error('❌ Error obteniendo metadata de IPFS:', error);
    throw error;
  }
}

// Función para comprimir imagen antes de subir
export async function compressImage(file: File, maxWidth = 800, quality = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Calcular nuevas dimensiones manteniendo aspecto
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;

      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convertir a blob y luego a File
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        } else {
          resolve(file); // Si falla, devolver archivo original
        }
      }, file.type, quality);
    };

    img.src = URL.createObjectURL(file);
  });
}