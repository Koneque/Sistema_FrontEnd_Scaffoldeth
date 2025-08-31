export const REFERRAL_SYSTEM_ABI = [
  {
    "type": "function",
    "name": "createReferralCode",
    "inputs": [
      { "name": "code", "type": "string" },
      { "name": "validityPeriod", "type": "uint256" },
      { "name": "maxUsage", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "registerReferralWithCode",
    "inputs": [
      { "name": "code", "type": "string" },
      { "name": "referred", "type": "address" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "isReferralCodeValid",
    "inputs": [{ "name": "code", "type": "string" }],
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getReferralCodeInfo",
    "inputs": [{ "name": "code", "type": "string" }],
    "outputs": [
      {
        "type": "tuple",
        "components": [
          { "name": "code", "type": "string" },
          { "name": "referrer", "type": "address" },
          { "name": "expiresAt", "type": "uint256" },
          { "name": "maxUsage", "type": "uint256" },
          { "name": "currentUsage", "type": "uint256" },
          { "name": "isActive", "type": "bool" }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserReferrals",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [{ "name": "", "type": "address[]" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "recordFirstPurchase",
    "inputs": [
      { "name": "buyer", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ReferralCodeCreated",
    "inputs": [
      { "name": "code", "type": "string", "indexed": false },
      { "name": "referrer", "type": "address", "indexed": true },
      { "name": "expiresAt", "type": "uint256", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "ReferralRegistered",
    "inputs": [
      { "name": "referrer", "type": "address", "indexed": true },
      { "name": "referred", "type": "address", "indexed": true },
      { "name": "code", "type": "string", "indexed": false }
    ]
  },
  {
    "type": "event",
    "name": "ReferralRewardPaid",
    "inputs": [
      { "name": "referrer", "type": "address", "indexed": true },
      { "name": "amount", "type": "uint256", "indexed": false },
      { "name": "buyer", "type": "address", "indexed": true }
    ]
  }
] as const;
