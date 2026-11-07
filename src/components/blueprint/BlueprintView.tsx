import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  Layers,
  Sparkles,
  Users,
  Target,
  Palette,
  Layout,
  Sliders,
  CheckCircle2,
  Calendar,
  Heart,
  Timer,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Zap
} from 'lucide-react';

interface BlueprintViewProps {
  onSwitchToSimulator: () => void;
  onOpenOnboarding: () => void;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({
  onSwitchToSimulator,
  onOpenOnboarding,
}) => {
  const [activeBlueprintSection, setActiveBlueprintSection] = useState<
    'vision' | 'features' | 'onboarding' | 'design' | 'prototypes'
  >('vision');

  const [selectedPersona, setSelectedPersona] = useState<'undergrad' | 'highschool' | 'commuter'>('undergrad');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Blueprint Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">
            <span>Product Blueprint & UX Specification</span>
            <span className="text-slate-300">·</span>
            <span>Mobile-First Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            CampusPulse — Student Resource OS
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            A cohesive mobile platform engineered to unify fragmented student workflows: consolidating academic deadlines, active recall study engines, real-time campus facility occupancy, and licensed mental health support into a single thumb-friendly mobile app.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onSwitchToSimulator}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            Launch Mobile Device Simulator
          </button>
        </div>
      </div>

      {/* Blueprint Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl overflow-x-auto text-xs font-semibold">
        {[
          { id: 'vision', label: '1. Vision & Value Prop', icon: Target },
          { id: 'features', label: '2. Key Feature Modules', icon: Layers },
          { id: 'onboarding', label: '3. Onboarding & Personalization', icon: Users },
          { id: 'design', label: '4. UI/UX & Information Architecture', icon: Layout },
          { id: 'prototypes', label: '5. Interactive Prototype Ideas', icon: Zap },
        ].map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveBlueprintSection(item.id as typeof activeBlueprintSection)}
              className={`py-2.5 px-4 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeBlueprintSection === item.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* SECTION 1: VISION & VALUE PROPOSITION */}
      {activeBlueprintSection === 'vision' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Executive Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">
                Problem Space
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Workflow Fragmentation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                The modern student juggles an average of 6–8 uncoordinated tools: Canvas for assignments, Google Calendar for lectures, Quizlet for flashcards, GroupMe for study chats, and mental health hotlines buried in deep PDFs.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase">
                The Solution
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Unified Mobile Hub</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                CampusPulse acts as the student's daily OS. A unified schedule aggregates lectures, assignments, and study blocks; built-in spaced repetition replaces external flashcard subscriptions; and live campus density prevents wasted library trips.
              </p>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold font-mono text-amber-600 dark:text-amber-400 uppercase">
                North Star Metric
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Student Academic Efficacy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Measured by: <strong>Assignment On-Time Completion Rate (&gt;94%)</strong>, <strong>Daily Active Flow Hours</strong>, and <strong>Sub-2-Minute Counselor Booking Conversion</strong> during times of academic stress.
              </p>
            </div>
          </div>

          {/* User Persona Profiles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Core Target User Personas</h3>
                <p className="text-xs text-slate-500">Validated across 120+ high school and university user interviews</p>
              </div>
              <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
                <button
                  onClick={() => setSelectedPersona('undergrad')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedPersona === 'undergrad'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Undergrad (Maya)
                </button>
                <button
                  onClick={() => setSelectedPersona('highschool')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedPersona === 'highschool'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  AP Senior (Leo)
                </button>
                <button
                  onClick={() => setSelectedPersona('commuter')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedPersona === 'commuter'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Commuter (Aisha)
                </button>
              </div>
            </div>

            {/* Persona Deep-Dive Card */}
            {selectedPersona === 'undergrad' && (
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
                <div className="md:border-r border-slate-100 dark:border-slate-800 md:pr-6 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xl font-bold font-mono">
                    MC
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Maya Chen</h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">First-Year Undergrad · Pre-Med & CS</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Pacific State University</p>
                  </div>
                  <blockquote className="text-xs italic text-slate-600 dark:text-slate-400 border-l-2 border-indigo-400 pl-3 py-1">
                    “College lecture pace is overwhelming compared to high school. If I miss one syllabus deadline, my GPA takes a permanent hit.”
                  </blockquote>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-mono">
                    Critical Pain Points
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Difficulty estimating how midterm grades impact final GPA targets.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Arriving at the campus library only to find 100% of study desks full.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Imposter syndrome and isolation when studying for high-fail-rate weed-out STEM courses.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                    Jobs To Be Done (JTBD)
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Run "what-if" simulations on final exams to know minimum scores required for a 3.85 GPA.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Find open quiet study spaces with live occupancy indicators before walking across campus.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Join peer study circles filtered specifically by course code (CS 106B).</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedPersona === 'highschool' && (
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
                <div className="md:border-r border-slate-100 dark:border-slate-800 md:pr-6 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xl font-bold font-mono">
                    LV
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Leo Vasquez</h4>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">High School Senior · 4 AP Classes & Varsity Track</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Lincoln High School</p>
                  </div>
                  <blockquote className="text-xs italic text-slate-600 dark:text-slate-400 border-l-2 border-cyan-400 pl-3 py-1">
                    “Between college applications, track meets, and AP Calculus drills, I have 90 minutes of free time a night. Every study minute must count.”
                  </blockquote>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-mono">
                    Critical Pain Points
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Passive re-reading of textbooks leaves illusion of competence before exams.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Late-night phone doomscrolling ruins sleep architecture before tests.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                    Jobs To Be Done (JTBD)
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Active recall test drilling with instant feedback on complex formulas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>25-minute Pomodoro bursts with locked phone distraction barriers.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {selectedPersona === 'commuter' && (
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
                <div className="md:border-r border-slate-100 dark:border-slate-800 md:pr-6 space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl font-bold font-mono">
                    AK
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">Aisha Khan</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Junior Transfer · Commuter & Part-Time Job</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Metropolitan State</p>
                  </div>
                  <blockquote className="text-xs italic text-slate-600 dark:text-slate-400 border-l-2 border-amber-400 pl-3 py-1">
                    “I commute 45 minutes by transit and work 20 hours a week. I need offline document review and a strict budget for meals on campus.”
                  </blockquote>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 font-mono">
                    Critical Pain Points
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Micro-spending $12/day on campus cafes draining bank account quickly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>Disconnected from campus social life and unable to attend in-person mental health hours.</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 font-mono">
                    Jobs To Be Done (JTBD)
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Weekly dining stipend gauge to prevent overspending on campus food.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>Book confidential telehealth counseling sessions on evenings or weekends.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: KEY FEATURE MODULES */}
      {activeBlueprintSection === 'features' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Module 1: Academic Hub */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">
                    Module 01
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Academic Hub</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Centralized command center for curriculum tracking and performance modeling.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Class Schedule Management:</strong> Day-of-week timeline, countdown to next lecture, classroom room locator, and instructor office hours.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Assignment Deliverables Tracker:</strong> Categorized by due date and course weight, with subtasks and completion toggles.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Interactive GPA & Target Estimator:</strong> Sliders predicting final term outcomes and pinpointing exact exam cutoffs.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Course Document Vault:</strong> Local offline storage for syllabi, lecture slides, and study formula cheat sheets.
                </div>
              </div>
            </div>

            {/* Module 2: Study & Productivity */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Timer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono text-cyan-600 dark:text-cyan-400 uppercase">
                    Module 02
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Study & Productivity Tools</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cognitive psychology principles translated into touch-first learning instruments.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Built-in Pomodoro Engine:</strong> 25/5 or 50/10 intervals with synthesized chimes and ambient campus audio (lo-fi, rain, library hum).
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Flashcard Generator & Leitner Engine:</strong> SM-2 spaced repetition (Again, Hard, Good, Easy) adjusting card frequencies.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Active Recall Drilling:</strong> Forced retrieval mode requiring typing or mental retrieval before unblurring official answers.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Focus Streaks:</strong> Positive reinforcement telemetry celebrating daily consistency without gamified fatigue.
                </div>
              </div>
            </div>

            {/* Module 3: Campus & Community */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase">
                    Module 03
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Campus & Community Resources</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Bridging physical and digital student life with spatial intelligence.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Live Facility Occupancy Map:</strong> 2D campus layout with real-time percentage badges for libraries, dining halls, and STEM labs.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Campus Event Calendar:</strong> Filterable by Career, Academic, and Social tags with 1-tap RSVP adding to personal schedule.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Peer Study Group Matcher:</strong> Course-specific study pods (e.g. CS 106B Midterm Prep) with headcount limits and meeting spots.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Zone Amenities Filter:</strong> Instantly discover silent floors, power outlets, and free student printing stations.
                </div>
              </div>
            </div>

            {/* Module 4: Wellness & Support */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono text-rose-600 dark:text-rose-400 uppercase">
                    Module 04
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Wellness & Campus Support</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Destigmatizing mental health care and supporting sustainable student living.
              </p>
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>24/7 Crisis Direct Access:</strong> Immediate 1-tap connection to 988 Lifeline, Crisis Text Line (741741), and Campus Urgent Triage.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Licensed Counselor Booking:</strong> Select provider, choose in-person vs telehealth, pick open calendar slots, and confirm privately.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Campus Living Budget & Expense Tracker:</strong> Weekly meal & supply allowance gauge with category breakdowns and overrun warnings.
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                  <strong>Somatic De-Stress Guide:</strong> 4-4-4 box breathing widget to downregulate exam anxiety in 60 seconds.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ONBOARDING & PERSONALIZATION FLOW */}
      {activeBlueprintSection === 'onboarding' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">4-Stage Progressive Onboarding Architecture</h3>
                <p className="text-xs text-slate-500">Designed to achieve a &gt;85% Day-1 activation rate with minimal friction</p>
              </div>
              <button
                onClick={onOpenOnboarding}
                className="px-3.5 py-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-bold rounded-xl hover:bg-indigo-100 transition-colors"
              >
                Launch Onboarding Wizard
              </button>
            </div>

            {/* Step-by-Step Flow Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Identity & School</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Select institution (database of 4,000+ colleges & high schools) and academic level (Undergraduate, High School, Graduate).
                </p>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono pt-1">
                  UX Principle: Instant fuzzy school search.
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Major & Discipline</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Select major, minor, or AP track to pre-populate relevant departmental resources and course catalog suggestions.
                </p>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono pt-1">
                  UX Principle: Smart auto-complete.
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Term Targets</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Set target cumulative GPA and weekly living budget. Informs dynamic alerts and calculator baseline targets.
                </p>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono pt-1">
                  UX Principle: Tactile slider controls.
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Habits & Sleep</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Configure default Pomodoro length (25m vs 45m) and enable automatic quiet hours to protect restorative sleep.
                </p>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono pt-1">
                  UX Principle: Wellness-first default.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: UI/UX & INFORMATION ARCHITECTURE */}
      {activeBlueprintSection === 'design' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Design System & 60-30-10 Token Palette */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">60-30-10 Mobile Color Token Matrix</h3>
              <p className="text-xs text-slate-500">Engineered for outdoor daylight readability and late-night library study</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  60% Dominant Canvas
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Neutral Foundation</h4>
                <p className="text-xs text-slate-500">
                  Clean cool Slate-50 (#F8FAFC) in Light mode, true deep Slate-950 (#020617) in Dark mode. Provides distraction-free contrast.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="h-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  30% Structural Surfaces
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Cards & Hairlines</h4>
                <p className="text-xs text-slate-500">
                  Pure White (#FFFFFF) / Slate-900 (#0F172A) cards with subtle 1px border dividers (border-slate-200/80). Zero card-in-card nesting.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-mono font-bold">
                  10% Primary Accent
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">High-Intent Actions</h4>
                <p className="text-xs text-slate-500">
                  Deep Academic Indigo (#4F46E5) reserved strictly for primary interactive CTAs, active tab icons, and focus timers.
                </p>
              </div>
            </div>
          </div>

          {/* Ergonomic Navigation Hierarchy */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Information Architecture & Navigation Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2">
                <strong className="text-slate-900 dark:text-white block font-mono">1. Top App Bar (Hard Reach)</strong>
                <span>Compact 54px header displaying current campus institution and persistent notification alerts.</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2">
                <strong className="text-slate-900 dark:text-white block font-mono">2. Content Canvas (Stretch Zone)</strong>
                <span>Interactive schedule feeds, flashcard drill cards, map canvas, and expense ledgers.</span>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2">
                <strong className="text-slate-900 dark:text-white block font-mono">3. Fixed Bottom Bar (Natural Thumb Zone)</strong>
                <span>5 high-frequency destination tabs with &gt;44px touch targets placed in the lowest 40% of the display.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: INTERACTIVE PROTOTYPE IDEAS */}
      {activeBlueprintSection === 'prototypes' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 uppercase">
                Prototype Widget 01
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Interactive GPA Target Estimator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Empowers students to drag final exam projections and instantly see the mathematical delta on letter grades and graduation honors cutoffs.
              </p>
              <button
                onClick={onSwitchToSimulator}
                className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Try live in Academics tab →
              </button>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400 uppercase">
                Prototype Widget 02
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">3D Flip Flashcards with SM-2 Spaced Repetition</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Card flip animation with Leitner box intervals (Again, Hard, Good, Easy) and active recall prompt retrieval testbeds.
              </p>
              <button
                onClick={onSwitchToSimulator}
                className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Try live in Focus & Study tab →
              </button>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase">
                Prototype Widget 03
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2D Interactive Campus Facility Occupancy Map</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Live color-coded pins indicating open study seats, noise zones, and coffee availability across libraries and commons.
              </p>
              <button
                onClick={onSwitchToSimulator}
                className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Try live in Campus tab →
              </button>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <span className="text-xs font-bold font-mono text-rose-600 dark:text-rose-400 uppercase">
                Prototype Widget 04
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Confidential Counselor Booking & Somatic Reset</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                One-tap crisis lifelines, 4-4-4 guided box breathing animation, and private mental health appointments with campus specialists.
              </p>
              <button
                onClick={onSwitchToSimulator}
                className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                Try live in Wellness tab →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
