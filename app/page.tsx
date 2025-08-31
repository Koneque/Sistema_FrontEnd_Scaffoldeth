"use client"

import type React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { usePrivy } from '@privy-io/react-auth'
import {
  Search,
  ShoppingCart,
  Heart,
  Wallet,
  Menu,
  Star,
  Plus,
  X,
  Minus,
  MapPin,
  Filter,
  Camera,
  Sparkles,
  Zap,
  TrendingUp,
  Moon,
  Sun,
  Package,
  DollarSign,
  Tag,
  FileText,
  User,
  MessageCircle,
  Phone,
  Upload,
  Eye,
  EyeOff,
  Send,
  Download,
  QrCode,
  CreditCard,
  ArrowDownUp,
  RefreshCw,
  Compass,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Mock data for general marketplace with diverse product categories
const mockProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    originalPrice: 1299.99,
    image: "/iphone-15-pro-max.png",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Features 6.7-inch Super Retina XDR display, Action Button, and all-day battery life. Perfect for photography enthusiasts and power users.",
    rating: 4.8,
    reviews: 2847,
    category: "Electronics",
    location: "New York, NY",
    condition: "new",
    seller: "TechStore NYC",
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Modern Sectional Sofa",
    price: 899.99,
    originalPrice: 1199.99,
    image: "/modern-gray-sectional-sofa-furniture.png",
    description: "Spacious 3-seater sectional sofa in contemporary gray fabric. Features deep cushions, sturdy hardwood frame, and removable covers for easy cleaning. Perfect for living rooms and family spaces.",
    rating: 4.6,
    reviews: 432,
    category: "Furniture",
    location: "Los Angeles, CA",
    condition: "new",
    seller: "HomeDesign LA",
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Nike Air Jordan 1 Retro",
    price: 170.0,
    originalPrice: 200.0,
    image: "/nike-air-jordan-1-sneakers-red-black.png",
    description: "Iconic Air Jordan 1 in classic Chicago colorway. Premium leather construction with original design elements. Authentic and in excellent condition, perfect for collectors and sneaker enthusiasts.",
    rating: 4.9,
    reviews: 1256,
    category: "Clothing",
    location: "Chicago, IL",
    condition: "new",
    seller: "SneakerHub",
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "2019 Honda Civic",
    price: 18500.0,
    originalPrice: 19500.0,
    image: "/2019-honda-civic-sedan-blue-car.png",
    description: "Reliable 2019 Honda Civic sedan with low mileage and complete service history. Features fuel-efficient engine, CVT transmission, Honda Sensing safety suite, and excellent build quality. One owner, garage kept.",
    rating: 4.5,
    reviews: 89,
    category: "Vehicles",
    location: "Miami, FL",
    condition: "used",
    seller: "AutoDealer Miami",
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: "MacBook Pro 16-inch M3",
    price: 2399.99,
    originalPrice: 2599.99,
    image: "/macbook-pro-16-inch-laptop-silver.png",
    description: "Brand new MacBook Pro 16-inch featuring the revolutionary M3 Pro chip with 12-core CPU and 18-core GPU. This powerhouse includes 18GB unified memory, 512GB SSD storage, and the stunning Liquid Retina XDR display with ProMotion technology. Perfect for professional video editing, 3D rendering, and software development. Features the advanced camera system, studio-quality three-mic array, and six-speaker sound system with Spatial Audio. Includes MagSafe 3 charging, three Thunderbolt 4 ports, HDMI port, and SDXC card slot. All-day battery life up to 22 hours video playback. Comes with 1-year AppleCare warranty and original packaging.",
    rating: 4.8,
    reviews: 1876,
    category: "Electronics",
    location: "San Francisco, CA",
    condition: "new",
    seller: "Apple Store SF",
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Vintage Leather Armchair",
    price: 650.0,
    originalPrice: 850.0,
    image: "/vintage-brown-leather-armchair-furniture.png",
    description: "Stunning mid-century vintage leather armchair crafted from premium full-grain brown leather with beautiful patina that tells its story. Features solid hardwood frame construction with traditional mortise and tenon joinery for exceptional durability. The high-density foam cushioning provides excellent comfort while maintaining its shape over time. Hand-rubbed leather finish shows authentic character marks that add to its charm and uniqueness. Deep button tufting and rolled arms showcase classic design elements. Minor wear marks on arms and seat edges are consistent with age and add to its vintage appeal. Dimensions: 32\"W x 34\"D x 36\"H with 18\" seat height. Professional cleaning recommended.",
    rating: 4.4,
    reviews: 234,
    category: "Furniture",
    location: "Austin, TX",
    condition: "used",
    seller: "Vintage Finds",
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Levi's 501 Original Jeans",
    price: 59.99,
    originalPrice: 79.99,
    image: "/levis-501-blue-denim-jeans.png",
    description: "Authentic Levi's 501 Original jeans in classic medium blue wash - the gold standard of denim since 1873. Made from 100% cotton denim with the iconic straight leg fit that never goes out of style. Features the original button fly, five-pocket styling, and signature arcuate stitching on back pockets. Pre-shrunk for consistent fit and constructed with reinforced stress points for maximum durability. This timeless design has been worn by generations and continues to be the most popular jean style worldwide. Perfect for everyday wear, these jeans get better with age and develop unique fading patterns. Available in waist sizes 28-40 and inseam lengths 30-36. Machine washable. New with tags.",
    rating: 4.7,
    reviews: 892,
    category: "Clothing",
    location: "Portland, OR",
    condition: "new",
    seller: "Denim Co",
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "2020 Tesla Model 3",
    price: 35000.0,
    originalPrice: 37000.0,
    image: "/2020-tesla-model-3-white-electric-car.png",
    description: "Exceptional 2020 Tesla Model 3 Long Range in pristine Pearl White Multi-Coat finish. This electric vehicle delivers an impressive 358 miles of range on a single charge with dual motor all-wheel drive for superior traction in all weather conditions. Features the latest Autopilot hardware with Full Self-Driving capability, over-the-air software updates, and the premium connectivity package. Interior boasts vegan leather seating, heated front and rear seats, premium audio system with 14 speakers, and the iconic 15-inch touchscreen display. Recent software update includes Tesla Theater, gaming, and enhanced navigation. Only 23,000 miles with complete service history and clean title. Includes mobile connector, wall connector, and all original documentation. No accidents, non-smoking owner.",
    rating: 4.9,
    reviews: 156,
    category: "Vehicles",
    location: "Seattle, WA",
    condition: "used",
    seller: "EV Motors",
    inStock: true,
    featured: false,
  },
]

const categories = ["Electronics", "Furniture", "Clothing", "Vehicles", "Others"]
// conditions removed because it's unused; explicit condition values are in the UI
const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Miami, FL",
  "San Francisco, CA",
  "Austin, TX",
  "Portland, OR",
  "Seattle, WA",
]

type Product = (typeof mockProducts)[number]

export default function Marketplace() {
  const { login, authenticated, user, logout } = usePrivy()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [selectedCondition, setSelectedCondition] = useState("All Conditions")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [cartItems, setCartItems] = useState<{ id: string; productId: number }[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  // Only the current view mode is required; the setter wasn't used anywhere.
  const [viewMode] = useState<"grid" | "list">("grid")
  const [isSellerDashboardOpen, setIsSellerDashboardOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    condition: "",
    location: "",
    description: "",
    image: "",
  })

  const [contactSellerOpen, setContactSellerOpen] = useState(false)
  const [selectedSeller, setSelectedSeller] = useState<Product | null>(null)

  // Product detail sheet state
  const [productDetailOpen, setProductDetailOpen] = useState(false)
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null)
  const [couponCode, setCouponCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState<number>(0)
  const [couponMessage, setCouponMessage] = useState("")
  const [showFullAddress, setShowFullAddress] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showBalance, setShowBalance] = useState(true)
  const [balance, setBalance] = useState("0.00")
  const [balanceUSD, setBalanceUSD] = useState("0.00")
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)

  const [imagePreview, setImagePreview] = useState<string>("")
  // showSellModal removed; we use the seller dashboard state (`isSellerDashboardOpen`) instead.

  // States for QR modals
  const [showSendQR, setShowSendQR] = useState(false)
  const [showReceiveQR, setShowReceiveQR] = useState(false)
  const [sendAmount, setSendAmount] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")

  // States for QR Upload functionality
  const [showQRUploadModal, setShowQRUploadModal] = useState(false)
  const [showQRResultModal, setShowQRResultModal] = useState(false)
  const [uploadedQRImage, setUploadedQRImage] = useState<File | null>(null)
  const [isProcessingQR, setIsProcessingQR] = useState(false)
  const [qrData, setQrData] = useState<{
    type: string;
    amount?: string;
    address?: string;
    currency?: string;
    recipient?: string;
    fee?: string;
    exchangeRate?: string;
    rawData: string;
  } | null>(null)

  // States for deposit modal
  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showPaymentQR, setShowPaymentQR] = useState(false)
  const [depositAmountBs, setDepositAmountBs] = useState("")
  const [usdcRate] = useState(12.50) // 1 USD = 12.50 Bs (rate from image)
  const [isLoadingDeposit, setIsLoadingDeposit] = useState(false)
  const [pendingDepositData, setPendingDepositData] = useState<{bs: string, usdc: string} | null>(null)

  // Ref for dropdown to handle outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sync Privy auth state with local wallet state
  useEffect(() => {
    if (authenticated && user) {
      setWalletConnected(true)
      // Get wallet address from user's linked accounts
      const walletAccount = user.linkedAccounts.find(
        (account) => account.type === 'wallet' || account.type === 'smart_wallet'
      )
      if (walletAccount) {
        setWalletAddress(walletAccount.address)
        // Update balance when wallet connects
        updateBalance()
      }
    } else {
      setWalletConnected(false)
      setWalletAddress("")
      setBalance("0.00")
      setBalanceUSD("0.00")
    }
  }, [authenticated, user])

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("marketplace-dark-mode")
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("marketplace-dark-mode", JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false)
      }
    }

    if (showUserDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserDropdown])

  useEffect(() => {
    const savedProducts = localStorage.getItem("marketplace-products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(mockProducts)
      localStorage.setItem("marketplace-products", JSON.stringify(mockProducts))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("marketplace-products", JSON.stringify(products))
    }
  }, [products])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory
    const matchesCondition = selectedCondition === "All Conditions" || product.condition === selectedCondition
    const matchesLocation = selectedLocation === "All Locations" || product.location === selectedLocation
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesCondition && matchesLocation && matchesPrice
  })

  // featuredProducts removed because it's not used in the UI currently

  const addToCart = (productId: number) => {
    console.log('Adding product to cart:', productId)
    // Siempre agregar como nuevo item con ID único
    setCartItems((prev) => {
      const newItem = { id: `${productId}-${Date.now()}-${Math.random()}`, productId }
      const newCart = [...prev, newItem]
      console.log('New cart items:', newCart)
      return newCart
    })
    
    // Mostrar notificación visual
    const product = products.find(p => p.id === productId)
    if (product) {
      alert(`✅ ${product.name} has been added to your cart!`)
    }
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId)
      return total + (product?.price || 0)
    }, 0)
  }

  const getCartItemsCount = () => {
    return cartItems.length
  }

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const connectWallet = async () => {
    try {
      await login()
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const truncateAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}***${address.slice(-4)}`
  }

  const getSepoliaBalance = async (address: string) => {
    try {
      // Lista de RPCs de Sepolia para probar
      const rpcEndpoints = [
        'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
        'https://rpc.sepolia.org',
        'https://ethereum-sepolia.blockpi.network/v1/rpc/public',
        'https://sepolia.gateway.tenderly.co'
      ]

      for (const rpcUrl of rpcEndpoints) {
        try {
          const response = await fetch(rpcUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_getBalance',
              params: [address, 'latest'],
              id: 1,
            }),
          })

          if (!response.ok) {
            continue // Probar siguiente RPC
          }

          const data = await response.json()
          if (data.result) {
            // Convertir de Wei a ETH
            const balanceInWei = parseInt(data.result, 16)
            const balanceInEth = balanceInWei / Math.pow(10, 18)
            return balanceInEth.toFixed(4)
          }
        } catch (error) {
          console.log(`RPC ${rpcUrl} failed, trying next...`)
          continue
        }
      }

      // Si todos los RPCs fallan, usar balance mock
      console.log("All RPCs failed, using mock balance")
      return "0.1234" // Balance de ejemplo
      
    } catch (error) {
      console.error("Error fetching balance:", error)
      return "0.0000"
    }
  }

  const getETHPriceInUSD = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      
      if (!response.ok) {
        // Si falla CoinGecko, usar precio mock
        return 2500 // Precio aproximado de ETH
      }

      const data = await response.json()
      return data.ethereum?.usd || 2500
    } catch (error) {
      console.error("Error fetching ETH price:", error)
      return 2500 // Precio fallback
    }
  }

  const updateBalance = async () => {
    if (!walletAddress) return
    
    setIsLoadingBalance(true)
    try {
      console.log("Updating balance for address:", walletAddress)
      
      const ethBalance = await getSepoliaBalance(walletAddress)
      const ethPrice = await getETHPriceInUSD()
      const usdValue = (parseFloat(ethBalance) * ethPrice).toFixed(2)
      
      setBalance(ethBalance)
      setBalanceUSD(usdValue)
      
      console.log("Balance updated:", ethBalance, "ETH,", usdValue, "USD")
    } catch (error) {
      console.error("Error updating balance:", error)
      // Usar valores de ejemplo en caso de error
      setBalance("0.1234")
      setBalanceUSD("308.50")
    } finally {
      setIsLoadingBalance(false)
    }
  }

  // Wallet submenu functions
  const handleBuyAction = () => {
    // Simular proceso de compra
    alert(`💳 Proceso de compra iniciado\n\nWallet: ${truncateAddress(walletAddress)}\nBalance disponible: ${balance} ETH\n\n¡Función de compra próximamente disponible!`)
  }

  const handleSwapAction = () => {
    // Simular proceso de intercambio
    alert(`🔄 Intercambio de tokens\n\nBalance actual: ${balance} ETH\nRed: Sepolia Testnet\n\n¡Función de swap próximamente disponible!`)
  }

  const handleSendAction = () => {
    setShowSendQR(true)
  }

  const handleReceiveAction = () => {
    setShowQRUploadModal(true)
  }

  // Generate QR code URL using a QR service
  const generateQRCode = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`
  }

  // Generate payment QR for sending crypto
  const generateSendQR = () => {
    if (!recipientAddress || !sendAmount) return ""
    const paymentData = `ethereum:${recipientAddress}?value=${parseFloat(sendAmount) * 1e18}`
    return generateQRCode(paymentData)
  }

  // Generate receive QR with wallet address
  const generateReceiveQR = () => {
    const receiveData = `ethereum:${walletAddress}`
    return generateQRCode(receiveData)
  }

  // Deposit functions
  const handleDepositAction = () => {
    setShowDepositModal(true)
  }

  const calculateUSDCAmount = () => {
    if (!depositAmountBs || parseFloat(depositAmountBs) <= 0) return "0.00"
    const bsAmount = parseFloat(depositAmountBs)
    const usdAmount = bsAmount / usdcRate
    return usdAmount.toFixed(2)
  }

  const handleDepositConfirm = async () => {
    if (!depositAmountBs || parseFloat(depositAmountBs) <= 0) {
      alert("❌ Por favor ingresa una cantidad válida")
      return
    }

    // Guardar los datos del depósito
    const bsAmount = parseFloat(depositAmountBs)
    const usdcAmount = parseFloat(calculateUSDCAmount())
    
    setPendingDepositData({
      bs: bsAmount.toFixed(2),
      usdc: usdcAmount.toString()
    })
    
    // Cerrar modal de depósito y mostrar QR
    setShowDepositModal(false)
    setShowPaymentQR(true)
  }

  const handlePaymentComplete = () => {
    if (pendingDepositData) {
      alert(`✅ ¡Pago recibido exitosamente!\n\n💰 Depositaste: ${pendingDepositData.bs} Bs\n🪙 Recibiste: ${pendingDepositData.usdc} USDC\n📊 Tasa: 1 USD = ${usdcRate} Bs\n\n¡USDC agregado a tu wallet!`)
    }
    
    // Limpiar estados
    setShowPaymentQR(false)
    setDepositAmountBs("")
    setPendingDepositData(null)
  }

  const handleDiscoverAction = () => {
    // Simular descubrimiento de oportunidades
    const opportunities = [
      "🎯 Staking ETH - 5.2% APY",
      "🌱 DeFi Farming - 12.5% APY", 
      "💎 NFT Marketplace - Trading activo",
      "⚡ Lightning Pool - Liquidez rápida"
    ]
    alert(`🔍 Oportunidades de inversión\n\n${opportunities.join('\n')}\n\n¡Explora el ecosistema DeFi!`)
  }

  const handleMetaMaskSettings = () => {
    // Simular configuración de MetaMask
    alert(`⚙️ Configuración de Wallet\n\nRed actual: Sepolia Testnet\nWallet: ${truncateAddress(walletAddress)}\nEstado: Conectada ✅\n\n¡Configuración próximamente disponible!`)
  }

  // QR Upload functions
  const handleQRImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedQRImage(file)
    }
  }

  const processQRCode = async () => {
    if (!uploadedQRImage) {
      alert("❌ Por favor selecciona una imagen primero")
      return
    }

    setIsProcessingQR(true)
    
    try {
      // Simular procesamiento de QR (en un proyecto real usarías una librería como jsQR)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simular tiempo de procesamiento

      // Simular datos extraídos del QR basados en la imagen que mostaste
      const mockQRData = {
        type: "payment",
        amount: "50.00",
        currency: "BOB", 
        recipient: "Saul Mijael Choquehuanca Huanca",
        address: "0x742d35Cc6638C0532925a3b8aA5e59e7e8E19c5B",
        fee: "0.00",
        paymentMin: "1.00",
        exchangeRate: "1 USD = 12.12 BOB",
        rawData: "payment://recipient=Saul+Mijael+Choquehuanca+Huanca&amount=50.00&currency=BOB&fee=0.00"
      }

      setQrData(mockQRData)
      setIsProcessingQR(false)
      setShowQRUploadModal(false)
      setShowQRResultModal(true)
    } catch (error) {
      setIsProcessingQR(false)
      alert("❌ Error al procesar el código QR. Por favor intenta de nuevo.")
    }
  }

  const resetQRUpload = () => {
    setUploadedQRImage(null)
    setQrData(null)
    setShowQRUploadModal(false)
    setShowQRResultModal(false)
    setIsProcessingQR(false)
  }

  // Sync Privy auth state with local wallet state
  useEffect(() => {
    if (authenticated && user) {
      setWalletConnected(true)
      // Get wallet address from user's linked accounts
      const walletAccount = user.linkedAccounts.find(
        (account) => account.type === 'wallet' || account.type === 'smart_wallet'
      )
      if (walletAccount) {
        setWalletAddress(walletAccount.address)
        // Update balance when wallet connects
        setTimeout(() => updateBalance(), 1000) // Delay to ensure address is set
      }
    } else {
      setWalletConnected(false)
      setWalletAddress("")
      setBalance("0.00")
      setBalanceUSD("0.00")
    }
  }, [authenticated, user])

  // Update balance when wallet address changes
  useEffect(() => {
    if (walletAddress && walletConnected) {
      updateBalance()
    }
  }, [walletAddress, walletConnected])

  const handleSellProductClick = () => {
    if (!walletConnected) {
      connectWallet()
      return
    }
    setIsSellerDashboardOpen(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar que es una imagen PNG, JPG, JPEG, GIF o WebP
      const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
      if (!validImageTypes.includes(file.type)) {
        alert('❌ Formato de imagen no válido. Por favor, usa PNG, JPG, JPEG, GIF o WebP.')
        return
      }

      // Validar tamaño de archivo (máximo 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB en bytes
      if (file.size > maxSize) {
        alert('❌ El archivo es muy grande. El tamaño máximo es 5MB.')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setNewProduct((prev) => ({ ...prev, image: result }))
        setImagePreview(result) // Set preview for uploaded image
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault()

    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      price: Number.parseFloat(newProduct.price),
      originalPrice: newProduct.originalPrice
        ? Number.parseFloat(newProduct.originalPrice)
        : Number.parseFloat(newProduct.price),
      image: newProduct.image || "/diverse-products-still-life.png",
  description: newProduct.description,
      rating: 4.5,
      reviews: 0,
      category: newProduct.category,
      location: newProduct.location,
      condition: newProduct.condition as "new" | "used" | "refurbished",
      seller: walletConnected ? `User ${walletAddress.slice(0, 6)}...` : "Anonymous Seller",
      inStock: true,
      featured: false,
    }

    setProducts((prev) => [productToAdd, ...prev])

    setNewProduct({
      name: "",
      price: "",
      originalPrice: "",
      category: "",
      condition: "",
      location: "",
      description: "",
      image: "",
    })

  setImagePreview("") // Clear image preview when form is submitted
  // Close the seller sheet after successful submission
  setIsSellerDashboardOpen(false)

    alert("¡Producto agregado exitosamente!")
  }

  const contactSeller = (product: Product) => {
    setSelectedSeller(product)
    setContactSellerOpen(true)
  }

  const FloatingCart = () => (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {getCartItemsCount() > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 text-white animate-bounce">
              {getCartItemsCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-br p-4 from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
        <SheetHeader>
          <SheetTitle className="text-white">Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ShoppingCart className="h-16 w-16 mb-4 text-white/50" />
                <p className="text-white/80">Your cart is empty</p>
                <p className="text-sm mt-2 text-white/60">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const product = products.find((p) => p.id === item.productId)
                  if (!product) return null

                  return (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg bg-white/10 border-white/20"
                    >
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-balance leading-tight text-white">
                          {product.name}
                        </h4>
                        <p className="text-sm text-[#00bcd4]">
                          ${product.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#ff9800]">${product.price.toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-white/60 hover:text-red-400"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-white/20 pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-white">
                  <span>Subtotal ({getCartItemsCount()} items)</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-white/80">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex justify-between font-semibold text-white">
                  <span>Total</span>
                  <span className="text-[#ff9800]">${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white" size="lg">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )

  const ProductCard = ({ product }: { product: Product }) => (
  <Card
      className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800/90 border-2 border-slate-600 hover:border-gradient-to-r hover:from-blue-400/30 hover:via-cyan-400/30 hover:to-amber-400/30"
          : "bg-gradient-to-br from-card via-card to-card/50 border-2 border-transparent hover:border-gradient-to-r hover:from-blue-500/20 hover:via-cyan-500/20 hover:to-amber-500/20"
      }`}
    >
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDarkMode
            ? "bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-amber-400/10"
            : "bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-amber-500/5"
        }`}
      />

      <CardContent 
        className="p-4 relative z-10 cursor-pointer" 
        onClick={(e) => {
          // Solo abrir detalles si no se hizo click en un botón
          const target = e.target as HTMLElement;
          if (e.target === e.currentTarget || !target.closest('button')) {
            setSelectedProductDetail(product)
            setCouponCode("")
            setDiscountPercent(0)
            setProductDetailOpen(true)
          }
        }}
      >
        <div className="relative mb-4">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkMode
                  ? "from-black/40 via-transparent to-transparent"
                  : "from-black/20 via-transparent to-transparent"
              }`}
            />
          </div>

          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-3 left-3 animate-pulse">
              Out of Stock
            </Badge>
          )}
          {product.originalPrice > product.price && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-bounce">
              <Sparkles className="h-3 w-3 mr-1" />-
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className={`absolute bottom-3 right-3 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
              wishlistItems.includes(product.id)
                ? "text-red-500 bg-red-500/20"
                : isDarkMode
                  ? "text-white bg-white/10 hover:bg-white/20"
                  : "text-white bg-white/20 hover:bg-white/30"
            }`}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id) }}
          >
            <Heart className={`h-5 w-5 ${wishlistItems.includes(product.id) ? "fill-current animate-pulse" : ""}`} />
          </Button>
        </div>

        <div className="space-y-3">
          <h3
            className={`font-bold text-base text-balance leading-tight transition-colors duration-300 ${
              isDarkMode ? "text-white group-hover:text-cyan-300" : "text-foreground group-hover:text-blue-700"
            }`}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-2 text-xs">
            <div className={`flex items-center gap-1 ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`}>
              <MapPin className="h-3 w-3" />
              <span className="font-medium">{product.location}</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs px-2 py-1 font-medium ${
                product.condition === "new"
                  ? isDarkMode
                    ? "bg-green-900/50 text-green-300 border-green-600"
                    : "bg-green-100 text-green-700 border-green-300"
                  : product.condition === "used"
                    ? isDarkMode
                      ? "bg-orange-900/50 text-orange-300 border-orange-600"
                      : "bg-orange-100 text-orange-700 border-orange-300"
                    : isDarkMode
                      ? "bg-blue-900/50 text-blue-300 border-blue-600"
                      : "bg-blue-100 text-blue-700 border-blue-300"
              }`}
            >
              {product.condition}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors duration-200 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : isDarkMode
                        ? "text-gray-500"
                        : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
              }`}
            >
              ${(product.price || 0).toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className={`text-sm line-through ${isDarkMode ? "text-gray-400" : "text-muted-foreground"}`}>
                ${(product.originalPrice || 0).toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{product.seller.charAt(0)}</span>
            </div>
            <p className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-muted-foreground"}`}>
              by {product.seller}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-3 relative z-20">
        <Button
          className="w-full bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          onClick={(e) => { 
            e.stopPropagation(); 
            e.preventDefault();
            console.log('Add to cart button clicked for product:', product.id);
            addToCart(product.id);
          }}
          disabled={!product.inStock}
        >
          <Plus className="h-4 w-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button
          variant="outline"
          className="w-full font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#ff9800]/10 to-[#ff9800]/20 border-2 border-[#ff9800] hover:border-[#ff9800]/80 text-[#ff9800] hover:text-[#ff9800]/80"
          onClick={(e) => { 
            e.stopPropagation(); 
            e.preventDefault();
            console.log('Contact seller button clicked for product:', product.id);
            contactSeller(product);
          }}
        >
          <Zap className="h-4 w-4 mr-2" />
          Contact Seller
        </Button>
      </CardFooter>
    </Card>
  )


  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-amber-50"
      }`}
    >
      <div
        className={`fixed inset-0 animate-pulse ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800/20 via-slate-700/20 to-slate-800/20"
            : "bg-gradient-to-br from-blue-100/20 via-cyan-100/20 to-amber-100/20"
        }`}
        style={{ animationDuration: "8s" }}
      />

      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b-2 shadow-lg transition-all duration-500 ${
          isDarkMode
            ? "bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/60 border-slate-700"
            : "bg-white/80 supports-[backdrop-filter]:bg-white/60 border-gradient-to-r from-blue-200 via-cyan-200 to-amber-200"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/koneque.png" 
                alt="Koñeque Logo" 
                className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300"
              />
              <span
                className={`text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                  isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
                }`}
              >
                Koñeque
              </span>
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white animate-pulse">
                <Sparkles className="h-3 w-3 mr-1" />
                New!
              </Badge>
            </div>

            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                    isDarkMode ? "text-cyan-400" : "text-blue-500"
                  }`}
                />
                <Input
                  placeholder="Search products, categories, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 pr-4 py-3 w-full border-2 rounded-xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                    isDarkMode
                      ? "border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white placeholder:text-gray-400"
                      : "border-blue-200 focus:border-blue-500 bg-white/50 text-foreground"
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className={`transition-all duration-300 hover:scale-110 ${
                  isDarkMode ? "hover:bg-slate-700 text-amber-400" : "hover:bg-amber-100 text-amber-600"
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              <Sheet open={isSellerDashboardOpen} onOpenChange={setIsSellerDashboardOpen}>
                <SheetTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Plus className="h-4 w-4 mr-2" />
                    Sell Product
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className={`w-full sm:max-w-4xl overflow-y-auto ${
                    isDarkMode
                      ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700"
                      : "bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-blue-200"
                  } backdrop-blur-sm`}
                >
                  <SheetHeader className="pb-8 px-6 border-b border-opacity-20">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isDarkMode ? "bg-gradient-to-r from-cyan-500 to-blue-500" : "bg-gradient-to-r from-blue-500 to-cyan-500"
                        } shadow-lg`}
                      >
                        <Plus className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <SheetTitle className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                          List a New Product
                        </SheetTitle>
                        <p className={`text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                          Share your product with thousands of buyers
                        </p>
                      </div>
                    </div>
                  </SheetHeader>

                  <div className="px-6">
                    <form onSubmit={handleSubmitProduct} className="space-y-8 py-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="title"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-cyan-300" : "text-blue-700"
                            }`}
                          >
                            <Package className="h-4 w-4" />
                            Product Title *
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Enter product name..."
                            required
                            value={newProduct.name}
                            onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                            className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                              isDarkMode
                                ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white placeholder:text-slate-400"
                                : "border-blue-200 focus:border-blue-500 bg-white"
                            }`}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="price"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-amber-300" : "text-amber-700"
                            }`}
                          >
                            <DollarSign className="h-4 w-4" />
                            Price *
                          </Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                            value={newProduct.price}
                            onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                            className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                              isDarkMode
                                ? "border-slate-600 focus:border-amber-500 bg-slate-800 text-white placeholder:text-slate-400"
                                : "border-amber-200 focus:border-amber-500 bg-white"
                            }`}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="category"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-cyan-300" : "text-blue-700"
                            }`}
                          >
                            <Tag className="h-4 w-4" />
                            Category *
                          </Label>
                          <Select
                            name="category"
                            required
                            value={newProduct.category}
                            onValueChange={(v) => setNewProduct((prev) => ({ ...prev, category: v }))}
                          >
                            <SelectTrigger
                              className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                                isDarkMode
                                  ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                                  : "border-blue-200 focus:border-blue-500 bg-white"
                              }`}
                            >
                              <SelectValue placeholder="Select category..." />
                            </SelectTrigger>
                            <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : "bg-white"}>
                              <SelectItem value="Electronics">📱 Electronics</SelectItem>
                              <SelectItem value="Furniture">🪑 Furniture</SelectItem>
                              <SelectItem value="Clothing">👕 Clothing</SelectItem>
                              <SelectItem value="Vehicles">🚗 Vehicles</SelectItem>
                              <SelectItem value="Books">📚 Books</SelectItem>
                              <SelectItem value="Sports">⚽ Sports</SelectItem>
                              <SelectItem value="Home">🏠 Home & Garden</SelectItem>
                              <SelectItem value="Other">🔧 Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="condition"
                            className={`text-sm font-semibold flex items-center gap-2 ${
                              isDarkMode ? "text-cyan-300" : "text-blue-700"
                            }`}
                          >
                            <Star className="h-4 w-4" />
                            Condition *
                          </Label>
                          <Select
                            name="condition"
                            required
                            value={newProduct.condition}
                            onValueChange={(v) => setNewProduct((prev) => ({ ...prev, condition: v }))}
                          >
                            <SelectTrigger
                              className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                                isDarkMode
                                  ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                                  : "border-blue-200 focus:border-blue-500 bg-white"
                              }`}
                            >
                              <SelectValue placeholder="Select condition..." />
                            </SelectTrigger>
                            <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : "bg-white"}>
                              <SelectItem value="New">✨ New</SelectItem>
                              <SelectItem value="Like New">🌟 Like New</SelectItem>
                              <SelectItem value="Good">👍 Good</SelectItem>
                              <SelectItem value="Fair">👌 Fair</SelectItem>
                              <SelectItem value="Poor">⚠️ Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className={`text-sm font-semibold flex items-center gap-2 ${
                            isDarkMode ? "text-cyan-300" : "text-blue-700"
                          }`}
                        >
                          <MapPin className="h-4 w-4" />
                          Location *
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="City, State or ZIP code..."
                          required
                          value={newProduct.location}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, location: e.target.value }))}
                          className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] ${
                            isDarkMode
                              ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white placeholder:text-slate-400"
                              : "border-blue-200 focus:border-blue-500 bg-white"
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="description"
                          className={`text-sm font-semibold flex items-center gap-2 ${
                            isDarkMode ? "text-cyan-300" : "text-blue-700"
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe your product in detail..."
                          required
                          rows={4}
                          value={newProduct.description}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                          className={`border-2 rounded-xl transition-all duration-300 focus:scale-[1.02] resize-none ${
                            isDarkMode
                              ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white placeholder:text-slate-400"
                              : "border-blue-200 focus:border-blue-500 bg-white"
                          }`}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="image"
                          className={`text-sm font-semibold flex items-center gap-2 ${
                            isDarkMode ? "text-cyan-300" : "text-blue-700"
                          }`}
                        >
                          <Camera className="h-4 w-4" />
                          Product Image
                        </Label>
                        <div
                          className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.01] group ${
                            isDarkMode
                              ? "border-slate-600 hover:border-cyan-400 bg-gradient-to-br from-slate-800 to-slate-700"
                              : "border-blue-300 hover:border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50"
                          }`}
                        >
                          {imagePreview ? (
                            <div className="space-y-4">
                              <div className="relative inline-block">
                                <img
                                  src={imagePreview || "/placeholder.svg"}
                                  alt="Product preview"
                                  className="w-40 h-40 object-cover rounded-xl mx-auto shadow-lg border-2 border-white/20"
                                />
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent`} />
                              </div>
                              <div className="flex gap-2 justify-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setImagePreview("")
                                    setNewProduct((prev) => ({ ...prev, image: "" }))
                                  }}
                                  className={`transition-all duration-200 ${
                                    isDarkMode
                                      ? "border-slate-500 text-slate-300 hover:bg-slate-600 hover:border-slate-400"
                                      : "border-blue-300 text-blue-600 hover:bg-blue-100 hover:border-blue-400"
                                  }`}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Remove
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById("image")?.click()}
                                  className={`transition-all duration-200 ${
                                    isDarkMode
                                      ? "border-cyan-500 text-cyan-300 hover:bg-cyan-600/20 hover:border-cyan-400"
                                      : "border-blue-500 text-blue-600 hover:bg-blue-100 hover:border-blue-600"
                                  }`}
                                >
                                  <Camera className="h-4 w-4 mr-1" />
                                  Change
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className={`relative ${isDarkMode ? "text-slate-300" : "text-blue-600"}`}>
                                <div
                                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
                                    isDarkMode
                                      ? "bg-gradient-to-br from-cyan-600 to-blue-600 shadow-lg shadow-cyan-500/25"
                                      : "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25"
                                  }`}
                                >
                                  <Camera className="h-8 w-8 text-white" />
                                </div>
                                <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                                  Upload Product Image
                                </h3>
                                <p className={`text-sm mb-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                  Drag and drop your image here, or click to browse
                                </p>
                              </div>

                              <Button
                                type="button"
                                onClick={() => document.getElementById("image")?.click()}
                                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                                  isDarkMode
                                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                                }`}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Choose Image
                              </Button>

                              <input
                                id="image"
                                name="image"
                                type="file"
                                accept=".png,.jpg,.jpeg,.gif,.webp,image/png,image/jpeg,image/jpg,image/gif,image/webp"
                                onChange={handleImageUpload}
                                className="hidden"
                              />

                              <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-500"}`}>
                                Formatos soportados: PNG, JPG, JPEG, GIF, WebP (Máx 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6 border-t border-opacity-20">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsSellerDashboardOpen(false)}
                          className={`flex-1 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                            isDarkMode ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className={`flex-1 rounded-xl transition-all duration-300 hover:scale-105 ${
                            isDarkMode ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          } text-white shadow-lg`}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          List Product
                        </Button>
                      </div>
                    </form>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative transition-colors duration-300 ${
                    isDarkMode ? "hover:bg-slate-700 text-blue-400" : "hover:bg-blue-100 text-blue-600"
                  }`}
                  onClick={() => {
                    if (walletConnected) {
                      setShowUserDropdown(!showUserDropdown)
                    } else {
                      connectWallet()
                    }
                  }}
                >
                  <User className="h-5 w-5" />
                  {walletConnected && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  )}
                </Button>

                {/* Dropdown Menu */}
                {walletConnected && showUserDropdown && (
                  <div 
                    className={`absolute right-0 top-12 w-80 rounded-xl border-2 shadow-xl z-50 transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-slate-900 border-slate-600 text-white" 
                        : "bg-white border-gray-200 text-gray-900"
                    }`}
                  >
                    {/* Header with Account info */}
                    <div className={`p-4 border-b ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">M</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Account 1</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="mt-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-gray-400">Dirección:</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`h-5 w-5 p-0 rounded transition-all duration-200 ${
                                  isDarkMode 
                                    ? "hover:bg-slate-700 text-gray-400 hover:text-white" 
                                    : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                                }`}
                                onClick={() => setShowFullAddress(!showFullAddress)}
                                title={showFullAddress ? "Ocultar dirección completa" : "Mostrar dirección completa"}
                              >
                                {showFullAddress ? (
                                  <EyeOff className="h-3 w-3" />
                                ) : (
                                  <Eye className="h-3 w-3" />
                                )}
                              </Button>
                            </div>
                            <div className={`text-sm font-mono p-2 rounded-md border ${
                              isDarkMode 
                                ? "bg-slate-800 border-slate-600 text-gray-300" 
                                : "bg-gray-50 border-gray-200 text-gray-600"
                            }`}>
                              {showFullAddress ? (
                                <span className="break-all leading-relaxed">
                                  {walletAddress}
                                </span>
                              ) : (
                                <span>{truncateAddress(walletAddress)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Balance Section */}
                    <div className={`p-4 border-b ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              BALANCE TOTAL
                            </span>
                            <button
                              className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200 hover:scale-105 ${
                                isDarkMode 
                                  ? "hover:bg-slate-700 text-gray-400 hover:text-white" 
                                  : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                              }`}
                              onClick={() => setShowBalance(!showBalance)}
                              title={showBalance ? "Ocultar balance" : "Mostrar balance"}
                            >
                              {showBalance ? (
                                <Eye className="h-3 w-3" />
                              ) : (
                                <EyeOff className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold">
                              {isLoadingBalance ? (
                                <span className="animate-pulse">Cargando...</span>
                              ) : showBalance ? (
                                <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                                  isDarkMode ? "from-green-400 to-emerald-400" : "from-green-600 to-emerald-600"
                                }`}>
                                  ${balanceUSD} USD
                                </span>
                              ) : (
                                "****"
                              )}
                            </div>
                            {showBalance && !isLoadingBalance && (
                              <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                {balance} ETH • Sepolia Testnet
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <button 
                          className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 ${
                            isDarkMode 
                              ? "bg-blue-900/50 text-blue-300 hover:bg-blue-800/50 border border-blue-600/30" 
                              : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                          } disabled:opacity-50`}
                          onClick={() => updateBalance()}
                          disabled={isLoadingBalance}
                        >
                          <RefreshCw className={`h-3 w-3 ${isLoadingBalance ? "animate-spin" : ""}`} />
                          {isLoadingBalance ? "Actualizando..." : "Actualizar"}
                        </button>
                        <button 
                          className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all duration-200 ${
                            isDarkMode 
                              ? "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 border border-purple-600/30" 
                              : "bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-200"
                          }`}
                          onClick={() => handleDiscoverAction()}
                        >
                          <Compass className="h-3 w-3" />
                          Descubrir
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 grid grid-cols-4 gap-3">
                      <button 
                        className="group flex flex-col items-center gap-1 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={() => handleDepositAction()}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#0d47a1] to-[#00bcd4] shadow-lg shadow-blue-500/25">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Depositar
                        </span>
                      </button>
                      
                      <button 
                        className="group flex flex-col items-center gap-1 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={() => handleReceiveAction()}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg shadow-green-500/25">
                          <Download className="h-5 w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Recibir
                        </span>
                      </button>

                      <button 
                        className="group flex flex-col items-center gap-1 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUserDropdown(false);
                          alert("📊 Módulo de Ventas - Próximamente disponible");
                        }}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#ff9800] to-[#ff9800]/80 shadow-lg shadow-[#ff9800]/25">
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Ventas
                        </span>
                      </button>

                      <button 
                        className="group flex flex-col items-center gap-1 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUserDropdown(false);
                          setIsCartOpen(true);
                        }}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-[#00bcd4] to-[#00bcd4]/80 shadow-lg shadow-[#00bcd4]/25">
                          <ShoppingCart className="h-5 w-5 text-white" />
                        </div>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-slate-200 group-hover:text-white" : "text-gray-700 group-hover:text-gray-900"
                        }`}>
                          Compras
                        </span>
                      </button>
                    </div>

                    {/* Wallet Provider */}
                    <div className={`p-1 border-t ${isDarkMode ? "border-slate-600" : "border-gray-200"}`}>
                      <button 
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                          isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => handleMetaMaskSettings()}
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <div className="text-left">
                          <div className="font-medium">MetaMask</div>
                          <div className="text-sm text-gray-500">Wallet conectada</div>
                        </div>
                      </button>
                    </div>

                    {/* Logout Button */}
                    <div className="p-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          logout()
                          setShowUserDropdown(false)
                        }}
                      >
                        Desconectar Wallet
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className={`relative transition-colors duration-300 ${
                  isDarkMode ? "hover:bg-slate-700 text-cyan-400" : "hover:bg-cyan-100 text-cyan-600"
                }`}
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white animate-bounce">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>

              <FloatingCart />

              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden transition-colors duration-300 ${
                  isDarkMode ? "hover:bg-slate-700 text-amber-400" : "hover:bg-amber-100 text-amber-600"
                }`}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-cyan-400" : "text-blue-500"
                }`}
              />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-12 pr-4 py-2 w-full border-2 rounded-lg backdrop-blur-sm ${
                  isDarkMode
                    ? "border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white placeholder:text-gray-400"
                    : "border-blue-200 focus:border-blue-500 bg-white/50"
                }`}
              />
            </div>
          </div>
        </div>
      </header>

      <nav
        className={`backdrop-blur-xl border-b-2 shadow-sm transition-all duration-500 ${
          isDarkMode ? "bg-slate-800/70 border-slate-700" : "bg-white/70 border-blue-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-4 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? "All Categories" : category)}
                className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${
                        index % 3 === 0
                          ? "from-blue-500 to-cyan-500"
                          : index % 3 === 1
                            ? "from-cyan-500 to-amber-500"
                            : "from-amber-500 to-orange-500"
                      } text-white shadow-lg`
                    : isDarkMode
                      ? "text-gray-300 hover:text-cyan-300 hover:bg-slate-700 border-2 border-transparent hover:border-cyan-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <Card
              className={`backdrop-blur-sm border-2 shadow-xl transition-all duration-500 ${
                isDarkMode ? "bg-slate-800/80 border-slate-600" : "bg-white/80 border-blue-100"
              }`}
            >
              <CardContent className="p-6">
                <h3
                  className={`font-bold mb-6 flex items-center gap-2 text-lg bg-gradient-to-r bg-clip-text text-transparent ${
                    isDarkMode ? "from-cyan-400 to-blue-400" : "from-blue-600 to-cyan-600"
                  }`}
                >
                  <Filter className={`h-5 w-5 ${isDarkMode ? "text-cyan-400" : "text-blue-500"}`} />
                  Filters
                </h3>

                <div className="space-y-2 mb-6">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-cyan-300" : "text-blue-700"}`}>Category</h4>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger
                      className={`border-2 rounded-lg ${
                        isDarkMode
                          ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                          : "border-blue-200 focus:border-blue-500"
                      }`}
                    >
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : ""}>
                      <SelectItem value="All Categories" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        All Categories
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className={isDarkMode ? "text-white hover:bg-slate-700" : ""}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-cyan-300" : "text-cyan-700"}`}>Location</h4>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger
                      className={`border-2 rounded-lg ${
                        isDarkMode
                          ? "border-slate-600 focus:border-cyan-500 bg-slate-800 text-white"
                          : "border-cyan-200 focus:border-cyan-500"
                      }`}
                    >
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : ""}>
                      <SelectItem value="All Locations" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        All Locations
                      </SelectItem>
                      {locations.map((location) => (
                        <SelectItem
                          key={location}
                          value={location}
                          className={isDarkMode ? "text-white hover:bg-slate-700" : ""}
                        >
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-amber-300" : "text-amber-700"}`}>Condition</h4>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger
                      className={`border-2 rounded-lg ${
                        isDarkMode
                          ? "border-slate-600 focus:border-amber-500 bg-slate-800 text-white"
                          : "border-amber-200 focus:border-amber-500"
                      }`}
                    >
                      <SelectValue placeholder="All Conditions" />
                    </SelectTrigger>
                    <SelectContent className={isDarkMode ? "bg-slate-800 border-slate-600" : ""}>
                      <SelectItem value="All Conditions" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        All Conditions
                      </SelectItem>
                      <SelectItem value="new" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        New
                      </SelectItem>
                      <SelectItem value="used" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        Used
                      </SelectItem>
                      <SelectItem value="refurbished" className={isDarkMode ? "text-white hover:bg-slate-700" : ""}>
                        Refurbished
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className={`text-sm font-bold ${isDarkMode ? "text-cyan-300" : "text-blue-700"}`}>Price Range</h4>
                  <div className="px-2">
                    <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={50} className="w-full" />
                    <div
                      className={`flex justify-between text-sm mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`border-2 shadow-xl transition-all duration-500 ${
                isDarkMode
                  ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-600"
                  : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                  <Plus className="h-8 w-8 text-white" />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-amber-300" : "text-amber-800"}`}>
                  Sell Your Product
                </h3>
                <p className={`text-sm mb-4 ${isDarkMode ? "text-amber-400" : "text-amber-700"}`}>
                  Turn your items into cash!
                </p>
                <Sheet open={isSellerDashboardOpen} onOpenChange={setIsSellerDashboardOpen}>
                  <SheetTrigger asChild>
                    <Button
                      onClick={handleSellProductClick}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Sell Product
                    </Button>
                  </SheetTrigger>
                </Sheet>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1 space-y-8">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="p-4 border rounded-lg">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Seller Modal */}
      <Sheet open={contactSellerOpen} onOpenChange={setContactSellerOpen}>
        <SheetContent
            side="right"
            className="w-full sm:max-w-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0d47a1] via-[#0d47a1]/95 to-[#0d47a1]/90 border-l-4 border-[#00bcd4] backdrop-blur-xl shadow-2xl"
        >
          <SheetHeader
            className="mb-8 pb-8 border-b-2 relative overflow-hidden bg-gradient-to-r from-[#00bcd4]/20 to-[#00bcd4]/10 border-[#00bcd4]/30 shadow-xl rounded-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00bcd4]/10 to-[#ff9800]/10 animate-pulse" />
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-[#ff9800] via-[#00bcd4] to-[#ff9800] rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <User className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-3xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent from-white to-[#00bcd4]">
                  Contact Seller
                </SheetTitle>
                <p className="text-base text-white/90">
                  Connect directly with the seller for this amazing product
                </p>
              </div>
            </div>
          </SheetHeader>

          {selectedSeller && (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="p-4 rounded-xl border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Product Details
                </h3>
                <div className="flex gap-3">
                  <img
                    src={selectedSeller.image || "/placeholder.svg"}
                    alt={selectedSeller.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-[#0d47a1]">
                      {selectedSeller.name}
                    </h4>
                    <p
                      className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent from-[#ff9800] to-[#ff9800]/80"
                    >
                      ${selectedSeller.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-[#00bcd4]" />
                      <span className="text-sm text-gray-600">
                        {selectedSeller.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="p-4 rounded-xl border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Seller Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{selectedSeller.seller.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900">
                        {selectedSeller.seller}
                      </p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < 4 ? "fill-[#ff9800] text-[#ff9800]" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm ml-2 text-gray-600">
                          4.8 (127 reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 rounded-lg bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <p className="text-sm text-gray-600">Member since</p>
                      <p className="font-semibold text-gray-900">March 2023</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <p className="text-sm text-gray-600">Response time</p>
                      <p className="font-semibold text-gray-900">Within 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-4 rounded-xl border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  Send Message
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-700">Your Message</Label>
                    <Textarea
                      placeholder={`Hi ${selectedSeller.seller}, I'm interested in your ${selectedSeller.name}. Is it still available?`}
                      className="mt-2 min-h-[120px] bg-white border-[#0d47a1]/30 focus:border-[#00bcd4]"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-white font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí iría la lógica para enviar el mensaje
                        alert("Message sent successfully!");
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí iría la lógica para llamar
                        alert("Calling seller...");
                      }}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Product Detail Sheet */}
      <Sheet open={productDetailOpen} onOpenChange={setProductDetailOpen}>
        <SheetContent
          side="right"
          className="w-[95%] sm:w-[90%] max-w-3xl p-4 sm:p-2 h-[100vh] overflow-y-auto scrollbar-hide bg-gradient-to-br from-[#0d47a1] via-[#0d47a1]/95 to-[#0d47a1]/90 border-l-4 border-[#00bcd4] backdrop-blur-xl shadow-2xl"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {selectedProductDetail && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="relative group">
                  <img
                    src={selectedProductDetail.image || "/placeholder.svg"}
                    alt={selectedProductDetail.name}
                    className="w-full sm:w-36 h-48 sm:h-36 object-cover rounded-xl shadow-xl border-2 border-white/20 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                </div>
                <div className="flex-1 w-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedProductDetail.name}
                  </h2>
                  <p className="text-lg sm:text-xl font-semibold mt-2 text-[#ff9800]">
                    ${selectedProductDetail.price.toLocaleString()}
                  </p>
                  <p className="text-sm mt-2 text-white/80">
                    {selectedProductDetail.location} • {selectedProductDetail.condition}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden bg-white/95 border-[#00bcd4]/30 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00bcd4]/5 to-[#ff9800]/5" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#0d47a1] to-[#00bcd4]" />
                    Description
                  </h3>
                  <p className="leading-relaxed text-gray-700">
                    {selectedProductDetail.description || "No description provided for this product. Contact the seller for more details about this item."}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden bg-white/95 border-[#ff9800]/30 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff9800]/5 to-[#ff9800]/10" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#ff9800] to-[#ff9800]/80" />
                    Apply Coupon
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 rounded-lg p-3 border-2 backdrop-blur-sm transition-all duration-300 bg-white border-[#ff9800]/30 focus:border-[#ff9800] text-gray-900"
                    />
                    <Button
                      onClick={() => {
                        // simple demo coupon logic: if code is SAVE10 => 10% off
                        if (couponCode.trim().toUpperCase() === "SAVE10") {
                          setDiscountPercent(10)
                          setCouponMessage("Coupon applied: 10% off")
                        } else if (couponCode.trim() === "") {
                          setDiscountPercent(0)
                          setCouponMessage("Enter a coupon code to apply")
                        } else {
                          setDiscountPercent(0)
                          setCouponMessage("Invalid coupon")
                        }
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg sm:w-auto w-full"
                    >
                      Apply
                    </Button>
                  </div>
                  {discountPercent > 0 && (
                    <p className="mt-3 text-sm font-medium text-[#ff9800]">Discount: {discountPercent}% — New price: ${((selectedProductDetail.price * (100 - discountPercent)) / 100).toFixed(2)}</p>
                  )}
                  {couponMessage && <p className="mt-2 text-sm text-gray-600">{couponMessage}</p>}
                </div>
              </div>

              <div className="p-4 sm:p-6 rounded-2xl border-2 backdrop-blur-sm relative overflow-hidden bg-white/95 border-[#0d47a1]/30 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d47a1]/5 to-[#00bcd4]/5" />
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                    <div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#0d47a1] to-[#00bcd4]" />
                    Contact Seller
                  </h3>
                  <p className="text-sm mb-4 text-gray-700">
                    Use the button below to message the seller. (Button is non-functional as requested.)
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-[#0d47a1] to-[#00bcd4] hover:from-[#0d47a1]/90 hover:to-[#00bcd4]/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setProductDetailOpen(false)} 
                      className="w-full sm:w-auto border-2 border-[#ff9800] text-[#ff9800] hover:bg-[#ff9800]/10 hover:border-[#ff9800]/80"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Send QR Modal */}
      <Sheet open={showSendQR} onOpenChange={setShowSendQR}>
        <SheetContent className="w-[90%] max-w-md p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Send className="h-5 w-5 text-[#00bcd4]" />
              Enviar Crypto
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Recipient Address */}
            <div>
              <Label htmlFor="recipient" className="text-sm font-medium text-white">
                Dirección de destino
              </Label>
              <Input
                id="recipient"
                placeholder="0x..."
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#00bcd4] focus:ring-[#00bcd4]"
              />
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-white">
                Cantidad (ETH)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.0001"
                placeholder="0.0"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="mt-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#00bcd4] focus:ring-[#00bcd4]"
              />
              <p className="text-xs mt-1 text-white/70">
                Balance disponible: {balance} ETH
              </p>
            </div>

            {/* QR Code */}
            {recipientAddress && sendAmount && (
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <img 
                    src={generateSendQR()} 
                    alt="QR Code para envío"
                    className="w-48 h-48"
                  />
                </div>
                <p className="text-sm text-center text-white/80">
                  Escanea este código QR para enviar {sendAmount} ETH
                </p>
                <div className="p-3 rounded-lg text-xs font-mono bg-white/10 text-[#00bcd4] border border-white/20">
                  Para: {truncateAddress(recipientAddress)}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => {
                  setShowSendQR(false)
                  setRecipientAddress("")
                  setSendAmount("")
                }}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white"
                disabled={!recipientAddress || !sendAmount}
                onClick={() => {
                  alert(`🚀 Transacción preparada!\n\nEnviando ${sendAmount} ETH\nA: ${truncateAddress(recipientAddress)}\n\n(Simulación - QR generado exitosamente)`)
                  setShowSendQR(false)
                  setRecipientAddress("")
                  setSendAmount("")
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                Confirmar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Receive QR Modal */}
      <Sheet open={showReceiveQR} onOpenChange={setShowReceiveQR}>
        <SheetContent className="w-[90%] max-w-md p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Download className="h-5 w-5 text-[#00bcd4]" />
              Recibir Crypto
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* QR Code */}
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <img 
                  src={generateReceiveQR()} 
                  alt="QR Code para recibir"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-center text-white/80">
                Comparte este código QR para recibir ETH en Sepolia
              </p>
            </div>

            {/* Wallet Address */}
            <div>
              <Label className="text-sm font-medium text-white">
                Tu dirección de wallet
              </Label>
              <div className="mt-1 p-3 rounded-lg border bg-white/10 border-white/20">
                <p className="text-sm font-mono break-all text-[#00bcd4]">
                  {walletAddress}
                </p>
              </div>
            </div>

            {/* Copy Button */}
            <Button 
              className="w-full bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70 text-white"
              onClick={() => {
                navigator.clipboard.writeText(walletAddress)
                alert("📋 Dirección copiada al portapapeles!")
              }}
            >
              <QrCode className="h-4 w-4 mr-2" />
              Copiar Dirección
            </Button>

            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20 text-white hover:bg-white/10 hover:text-white"
                onClick={() => setShowReceiveQR(false)}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* QR Upload Modal */}
      <Sheet open={showQRUploadModal} onOpenChange={setShowQRUploadModal}>
        <SheetContent className="w-[95%] max-w-md p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <Upload className="h-5 w-5 text-[#00bcd4]" />
              Subir Código QR
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Upload Instructions */}
            <div className="p-4 rounded-lg border bg-[#00bcd4]/10 border-[#00bcd4]/30">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#00bcd4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Camera className="h-3 w-3 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">
                    Instrucciones:
                  </p>
                  <ul className="text-xs space-y-1 text-white/90">
                    <li>• Selecciona una imagen clara del código QR</li>
                    <li>• Asegúrate de que el QR esté bien iluminado</li>
                    <li>• Formatos soportados: JPG, PNG</li>
                    <li>• Tamaño máximo: 10MB</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors border-white/30 bg-white/10 backdrop-blur-sm hover:border-[#00bcd4]/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQRImageUpload}
                  className="hidden"
                  id="qr-upload"
                />
                <label htmlFor="qr-upload" className="cursor-pointer">
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-white/20 backdrop-blur-sm">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        Seleccionar imagen
                      </p>
                      <p className="text-sm text-white/80">
                        Haz clic para elegir un archivo
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Show selected file */}
              {uploadedQRImage && (
                <div className="p-3 rounded-lg border bg-white/95 backdrop-blur-sm border-[#ff9800]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#ff9800] rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {uploadedQRImage.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(uploadedQRImage.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                onClick={() => {
                  resetQRUpload()
                }}
                disabled={isProcessingQR}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                disabled={!uploadedQRImage || isProcessingQR}
                onClick={processQRCode}
              >
                {isProcessingQR ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4 mr-2" />
                    Procesar QR
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* QR Result Modal */}
      <Sheet open={showQRResultModal} onOpenChange={setShowQRResultModal}>
        <SheetContent className="w-[95%] max-w-lg p-6 h-[100vh] overflow-y-auto bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <QrCode className="h-5 w-5 text-[#00bcd4]" />
              Información del QR
            </SheetTitle>
          </SheetHeader>
          
          {qrData && (
            <div className="mt-6 space-y-6">
              {/* Payment Details Card */}
              <div className="p-6 rounded-xl border-2 bg-white/95 backdrop-blur-sm border-[#00bcd4]/30 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Solicitud de Pago
                    </h3>
                    <p className="text-sm text-gray-600">
                      Información extraída del QR
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Amount */}
                  <div className="p-4 rounded-lg bg-[#ff9800]/10 border border-[#ff9800]/30">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">
                        Monto a pagar:
                      </span>
                      <span className="text-2xl font-bold text-[#ff9800]">
                        {qrData.amount} {qrData.currency}
                      </span>
                    </div>
                    {qrData.fee && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          Comisión:
                        </span>
                        <span className="text-xs text-gray-500">
                          {qrData.fee} {qrData.currency}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Exchange Rate */}
                  {qrData.exchangeRate && (
                    <div className="p-3 rounded-lg flex items-center gap-2 bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <ArrowDownUp className="h-4 w-4 text-[#00bcd4]" />
                      <span className="text-sm text-gray-700">
                        {qrData.exchangeRate}
                      </span>
                    </div>
                  )}

                  {/* Wallet Address (if available) */}
                  {qrData.address && (
                    <div className="p-4 rounded-lg bg-[#0d47a1]/10 border border-[#0d47a1]/20">
                      <h4 className="text-sm font-medium mb-2 text-gray-600">
                        Dirección de wallet:
                      </h4>
                      <p className="font-mono text-sm break-all text-gray-700">
                        {qrData.address}
                      </p>
                    </div>
                  )}

                  {/* Raw Data */}
                  <details className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <summary className="text-sm font-medium cursor-pointer text-gray-600">
                      Datos completos del QR
                    </summary>
                    <p className="font-mono text-xs mt-2 break-all text-gray-500">
                      {qrData.rawData}
                    </p>
                  </details>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                  onClick={() => {
                    resetQRUpload()
                  }}
                >
                  Cerrar
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                  onClick={() => {
                    alert(`💰 Procesando pago de ${qrData.amount} ${qrData.currency}\n\n✅ En un proyecto real, aquí se conectaría con el sistema de pagos.`)
                    resetQRUpload()
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Procesar Pago
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Deposit Modal */}
      <Sheet open={showDepositModal} onOpenChange={setShowDepositModal}>
        <SheetContent className="w-[90%] max-w-md p-6 bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <CreditCard className="h-5 w-5 text-[#00bcd4]" />
              ¿Cuánto quieres depositar?
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Exchange Rate Display */}
            <div className="p-3 rounded-lg flex items-center gap-2 bg-[#00bcd4]/20 border border-[#00bcd4]/30">
              <ArrowDownUp className="h-4 w-4 text-[#ff9800]" />
              <span className="text-sm text-white">
                1 USD = {usdcRate} Bs
              </span>
            </div>

            {/* Deposit Amount Input */}
            <div>
              <Label className="text-sm font-medium text-white">
                Depositando
              </Label>
              <div className="mt-2 space-y-3">
                {/* Bolivianos Input */}
                <div className="relative">
                  <div className="flex items-center gap-3 p-4 rounded-lg border-2 bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-sm"></div>
                      <span className="font-medium text-gray-900">Bs</span>
                    </div>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0,00"
                      value={depositAmountBs}
                      onChange={(e) => setDepositAmountBs(e.target.value)}
                      className="border-0 bg-transparent text-right text-lg font-semibold focus-visible:ring-0 text-gray-900 placeholder:text-gray-400"
                    />
                    <span className="text-xs text-gray-500">
                      Comisión 0 Bs
                    </span>
                  </div>
                </div>

                {/* Conversion Arrow */}
                <div className="flex justify-center">
                  <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <ArrowDownUp className="h-4 w-4 text-[#ff9800]" />
                  </div>
                </div>

                {/* USDC Output */}
                <div className="relative">
                  <Label className="text-xs font-medium text-white/80">
                    Recibes
                  </Label>
                  <div className="flex items-center gap-3 p-4 rounded-lg border-2 bg-white/95 backdrop-blur-sm border-[#ff9800]/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[#ff9800] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">$</span>
                      </div>
                      <span className="font-medium text-gray-900">USDC</span>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="text-lg font-semibold text-[#ff9800]">
                        ${calculateUSDCAmount()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Balance ${balanceUSD}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deposit Limits */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-4 h-4 bg-[#ff9800] rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Depósito mínimo 1,00 Bs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/90">
                <div className="w-4 h-4 bg-[#ff9800] rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span>Depósito máximo 10.837,50 Bs</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                onClick={() => {
                  setShowDepositModal(false)
                  setDepositAmountBs("")
                }}
                disabled={isLoadingDeposit}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                disabled={!depositAmountBs || parseFloat(depositAmountBs) <= 0 || isLoadingDeposit}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDepositConfirm();
                }}
              >
                {isLoadingDeposit ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Procesando...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Confirmar Depósito
                  </>
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Payment QR Modal */}
      <Sheet open={showPaymentQR} onOpenChange={setShowPaymentQR}>
        <SheetContent className="w-[95%] sm:w-[90%] max-w-lg p-4 sm:p-6 h-[100vh] overflow-y-auto bg-gradient-to-br from-[#0d47a1] to-[#0d47a1]/90 border-[#00bcd4]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-white">
              <QrCode className="h-5 w-5 text-[#00bcd4]" />
              Escanea para Pagar
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Transaction Details */}
            {pendingDepositData && (
              <div className="p-4 rounded-lg border bg-white/95 backdrop-blur-sm border-[#00bcd4]/30">
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Depósito de {pendingDepositData.bs} Bs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Recibirás {pendingDepositData.usdc} USDC
                  </p>
                  <div className="text-xs text-gray-500">
                    Tasa: 1 USD = {usdcRate} Bs
                  </div>
                </div>
              </div>
            )}

            {/* QR Code */}
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-lg bg-white/95 backdrop-blur-sm border border-[#00bcd4]/30">
                <img 
                  src="/payment-qr.jpg" 
                  alt="QR Code para pago"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm font-medium text-white">
                  Escanea este código QR con tu app de pagos
                </p>
                <p className="text-xs text-white/80">
                  Una vez realizado el pago, confirma la transacción
                </p>
              </div>
            </div>

            {/* Payment Instructions */}
            <div className="p-3 rounded-lg bg-[#00bcd4]/20 border border-[#00bcd4]/30">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-[#00bcd4] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">!</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">
                    Instrucciones de pago:
                  </p>
                  <ul className="text-xs space-y-1 text-white/90">
                    <li>• Abre tu app de pagos móvil</li>
                    <li>• Escanea el código QR</li>
                    <li>• Confirma el monto: {pendingDepositData?.bs} Bs</li>
                    <li>• Realiza el pago</li>
                    <li>• Presiona "Confirmar Pago" aquí</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]/10"
                onClick={() => {
                  setShowPaymentQR(false)
                  setShowDepositModal(true) // Volver al modal de depósito
                }}
              >
                ← Volver
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-[#ff9800] to-[#ff9800]/80 hover:from-[#ff9800]/90 hover:to-[#ff9800]/70"
                onClick={handlePaymentComplete}
              >
                ✓ Confirmar Pago
              </Button>
            </div>

            {/* Timer or Status */}
            <div className="text-center">
              <p className="text-xs text-white/70">
                🕐 Este QR expira en 15 minutos
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
