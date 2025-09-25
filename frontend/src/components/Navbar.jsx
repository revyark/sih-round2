import ShieldIcon from './ShieldIcon';

const Navbar = ({ account, setPage, connectWallet }) => (
    <nav className="bg-gray-800/30 backdrop-blur-md p-4 sticky top-0 z-50 border-b border-gray-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
                {/* <ShieldIcon /> */}
                <h1 className="text-2xl font-bold text-yellow-400">HASH Market</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-300">
                {['Home', 'List Your Site', 'Scan URL', 'Report a Site', 'Reported Sites'].map(item => (
                    <a key={item} href="#" className="hover:text-yellow-400 transition duration-300" onClick={() => setPage(item.toLowerCase().replace(/ /g, ''))}>
                        {item}
                    </a>
                ))}
            </div>
            {account ? (
                <div className="bg-gray-800 text-sm font-mono p-2 rounded-md border border-gray-700">
                    {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                </div>
            ) : (
                <button onClick={connectWallet} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">
                    Connect Wallet
                </button>
            )}
        </div>
    </nav>
);

export default Navbar;
