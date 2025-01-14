// src/components/LiveTranscription.tsx
import React, { FC, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { SpeakerWave, SpeakerX } from 'lucide-react';

interface TranscriptItem {
  speaker: string;
  timestamp: string;
  text: string;
  translation?: string;
}

interface LiveTranscriptionProps {
  transcripts?: TranscriptItem[];
  sourceLanguage?: string;
  targetLanguage?: string;
  currentSpeaker?: string;
  isProcessing?: boolean;
}

const LiveTranscription: FC<LiveTranscriptionProps> = ({
  transcripts = [],
  sourceLanguage = 'Hindi',
  targetLanguage = 'English(US)',
  currentSpeaker = '',
  isProcessing = false,
}) => {
  const transcriptEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom when new transcripts are added
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcripts, isProcessing]);

  return (
    <Card className="bg-slate-50 h-full flex flex-col">
      <CardHeader className="flex justify-between items-center pb-2 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-700">Live Transcription</h3>
        <div className="text-sm text-slate-500 bg-white px-2 py-1 rounded shadow-sm">
          {sourceLanguage.toUpperCase()} → {targetLanguage.toUpperCase()}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        {/* Scrollable Transcript Area */}
        <div
          className="space-y-4 max-h-full overflow-y-auto pr-2 scroll-smooth"
          aria-live="polite"
          aria-label="Live transcription content"
        >
          {transcripts.length > 0 ? (
            transcripts.map((transcript, index) => {
              const isCurrentSpeaker = transcript.speaker === currentSpeaker;
              return (
                <div
                  key={index}
                  className={`p-4 bg-white rounded-lg shadow ${
                    isCurrentSpeaker ? 'border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-sm font-medium ${
                        isCurrentSpeaker ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {transcript.speaker}
                    </span>
                    <span className="text-xs text-slate-400">{transcript.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-700">{transcript.text}</p>
                  {transcript.translation && (
                    <p className="text-xs text-slate-500 mt-1 italic">
                      Translation: {transcript.translation}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-sm text-slate-500">No transcripts available.</div>
          )}
          {isProcessing && (
            <div className="flex items-center gap-2 text-sm text-slate-500 p-2 animate-pulse">
              <SpeakerWave className="w-4 h-4" />
              <span>{currentSpeaker} is speaking...</span>
            </div>
          )}
          {/* Dummy div to scroll into view */}
          <div ref={transcriptEndRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveTranscription;