import React, { useState } from 'react';
import { StudentProfile, AcademicLevel } from '../../types/student';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  School,
  Sparkles,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile: StudentProfile;
  onSaveProfile: (profile: StudentProfile) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  initialProfile,
  onSaveProfile,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<StudentProfile>(initialProfile);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(s => s + 1);
    } else {
      // Completed onboarding
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      onSaveProfile({ ...formData, onboardingCompleted: true });
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(s => s - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Onboarding Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                Step {step} of 4
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">Personalization Setup</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {step === 1 && 'Institution & Academic Level'}
              {step === 2 && 'Academic Focus & Major'}
              {step === 3 && 'Term & Target Metrics'}
              {step === 4 && 'Study & Wellness Habits'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Skip
          </button>
        </div>

        {/* Step Progress Indicator Bar */}
        <div className="w-full h-1 bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* STEP 1: INSTITUTION & LEVEL */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Welcome to CampusPulse! Let's tailor your academic workspace to your specific school schedule and campus resources.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Maya Chen"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Pacific State University or Lincoln High"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                  Academic Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'undergraduate', label: 'University Undergrad' },
                    { id: 'high_school', label: 'High School Senior' },
                    { id: 'graduate', label: 'Graduate Student' },
                  ].map(lvl => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, academicLevel: lvl.id as AcademicLevel })}
                      className={`p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        formData.academicLevel === lvl.id
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MAJOR & TRACK */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Specify your field of study so we can curate relevant peer study groups, departmental resources, and course templates.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Primary Major / Track
                </label>
                <input
                  type="text"
                  value={formData.major}
                  onChange={e => setFormData({ ...formData, major: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Computer Science, Pre-Med Biology, Business"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Minor or Concentration (Optional)
                </label>
                <input
                  type="text"
                  value={formData.minor || ''}
                  onChange={e => setFormData({ ...formData, minor: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  placeholder="e.g. Cognitive Systems, Data Science"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Institutional Email (.edu / school domain)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
                  placeholder="m.chen@state.edu"
                />
              </div>
            </div>
          )}

          {/* STEP 3: TERM & TARGET GPA */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Set your benchmarks for this term. We will track your assignments and syllabus weightings against these goals.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Current Term / Semester
                </label>
                <select
                  value={formData.term}
                  onChange={e => setFormData({ ...formData, term: e.target.value })}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <option value="Fall Semester 2026">Fall Semester 2026</option>
                  <option value="Spring Semester 2027">Spring Semester 2027</option>
                  <option value="Summer Term 2027">Summer Term 2027</option>
                  <option value="Winter Quarter 2027">Winter Quarter 2027</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Term GPA</span>
                  <span className="text-sm font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                    {formData.targetGpa.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="4.0"
                  step="0.05"
                  value={formData.targetGpa}
                  onChange={e => setFormData({ ...formData, targetGpa: parseFloat(e.target.value) })}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>2.50</span>
                  <span>3.50 Dean’s List</span>
                  <span>4.00 Summa</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Weekly Campus Living Budget ($)
                </label>
                <input
                  type="number"
                  value={formData.weeklyBudget}
                  onChange={e => setFormData({ ...formData, weeklyBudget: parseFloat(e.target.value) || 100 })}
                  className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono"
                  placeholder="150"
                />
              </div>
            </div>
          )}

          {/* STEP 4: HABITS & WELLNESS */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Balance academic excellence with mental health and sleep consistency.
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Preferred Pomodoro Study Interval
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 25, label: '25m (Standard)' },
                    { val: 45, label: '45m (Deep Flow)' },
                    { val: 50, label: '50m (Ultradian)' },
                  ].map(int => (
                    <button
                      key={int.val}
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        preferences: { ...formData.preferences, studySessionLength: int.val }
                      })}
                      className={`p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        formData.preferences.studySessionLength === int.val
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {int.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Campus Notifications & Sleep Guard
                </label>
                <label className="flex items-center gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.preferences.quietHours}
                    onChange={e => setFormData({
                      ...formData,
                      preferences: { ...formData.preferences, quietHours: e.target.checked }
                    })}
                    className="accent-indigo-600 w-4 h-4 rounded-sm"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                      Enforce Quiet Hours (11:00 PM – 7:30 AM)
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Mute non-urgent campus club pings to safeguard sleep cycle.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            {step === 4 ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Complete Setup & Launch
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
