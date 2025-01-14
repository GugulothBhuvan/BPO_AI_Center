// mockData/index.ts

import { DashboardStats, CallData, AIInsight, Agent } from '../types';

export const mockDashboardStats: DashboardStats = {
  activeCalls: 24,
  avgResponseTime: '1m 45s',
  aiResolutionRate: 85,
  totalAgents: 12,
  callVolume: 156,
  satisfaction: 92,
};

export const mockCalls: CallData[] = [
  {
    id: '1',
    caller: {
      id: 'c1',
      name: 'John Smith',
      number: '+1 (555) 123-4567',
      avatar: '/api/placeholder/48/48',
      email: 'john.smith@email.com',
      customerType: 'Premium',
      history: {
        lastContact: '2024-01-15',
        totalCalls: 5,
      },
    },
    startTime: '2024-01-12T14:30:00Z',
    duration: '5:23',
    status: 'Active',
    agent: {
      id: 'a1',
      name: 'Sarah Wilson',
      avatar: '/api/placeholder/32/32',
      department: 'Technical Support',
    },
    category: 'Technical Support',
    priority: 'High',
    sentiment: 'Neutral',
    aiSuggestion:
      'Consider offering premium support plan based on usage patterns.',
    tags: ['Hardware', 'Warranty', 'Priority'],
  },
  {
    id: '2',
    caller: {
      id: 'c2',
      name: 'Emily Brown',
      number: '+1 (555) 234-5678',
      avatar: '/api/placeholder/48/48',
      customerType: 'Standard',
      history: {
        lastContact: '2024-01-10',
        totalCalls: 2,
      },
    },
    startTime: '2024-01-12T14:45:00Z',
    duration: '3:45',
    status: 'On Hold',
    agent: {
      id: 'a2',
      name: 'Mike Johnson',
      avatar: '/api/placeholder/32/32',
      department: 'Billing',
    },
    category: 'Billing Query',
    priority: 'Medium',
    sentiment: 'Negative',
    aiSuggestion: 'Escalate to billing supervisor for immediate resolution.',
    tags: ['Billing', 'Escalation'],
  },
];

export const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'alert',
    title: 'High Call Volume Detected',
    description: 'Call volume is 25% above normal for this time period.',
    priority: 'high',
    timestamp: '2 minutes ago',
    category: 'Volume',
    metric: {
      value: '45',
      trend: 'up',
      percentage: '+25%',
    },
    actions: [
      { type: 'notify', label: 'Notify Team Lead' },
      { type: 'adjust', label: 'Adjust Routing' },
    ],
  },
  {
    id: '2',
    type: 'suggestion',
    title: 'AI Resolution Opportunity',
    description:
      'Common pattern detected in technical queries. Consider updating AI responses.',
    priority: 'medium',
    timestamp: '5 minutes ago',
    category: 'AI Optimization',
    actions: [
      { type: 'review', label: 'Review Patterns' },
      { type: 'update', label: 'Update AI Model' },
    ],
  },
  {
    id: '3',
    type: 'trend',
    title: 'Customer Satisfaction Trend',
    description:
      'CSAT scores showing improvement in technical support category.',
    priority: 'low',
    timestamp: '15 minutes ago',
    category: 'Performance',
    metric: {
      value: '94%',
      trend: 'up',
      percentage: '+5%',
    },
  },
];

export const mockAgents: Agent[] = [
  {
    id: 'a1',
    name: 'Sarah Wilson',
    avatar: '/api/placeholder/32/32',
    role: 'Senior Agent',
    department: 'Technical Support',
    status: 'Online',
    metrics: {
      activeCalls: 2,
      avgHandleTime: '4m 30s',
      satisfaction: 95,
      resolution: 88,
    },
    schedule: {
      shift: '9:00 AM - 5:00 PM',
      breakTime: '12:30 PM',
    },
  },
  {
    id: 'a2',
    name: 'Mike Johnson',
    avatar: '/api/placeholder/32/32',
    role: 'Support Agent',
    department: 'Billing',
    status: 'Busy',
    metrics: {
      activeCalls: 1,
      avgHandleTime: '5m 15s',
      satisfaction: 92,
      resolution: 85,
    },
    schedule: {
      shift: '10:00 AM - 6:00 PM',
      breakTime: '1:30 PM',
    },
  },
];

// Mock incoming call data
export const mockIncomingCall = {
  id: 'inc1',
  name: 'Abhinav Kumar',
  number: '+1 (555) 123-4567',
  type: 'Technical Support',
  priority: 'High',
  sentiment: 'Neutral',
  estimatedDuration: '5-7 mins',
  category: 'Product Issue',
  profilePic: '/api/placeholder/50/50',
  history: {
    lastContact: '2024-01-01',
    totalCalls: 3,
    previousIssues: ['Software Setup', 'Account Access'],
  },
  aiAnalysis: {
    predictedCategory: 'Technical',
    suggestedAgent: 'Sarah Wilson',
    estimatedResolutionTime: '6 mins',
    relevantArticles: ['Setup Guide', 'Troubleshooting Steps'],
  },
};
