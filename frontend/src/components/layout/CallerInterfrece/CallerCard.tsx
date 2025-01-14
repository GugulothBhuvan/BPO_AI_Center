// src/components/CallerScreen.tsx
import React, { FC, useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  MenuIcon,
  UserCircle,
  Clock,
  Signal,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserHistoryItem {
  date: string;
  description: string;
}

interface CallerScreenProps {
  userName?: string;
  callStartTime?: Date;
  avatar?: React.ReactNode;
  userHistory?: UserHistoryItem[];
  onHangup?: () => void;
  onTransfer?: () => void;
  isConnected?: boolean;
  networkQuality?: number;
  audioQuality?: number;
}

const CallerScreen: FC<CallerScreenProps> = ({
  userName = 'John Doe',
  callStartTime = new Date(),
  avatar = null,
  userHistory = [],
  onHangup = () => {},
  onTransfer = () => {},
  isConnected = true,
  networkQuality = 80,
  audioQuality = 90,
}) => {
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date().getTime() - callStartTime.getTime();
      setDuration(Math.floor(diff / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [callStartTime]);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);

  const navigate = useNavigate();

    onHangup = () => {
        navigate('/customerservice');
    }

  return (
    <Card className="bg-white border border-blue-200 rounded-lg shadow-lg h-full flex flex-col justify-between">
      <CardContent className=" h-full p-6 flex flex-col items-center">
        {/* Avatar */}
        <div className='h-full flex justify-between flex-col items-center'>
        <div className='flex flex-col items-center'>
        <div className="relative mb-6">
          {avatar || <UserCircle className="w-24 h-24 text-slate-400" />}
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
        </div>
        {/* Caller Name */}
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">{userName}</h2>
        {/* Call Duration */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Clock className="w-5 h-5" />
          <span>{`${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`}</span>
        </div>
        </div>
        {/* Call Controls */}
        <div className="flex items-center gap-6">
          <Button
            onClick={toggleMute}
            variant="outline"
            className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 transition duration-200 transform hover:scale-105"
            aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-red-500" />
            ) : (
              <Mic className="w-6 h-6 text-green-500" />
            )}
            <span className="text-xs mt-1">{isMuted ? 'Unmute' : 'Mute'}</span>
          </Button>

          <Button
            onClick={onHangup}
            variant="destructive"
            className="flex items-center p-4 bg-red-100 hover:bg-red-200 transition duration-200 transform hover:scale-105"
            aria-label="Hang up call"
          >
            <PhoneOff className="w-6 h-6 text-red-500" />
            <span className="text-xs mt-1">Hang Up</span>
          </Button>

          <Button
            onClick={toggleVideo}
            variant="outline"
            className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 transition duration-200 transform hover:scale-105"
            aria-label={isVideoOn ? 'Stop video' : 'Start video'}
          >
            {isVideoOn ? (
              <VideoOff className="w-6 h-6 text-red-500" />
            ) : (
              <Video className="w-6 h-6 text-green-500" />
            )}
            <span className="text-xs mt-1">{isVideoOn ? 'Stop Video' : 'Start Video'}</span>
          </Button>
        </div>
        </div>
      </CardContent>
      {/* Bottom Section with Menu */}
      <CardContent className="p-4 border-t border-blue-200">
        <div className="flex justify-between items-center">
          {/* Network Quality */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Signal
              className={`w-5 h-5 ${
                networkQuality > 70
                  ? 'text-green-500'
                  : networkQuality > 30
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            />
            <span>Network</span>
          </div>
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
            className="text-slate-500 hover:text-slate-700 transition duration-200"
            aria-label="Open menu"
          >
            <MenuIcon className="w-5 h-5" />
          </Button>
        </div>
        {/* Dropdown Menu */}
        {showMenu && (
          <div className="mt-4 p-4 bg-slate-50 rounded-lg shadow-md transition-all duration-300">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Contact History</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {userHistory.length > 0 ? (
                userHistory.map((item, index) => (
                  <div key={index} className="text-sm text-slate-600 p-2 bg-white rounded shadow-sm">
                    <span className="font-medium">{item.date}</span> - {item.description}
                  </div>
                ))
              ) : (
                <div className="text-sm text-slate-500">No contact history available.</div>
              )}
            </div>
            <div className="mt-4">
              <Button onClick={onTransfer} variant="outline" className="w-full justify-center">
                Transfer Call
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallerScreen;