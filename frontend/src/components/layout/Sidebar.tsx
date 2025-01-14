import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
    BarChart2,
    Activity,
    Headphones,
    MessageSquare,
    Bot,
    Users,
    Brain,
    AlertCircle,
    FileText,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    activeItem?: string;
    onItemSelect: (item: string) => void;
}

const menuItems = [
    { icon: BarChart2, label: 'Home', badge: null, path: '/' },
    { icon: Activity, label: 'Data Retrieval', badge: '3', path: '/retrieval' },
    { icon: Headphones, label: 'Call Interface', badge: '5', path: '/call-interface' },
    { icon: MessageSquare, label: 'Customer Output', badge: '12', path: '/customeroutput' },
    { icon: Bot, label: 'Customer Service', badge: 'New', path: '/customerservice' },
    { icon: Users, label: 'Meeting Scheduler', badge: null, path: '/schedule' },
    { icon: Brain, label: 'Issues', badge: null, path: '/issues' },
];

const Sidebar = ({ isOpen, onToggle, activeItem, onItemSelect }: SidebarProps) => {
    const navigate = useNavigate();

    return (
        <aside
            className={`
                relative bg-white text-gray-600
                h-[calc(100vh-4rem)] 
                ${isOpen ? 'w-64' : 'w-20'} 
                transition-all duration-300
                shadow-lg
            `}
        >
            {/* Toggle Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 shadow-md"
            >
                {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>

            <ScrollArea className="h-full py-6">
                <div className=" px-3">
                    {menuItems.map((item, index) => (
                        <Button
                            key={index}
                            variant="ghost"
                            className={`
                                w-full 
                                hover:bg-blue-50 hover:text-blue-600
                                ${!isOpen ? 'px-2' : 'px-4'}
                                ${activeItem === item.label ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}
                                transition-colors duration-200
                            `}
                            onClick={() => {
                                onItemSelect(item.label);
                                navigate(item.path);
                            }}
                        >
                            <item.icon className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                            {isOpen && (
                                <span className="flex-1 text-left font-medium">{item.label}</span>
                            )}
                            {isOpen && item.badge && (
                                <Badge
                                    variant="secondary"
                                    className={`ml-auto ${item.badge === 'New'
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {item.badge}
                                </Badge>
                            )}
                        </Button>
                    ))}

                    <Separator className="my-4 bg-gray-200" />

                    <Button
                        variant="ghost"
                        className={`
                            w-full text-gray-600
                            hover:bg-blue-50 hover:text-blue-600
                            ${!isOpen ? 'px-2' : 'px-4'}
                            transition-colors duration-200
                        `}
                    >
                        <Settings className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                        {isOpen && <span className="font-medium">Settings</span>}
                    </Button>

                    <Button
                        variant="ghost"
                        className={`
                            w-full text-red-500
                            hover:bg-red-50 hover:text-red-600
                            ${!isOpen ? 'px-2' : 'px-4'}
                            transition-colors duration-200
                        `}
                    >
                        <LogOut className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                        {isOpen && <span className="font-medium">Logout</span>}
                    </Button>
                </div>
            </ScrollArea>
        </aside>
    );
};

export default Sidebar;
