import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { StudentProfile } from '../../types/student';

interface TopHeaderProps {
  profile: StudentProfile;
  activeTabTitle: string;
  onOpenNotifications?: () => void;
  onOpenOnboarding?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  profile,
  activeTabTitle,
  onOpenNotifications,
  onOpenOnboarding,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 h-14 flex items-center justify-between">
      {/* Left: Brand / Academic Institution */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-xs shrink-0">
          CP
        </div>
        <div className="min-w-0">
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono font-bold tracking-wider uppercase block truncate">
            {profile.institution}
          </span>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white truncate">
            {activeTabTitle}
          </h2>
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={onOpenOnboarding}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-lg transition-colors"
          title="Onboarding & Settings"
        >
          <Sparkles className="w-4 h-4" />
        </button>
        <button
          onClick={onOpenNotifications}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 rounded-lg transition-colors relative"
          title="Campus Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5" />
        </button>
      </div>
    </header>
  );
};
