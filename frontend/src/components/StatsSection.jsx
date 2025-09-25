const StatsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
            <h3 className="text-3xl font-bold text-purple-400 mb-2">150+</h3>
            <p className="text-gray-400">Total Marketplaces</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
            <h3 className="text-3xl font-bold text-purple-400 mb-2">10K+</h3>
            <p className="text-gray-400">Scanned Sites</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
            <h3 className="text-3xl font-bold text-purple-400 mb-2">99.9%</h3>
            <p className="text-gray-400">Uptime</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
            <h3 className="text-3xl font-bold text-purple-400 mb-2">24/7</h3>
            <p className="text-gray-400">Monitoring</p>
        </div>
    </div>
);

export default StatsSection;
