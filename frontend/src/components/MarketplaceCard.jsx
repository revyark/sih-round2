const MarketplaceCard = ({ market }) => (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-shadow duration-300 transform hover:-translate-y-1 h-120">
        <img src={market.imageUrl} alt={market.name} className="w-full h-56 object-cover" />
        <div className="p-6 relative">
            <h3 className="text-2xl font-bold text-white mb-2">{market.name}</h3>
            <p className="text-gray-400 mb-4">{market.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {market.tags.map(tag => (
                    <span key={tag} className="bg-gray-700 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <a href={market.url} target="_blank" rel="noopener noreferrer" className="inline-block bg-gray-700 hover:bg-gray-600 text-yellow-400 font-bold py-2 px-4 rounded-lg transition duration-300 absolute top-49">
                Visit Site &rarr;
            </a>
        </div>
    </div>
);

export default MarketplaceCard;
