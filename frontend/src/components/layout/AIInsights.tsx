
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Brain,
    TrendingUp,
    AlertTriangle,
    CheckCircle2,
    BarChart2,
    ArrowRight,
    MessageSquare,
    Users,
    Clock,
} from 'lucide-react';

interface Insight {
    id: string;
    type: 'alert' | 'trend' | 'suggestion' | 'performance';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    timestamp: string;
    metric?: {
        value: string;
        trend: 'up' | 'down';
        percentage: string;
    };
}

interface AIInsightsProps {
    insights: Insight[];
    onViewDetail: (id: string) => void;
}

const AIInsights = ({ insights, onViewDetail }: AIInsightsProps) => {
    const getInsightIcon = (type: Insight['type']): React.ComponentType<{ className?: string }> => {
        const icons: Record<Insight['type'], React.ComponentType<{ className?: string }>> = {
            alert: AlertTriangle,
            trend: TrendingUp,
            suggestion: MessageSquare,
            performance: Users,
        };
        return icons[type] || Brain; // Default fallback icon
    };

    const getPriorityColor = (priority: Insight['priority']): string => {
        const colors: Record<Insight['priority'], string> = {
            high: 'text-red-500 bg-red-50',
            medium: 'text-yellow-500 bg-yellow-50',
            low: 'text-green-500 bg-green-50',
        };
        return colors[priority] || 'text-slate-500 bg-slate-50'; // Default color
    };


    return (
        <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    AI Insights
                    <Badge variant="secondary" className="ml-2">Live</Badge>
                </CardTitle>
                <Button variant="outline" size="sm">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Full Report
                </Button>
            </CardHeader>

            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                        {insights.map((insight) => {
                            const Icon = getInsightIcon(insight.type);
                            const priorityColor = getPriorityColor(insight.priority);

                            return (
                                <Card
                                    key={insight.id}
                                    className="p-4 hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-lg ${priorityColor}`}>
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-medium">{insight.title}</h4>
                                                    <p className="text-sm text-slate-600 mt-1">
                                                        {insight.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3 w-3 text-slate-400" />
                                                    <span className="text-xs text-slate-400">
                                                        {insight.timestamp}
                                                    </span>
                                                </div>
                                            </div>

                                            {insight.metric && (
                                                <div className="mt-3 flex items-center gap-3">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-bold">
                                                            {insight.metric.value}
                                                        </span>
                                                        <span className={`flex items-center text-sm ${insight.metric.trend === 'up'
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                            }`}>
                                                            <TrendingUp className="h-3 w-3 mr-1" />
                                                            {insight.metric.percentage}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mt-3 flex items-center justify-between">
                                                <Badge
                                                    variant="outline"
                                                    className={priorityColor}
                                                >
                                                    {insight.priority.toUpperCase()} Priority
                                                </Badge>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onViewDetail(insight.id)}
                                                    className="text-slate-500 hover:text-slate-700"
                                                >
                                                    View Details
                                                    <ArrowRight className="h-4 w-4 ml-2" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </ScrollArea>

                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-purple-500" />
                        <div>
                            <h4 className="font-medium text-purple-700">AI Assistant Active</h4>
                            <p className="text-sm text-purple-600">
                                Continuously monitoring calls and providing real-time insights
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AIInsights;