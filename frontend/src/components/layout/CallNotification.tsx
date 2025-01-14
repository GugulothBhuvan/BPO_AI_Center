import React from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    PhoneIncoming,
    CheckCircle2,
    Bot,
    AlertTriangle,
    Clock,
    Tag,
    MessageSquare,
} from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
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

interface CallNotificationProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    callData: CallData;
    onAccept: () => void;
    onDecline: () => void;
}

const CallNotification = ({
    isOpen,
    onOpenChange,
    callData,
    onAccept,
    onDecline,
}: CallNotificationProps) => {
    const getPriorityColor = (priority: string) => {
        const colors = {
            High: 'bg-red-100 text-red-700',
            Medium: 'bg-yellow-100 text-yellow-700',
            Low: 'bg-green-100 text-green-700',
        };
        return colors[priority] || 'bg-gray-100 text-gray-700';
    };

    const navigate = useNavigate();

    onAccept = () => {
        navigate('/call-interface');
    }

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange} >
            <SheetContent className="w-[400px] sm:w-[540px] p-0 border-none rounded-lg">
                <div className="relative overflow-hidden rounded-lg">
                    {/* Background with subtle gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />

                    {/* Subtle animated accents */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100/40 rounded-full animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100/40 rounded-full animate-pulse delay-200" />

                    {/* Content */}
                    <div className="relative p-6">
                        {/* Header with caller info */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Avatar className="h-16 w-16 ring-2 ring-blue-200">
                                        {callData.profilePic ? (
                                            <AvatarImage
                                                src={callData.profilePic}
                                                alt={callData.name}
                                            />
                                        ) : (
                                            <AvatarFallback className="bg-blue-100 text-blue-700">
                                                {callData.name ? callData.name.charAt(0) : 'U'}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <Badge
                                        className={`absolute -top-2 -right-2 ${getPriorityColor(
                                            callData.priority
                                        )}`}
                                    >
                                        {callData.priority}
                                    </Badge>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{callData.name}</h3>
                                    <p className="text-gray-600">{callData.number}</p>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                            {callData.type}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <PhoneIncoming className="h-6 w-6 text-green-600 mb-2" />
                                <span className="text-sm text-gray-600">Incoming Call</span>
                            </div>
                        </div>

                        {/* AI Analysis Section */}
                        <div className="bg-white/80 border border-gray-100 p-4 rounded-lg mb-6 shadow-sm">
                            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                                AI Quick Analysis
                            </h4>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Sentiment */}
                                <div className="flex items-start gap-3">
                                    <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Sentiment</p>
                                        <p className="text-sm font-medium text-gray-800">{callData.sentiment}</p>
                                    </div>
                                </div>

                                {/* Category */}
                                <div className="flex items-start gap-3">
                                    <Tag className="h-4 w-4 text-purple-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Category</p>
                                        <p className="text-sm font-medium text-gray-800">{callData.category}</p>
                                    </div>
                                </div>

                                {/* Estimated Duration */}
                                <div className="flex items-start gap-3">
                                    <Clock className="h-4 w-4 text-green-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Est. Duration</p>
                                        <p className="text-sm font-medium text-gray-800">
                                            {callData.estimatedDuration}
                                        </p>
                                    </div>
                                </div>

                                {/* OPTIONAL: Additional AI data */}
                                {callData.aiAnalysis && (
                                    <>
                                        <div className="flex items-start gap-3">
                                            <Tag className="h-4 w-4 text-purple-600 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Predicted Category
                                                </p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {callData.aiAnalysis.predictedCategory}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MessageSquare className="h-4 w-4 text-blue-600 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">
                                                    Suggested Agent
                                                </p>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {callData.aiAnalysis.suggestedAgent}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                onClick={onAccept}
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Accept Call
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                                onClick={onDecline}
                            >
                                <Bot className="mr-2 h-4 w-4" />
                                Handover to AI
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CallNotification;