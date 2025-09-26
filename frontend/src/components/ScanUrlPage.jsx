import { useState } from 'react';

const ScanUrlPage = () => {
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        if (!url) {
            setResult({ type: 'error', message: 'Please enter a URL.' });
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch(`https://phishing-detection-production-983e.up.railway.app/predict?url=${encodeURIComponent(url)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to scan URL');
            }

            const data = await response.json();
            
            if (data.prediction === 'Unsafe (Phishing)' || data.prediction === 'Unsafe (Malicious)') {
                setResult({ 
                    type: 'warning', 
                    message: 'Potential Threat Detected!', 
                    details: `This URL has been flagged as ${data.prediction}. Exercise caution.`,
                    confidence: data.confidence || 'N/A'
                });
            } else {
                setResult({ 
                    type: 'safe', 
                    message: 'Looks Safe!', 
                    details: `This URL appears to be ${data.prediction || 'safe'}.`,
                    confidence: data.confidence || 'N/A'
                });
            }
        } catch (error) {
            console.error('Error scanning URL:', error);
            setResult({ 
                type: 'error', 
                message: 'Scan Failed', 
                details: 'Unable to scan the URL. Please try again later.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    const ResultCard = () => {
        if (!result) return null;
        const baseClasses = "p-6 mt-8 rounded-xl text-left";
        const safeClasses = "bg-green-900/50 border border-green-500";
        const warningClasses = "bg-red-900/50 border border-red-500";
        const errorClasses = "bg-yellow-900/50 border border-yellow-500";

        switch (result.type) {
            case 'safe': 
                return (
                    <div className={`${baseClasses} ${safeClasses}`}>
                        <h3 className="font-bold text-green-300 text-xl">{result.message}</h3>
                        <p className="text-green-400">{result.details}</p>
                        {result.confidence && <p className="text-green-300 text-sm mt-2">Confidence: {result.confidence}</p>}
                    </div>
                );
            case 'warning': 
                return (
                    <div className={`${baseClasses} ${warningClasses}`}>
                        <h3 className="font-bold text-red-300 text-xl">{result.message}</h3>
                        <p className="text-red-400">{result.details}</p>
                        {result.confidence && <p className="text-red-300 text-sm mt-2">Confidence: {result.confidence}</p>}
                    </div>
                );
            case 'error': 
                return (
                    <div className={`${baseClasses} ${errorClasses}`}>
                        <h3 className="font-bold text-yellow-300 text-xl">{result.message}</h3>
                        <p className="text-yellow-400">{result.details}</p>
                    </div>
                );
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
