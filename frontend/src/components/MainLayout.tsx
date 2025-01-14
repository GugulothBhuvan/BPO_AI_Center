// src/components/layout/MainLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

// (A) Import the context from the new file
import { CallContext } from '@/context/CallContext';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showCallNotification, setShowCallNotification] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);

    // Handler remains the same (no changes)
    const handleSimulateCall = () => {
        const newCall = {
            id: Date.now().toString(),
            name: 'Abhinav Kumar',
            number: '+1 (555) 123-4567',
            type: 'Technical Support',
            priority: 'High',
            sentiment: 'Neutral',
            estimatedDuration: '5-7 mins',
            category: 'Product Issue',
            profilePic: '/api/placeholder/50/50',
        };
        setIncomingCall(newCall);
        setShowCallNotification(true);
    };

    // (B) Provide the same contextValue as before
    const contextValue = {
        showCallNotification,
        setShowCallNotification,
        incomingCall,
        setIncomingCall,
        handleSimulateCall,
    };

    return (
        // (C) Wrap children with the context provider
        <CallContext.Provider value={contextValue}>
            <div className="min-h-screen bg-slate-50">
                <Navbar
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    onSimulateCall={handleSimulateCall}
                    agentName="Sarah Wilson"
                    agentRole="Senior Agent"
                    timeOnline="2h 45m"
                />

                <div className="flex">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        activeItem="Dashboard"
                        onItemSelect={() => null}
                        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    />

                    <main className="flex-1 p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </CallContext.Provider>
    );
};

export default MainLayout;
