import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor } from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  isFramed: boolean;
  onToggleFrame: () => void;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  isFramed,
  onToggleFrame,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      hours = hours % 12 || 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isFramed) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-slate-50 dark:bg-slate-950 shadow-xl relative">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-6 w-full">
      {/* Smartphone Outer Chassis (iPhone 16 Pro styling) */}
      <div className="relative w-full max-w-[400px] h-[844px] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-slate-800 shadow-slate-900/30 flex flex-col overflow-hidden border-4 border-slate-700/60">
        
        {/* Hardware volume / power button indentations */}
        <div className="absolute -left-1 top-24 w-1 h-12 bg-slate-700 rounded-r-sm" />
        <div className="absolute -left-1 top-40 w-1 h-12 bg-slate-700 rounded-r-sm" />
        <div className="absolute -right-1 top-32 w-1 h-16 bg-slate-700 rounded-l-sm" />

        {/* Screen Bezel & Container */}
        <div className="w-full h-full bg-slate-50 dark:bg-slate-950 rounded-[40px] overflow-hidden flex flex-col relative">
          
          {/* iOS Top Status Bar & Dynamic Island */}
          <div className="h-11 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 select-none shrink-0 z-40 border-b border-transparent">
            {/* Time */}
            <span className="font-mono text-xs font-bold tabular-nums pl-1">{currentTime}</span>

            {/* Dynamic Island Capsule */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 py-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-950 border border-indigo-900" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 pr-1">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {/* Scrollable Viewport Content */}
          <div className="flex-1 overflow-y-auto relative px-3 pt-2">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/40 dark:bg-white/40 rounded-full z-50 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
