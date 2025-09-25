// --- MOCK DATA ---
// This data would come from a backend API in a real app
export const initialMockMarketplaces = [
    { id: 1, name: 'OpenSea', description: 'The world\'s first and largest web3 marketplace for NFTs and crypto collectibles.', url: 'https://opensea.io', tags: ['NFTs', 'Art', 'Gaming'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=OpenSea' },
    { id: 2, name: 'Uniswap', description: 'A decentralized finance protocol that is used to exchange cryptocurrencies.', url: 'https://uniswap.org', tags: ['DeFi', 'Exchange', 'Tokens'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Uniswap' },
    { id: 3, name: 'Axie Marketplace', description: 'The official marketplace for Axie Infinity, a digital pet universe.', url: 'https://app.axieinfinity.com/marketplace/', tags: ['Gaming', 'NFTs', 'Collectibles'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Axie+Infinity' },
    { id: 4, name: 'Magic Eden', description: 'The leading NFT marketplace on Solana. Home to the next generation of digital creators.', url: 'https://magiceden.io/', tags: ['NFTs', 'Solana', 'Gaming'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Magic+Eden' },
    { id: 5, name: 'Rarible', description: 'Multi-chain community-centric NFT marketplace and issuance platform.', url: 'https://rarible.com', tags: ['NFTs', 'Art', 'Community'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Rarible' },
    { id: 6, name: 'Blur', description: 'Pro trader focused NFT marketplace with advanced features and analytics.', url: 'https://blur.io', tags: ['NFTs', 'Pro', 'Analytics'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Blur' },
    { id: 7, name: 'LooksRare', description: 'Community-first NFT marketplace with rewards for traders and creators.', url: 'https://looksrare.org', tags: ['NFTs', 'Rewards', 'Community'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=LooksRare' },
    { id: 8, name: 'Coinbase NFT', description: 'Coinbase’s NFT platform for discovering, buying, and selling NFTs.', url: 'https://nft.coinbase.com', tags: ['NFTs', 'Exchange', 'Discover'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Coinbase+NFT' },
    { id: 9, name: 'Blur', description: 'Pro trader focused NFT marketplace with advanced features and analytics.', url: 'https://blur.io', tags: ['NFTs', 'Pro', 'Analytics'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Blur' },
    { id: 10, name: 'LooksRare', description: 'Community-first NFT marketplace with rewards for traders and creators.', url: 'https://looksrare.org', tags: ['NFTs', 'Rewards', 'Community'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=LooksRare' },
    { id: 11, name: 'Coinbase NFT', description: 'Coinbase’s NFT platform for discovering, buying, and selling NFTs.', url: 'https://nft.coinbase.com', tags: ['NFTs', 'Exchange', 'Discover'], imageUrl: 'https://placehold.co/600x400/1E1E1E/FBBF24?text=Coinbase+NFT' }

];

export const initialMockReportedSites = [
    { id: 1, url: 'http://suspicious-site.com', threat: 'Phishing', date: '2023-10-26', reportedWallet: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', flag: 'Unsafe 95%' },
    { id: 2, url: 'http://malware-distributor.net', threat: 'Malware', date: '2023-10-25', reportedWallet: '0x5a2A997578509a4A875F2d5A1A3E2E6B4A8D9C4c', flag: 'Safe 80%' }
];

export const initialMockReportedWallets = [
    { id: 1, address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B', associatedWith: 'http://suspicious-site.com', date: '2023-10-26' },
    { id: 2, address: '0x5a2A997578509a4A875F2d5A1A3E2E6B4A8D9C4c', associatedWith: 'Scam Airdrop', date: '2023-10-24' }
];
