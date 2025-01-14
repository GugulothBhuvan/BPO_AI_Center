import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Menu,
    Bot,
    PhoneIncoming,
    Clock,
    BellRing,
    Search,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    onToggleSidebar: () => void;
    onSimulateCall: () => void;
    agentName: string;
    agentRole: string;
    timeOnline: string;
}

const Navbar = ({
    onToggleSidebar,
    onSimulateCall,
    agentName,
    agentRole,
    timeOnline,
}: NavbarProps) => {
    const Navigate = useNavigate();
    
    const handleHome = () => {
        Navigate('/');
    }

    return (
        <header className="bg-white border-b sticky top-0 z-40">
            <div className="flex h-16 items-center px-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleSidebar}
                    className="mr-4"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <h2 onClick={handleHome} className="text-lg font-semibold flex items-center gap-2 cursor-pointer">
                    <Bot className="h-5 w-5 text-blue-500" />
                    AI Service Center
                </h2>

                {/* Search Bar */}
                <div className="ml-8 hidden md:flex items-center gap-2 bg-slate-50 rounded-md px-3 py-1.5 flex-1 max-w-xs">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search calls, agents, or analytics..."
                        className="bg-transparent border-none focus:outline-none text-sm flex-1"
                    />
                </div>

                <div className="ml-auto flex items-center gap-4">
                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                        <BellRing className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            3
                        </span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onSimulateCall}
                        className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                    >
                        <PhoneIncoming className="mr-2 h-4 w-4" />
                        Simulate Call
                    </Button>

                    <Badge variant="secondary" className="font-normal bg-green-50 text-green-600">
                        <Clock className="mr-2 h-3 w-3" />
                        Online: {timeOnline}
                    </Badge>

                    <Separator orientation="vertical" className="h-8" />

                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-medium">{agentName}</p>
                            <p className="text-xs text-slate-500">{agentRole}</p>
                        </div>
                        <Avatar className="h-8 w-8 ring-2 ring-blue-500/20">
                            <AvatarImage src="/api/placeholder/32/32" />
                            <AvatarFallback>
                                {agentName
                                    .split(' ')
                                    .map(n => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
