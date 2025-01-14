// src/contexts/CallContext.tsx

import React, { createContext, useContext } from 'react';

// (1) Define the same CallData interface
interface CallData {
    id: string;
    name: string;
    number: string;
    type: string;
    priority: 'Low' | 'Medium' | 'High';
    sentiment: string;
    estimatedDuration: string;
    category: string;
    profilePic?: string;
    history?: {
        lastContact: string;
        totalCalls: number;
        previousIssues?: string[];
    };
    aiAnalysis?: {
        predictedCategory: string;
        suggestedAgent: string;
        estimatedResolutionTime: string;
        relevantArticles: string[];
    };
}

// (2) Define the same CallContextType interface
interface CallContextType {
    showCallNotification: boolean;
    setShowCallNotification: (show: boolean) => void;
    incomingCall: CallData | null;
    setIncomingCall: (call: CallData | null) => void;
    handleSimulateCall: () => void;
}

// (3) Create the context
export const CallContext = createContext<CallContextType | undefined>(undefined);

// (4) Create the custom hook
export const useCallContext = () => {
    const context = useContext(CallContext);
    if (!context) {
        throw new Error('useCallContext must be used within a CallProvider');
    }
    return context;
};
