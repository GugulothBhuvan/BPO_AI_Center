import React, { useState } from 'react';
import { PlusCircle, Trash2, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: number;
  content: string;
}

interface Solution {
  id: number;
  point: string;
}

const CustomerOutputUI = () => {
  const Navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([
    { id: 1, point: "Reset customer's password" },
    { id: 2, point: "Update billing information" },
    { id: 3, point: "Provide account access" }
  ]);
  const [newNote, setNewNote] = useState("");
  const [newSolution, setNewSolution] = useState("");

  // Dummy customer data
  const customerData = {
    name: "John Smith",
    issueHeading: "Account Access Problem",
    sentiment: "Satisfied",
    description: "Customer experienced multiple failed login attempts and expressed significant frustration with the account recovery process. Requires immediate attention.",
  };

  const dummyIssue = `Customer reported inability to access their account after recent password change. Multiple login attempts were made but all resulted in authentication errors. Customer expressed frustration with the account recovery process.`;

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote }]);
      setNewNote("");
    }
  };

  const addSolution = () => {
    if (newSolution.trim()) {
      setSolutions([...solutions, { id: Date.now(), point: newSolution }]);
      setNewSolution("");
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const deleteSolution = (id: number) => {
    setSolutions(solutions.filter(solution => solution.id !== id));
  };

  // Function to get sentiment color
  const getSentimentColor = (sentiment: string) => {
    const sentiments: { [key: string]: string } = {
      'Frustrated': 'text-red-600',
      'Neutral': 'text-yellow-600',
      'Satisfied': 'text-green-600',
      'Happy': 'text-green-500'
    };
    return sentiments[sentiment] || 'text-gray-600';
  };
  const handleSchedule = () => {
    Navigate('/schedule');
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className='flex flex-row justify-between'>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Customer Support</h1>
      <div>
        <Button onClick={handleSchedule} className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300 rounded-xl text-white" >
          Schedule
        </Button>
      </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Issue Card */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Reported Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">{dummyIssue}</p>
          </CardContent>
        </Card>

        {/* Customer Details Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700">Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">{customerData.name}</span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Issue</h4>
                <p className="text-gray-800 font-medium">{customerData.issueHeading}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Sentiment</h4>
                <p className={`font-medium ${getSentimentColor(customerData.sentiment)}`}>
                  {customerData.sentiment}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                <p className="text-gray-600 text-sm">{customerData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solutions Card */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-blue-700">Solution Steps</CardTitle>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSolution}
                onChange={(e) => setNewSolution(e.target.value)}
                placeholder="Add new solution point..."
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addSolution}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusCircle size={16} />
                Add
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {solutions.map((solution) => (
                <li key={solution.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm border">
                  <span className="text-gray-700">{solution.point}</span>
                  <button
                    onClick={() => deleteSolution(solution.id)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Agent Notes Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-blue-700">Agent Notes</CardTitle>
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add note..."
                className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addNote}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <PlusCircle size={16} />
                Add
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {notes.map((note) => (
                <li key={note.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm border">
                  <span className="text-gray-700">{note.content}</span>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerOutputUI;