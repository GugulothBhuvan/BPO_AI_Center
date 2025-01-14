// src/components/TransferModal/TransferModal.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import type { TransferModalProps, Agent } from '../../types/call-interface.types';

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  availableAgents,
  onClose,
  onTransfer
}) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [transferNote, setTransferNote] = useState('');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transfer-modal-title"
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h2 
          id="transfer-modal-title" 
          className="text-xl font-semibold mb-4"
        >
          Transfer Call
        </h2>
        
        <div className="space-y-4">
          <div>
            <label 
              className="text-sm font-medium text-slate-700"
              htmlFor="agent-select"
            >
              Select Agent
            </label>
            <div 
              id="agent-select"
              className="mt-2 space-y-2 max-h-64 overflow-y-auto"
            >
              {availableAgents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className={`w-full p-3 rounded-lg border text-left transition-colors
                    ${selectedAgent?.id === agent.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-200'
                    }`}
                  aria-pressed={selectedAgent?.id === agent.id}
                >
                  <div className="flex items-center gap-3">
                    <UserCircle className="w-8 h-8 text-slate-400" />
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-slate-500">
                        {agent.department}
                      </div>
                    </div>
                    <div 
                      className={`ml-auto px-2 py-1 rounded text-xs
                        ${agent.status === 'available'
                          ? 'bg-green-100 text-green-700'
                          : agent.status === 'busy'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-slate-100 text-slate-700'
                        }`}
                    >
                      {agent.status}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label 
              htmlFor="transfer-note"
              className="text-sm font-medium text-slate-700"
            >
              Transfer Note
            </label>
            <textarea
              id="transfer-note"
              value={transferNote}
              onChange={(e) => setTransferNote(e.target.value)}
              placeholder="Add a note for the receiving agent..."
              className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-100"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedAgent) {
                  onTransfer({ agent: selectedAgent, note: transferNote });
                }
              }}
              disabled={!selectedAgent}
              className="flex-1"
            >
              Transfer Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};