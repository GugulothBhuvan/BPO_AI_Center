import { useState, useEffect } from 'react';
import StatCards from '@/components/layout/StatCards';
import ActiveCalls from '@/components/layout/ActiveCalls';
import AIInsights from '@/components/layout/AIInsights';
import CallNotification from '@/components/layout/CallNotification';
import { mockIncomingCall } from '@/mockData';
import { useCallContext } from '@/context/CallContext';

// Mock data generator functions
const generateMockStats = () => ({
  activeCalls: 24,
  avgResponseTime: '1m 45s',
  aiResolutionRate: 85,
  totalAgents: 12,
  callVolume: 156,
  satisfaction: 92,
});

const generateMockCalls = () => [
  {
    id: '1',
    caller: {
      name: 'John Smith',
      number: '+1 (555) 123-4567',
      avatar: '/api/placeholder/48/48',
    },
    duration: '5:23',
    status: 'Active',
    agent: 'Sarah Wilson',
    category: 'Technical Support',
    sentiment: 'Neutral',
    aiSuggestion: 'Consider offering premium support plan based on usage patterns.',
  },
  {
    id: '2',
    caller: {
      name: 'Emily Brown',
      number: '+1 (555) 234-5678',
      avatar: '/api/placeholder/48/48',
    },
    duration: '3:45',
    status: 'On Hold',
    agent: 'Mike Johnson',
    category: 'Billing Query',
    sentiment: 'Negative',
    aiSuggestion: 'Escalate to billing supervisor for immediate resolution.',
  },
  // Add more mock calls as needed
];

const generateMockInsights = () => [
  {
    id: '1',
    type: 'alert',
    title: 'High Call Volume Detected',
    description: 'Call volume is 25% above normal for this time period.',
    priority: 'high',
    timestamp: '2 minutes ago',
    metric: {
      value: '45',
      trend: 'up',
      percentage: '+25%',
    },
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'AI Resolution Opportunity',
    description: 'Common pattern detected in technical queries. Consider updating AI responses.',
    priority: 'medium',
    timestamp: '5 minutes ago',
  },
  // Add more mock insights as needed
];

// Type for incoming call data
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

const Dashboard = () => {
  const {
    showCallNotification,
    setShowCallNotification,
    incomingCall,
    setIncomingCall
  } = useCallContext();

  const [stats, setStats] = useState(generateMockStats());
  const [activeCalls, setActiveCalls] = useState(generateMockCalls());
  const [insights, setInsights] = useState(generateMockInsights());
  const [isLoading, setIsLoading] = useState(true);
  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Handler to simulate a new incoming call
  const handleSimulateCall = () => {
    const newCall: CallData = {
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

  // Accept the call
  const handleAcceptCall = () => {
    setShowCallNotification(false);
    if (incomingCall) {
      // Add this call to the active calls list
      const newActiveCall = {
        id: incomingCall.id,
        caller: {
          name: incomingCall.name,
          number: incomingCall.number,
          avatar: incomingCall.profilePic,
        },
        duration: '0:00',
        status: 'Active',
        agent: 'Sarah Wilson',
        category: incomingCall.type,
        sentiment: incomingCall.sentiment,
      };
      setActiveCalls([newActiveCall, ...activeCalls]);
    }
  };

  // Decline the call
  const handleDeclineCall = () => {
    setShowCallNotification(false);
  };

  return (
    <>
      {isLoading ? (
        // Loading skeleton
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-32 bg-slate-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
          <div className="h-96 bg-slate-200 animate-pulse rounded-lg" />
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <StatCards stats={stats} />

          {/* Main Grid: Active Calls + AI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            {/* Active Calls Section */}
            <div className="lg:col-span-2">
              <ActiveCalls
                calls={activeCalls}
                onTransferCall={id => console.log('Transfer call:', id)}
                onViewDetails={id => console.log('View details:', id)}
              />
            </div>

            {/* AI Insights Section */}
            <div className="lg:col-span-2">
              <AIInsights
                insights={insights}
                onViewDetail={id => console.log('View insight:', id)}
              />
            </div>
          </div>
        </>
      )}

      {/* Call Notification Sheet */}
      <CallNotification
        isOpen={showCallNotification}
        onOpenChange={setShowCallNotification}
        callData={incomingCall || mockIncomingCall}
        onAccept={handleAcceptCall}
        onDecline={handleDeclineCall}
      />
    </>
  );
};

export default Dashboard;