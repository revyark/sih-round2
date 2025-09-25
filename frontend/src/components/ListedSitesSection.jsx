import { useState } from 'react';
import { initialMockMarketplaces } from '../data/mockData';
import ListedSiteCard from './ListedSiteCard';
import MarketplacesFilters from './MarketplacesFilters';

const ListedSitesSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filteredMarketplaces = initialMockMarketplaces.filter(market => {
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
        <div id="listed-sites" className="container mx-auto px-4 py-4 border-2 border-yellow-500 rounded-4xl overflow-y-auto h-240 scrollbar-hide">
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
                        <ListedSiteCard key={market.id} market={market} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400">No sites listed yet.</p>
                )}
            </div>
        </div>
    );
};

export default ListedSitesSection;
