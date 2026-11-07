import React from 'react';
import { StudentProfile } from '../../types/student';
import {
  GraduationCap,
  School,
  Settings,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';

interface ProfileTabProps {
  profile: StudentProfile;
  onOpenOnboarding: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  profile,
  onOpenOnboarding,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <div className="space-y-4 pb-20">
      {/* Student Identity Card */}
      <div className="p-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl border border-indigo-800/40 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xl font-extrabold font-mono text-indigo-300">
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{profile.name}</h3>
            <p className="text-xs text-indigo-300 font-medium">{profile.major}</p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{profile.institution}</p>
          </div>
        </div>

        {/* Academic Stats Strip */}
        <div className="pt-3 border-t border-indigo-800/60 grid grid-cols-3 gap-2 text-center">
          <div>
            <span className="text-base font-extrabold font-mono text-white tabular-nums">
              {profile.currentGpa.toFixed(2)}
            </span>
            <p className="text-[10px] text-indigo-300 uppercase tracking-wider font-mono">Current GPA</p>
          </div>
          <div>
            <span className="text-base font-extrabold font-mono text-indigo-300 tabular-nums">
              {profile.targetGpa.toFixed(2)}
            </span>
            <p className="text-[10px] text-indigo-300 uppercase tracking-wider font-mono">Target GPA</p>
          </div>
          <div>
            <span className="text-base font-extrabold font-mono text-emerald-400 tabular-nums">
              ${profile.weeklyBudget.toFixed(0)}
            </span>
            <p className="text-[10px] text-indigo-300 uppercase tracking-wider font-mono">Weekly Cap</p>
          </div>
        </div>
      </div>

      {/* Re-Run Personalization Flow Action */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-xs">
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            Personalization & Academic Setup
          </span>
          <span className="text-[11px] text-slate-500">
            Adjust school, major, term goals, or quiet hours
          </span>
        </div>
        <button
          onClick={onOpenOnboarding}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold text-xs rounded-lg hover:bg-indigo-100 flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Edit Flow
        </button>
      </div>

      {/* App & Device Settings */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
          Preferences & Integration
        </h4>

        {/* Dark Mode Switch */}
        <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {darkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <div>
              <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                {darkMode ? 'Dark Theme Active' : 'Light Theme Active'}
              </span>
              <span className="text-[11px] text-slate-500">Optimized for library late-night studying</span>
            </div>
          </div>
          <button
            onClick={onToggleDarkMode}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Toggle
          </button>
        </div>

        {/* LMS Sync Status */}
        <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-900 dark:text-white block">
              Canvas / Blackboard LMS Integration
            </span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
              ● Connected · Last sync 4 mins ago
            </span>
          </div>
          <button
            onClick={() => alert('Synced latest assignments & syllabus documents from Canvas LMS.')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sync Now
          </button>
        </div>

        {/* Privacy & Student Data Guarantee */}
        <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <Shield className="w-4 h-4 text-slate-400 shrink-0" />
          <span>FERPA-compliant. Your grades, counseling bookings, and mental health inquiries are strictly private and encrypted on-device.</span>
        </div>
      </div>
    </div>
  );
};
