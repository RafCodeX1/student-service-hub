import React, { useState, useEffect } from 'react';
import { Counselor, CounselorBooking, ExpenseItem } from '../../types/student';
import {
  Heart,
  PhoneCall,
  Calendar,
  DollarSign,
  Plus,
  ShieldAlert,
  Wind,
  CheckCircle2,
  Clock,
  Sparkles,
  Smile,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WellnessSupportTabProps {
  counselors: Counselor[];
  expenses: ExpenseItem[];
  weeklyBudget: number;
  onAddExpense: (expense: Omit<ExpenseItem, 'id'>) => void;
  onBookCounselor: (booking: CounselorBooking) => void;
  bookings: CounselorBooking[];
}

export const WellnessSupportTab: React.FC<WellnessSupportTabProps> = ({
  counselors,
  expenses,
  weeklyBudget,
  onAddExpense,
  onBookCounselor,
  bookings,
}) => {
  const [activeSection, setActiveSection] = useState<'crisis' | 'booking' | 'budget'>('crisis');
  
  // Interactive Breathing Exercise State
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState<number>(4);

  // Counselor Booking State
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor>(counselors[0]);
  const [bookingMode, setBookingMode] = useState<'in_person' | 'telehealth'>('in_person');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 2:00 PM');
  const [bookingReason, setBookingReason] = useState<string>('Midterm stress & sleep anxiety');
  const [bookingSuccessModal, setBookingSuccessModal] = useState<boolean>(false);

  // Add Expense State
  const [showAddExpenseModal, setShowAddExpenseModal] = useState<boolean>(false);
  const [newExpenseTitle, setNewExpenseTitle] = useState<string>('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<string>('');
  const [newExpenseCategory, setNewExpenseCategory] = useState<ExpenseItem['category']>('dining');

  // Breathing Guide Timer Loop
  useEffect(() => {
    let interval: number;
    if (isBreathingActive) {
      interval = window.setInterval(() => {
        setBreathSeconds(s => {
          if (s <= 1) {
            setBreathPhase(p => {
              if (p === 'Inhale') return 'Hold';
              if (p === 'Hold') return 'Exhale';
              return 'Inhale';
            });
            return 4;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive]);

  // Budget calculations
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBudget = Math.max(0, weeklyBudget - totalSpent);
  const budgetPercentage = Math.min(100, (totalSpent / weeklyBudget) * 100);

  const handleConfirmBooking = () => {
    const booking: CounselorBooking = {
      id: `book-${Date.now()}`,
      counselorId: selectedCounselor.id,
      counselorName: selectedCounselor.name,
      date: selectedDate,
      time: '2:00 PM',
      mode: bookingMode,
      reason: bookingReason,
      status: 'confirmed',
    };
    onBookCounselor(booking);
    setBookingSuccessModal(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseTitle || !newExpenseAmount) return;
    onAddExpense({
      title: newExpenseTitle,
      amount: parseFloat(newExpenseAmount),
      category: newExpenseCategory,
      date: 'Today',
    });
    setNewExpenseTitle('');
    setNewExpenseAmount('');
    setShowAddExpenseModal(false);
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Subtab Segmented Control */}
      <div className="p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center gap-1">
        <button
          onClick={() => setActiveSection('crisis')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'crisis'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          Mental Health
        </button>
        <button
          onClick={() => setActiveSection('booking')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'booking'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Counselor
        </button>
        <button
          onClick={() => setActiveSection('budget')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeSection === 'budget'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          Budget
        </button>
      </div>

      {/* 1. MENTAL HEALTH & IMMEDIATE CRISIS HOTLINES */}
      {activeSection === 'crisis' && (
        <div className="space-y-3">
          {/* Urgent Emergency Alert Bar */}
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                24/7 Immediate Confidential Support
              </h4>
            </div>
            <p className="text-xs text-rose-900/90 dark:text-rose-200 leading-relaxed">
              You are never alone. Free professional crisis specialists are ready right now via call or text.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:988"
                className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Call 988 Lifeline
              </a>
              <a
                href="sms:741741?body=HOME"
                className="p-2.5 bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                Text HOME to 741741
              </a>
            </div>
          </div>

          {/* Interactive Guided Box Breathing Widget */}
          <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-3xl border border-indigo-800/40 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-indigo-300 text-xs font-mono">
              <Wind className="w-4 h-4 text-indigo-400" />
              <span>4-4-4 Grounding Somatic Reset</span>
            </div>

            {/* Breathing Animation Circle */}
            <div className="my-4 relative flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full border-4 border-indigo-400/40 flex flex-col items-center justify-center transition-all duration-1000 ${
                  isBreathingActive && breathPhase === 'Inhale'
                    ? 'scale-110 bg-indigo-500/20 shadow-lg shadow-indigo-500/30'
                    : isBreathingActive && breathPhase === 'Hold'
                    ? 'scale-105 bg-indigo-500/10'
                    : 'scale-95 bg-transparent'
                }`}
              >
                <span className="text-base font-extrabold text-white tracking-wide">
                  {isBreathingActive ? breathPhase : 'Ready'}
                </span>
                {isBreathingActive && (
                  <span className="text-xs text-indigo-300 font-mono mt-1">
                    {breathSeconds}s
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-full text-xs font-bold text-white transition-all shadow-xs"
            >
              {isBreathingActive ? 'Stop Exercise' : 'Begin 60-Second De-Stress'}
            </button>
            <p className="text-[11px] text-indigo-300/80">
              Lowers cortisol and heart rate before exams or study blocks.
            </p>
          </div>

          {/* Quick Support Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Campus Wellness Services
            </h4>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Campus CAPS Urgent Triage</span>
                <span className="text-slate-500 font-mono">Medical Plaza Wing 2 · Walk-in 8AM-5PM</span>
              </div>
              <a
                href="tel:5550192837"
                className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200"
              >
                Call Desk
              </a>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">Peer Warmline (Evening Talks)</span>
                <span className="text-slate-500 font-mono">Student-run active listening · 7PM-1AM</span>
              </div>
              <button
                onClick={() => alert('Connected to Peer Warmline Queue')}
                className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200"
              >
                Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. STUDENT COUNSELOR BOOKING FLOW */}
      {activeSection === 'booking' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Licensed Student Counseling</h3>
              <p className="text-xs text-slate-500">Free, confidential 1-on-1 sessions included with tuition</p>
            </div>
          </div>

          {/* Existing Confirmed Bookings */}
          {bookings.length > 0 && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                Upcoming Session Confirmed
              </div>
              {bookings.map(b => (
                <div key={b.id} className="mt-1 text-xs text-emerald-900 dark:text-emerald-200">
                  <span className="font-semibold">{b.counselorName}</span> · {b.date} ({b.mode === 'in_person' ? 'In-Person Office' : 'Secure Video Telehealth'})
                </div>
              ))}
            </div>
          )}

          {/* Select Counselor */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Specialist</h4>
            {counselors.map(csl => (
              <div
                key={csl.id}
                onClick={() => setSelectedCounselor(csl)}
                className={`p-3 bg-white dark:bg-slate-900 rounded-2xl border cursor-pointer transition-all ${
                  selectedCounselor.id === csl.id
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{csl.name}</h4>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{csl.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{csl.specialty}</p>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">★ {csl.rating}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Next: {csl.nextAvailable}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">Select</span>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Options Form */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Consultation Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBookingMode('in_person')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    bookingMode === 'in_person'
                      ? 'bg-slate-900 text-white dark:bg-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  In-Person (Health Center)
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode('telehealth')}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    bookingMode === 'telehealth'
                      ? 'bg-slate-900 text-white dark:bg-indigo-600'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Telehealth (Video)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Preferred Time Slot
              </label>
              <select
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full p-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="Tomorrow, 2:00 PM">Tomorrow, 2:00 PM – 2:50 PM</option>
                <option value="Thursday, 10:30 AM">Thursday, 10:30 AM – 11:20 AM</option>
                <option value="Friday, 1:15 PM">Friday, 1:15 PM – 2:05 PM</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Primary Discussion Focus (Optional)
              </label>
              <input
                type="text"
                value={bookingReason}
                onChange={e => setBookingReason(e.target.value)}
                placeholder="e.g. Midterm burnout, balancing work & classes"
                className="w-full p-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Confidential Booking
            </button>
          </div>
        </div>
      )}

      {/* 3. CAMPUS LIVING BUDGET & EXPENSE TRACKER */}
      {activeSection === 'budget' && (
        <div className="space-y-3">
          {/* Allowance Overview Card */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs text-slate-500 font-mono">Weekly Campus Allowance</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                    ${remainingBudget.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">left of ${weeklyBudget.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => setShowAddExpenseModal(true)}
                className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Spend
              </button>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mb-1">
                <span>Spent: ${totalSpent.toFixed(2)}</span>
                <span>{budgetPercentage.toFixed(0)}% consumed</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    budgetPercentage > 90 ? 'bg-rose-500' : budgetPercentage > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${budgetPercentage}%` }}
                />
              </div>
            </div>

            {budgetPercentage > 85 && (
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Nearing weekly allowance ceiling. Save on cafe runs until Sunday.</span>
              </div>
            )}
          </div>

          {/* Expense History List */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
              Recent Campus Transactions
            </h4>
            {expenses.map(item => (
              <div
                key={item.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mt-0.5">
                    <span className="capitalize">{item.category}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                  -${item.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Modal / Dialog for adding expense */}
          {showAddExpenseModal && (
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Log Campus Expense</h4>
              <form onSubmit={handleCreateExpense} className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Item name (e.g. Cafe Double Latte, Lab Notebook)"
                  value={newExpenseTitle}
                  onChange={e => setNewExpenseTitle(e.target.value)}
                  className="w-full p-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount ($)"
                    value={newExpenseAmount}
                    onChange={e => setNewExpenseAmount(e.target.value)}
                    className="flex-1 p-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                    required
                  />
                  <select
                    value={newExpenseCategory}
                    onChange={e => setNewExpenseCategory(e.target.value as ExpenseItem['category'])}
                    className="p-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <option value="dining">Dining</option>
                    <option value="supplies">Supplies</option>
                    <option value="transport">Transit</option>
                    <option value="entertainment">Social</option>
                    <option value="housing">Housing</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold"
                  >
                    Save Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddExpenseModal(false)}
                    className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
