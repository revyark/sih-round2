import { useState } from 'react';

const ReportSitePage = ({ account, onReportSite }) => {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) {
            setStatus({ type: 'error', message: 'Please enter a URL to report.' });
            return;
        }
        if (!account) {
            setStatus({ type: 'error', message: 'Please connect your wallet first.' });
            return;
        }
        setLoading(true);
        setStatus(null);
        try {
            const response = await fetch('http://localhost:8000/submitUserReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ url, userWallet: account }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit report');
            }
            const data = await response.json();
            console.log('Report submitted:', data);
            const newReport = {
                id: Date.now(),
                url,
                threat: 'User Reported',
                date: new Date().toISOString().split('T')[0],
            };
            onReportSite(newReport);
            setStatus({ type: 'success', message: 'Thank you for your report. It has been submitted for review.' });
            setUrl('');
        } catch (error) {
            console.error('Error submitting report:', error);
            setStatus({ type: 'error', message: 'Failed to submit report. Please try again.' });
        } finally {
            setLoading(false);
        }
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
                <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                    {loading ? 'Submitting...' : 'Submit Report'}
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
