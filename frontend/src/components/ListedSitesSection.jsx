import { useState, useEffect } from 'react';
import ListedSiteCard from './ListedSiteCard';
import MarketplacesFilters from './MarketplacesFilters';

const ListedSitesSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [marketplaces, setMarketplaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user's marketplaces
    const fetchMyMarketplaces = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:8000/api/v1/marketplaces/my', {
                method: 'GET',
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch marketplaces');
            }
            
            const data = await response.json();
            setMarketplaces(data.data.marketplaces || []);
        } catch (err) {
            console.error('Error fetching marketplaces:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyMarketplaces();
    }, []);

    // Handle discard marketplace
    const handleDiscard = async (marketplaceId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/marketplaces/${marketplaceId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Failed to discard marketplace');
            }
            
            // Refresh the list after successful deletion
            await fetchMyMarketplaces();
        } catch (err) {
            console.error('Error discarding marketplace:', err);
            setError(err.message);
        }
    };

    const filteredMarketplaces = marketplaces.filter(market => {
        const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              market.description.toLowerCase().includes(searchTerm.toLowerCase());
        let matchesFilter = selectedFilter === 'all';
        if (!matchesFilter) {
            switch (selectedFilter) {
                case 'nfts':
                    matchesFilter = market.category === 'nfts';
                    break;
                case 'defi':
                    matchesFilter = market.category === 'defi';
                    break;
                case 'gaming':
                    matchesFilter = market.category === 'gaming';
                    break;
                case 'other':
                    matchesFilter = market.category === 'other';
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
                {loading ? (
                    <p className="col-span-full text-center text-gray-400">Loading your marketplaces...</p>
                ) : error ? (
                    <p className="col-span-full text-center text-red-400">Error: {error}</p>
                ) : filteredMarketplaces.length > 0 ? (
                    filteredMarketplaces.map(market => (
                        <ListedSiteCard key={market._id} market={market} onDiscard={handleDiscard} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-400">No sites listed yet.</p>
                )}
            </div>
        </div>
    );
};

export default ListedSitesSection;
