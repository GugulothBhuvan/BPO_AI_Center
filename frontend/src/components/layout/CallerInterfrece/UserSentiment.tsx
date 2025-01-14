// src/components/UserSentiment.tsx
import React, { FC } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

interface SentimentData {
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface UserSentimentProps {
  sentiments?: SentimentData[];
}

const UserSentiment: FC<UserSentimentProps> = ({ sentiments = [] }) => {

  const customerData = {
    name: "John Smith",
    sentiment: sentiments[1].sentiment,
    description: "Customer experienced multiple failed login attempts and expressed significant frustration with the account recovery process. Requires immediate attention.",
  };

  const getSentimentColor = (sentiment: string) => {
    const sentiments: { [key: string]: string } = {
      'Negative': 'text-red-600',
      'Neutral': 'text-yellow-600',
      'Positive': 'text-green-600',
    };
    return sentiments[sentiment] || 'text-gray-600';
  };

  return (
    <Card className=  "bg-slate-50 h-full">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{customerData.name}</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Sentiment</h4>
                <p className={`font-medium ${getSentimentColor(customerData.sentiment)}`}>
                  {customerData.sentiment}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-600 text-sm">{customerData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
  );
};

export default UserSentiment;