import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle, History, ChevronRight, Gauge, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";

const IssueStatusPage = () => {
    const issueHistory = [
        {
            date: "25th Jan",
            type: "Inbound",
            status: "Initial Contact"
        },
        {
            date: "28th Jan",
            type: "Follow-up",
            status: "In Progress"
        }
    ];

    return (
        <div className="w-full mx-auto p-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <Card className="shadow-xl border-0 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500 p-2 rounded-lg rotate-3 transform hover:rotate-0 transition-all duration-300 hover:scale-110">
                                <MessageCircle className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-800">
                                Issue Status Page
                            </CardTitle>
                        </div>
                        <Button
                            variant="outline"
                            className="hover:bg-blue-100 border-blue-200 transform transition-all duration-300 hover:scale-105"
                        >
                            <Eye className="h-4 w-4 mr-2 text-blue-500" />
                            View Cases
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            {/* Details Card */}
                            <div className="p-6 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <AlertCircle className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-blue-600">Details</h3>
                                </div>
                                <div className="space-y-3 pl-8">
                                    <p className="text-gray-800 text-lg">Issue #1234 - Performance Optimization</p>
                                    <div className="flex items-center gap-2">
                                        <span className="w-24 text-gray-500">Reported by:</span>
                                        <span className="text-gray-700">John Doe</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-24 text-gray-500">Priority:</span>
                                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">High</span>
                                    </div>
                                </div>
                            </div>

                            {/* Proposed Solution Card */}
                            <div className="p-6 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-green-100 p-2 rounded-lg">
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    </div>
                                    <h3 className="font-semibold text-green-600">Proposed Solution</h3>
                                </div>
                                <div className="space-y-4 pl-8">
                                    {['Implement caching mechanism for frequent database queries',
                                        'Optimize image loading with lazy loading',
                                        'Minimize JavaScript bundle size'].map((solution, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-medium">
                                                    {index + 1}
                                                </div>
                                                <p className="text-gray-600 pt-1">{solution}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* History Timeline */}
                            <div className="p-6 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:shadow-md">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <History className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-purple-600">History</h3>
                                </div>
                                <div className="space-y-4 pl-8">
                                    {issueHistory.map((event, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="min-w-24">
                                                <p className="text-sm font-medium text-gray-600">{event.date}</p>
                                            </div>
                                            <div className="flex-1 bg-purple-50 p-3 rounded-lg border border-purple-100">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-1 bg-purple-100 text-purple-600 text-sm font-medium rounded-full">
                                                        {event.type}
                                                    </span>
                                                    <ChevronRight className="h-4 w-4 text-purple-300" />
                                                    <span className="text-sm text-gray-600">{event.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="space-y-6">
                            {/* User Sentiment Card */}
                            <Card className="border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-lg">
                                <CardHeader className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                                    <h3 className="font-semibold text-gray-700">User Sentiment</h3>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="flex justify-center">
                                        <Gauge className="h-24 w-24 text-amber-500" />
                                    </div>
                                    <p className="text-center mt-4 text-amber-600 font-medium">Moderate Impact</p>
                                </CardContent>
                            </Card>

                            {/* Estimation Card */}
                            <Card className="border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-lg">
                                <CardHeader className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                                    <h3 className="font-semibold text-gray-700">Estimation/Data</h3>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                    <div className="bg-blue-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Expected Resolution</p>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-blue-500" />
                                            <p className="font-medium text-blue-600">3-5 business days</p>
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Affected Users</p>
                                        <p className="font-medium text-purple-600">~2,500 users</p>
                                    </div>
                                    <div className="bg-amber-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Performance Impact</p>
                                        <p className="font-medium text-amber-600">25% slowdown</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default IssueStatusPage;