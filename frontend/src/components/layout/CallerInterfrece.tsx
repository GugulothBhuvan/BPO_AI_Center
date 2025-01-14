// src/components/CallInterface.tsx
import React, { FC, useState } from 'react';
import CallerScreen from './CallerInterfrece/CallerCard';
import LiveTranscription from './CallerInterfrece/LiveTranscrpition';
import AgentNotes from './CallerInterfrece/AgentNotes';
import UserSentiment from './CallerInterfrece/UserSentiment';
import AiNotes from './CallerInterfrece/AiNotes';

type CallInterfaceProps = object;

const CallInterface: FC<CallInterfaceProps> = () => {
  // Call State
  const [isCallActive, setIsCallActive] = useState<boolean>(true);

  // Dummy Data
  const dummyTranscripts = [
    { speaker: 'John Doe', timestamp: '10:00 AM', text: 'Hello, how can I help you today?' },
    { speaker: 'Agent', timestamp: '10:01 AM', text: 'I have an issue with my account.' },
    { speaker: 'John Doe', timestamp: '10:02 AM', text: 'I\'m sorry to hear that. Let me assist you.' },
  ];

  const dummyAgentNotes = [
    { content: 'Customer is frustrated about billing.', completed: false },
    { content: 'Need to escalate to supervisor.', completed: false },
  ];

  const dummyAiNotes = [
    { content: 'Customer expressed frustration multiple times.', timestamp: '10:02 AM' },
    { content: 'Positive response when problem is acknowledged.', timestamp: '10:03 AM' },
  ];

  const dummySentiments = [
    { timestamp: '10:00 AM', sentiment: 'Neutral' as const },
    { timestamp: '10:01 AM', sentiment: 'Positive' as const },
    { timestamp: '10:02 AM', sentiment: 'Negative' as const },
    { timestamp: '10:03 AM', sentiment: 'Positive' as const },
  ];

  // Handlers
  const handleHangup = () => {
    setIsCallActive(false);
  };

  const handleTransfer = () => {
    alert('Transfer Call Clicked');
  };


  const handleAddNote = (note: { content: string; completed: boolean }) => {
    console.log('Add Note:', note);
  };

  const handleDeleteNote = (index: number) => {
    console.log('Delete Note at index:', index);
  };

  const handleEditNote = (index: number, note: { content: string; completed: boolean }) => {
    console.log('Edit Note at index:', index, 'New Note:', note);
  };

  return (
    <div className="w-full h-full bg-gray-100 rounded-xl flex flex-col">
      <div className="h-full flex flex-1">
        {/* Left Full - Caller Screen */}
        <div className="w-full md:w-1/3 p-2">
          <CallerScreen
            userName="John Doe"
            callStartTime={new Date()}
            userHistory={[
              { date: '2023-10-01', description: 'Called about billing issue.' },
              { date: '2023-09-15', description: 'Inquired about product features.' },
            ]}
            onHangup={handleHangup}
            onTransfer={handleTransfer}
            isConnected={isCallActive}
            networkQuality={80}
            audioQuality={90}
          />
        </div>

        {/* Middle Section - Live Transcription and Agent Notes */}
        <div className="flex-1 flex flex-col p-2 space-y-4">
          {/* Top-Middle - Live Transcription */}
          <div className="flex-1">
            <LiveTranscription
              transcripts={dummyTranscripts}
              sourceLanguage="Hindi"
              targetLanguage="English(US)"
              currentSpeaker="Agent"
              isProcessing={!isCallActive}
            />
          </div>
          {/* Bottom-Middle - Agent Notes */}
          <div className="flex-1">
            <AgentNotes
              manualNotes={dummyAgentNotes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              onEditNote={handleEditNote}
              lastSaved={new Date()}
            />
          </div>
        </div>

        {/* Right Section - User Sentiment and AI Notes */}
        <div className="w-full md:w-1/3 p-2 flex flex-col space-y-4">
          {/* Top-Right - User Sentiment */}
          <div className="flex-1">
            <UserSentiment sentiments={dummySentiments} />
          </div>
          {/* Bottom-Right - AI Notes */}
          <div className="flex-1">
            <AiNotes aiNotes={dummyAiNotes} />
          </div>
        </div>
      </div>

      {/* Persistent UI after Hangup */}
      {!isCallActive && (
        <div className="bg-white p-4 shadow-inner flex justify-center">
          <p className="text-center text-lg text-slate-700">Call Ended</p>
        </div>
      )}
    </div>
  );
};

export default CallInterface;