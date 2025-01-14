// src/components/AiNotes.tsx
import React, { FC } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface AiNote {
  content: string;
  timestamp: string;
}

interface AiNotesProps {
  aiNotes?: AiNote[];
}

const AiNotes: FC<AiNotesProps> = ({ aiNotes = [] }) => {
  return (
    <Card className="bg-slate-50 h-full flex flex-col">
      <CardHeader className="flex justify-between items-center pb-2">
        <h3 className="text-lg font-semibold text-slate-700">AI Insights</h3>
        {/* Optional: Add a refresh button or other controls here */}
      </CardHeader>
      <CardContent className="flex-1 p-3">
        {/* Scrollable AI Notes Section */}
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {aiNotes.length > 0 ? (
            aiNotes.map((note, index) => (
              <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-purple-600">AI Insight</span>
                  <span className="text-xs text-slate-400">{note.timestamp}</span>
                </div>
                <p className="text-sm text-slate-700">{note.content}</p>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500">No AI insights available.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AiNotes;