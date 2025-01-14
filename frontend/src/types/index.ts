// types/index.ts

// Dashboard Stats
export interface DashboardStats {
  activeCalls: number;
  avgResponseTime: string;
  aiResolutionRate: number;
  totalAgents: number;
  callVolume: number;
  satisfaction: number;
}

// Call Related Types
export interface Caller {
  id: string;
  name: string;
  number: string;
  avatar?: string;
  email?: string;
  customerType?: 'Premium' | 'Standard' | 'New';
  history?: {
    lastContact: string;
    totalCalls: number;
  };
}

export interface CallData {
  id: string;
  caller: Caller;
  startTime: string;
  duration: string;
  status: 'Active' | 'On Hold' | 'Transferring' | 'Ended';
  agent: {
    id: string;
    name: string;
    avatar?: string;
    department: string;
  };
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  aiSuggestion?: string;
  tags: string[];
}

// AI Insights Types
export interface AIInsight {
  id: string;
  type: 'alert' | 'trend' | 'suggestion' | 'performance';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  category: string;
  metric?: {
    value: string;
    trend: 'up' | 'down';
    percentage: string;
  };
  actions?: {
    type: string;
    label: string;
  }[];
}

// Agent Types
export interface Agent {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
  status: 'Online' | 'Busy' | 'Away' | 'Offline';
  metrics: {
    activeCalls: number;
    avgHandleTime: string;
    satisfaction: number;
    resolution: number;
  };
  schedule?: {
    shift: string;
    breakTime: string;
  };
}
