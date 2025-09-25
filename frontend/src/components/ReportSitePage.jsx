import { useState } from 'react';

const ReportSitePage = ({ onReportSite }) => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!url) {
            setStatus({ type: 'error', message: 'Please enter a URL to report.' });
            return;
        }
        const newReport = {
            id: Date.now(),
            url,
            threat: 'User Reported',
            date: new Date().toISOString().split('T')[0],
        };
        onReportSite(newReport);
        setStatus({ type: 'success', message: 'Thank you for your report. It has been submitted for review.' });
        setUrl('');
    };
    
    return (
        <div className="container mx-auto max-w-2xl py-20 px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Report a Suspicious Site</h2>
            <p className="text-gray-400 mb-8">Help keep the community safe by reporting potentially malicious websites.</p>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg">
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://suspicious-site.com"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-6"
                />
                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                    Submit Report
                </button>
                {status && (
                    <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {status.message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default ReportSitePage;
