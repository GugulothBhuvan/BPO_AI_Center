import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, ArrowRight, Calendar as CalendarIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useNavigate } from 'react-router-dom';

const MeetingScheduler = () => {
    const navigate = useNavigate();
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [date, setDate] = useState<Date>();
    const [savedSlots, setSavedSlots] = useState<Array<{
        date: Date | undefined;
        time: string;
        attendees: string;
        notes: string;
    }>>([]);
    const [customSlot, setCustomSlot] = useState({
        time: "",
        attendees: "",
        notes: ""
    });

    const suggestedSlot = {
        date: "January 28th, 2025",
        time: "9:00 AM - 10:00 AM",
        attendees: "4 participants",
        aiConfidence: "95% match with preferences"
    };

    const handleSaveCustomSlot = () => {
        if (date && customSlot.time) {
            const newSlot = {
                date,
                ...customSlot
            };
            setSavedSlots([...savedSlots, newSlot]);
            setCustomSlot({
                time: "",
                attendees: "",
                notes: ""
            });
            setDate(undefined);
        }
    };

    // Toggles the selected slot: if already selected, deselect; otherwise select.
    const handleSlotSelection = (slotId: string) => {
        setSelectedSlot((prev) => (prev === slotId ? null : slotId));
    };
    const handleScehdule = () => {
        navigate('/issues');
    }
    return (
        <div className="w-full mx-auto p-4 bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <Card className="shadow-xl border-0 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-500 p-2 rounded-lg rotate-3 transform hover:rotate-0 transition-all duration-300 hover:scale-110">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-800">
                                Meeting Scheduler
                            </CardTitle>
                        </div>
                        <Button
                            variant="outline"
                            className="hover:bg-blue-100 border-blue-200 transform transition-all duration-300 hover:scale-105"
                        >
                            <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                            View Calendar
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 space-y-6">
                            {/* AI Suggested Slot */}
                            <div
                                className={cn(
                                    "p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md transform hover:-translate-y-1",
                                    selectedSlot === 'ai'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300'
                                )}
                                onClick={() => handleSlotSelection('ai')}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <CheckCircle2 className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h3 className="font-semibold text-blue-600">AI Recommended Time Slot</h3>
                                </div>
                                <div className="space-y-3 pl-8">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-gray-500" />
                                        <p className="text-gray-700">{suggestedSlot.date}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-gray-500" />
                                        <p className="text-gray-600">{suggestedSlot.time}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-gray-500" />
                                        <p className="text-gray-600">{suggestedSlot.attendees}</p>
                                    </div>
                                    <div className="mt-4 bg-blue-100 p-3 rounded-lg">
                                        <p className="text-sm text-blue-600 font-medium">
                                            {suggestedSlot.aiConfidence}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Saved Custom Slots (Displayed above custom input) */}
                            {savedSlots.map((slot, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md transform hover:-translate-y-1",
                                        selectedSlot === `custom-${index}`
                                            ? 'border-purple-500 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                    )}
                                    onClick={() => handleSlotSelection(`custom-${index}`)}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-purple-100 p-2 rounded-lg">
                                            <Clock className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <h3 className="font-semibold text-purple-600">
                                            Custom Schedule {index + 1}
                                        </h3>
                                    </div>
                                    <div className="space-y-3 pl-8">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <p className="text-gray-700">
                                                {slot.date ? format(slot.date, 'PPP') : 'Date not set'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-500" />
                                            <p className="text-gray-600">{slot.time}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-gray-500" />
                                            <p className="text-gray-600">
                                                {slot.attendees || 'No attendees specified'}
                                            </p>
                                        </div>
                                        {slot.notes && (
                                            <div className="mt-4 bg-purple-100 p-3 rounded-lg">
                                                <p className="text-sm text-purple-600">{slot.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Custom Schedule Input */}
                            <div className="p-6 rounded-xl border-2 border-gray-200 transition-all duration-300 hover:shadow-lg space-y-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <Clock className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <h3 className="font-semibold text-purple-600">Create Custom Schedule</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Date</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !date && "text-gray-500"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : "Pick a date"}
                                                </Button>
                                            </PopoverTrigger>
                                            {/* Calendar with a light blue background */}
                                            <PopoverContent
                                                className="w-auto p-0 bg-blue-100"
                                                align="start"
                                            >
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Time</label>
                                        <Input
                                            type="time"
                                            className="rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                            value={customSlot.time}
                                            onChange={(e) => setCustomSlot({ ...customSlot, time: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Attendees (emails)</label>
                                    <Input
                                        type="text"
                                        placeholder="Enter email addresses separated by commas"
                                        className="rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                        value={customSlot.attendees}
                                        onChange={(e) => setCustomSlot({ ...customSlot, attendees: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Notes</label>
                                    <Input
                                        type="text"
                                        placeholder="Add any additional notes"
                                        className="rounded-lg shadow-sm border-gray-200 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                        value={customSlot.notes}
                                        onChange={(e) => setCustomSlot({ ...customSlot, notes: e.target.value })}
                                    />
                                </div>

                                <Button
                                    className="w-full mt-4 bg-purple-500 hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                                    onClick={handleSaveCustomSlot}
                                    disabled={!date || !customSlot.time}
                                >
                                    Save Custom Slot
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="space-y-6">
                            {/* Estimation Section */}
                            <Card className="border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-lg">
                                <CardHeader className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                                    <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-blue-500" />
                                        Estimation
                                    </h3>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                    <div className="bg-blue-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Resolution Time</p>
                                        <p className="font-semibold text-blue-600">45-60 minutes</p>
                                    </div>
                                    <div className="bg-purple-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Attendees Required</p>
                                        <p className="font-semibold text-purple-600">Minimum 3</p>
                                    </div>
                                    <div className="bg-amber-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Priority Level</p>
                                        <p className="font-semibold text-amber-600 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            High Priority
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Details Section */}
                            <Card className="border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-lg">
                                <CardHeader className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                                    <h3 className="font-semibold text-gray-700">Meeting Details</h3>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                    <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Meeting Type</p>
                                        <p className="font-medium text-gray-800">Follow-up Discussion</p>
                                    </div>

                                    <p className="text-sm font-medium text-gray-600">Agenda Items</p>
                                    <ul className="space-y-2">
                                        {['Review previous action items', 'Project status update', 'Timeline adjustment'].map((item, index) => (
                                            <li key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <span className="text-sm text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                                        <p className="text-sm font-medium text-gray-600">Required Resources</p>
                                        <p className="text-sm text-gray-700">Project documentation, Status reports</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-xl px-6 py-2 transform hover:scale-105 hover:shadow-lg text-white"
                            disabled={selectedSlot}
                            onClick={handleScehdule}
                        >
                            Schedule Meeting
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MeetingScheduler;
