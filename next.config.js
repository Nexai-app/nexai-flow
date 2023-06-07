/** @type {import('next').NextConfig} */
const nextConfig = {
    
    env: {
    ACCESS_NODE_API: process.env.NEXT_PUBLIC_ACCESS_NODE_API,
    DISCOVERY_WALLET: process.env.NEXT_PUBLIC_DISCOVERY_WALLET,
    CONTRACT_PROFILE:process.env.NEXT_PUBLIC_CONTRACT_PROFILE
  }
}

module.exports = nextConfig
