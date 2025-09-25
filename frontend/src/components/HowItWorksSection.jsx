const HowItWorksSection = () => {
    const attributes = [
        "having_IP_Address", "URL_Length", "Shortening_Service", "having_At_Symbol",
        "double_slash_redirecting", "Prefix_Suffix", "having_Sub_Domain", "SSLfinal_State",
        "Domain_registeration_length", "Favicon", "HTTPS_token", "Request_URL",
        "URL_of_Anchor", "Links_in_tags", "SFH", "Submitting_to_email", "Abnormal_URL",
        "Redirect", "on_mouseover", "RightClick", "popUpWidnow", "Iframe", "age_of_domain",
    ];

    return (
        <div className="py-24 bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Our 5-Step Security Protocol</h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg">
                        We employ a comprehensive, automated system to ensure platform integrity and user safety at every step.
                    </p>
                </div>

                <div className="space-y-20">
                    {/* Step 1: AI Scan */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <span className="text-yellow-400 font-bold">Step 1</span>
                            <h3 className="text-3xl font-bold text-white mb-4">AI-Powered Initial Scan</h3>
                            <p className="text-gray-400">A machine learning model automatically scans all listed websites to proactively detect and flag potential phishing threats by analyzing over 32 unique attributes.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg relative h-64 md:h-72 lg:h-80 overflow-hidden">
                            <div className="font-mono text-xs text-yellow-400/50 attribute-scroll">
                                {attributes.map((attr, i) => <p key={i}>{attr}: {Math.round(Math.random())}</p>)}
                                {attributes.map((attr, i) => <p key={i+attributes.length}>{attr}: {Math.round(Math.random())}</p>)}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ai-graphic-text text-white font-bold text-lg">Scanning...</div>
                        </div>
                    </div>

                    {/* Step 2: On-Chain Reporting */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                         <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center order-2 md:order-1">
                             <div className="on-chain-graphic">
                                 <div className="report-icon">⚠️</div>
                                 <div className="dots"></div>
                                 <div className="smart-contract-icon">📜<span className="text-xs">MarketplaceThreatIntel.sol</span></div>
                             </div>
                        </div>
                        <div className="text-left order-1 md:order-2">
                             <span className="text-yellow-400 font-bold">Step 2</span>
                            <h3 className="text-3xl font-bold text-white mb-4">On-Chain Threat Reporting</h3>
                            <p className="text-gray-400">When a site is flagged, the system records a privacy-preserving hash of the site, the lister's wallet address, and a timestamp onto the <code className="text-yellow-400 bg-gray-700 p-1 rounded text-sm">MarketplaceThreatIntel.sol</code> smart contract.</p>
                        </div>
                    </div>

                    {/* Step 3: Blacklist */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                             <span className="text-yellow-400 font-bold">Step 3</span>
                            <h3 className="text-3xl font-bold text-white mb-4">Decentralized Blacklist</h3>
                            <p className="text-gray-400">The marketplace periodically reads the immutable data from the smart contract to build and maintain an up-to-date blacklist of confirmed malicious wallets.</p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center">
                            <div className="blacklist-graphic">
                                <div className="blacklist-item">0x123...abc <span className="banned-mark">❌</span></div>
                                <div className="blacklist-item">0x456...def <span className="banned-mark">❌</span></div>
                                <div className="blacklist-item">0x789...ghi <span className="banned-mark">❌</span></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Step 4: Enforcement */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center order-2 md:order-1">
                            <div className="enforcement-graphic">
                                <span className="wallet-icon">💳</span>
                                <div className="ban-hammer">🚫</div>
                            </div>
                        </div>
                        <div className="text-left order-1 md:order-2">
                            <span className="text-yellow-400 font-bold">Step 4</span>
                            <h3 className="text-3xl font-bold text-white mb-4">Automatic Enforcement</h3>
                            <p className="text-gray-400">Any wallet address appearing on the blacklist is automatically banned from the platform, preventing it from making transactions or creating new listings.</p>
                        </div>
                    </div>

                     {/* Step 5: Transparency */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-left">
                            <span className="text-yellow-400 font-bold">Step 5</span>
                            <h3 className="text-3xl font-bold text-white mb-4">Public Transparency & Auditing</h3>
                            <p className="text-gray-400">Using the blockchain ensures all reports are public and tamper-proof, providing complete transparency and allowing anyone to easily audit security actions.</p>
                        </div>
                         <div className="bg-gray-800 p-8 rounded-xl shadow-lg h-56 md:h-64 flex items-center justify-center">
                            <div className="audit-graphic">
                               <div className="blockchain-graphic">
                                   {[...Array(3)].map((_, i) => (
                                        <div key={i} className="block">
                                            <span className="block-text">LOG</span>
                                            <div className="block-hash">{`0x${[...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}...`}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="magnifying-glass">🔍</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
