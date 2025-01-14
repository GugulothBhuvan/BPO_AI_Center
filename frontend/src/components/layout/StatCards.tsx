import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Phone,
    Clock,
    Brain,
    User,
    TrendingUp,
    MessageSquare,
} from 'lucide-react';

interface StatCardProps {
    stats: {
        activeCalls: number;
        avgResponseTime: string;
        aiResolutionRate: number;
        totalAgents: number;
        callVolume: number;
        satisfaction: number;
    };
}

const StatCards = ({ stats }: StatCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Active Calls Card */}
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10" />
                <CardHeader className="relative">
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>Active Calls</span>
                        <Phone className="h-5 w-5 text-blue-500" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <div className="text-3xl font-bold text-blue-600">{stats.activeCalls}</div>
                    <div className="flex items-center mt-2 text-sm text-slate-600">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        <span>12% increase from last hour</span>
                    </div>
                </CardContent>
            </Card>

            {/* Response Time Card */}
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10" />
                <CardHeader className="relative">
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>Avg Response Time</span>
                        <Clock className="h-5 w-5 text-emerald-500" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <div className="text-3xl font-bold text-emerald-600">{stats.avgResponseTime}</div>
                    <div className="flex items-center mt-2 text-sm text-slate-600">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        <span>Faster than target SLA</span>
                    </div>
                </CardContent>
            </Card>

            {/* AI Resolution Card */}
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-violet-600/10" />
                <CardHeader className="relative">
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>AI Resolution Rate</span>
                        <Brain className="h-5 w-5 text-violet-500" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <div className="text-3xl font-bold text-violet-600">{stats.aiResolutionRate}%</div>
                    <div className="flex items-center mt-2 text-sm text-slate-600">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        <span>High AI efficiency</span>
                    </div>
                </CardContent>
            </Card>

            {/* Active Agents Card */}
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10" />
                <CardHeader className="relative">
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>Active Agents</span>
                        <User className="h-5 w-5 text-orange-500" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <div className="text-3xl font-bold text-orange-600">{stats.totalAgents}</div>
                    <div className="flex items-center mt-2 text-sm text-slate-600">
                        <span>Full capacity</span>
                    </div>
                </CardContent>
            </Card>

            {/* Call Volume Card */}
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-cyan-600/10" />
                <CardHeader className="relative">
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>Today's Call Volume</span>
                        <Phone className="h-5 w-5 text-cyan-500" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <div className="text-3xl font-bold text-cyan-600">{stats.callVolume}</div>
                    <div className="flex items-center mt-2 text-sm text-slate-600">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        <span>Peak hours approaching</span>
                    </div>
                </CardContent>
            </Card>

            {/* Customer Satisfaction Card */}
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-pink-600/10" />
                <CardHeader className="relative">
                    <CardTitle className="flex items-center justify-between text-lg">
                        <span>Customer Satisfaction</span>
                        <MessageSquare className="h-5 w-5 text-pink-500" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <div className="text-3xl font-bold text-pink-600">{stats.satisfaction}%</div>
                    <div className="flex items-center mt-2 text-sm text-slate-600">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        <span>Above target</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StatCards;