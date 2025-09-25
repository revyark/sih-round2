const ChartsSidebar = () => (
    <div className="w-64 bg-gray-800 p-6 rounded-lg shadow-lg mr-8">
        <h3 className="text-xl font-bold text-white mb-4">Market Analytics</h3>

        {/* Bar Chart */}
        <div className="mb-6">
            <h4 className="text-sm text-gray-400 mb-2">Volume (24h)</h4>
            <div className="space-y-2">
                <div className="flex items-end">
                    <span className="text-xs text-gray-500 w-12">NFTs</span>
                    <div className="flex-1 bg-gray-700 rounded h-4 relative overflow-hidden">
                        <div className="bg-purple-500 h-full rounded animate-pulse" style={{width: '80%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">$2.1M</span>
                </div>
                <div className="flex items-end">
                    <span className="text-xs text-gray-500 w-12">DeFi</span>
                    <div className="flex-1 bg-gray-700 rounded h-4 relative overflow-hidden">
                        <div className="bg-purple-500 h-full rounded animate-pulse" style={{width: '65%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">$1.4M</span>
                </div>
                <div className="flex items-end">
                    <span className="text-xs text-gray-500 w-12">Gaming</span>
                    <div className="flex-1 bg-gray-700 rounded h-4 relative overflow-hidden">
                        <div className="bg-purple-500 h-full rounded animate-pulse" style={{width: '50%'}}></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">$900K</span>
                </div>
            </div>
        </div>

        {/* Line Chart Placeholder */}
        <div className="mb-6">
            <h4 className="text-sm text-gray-400 mb-2">Price Trend</h4>
            <div className="bg-gray-700 rounded p-4 h-32 flex items-end justify-between">
                <div className="w-1 bg-purple-500 rounded-t animate-bounce" style={{height: '20%'}}></div>
                <div className="w-1 bg-purple-500 rounded-t animate-bounce" style={{height: '40%', animationDelay: '0.1s'}}></div>
                <div className="w-1 bg-purple-500 rounded-t animate-bounce" style={{height: '60%', animationDelay: '0.2s'}}></div>
                <div className="w-1 bg-purple-500 rounded-t animate-bounce" style={{height: '80%', animationDelay: '0.3s'}}></div>
                <div className="w-1 bg-purple-500 rounded-t animate-bounce" style={{height: '50%', animationDelay: '0.4s'}}></div>
                <div className="w-1 bg-purple-500 rounded-t animate-bounce" style={{height: '70%', animationDelay: '0.5s'}}></div>
            </div>
        </div>

        {/* Pie Chart Placeholder */}
        <div>
            <h4 className="text-sm text-gray-400 mb-2">Market Share</h4>
            <div className="relative w-32 h-32 mx-auto">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                    <path d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none" stroke="#8B5CF6" strokeWidth="2" strokeDasharray="40, 60" className="animate-spin" style={{animationDuration: '3s'}}></path>
                    <path d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="30, 70" className="animate-spin" style={{animationDuration: '4s'}}></path>
                    <path d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none" stroke="#C084FC" strokeWidth="2" strokeDasharray="20, 80" className="animate-spin" style={{animationDuration: '5s'}}></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-white font-bold">Share</span>
                </div>
            </div>
        </div>
    </div>
);

export default ChartsSidebar;
