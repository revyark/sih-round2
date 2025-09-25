import { useState, useEffect } from 'react';
import MarketplaceCard from './MarketplaceCard';
import MarketplacesFilters from './MarketplacesFilters';

const MarketplacesSection = () => {
    const [marketplaces, setMarketplaces] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        const fetchMarketplaces = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/marketplaces/');
                if (!response.ok) {
                    throw new Error('Failed to fetch marketplaces');
                }
                const data = await response.json();
                const mappedMarketplaces = data.data.marketplaces.map(market => ({
                    id: market._id,
                    name: market.name,
                    description: market.description,
                    url: market.marketplaceUrl,
                    tags: [market.category, ...market.tags],
                    imageUrl: market.imageUrl
                }));
                setMarketplaces(mappedMarketplaces);
            } catch (error) {
                console.error('Error fetching marketplaces:', error);
                // Optionally set to mock data as fallback
                // setMarketplaces(initialMockMarketplaces);
            }
        };
        fetchMarketplaces();
    }, []);

    const filteredMarketplaces = marketplaces.filter(market => {
        const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              market.description.toLowerCase().includes(searchTerm.toLowerCase());
        let matchesFilter = selectedFilter === 'all';
        if (!matchesFilter) {
            switch (selectedFilter) {
                case 'nfts':
                    matchesFilter = market.tags.includes('NFTs');
                    break;
                case 'defi':
                    matchesFilter = market.tags.includes('Finance');
                    break;
                case 'gaming':
                    matchesFilter = market.tags.includes('Gaming');
                    break;
                case 'other':
                    matchesFilter = !market.tags.some(tag => ['nfts', 'finance', 'gaming'].includes(tag));
                    break;
                default:
                    matchesFilter = false;
            }
        }
        return matchesSearch && matchesFilter;
    });

    return (
        <div id="marketplaces" className="container mx-auto px-4 py-4 border-2 border-amber-400 rounded-4xl overflow-y-auto h-240">
            <MarketplacesFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            {/* Marketplaces Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredMarketplaces.length > 0 ? (
                    filteredMarketplaces.map(market => (
                        <MarketplaceCard key={market.id} market={market} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400">No marketplaces found.</p>
                )}
            </div>
        </div>
    );
};

export default MarketplacesSection;
