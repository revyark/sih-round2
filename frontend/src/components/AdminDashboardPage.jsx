import React, { useState, useEffect } from 'react';

const AdminDashboardPage = () => {
    const [reportedSites, setReportedSites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserReports = async () => {
            try {
                const response = await fetch('http://localhost:8000/userReports', {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user reports');
                }
                const data = await response.json();
                const reports = data.reports || [];

                // Map to expected format
                const sites = reports.map((report) => ({
                    id: report.id,
                    url: report.domain,
                    reportedWallet: report.reporter,
                    date: new Date(Number(report.timestamp)).toLocaleDateString(),
                    flag: 'Unsafe 100%',
                    isBanned: false
                }));
                setReportedSites(sites);
            } catch (error) {
                console.error('Error fetching user reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserReports();
    }, []);

    const handleBan = async (id) => {
        try {
            const response = await fetch('http://localhost:8000/verifyReport', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ reportId: id }),
            });
            if (!response.ok) {
                throw new Error('Failed to verify report');
            }
            const result = await response.json();
            console.log('Report verified:', result);

            // Update the site to banned
            setReportedSites(prev => prev.map(site =>
                site.id === id ? { ...site, flag: 'Banned', isBanned: true } : site
            ));
        } catch (error) {
            console.error('Error banning site:', error);
            alert('Failed to ban the site.');
        }
    };

    const handleDismiss = (id) => {
        // For now, just remove from local state
        setReportedSites(prev => prev.filter(site => site.id !== id));
    };

    if (loading) {
        return <div className="container mx-auto py-12 px-4">Loading...</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-10">Admin Dashboard</h2>
            <div className="bg-gray-800 rounded-xl shadow-lg p-4">
                <h3 className="text-2xl font-bold text-yellow-400 mb-6">Pending Site Reports</h3>
                {reportedSites.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No pending reports.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-700">
                                <th className="p-4">URL</th>
                                <th className="p-4">Reporter's Wallet</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-center">Actions</th>
                                <th className="p-4">Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedSites.map(site => (
                                <tr key={site.id} className="border-b border-gray-700/50 hover:bg-gray-700/50">
                                    <td className="p-4 font-mono text-sm break-all">{site.url}</td>
                                    <td className="p-4 font-mono text-sm break-all">{site.reportedWallet}</td>
                                    <td className="p-4 text-gray-400">{site.date}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg text-sm transition-colors">Scan</button>
                                        <button onClick={() => handleBan(site.id)} disabled={site.isBanned} className={`font-bold py-1 px-3 rounded-lg text-sm transition-colors ${site.isBanned ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'}`}>Ban</button>
                                        <button onClick={() => handleDismiss(site.id)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-lg text-sm transition-colors">×</button>
                                    </td>
                                    <td className="p-4 pl-8">
                                        {site.isBanned ? (
                                            <span className="text-red-500 font-bold">Banned</span>
                                        ) : (
                                            <div className="w-40">
                                                {/* Label */}
                                                <div className="flex justify-between mb-1 text-sm">
                                                    <span>{site.flag.split(" ")[0]}</span>
                                                    <span>{site.flag.split(" ")[1]}</span>
                                                </div>
                                                {/* Progress bar */}
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`h-2.5 rounded-full ${site.flag.includes("Unsafe") ? "bg-red-500" : "bg-green-500"
                                                            }`}
                                                        style={{
                                                            width: site.flag.split(" ")[1], // e.g. "95%"
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
