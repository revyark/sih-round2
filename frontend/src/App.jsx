import { useState, useEffect, useCallback } from 'react';
import './styles/animations.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ListYourSitePage from './components/ListYourSitePage';
import ScanUrlPage from './components/ScanUrlPage';
import ReportSitePage from './components/ReportSitePage';
import ReportedSitesPage from './components/ReportedSitesPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import Footer from './components/Footer';
import { initialMockReportedSites } from './data/mockData';





export default function App() {
    const [account, setAccount] = useState(null);
    const [page, setPage] = useState('home');
    const [reportedSites, setReportedSites] = useState(initialMockReportedSites);

    const connectWallet = useCallback(async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    // Integrate with backend API
                    try {
                        const response = await fetch('http://localhost:8000/api/v1/auth/connect-wallet', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ walletAddress: accounts[0] }),
                            credentials: 'include',
                        });
                        if (!response.ok) {
                            throw new Error('Failed to connect wallet on backend');
                        }
                        const data = await response.json();
                        console.log('Wallet connected to backend:', data);
                    } catch (apiError) {
                        console.error('Error connecting wallet to backend:', apiError);
                    }
                    setPage('listyoursite');
                }
            } catch (error) {
                console.error("User rejected request", error);
            }
        } else {
            console.log("MetaMask not found. Please install it to use this feature.");
            alert("Please install MetaMask to connect your wallet!");
        }
    }, []);

    const handleReportSite = (newReport) => {
        setReportedSites(prevSites => [newReport, ...prevSites]);
    };
    
    const handleDismissReport = (id) => {
        setReportedSites(prevSites => prevSites.filter(site => site.id !== id));
    };

    const renderPage = () => {
        switch (page) {
            case 'home': return <HomePage setPage={setPage} />;
            case 'listyoursite': return <ListYourSitePage account={account} />;
            case 'scanurl': return <ScanUrlPage />;
            case 'reportasite': return <ReportSitePage account={account} onReportSite={handleReportSite} />;
            case 'reportedsites': return <ReportedSitesPage />;
            case 'admindashboard': return <AdminDashboardPage />;
            default: return <HomePage setPage={setPage} />;
        }
    }

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <Navbar account={account} setPage={setPage} connectWallet={connectWallet} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

