import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Phone,
    Clock,
    BarChart2,
    ArrowRight,
    Activity,
    Volume2,
    User,
    PhoneForwarded,
} from 'lucide-react';

interface CallData {
    id: string;
    caller: {
        name: string;
        avatar?: string;
        number: string;
    };
    duration: string;
    status: 'Active' | 'On Hold' | 'Transferring';
    agent: string;
    category: string;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    aiSuggestion?: string;
}

interface ActiveCallsProps {
    calls: CallData[];
    onTransferCall: (callId: string) => void;
    onViewDetails: (callId: string) => void;
}

const ActiveCalls = ({ calls, onTransferCall, onViewDetails }: ActiveCallsProps) => {
    const getSentimentColor = (sentiment: string) => {
        const colors = {
            Positive: 'text-green-500',
            Neutral: 'text-blue-500',
            Negative: 'text-red-500',
        };
        return colors[sentiment] || 'text-slate-500';
    };

    const getStatusColor = (status: string) => {
        const colors = {
            Active: 'bg-green-500',
            'On Hold': 'bg-yellow-500',
            Transferring: 'bg-blue-500',
        };
        return colors[status] || 'bg-slate-500';
    };

    return (
        <Card className=" col-span-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-500" />
                    Active Calls Monitor
                    <Badge variant="secondary" className="ml-2">
                        {calls.length} Active
                    </Badge>
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <BarChart2 className="h-4 w-4 mr-2" />
                        Analytics
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                        {calls.map((call) => (
                            <Card
                                key={call.id}
                                className="p-4 hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    {/* Caller Information */}
                                    <div className="flex items-start gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={call.caller.avatar} />
                                            <AvatarFallback>{call.caller.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{call.caller.name}</h4>
                                            <p className="text-sm text-slate-500">{call.caller.number}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant="outline"
                                                    className={getStatusColor(call.status)}
                                                >
                                                    {call.status}
                                                </Badge>
                                                <Badge variant="secondary">
                                                    {call.category}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Call Controls and Duration */}
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-slate-400" />
                                            <span className="text-sm font-medium">{call.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Volume2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Activity className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Agent and AI Section */}
                                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-slate-400" />
                                            <span className="text-sm">Agent: {call.agent}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm ${getSentimentColor(call.sentiment)}`}>
                                                Sentiment: {call.sentiment}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onTransferCall(call.id)}
                                        >
                                            <PhoneForwarded className="h-4 w-4 mr-2" />
                                            Transfer
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onViewDetails(call.id)}
                                        >
                                            Details
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>

                                {/* AI Suggestion */}
                                {call.aiSuggestion && (
                                    <div className="mt-3 p-2 bg-blue-50 rounded-md">
                                        <p className="text-sm text-blue-700">
                                            <span className="font-medium">AI Suggestion:</span> {call.aiSuggestion}
                                        </p>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default ActiveCalls;