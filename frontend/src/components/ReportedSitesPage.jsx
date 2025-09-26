import React, { useState, useEffect } from 'react';

const ReportedSitesPage = () => {
    const [reportedSites, setReportedSites] = useState([]);
    const [flaggedWallets, setFlaggedWallets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVerifiedReports = async () => {
            try {
                const response = await fetch('http://localhost:8000/verifiedReports');
                if (!response.ok) {
                    throw new Error('Failed to fetch verified reports');
                }
                const data = await response.json();
                const reports = data.reports || [];

                // Process reported sites: all domains
                const sites = reports.map((report, index) => ({
                    id: report.id,
                    url: report.domain,
                    threat: 'phising',
                    date: new Date(Number(report.timestamp)).toLocaleDateString()
                }));
                setReportedSites(sites);

                // Process flagged wallets: exclude zero address
                const zeroAddress = '0x0000000000000000000000000000000000000000';
                const wallets = reports
                    .filter(report => report.accusedWallet !== zeroAddress)
                    .map((report, index) => ({
                        id: report.id,
                        address: report.accusedWallet,
                        associatedWith: report.domain,
                        date: new Date(Number(report.timestamp)).toLocaleDateString()
                    }));
                setFlaggedWallets(wallets);

            } catch (error) {
                console.error('Error fetching verified reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVerifiedReports();
    }, []);

    if (loading) {
        return <div className="container mx-auto py-12 px-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Community Reports</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-6">Reported Websites</h3>
                    <div className="bg-gray-800 rounded-xl shadow-lg p-2">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="p-4">URL</th><th className="p-4">Threat</th><th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportedSites.map(site => (
                                    <tr key={site.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                                        <td className="p-4 font-mono text-sm break-all">{site.url}</td>
                                        <td className="p-4"><span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded-full">{site.threat}</span></td>
                                        <td className="p-4 text-gray-400">{site.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-6">Flagged Wallets</h3>
                    <div className="bg-gray-800 rounded-xl shadow-lg p-2">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="p-4">Address</th><th className="p-4">Associated With</th><th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {flaggedWallets.map(wallet => (
                                    <tr key={wallet.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                                        <td className="p-4 font-mono text-sm">{`${wallet.address.substring(0, 10)}...`}</td>
                                        <td className="p-4 text-sm text-gray-400 break-all">{wallet.associatedWith}</td>
                                        <td className="p-4 text-gray-400">{wallet.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="text-center mt-12 bg-gray-800/50 border border-gray-700 text-gray-400 p-4 rounded-lg max-w-3xl mx-auto">
                This list is generated from community reports and automated scans. Always do your own research.
            </div>
        </div>
    );
};

export default ReportedSitesPage;
