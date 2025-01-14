// src/components/AgentNotes.tsx
import React, { FC, useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface ManualNote {
  content: string;
  completed: boolean;
}

interface AgentNotesProps {
  manualNotes?: ManualNote[];
  onAddNote?: (note: ManualNote) => void;
  onDeleteNote?: (index: number) => void;
  onEditNote?: (index: number, note: ManualNote) => void;
  lastSaved?: Date | null;
}

const AgentNotes: FC<AgentNotesProps> = ({
  manualNotes = [],
  onAddNote = () => {},
  onDeleteNote = () => {},
  onEditNote = () => {},
  lastSaved = null,
}) => {
  const [notes, setNotes] = useState<ManualNote[]>(manualNotes);
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(lastSaved);
  const notesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNotes(manualNotes);
  }, [manualNotes]);

  useEffect(() => {
    if (lastSaved) {
      setLastSavedTime(lastSaved);
    }
  }, [lastSaved]);

  useEffect(() => {
    // Scroll to the bottom whenever notes change
    if (notesEndRef.current) {
      notesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [notes]);

  const handleAddNote = () => {
    const newNote: ManualNote = { content: '', completed: false };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    onAddNote(newNote);
    setLastSavedTime(new Date());
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    onDeleteNote(index);
    setLastSavedTime(new Date());
  };

  const handleEditNote = (index: number, updatedNote: ManualNote) => {
    const updatedNotes = notes.map((note, i) => (i === index ? updatedNote : note));
    setNotes(updatedNotes);
    onEditNote(index, updatedNote);
    setLastSavedTime(new Date());
  };

  return (
    <Card className="bg-slate-50 h-full flex flex-col">
      {/* Card Header */}
      <CardHeader className="flex justify-between items-center pb-2 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-700">Agent Notes</h3>
        {lastSavedTime && (
          <span className="text-xs text-slate-500">
            Last saved: {lastSavedTime.toLocaleTimeString()}
          </span>
        )}
      </CardHeader>

      {/* Card Content */}
      <CardContent className="flex-1 p-4 flex flex-col">
        {/* Scrollable Notes Section */}
        <div className="flex-1 pr-2">
          <div className="space-y-2 h-[200px] overflow-y-auto ">
            {notes.length > 0 ? (
              notes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={note.completed}
                    onChange={() =>
                      handleEditNote(index, { ...note, completed: !note.completed })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    aria-label={`Mark note ${index + 1} as ${
                      note.completed ? 'incomplete' : 'completed'
                    }`}
                  />
                  <textarea
                    value={note.content}
                    onChange={(e) =>
                      handleEditNote(index, { ...note, content: e.target.value })
                    }
                    className="flex-1 p-2 text-sm border rounded bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-100 resize-none"
                    rows={2}
                    placeholder="Enter your note here..."
                    aria-label={`Note ${index + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(index)}
                    className="text-slate-400 hover:text-slate-700"
                    aria-label={`Delete note ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-500">
                No notes available. Click "Add Note" to create one.
              </div>
            )}
            {/* Dummy div to ensure scrolling to bottom */}
            <div ref={notesEndRef} />
          </div>
        </div>

        {/* Add Note Button */}
        <div className="mt-4">
          <Button
            onClick={handleAddNote}
            variant="outline"
            className="w-full bg-white hover:bg-slate-100"
            aria-label="Add a new note"
          >
            Add Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentNotes;