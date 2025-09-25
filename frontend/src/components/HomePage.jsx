import HowItWorksSection from './HowItWorksSection';
import MarketplacesSection from './MarketplacesSection';
import TextType from '../assets/TextType';
import ChartsSidebar from './ChartsSidebar';
import StatsSection from './StatsSection';

const HomePage = ({ setPage }) => (
    <div>
        <div className="text-center py-20 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
                Discover Marketplaces. <span className="animated-gradient">
                    <TextType
                        text={["Vetted for Security."]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|" />
                    </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl mb-8">
                Your secure gateway to the decentralized economy. Every listing is scanned for phishing and malicious threats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:space-x-4 justify-center items-center">
                <button onClick={() => document.getElementById('marketplaces').scrollIntoView({ behavior: 'smooth' })} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 w-full sm:w-auto">
                    Explore Markets
                </button>
                <button onClick={() => setPage('listyoursite')} className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold py-3 px-8 rounded-lg transition duration-300 hover:bg-yellow-400 hover:text-gray-900 w-full sm:w-auto">
                    List Your Site
                </button>
            </div>
        </div>

        {/* <StatsSection /> */}

        <div id="marketplaces" className="flex flex-col lg:flex-row gap-8 px-4 mb-12">
            {/* <ChartsSidebar /> */}
            <div className="flex-1">
                <MarketplacesSection />
            </div>
        </div>

        <HowItWorksSection />

        <div className="text-center mt-16">
            <button onClick={() => setPage('admindashboard')} className="text-gray-500 hover:text-yellow-400 text-sm transition-colors duration-300">
                Admin Dashboard
            </button>
        </div>
    </div>
);

export default HomePage;
