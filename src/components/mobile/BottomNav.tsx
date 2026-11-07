import React from 'react';
import {
  BookOpen,
  Timer,
  Compass,
  Heart,
  User
} from 'lucide-react';

export type TabId = 'academic' | 'study' | 'campus' | 'wellness' | 'profile';

interface BottomNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  pendingDeliverablesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  pendingDeliverablesCount = 0,
}) => {
  const tabs = [
    {
      id: 'academic' as TabId,
      label: 'Academics',
      icon: BookOpen,
      badge: pendingDeliverablesCount > 0 ? pendingDeliverablesCount : undefined,
    },
    {
      id: 'study' as TabId,
      label: 'Focus & Study',
      icon: Timer,
    },
    {
      id: 'campus' as TabId,
      label: 'Campus',
      icon: Compass,
    },
    {
      id: 'wellness' as TabId,
      label: 'Wellness',
      icon: Heart,
    },
    {
      id: 'profile' as TabId,
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center relative transition-all active:scale-95 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[9px] font-bold font-mono px-1 py-0.2 rounded-full min-w-[14px] text-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 truncate ${
                isActive ? 'font-bold' : 'font-medium'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400 absolute bottom-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
