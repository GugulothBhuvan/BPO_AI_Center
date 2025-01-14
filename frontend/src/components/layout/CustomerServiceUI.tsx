import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    AlertCircle,
    CheckCircle,
    AlertTriangle,
    Siren,
    Plus,
    X,
    MessageSquare,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CustomerServiceUI = () => {
    const navigate = useNavigate();
    const [points, setPoints] = useState(['']);
    const [selectedIntensity, setSelectedIntensity] = useState("medium");
    const [selectedClassification, setSelectedClassification] = useState("technical");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [classificationNote, setClassificationNote] = useState("");

    const addPoint = () => setPoints([...points, '']);
    const removePoint = (index: number) => {
        if (points.length > 1) {
            setPoints(points.filter((_, i) => i !== index));
        }
    };

    // 1. Medium label is changed to 'Recommended'
    const intensityOptions = [
        {
            value: "low",
            label: "Low",
            icon: CheckCircle,
            color: "text-teal-500",
            bg: "bg-teal-50",
            borderColor: "border-teal-200",
        },
        {
            value: "medium",
            label: "Recommended", // changed here
            icon: AlertCircle,
            color: "text-purple-500",
            bg: "bg-purple-50",
            borderColor: "border-purple-200",
        },
        {
            value: "high",
            label: "High",
            icon: AlertTriangle,
            color: "text-amber-500",
            bg: "bg-amber-50",
            borderColor: "border-amber-200",
        },
        {
            value: "severe",
            label: "Severe",
            icon: Siren,
            color: "text-rose-500",
            bg: "bg-rose-50",
            borderColor: "border-rose-200",
        },
    ];
    const handleSubmit = () => {
        navigate('/retrieval');
    }
    return (
        <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-6">
            <Card className="max-w-[1200px] mx-auto border-0 shadow-2xl bg-white">
                <CardHeader className="border-b border-slate-200 bg-white">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-800">
                        AI Customer Service Analysis
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Details Card */}
                            <Card className="border border-slate-200 shadow-lg bg-white">
                                <CardHeader className="bg-slate-50 pb-4">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-slate-700" />
                                        <CardTitle className="text-lg text-slate-800">
                                            Conversation Details
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                                        <h4 className="font-medium text-slate-800">
                                            Customer Interaction Summary
                                        </h4>
                                        <p className="text-slate-600 text-sm">
                                            Customer reported persistent login failures after password reset.
                                            Multiple failed attempts logged over 24 hours.
                                        </p>
                                        <div className="flex flex-wrap gap-2 text-sm">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg shadow-sm">
                                                Ticket #2847
                                            </span>
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg shadow-sm">
                                                Priority Case
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Key Points Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-800 px-1">Key Points</h3>
                                <div className="space-y-3">
                                    {points.map((point, index) => (
                                        <div key={index} className="group relative">
                                            {/* Circle numbering */}
                                            <div
                                                className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2
                                   w-8 h-8 rounded-full bg-gradient-to-br
                                   from-slate-100 to-slate-200 flex items-center
                                   justify-center text-sm font-medium text-slate-700
                                   shadow-md"
                                            >
                                                {index + 1}
                                            </div>
                                            {/* Input and remove button */}
                                            <div className="pl-6 sm:pl-8 flex gap-2">
                                                <Input
                                                    value={point}
                                                    onChange={(e) => {
                                                        const newPoints = [...points];
                                                        newPoints[index] = e.target.value;
                                                        setPoints(newPoints);
                                                    }}
                                                    className="flex-1 border-slate-200 focus:ring-2
                                     focus:ring-purple-500 focus:border-purple-500
                                     bg-white shadow-sm rounded-xl"
                                                    placeholder="Enter key observation..."
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removePoint(index)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity
                                     text-slate-400 hover:text-rose-500"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={addPoint}
                                        variant="outline"
                                        className="w-full mt-4 border-dashed border-slate-200
                               text-slate-600 hover:bg-slate-50 hover:border-slate-300
                               rounded-xl"
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> Add Point
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Intensity Section */}
                            <Card className="border border-slate-200 shadow-lg bg-white">
                                <CardHeader className="bg-slate-50">
                                    <CardTitle className="text-lg text-slate-800">Intensity Level</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <Tabs value={selectedIntensity} onValueChange={setSelectedIntensity}>
                                        <TabsList className="grid grid-cols-4 gap-2 p-1 bg-slate-100 rounded-xl">
                                            {intensityOptions.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <TabsTrigger
                                                        key={option.value}
                                                        value={option.value}
                                                        className={`
                              ${option.color}
                              data-[state=active]:${option.bg}
                              rounded-lg
                              flex items-center justify-center
                              px-2 py-1
                            `}
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                    </TabsTrigger>
                                                );
                                            })}
                                        </TabsList>
                                        {intensityOptions.map((option) => (
                                            <TabsContent key={option.value} value={option.value} className="mt-4">
                                                <div
                                                    className={`
                            p-4 rounded-xl
                            ${option.bg}
                            border
                            ${option.borderColor}
                          `}
                                                >
                                                    <h4 className={`font-medium mb-2 ${option.color}`}>
                                                        {option.label} Priority by AI
                                                    </h4>
                                                    {/* Only show a text area if intensity != low, high, severe? 
                              (Your original code only showed Textarea if NOT medium or something similar.)
                              But we keep your original logic: for low, high, severe. 
                              You can adjust if needed. */}
                                                    {option.value !== "medium" && (
                                                        <Textarea
                                                            placeholder="Add additional context..."
                                                            value={additionalInfo}
                                                            onChange={(e) => setAdditionalInfo(e.target.value)}
                                                            className="mt-2 resize-none rounded-lg shadow-sm"
                                                        />
                                                    )}
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Classification Section */}
                            <Card className="border border-slate-200 shadow-lg bg-white">
                                <CardHeader className="bg-slate-50">
                                    <CardTitle className="text-lg text-slate-800">Classification</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <Tabs
                                        value={selectedClassification}
                                        onValueChange={setSelectedClassification}
                                    >
                                        <TabsList className="grid grid-cols-4 gap-2 bg-slate-100 p-1 rounded-xl">
                                            {[
                                                { value: "technical", label: "Technical" },
                                                { value: "billing", label: "Billing" },
                                                { value: "account", label: "Account" },
                                                { value: "feature", label: "Feature" },
                                            ].map((item) => (
                                                <TabsTrigger
                                                    key={item.value}
                                                    value={item.value}
                                                    className={`
                            data-[state=active]:bg-white
                            data-[state=active]:text-purple-600
                            rounded-lg
                            transition-colors
                            flex items-center justify-center
                            px-2 py-1
                          `}
                                                >
                                                    {item.label}
                                                </TabsTrigger>
                                            ))}
                                        </TabsList>
                                    </Tabs>

                                    {/* 2. Change the placeholder to reflect the selected classification. */}
                                    <Input
                                        className="mt-4 rounded-xl shadow-sm border-slate-200
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                        placeholder={`Add ${selectedClassification} details...`}
                                        value={classificationNote}
                                        onChange={(e) => setClassificationNote(e.target.value)}
                                    />
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                                <Button
                                    variant="default"
                                    className="w-full bg-purple-600 hover:bg-purple-700 text-white
                             rounded-xl shadow-md transition-colors"
                             onClick={handleSubmit}
                                >
                                Start Data Retrieval  
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-slate-200 text-slate-700
                             hover:bg-slate-50 rounded-xl shadow-sm transition-colors"
                                >
                                    Submit for Review
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CustomerServiceUI;
