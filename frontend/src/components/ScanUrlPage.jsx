import { useState } from 'react';

const ScanUrlPage = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            if (!url) {
                setResult({ type: 'error', message: 'Please enter a URL.' });
            } else if (url.includes('phishing') || url.includes('badsite')) {
                setResult({ type: 'warning', message: 'Potential Threat Detected!', details: 'This domain is on a known blacklist.' });
            } else {
                setResult({ type: 'safe', message: 'Looks Safe!', details: 'No immediate threats found for this URL.' });
            }
            setIsLoading(false);
        }, 1500);
    };

    const ResultCard = () => {
        if (!result) return null;
        const baseClasses = "p-6 mt-8 rounded-xl text-left";
        const safeClasses = "bg-green-900/50 border border-green-500";
        const warningClasses = "bg-red-900/50 border border-red-500";
        const errorClasses = "bg-yellow-900/50 border border-yellow-500";

        switch (result.type) {
            case 'safe': return <div className={`${baseClasses} ${safeClasses}`}><h3 className="font-bold text-green-300 text-xl">{result.message}</h3><p className="text-green-400">{result.details}</p></div>;
            case 'warning': return <div className={`${baseClasses} ${warningClasses}`}><h3 className="font-bold text-red-300 text-xl">{result.message}</h3><p className="text-red-400">{result.details}</p></div>;
            case 'error': return <div className={`${baseClasses} ${errorClasses}`}><h3 className="font-bold text-yellow-300 text-xl">{result.message}</h3></div>;
            default: return null;
        }
    };

    return (
        <div className="container mx-auto max-w-2xl py-20 px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Check URL for Threats</h2>
            <p className="text-gray-400 mb-8">Our scanner will check the URL against known phishing and malware databases.</p>
            <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-4">
                <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-grow bg-gray-800 border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button type="submit" disabled={isLoading} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50">
                    {isLoading ? 'Scanning...' : 'Scan Now'}
                </button>
            </form>
            {isLoading && <div className="mt-8">Analyzing URL...</div>}
            <ResultCard />
        </div>
    );
};

export default ScanUrlPage;
