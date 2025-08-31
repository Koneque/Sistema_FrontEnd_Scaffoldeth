export const MARKETPLACE_CORE_ABI = [
  {
    "type": "function",
    "name": "listItem",
    "inputs": [
      { "name": "name", "type": "string" },
      { "name": "description", "type": "string" },
      { "name": "price", "type": "uint256" },
      { "name": "imageHash", "type": "string" },
      { "name": "category", "type": "uint8" }
    ],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "buyItem",
    "inputs": [{ "name": "itemId", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "confirmDelivery",
    "inputs": [{ "name": "transactionId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "finalizeTransaction",
    "inputs": [{ "name": "transactionId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "initiateDispute",
    "inputs": [{ "name": "transactionId", "type": "uint256" }],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getItem",
    "inputs": [{ "name": "itemId", "type": "uint256" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "name": "id", "type": "uint256" },
          { "name": "seller", "type": "address" },
          { "name": "buyer", "type": "address" },
          { "name": "price", "type": "uint256" },
          { "name": "name", "type": "string" },
          { "name": "description", "type": "string" },
          { "name": "imageHash", "type": "string" },
          { "name": "category", "type": "uint8" },
          { "name": "isActive", "type": "bool" },
          { "name": "createdAt", "type": "uint256" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTransaction",
    "inputs": [{ "name": "transactionId", "type": "uint256" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "name": "id", "type": "uint256" },
          { "name": "productId", "type": "uint256" },
          { "name": "buyer", "type": "address" },
          { "name": "seller", "type": "address" },
          { "name": "amount", "type": "uint256" },
          { "name": "status", "type": "uint8" },
          { "name": "createdAt", "type": "uint256" },
          { "name": "updatedAt", "type": "uint256" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getActiveItems",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserTransactions",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "ItemListed",
    "inputs": [
      { "name": "itemId", "type": "uint256", "indexed": true },
      { "name": "seller", "type": "address", "indexed": true },
      { "name": "price", "type": "uint256", "indexed": false },
      { "name": "name", "type": "string", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "ItemPurchased",
    "inputs": [
      { "name": "transactionId", "type": "uint256", "indexed": true },
      { "name": "itemId", "type": "uint256", "indexed": true },
      { "name": "buyer", "type": "address", "indexed": true },
      { "name": "seller", "type": "address", "indexed": false },
      { "name": "amount", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "TransactionStatusUpdated",
    "inputs": [
      { "name": "transactionId", "type": "uint256", "indexed": true },
      { "name": "status", "type": "uint8", "indexed": false }
    ]
  }
] as const;
