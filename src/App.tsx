import React, { useState, useEffect } from 'react';
import {
  initialProfile,
  initialCourses,
  initialAssignments,
  initialCourseDocuments,
  initialFlashcardDecks,
  campusFacilities,
  campusEvents,
  peerStudyGroups,
  counselorsList,
  initialExpenses
} from './data/mockData';
import {
  StudentProfile,
  Course,
  Assignment,
  FlashcardDeck,
  CampusFacility,
  CampusEvent,
  StudyGroup,
  Counselor,
  CounselorBooking,
  ExpenseItem
} from './types/student';
import { AcademicHubTab } from './components/tabs/AcademicHubTab';
import { StudyToolsTab } from './components/tabs/StudyToolsTab';
import { CampusCommunityTab } from './components/tabs/CampusCommunityTab';
import { WellnessSupportTab } from './components/tabs/WellnessSupportTab';
import { ProfileTab } from './components/tabs/ProfileTab';
import { BottomNav, TabId } from './components/mobile/BottomNav';
import { TopHeader } from './components/mobile/TopHeader';
import { MobileDeviceFrame } from './components/mobile/MobileDeviceFrame';
import { BlueprintView } from './components/blueprint/BlueprintView';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { AddAssignmentModal } from './components/modals/AddAssignmentModal';
import { CreateStudyGroupModal } from './components/modals/CreateStudyGroupModal';
import {
  Smartphone,
  BookOpen,
  Layout,
  Columns,
  Moon,
  Sun,
  Sparkles,
  School,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function App() {
  // App Presentation Mode
  const [viewMode, setViewMode] = useState<'simulator' | 'blueprint' | 'studio'>('studio');

  // Student Profile State
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isDeviceFramed, setIsDeviceFramed] = useState<boolean>(true);

  // Core Data States
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [documents] = useState(initialCourseDocuments);
  const [decks] = useState<FlashcardDeck[]>(initialFlashcardDecks);
  const [facilities] = useState<CampusFacility[]>(campusFacilities);
  const [events, setEvents] = useState<CampusEvent[]>(campusEvents);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>(peerStudyGroups);
  const [counselors] = useState<Counselor[]>(counselorsList);
  const [bookings, setBookings] = useState<CounselorBooking[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(initialExpenses);

  // Active Mobile Tab
  const [activeMobileTab, setActiveMobileTab] = useState<TabId>('academic');

  // Modals
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState<boolean>(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState<boolean>(false);

  // Dark Mode Sync with HTML Document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const handleToggleAssignment = (id: string) => {
    setAssignments(prev =>
      prev.map(asg => {
        if (asg.id === id) {
          return {
            ...asg,
            status: asg.status === 'completed' ? 'pending' : 'completed',
          };
        }
        return asg;
      })
    );
  };

  const handleAddAssignment = (newAsg: Assignment) => {
    setAssignments(prev => [newAsg, ...prev]);
  };

  const handleToggleRsvp = (eventId: string) => {
    setEvents(prev =>
      prev.map(evt => {
        if (evt.id === eventId) {
          return {
            ...evt,
            isUserRsvp: !evt.isUserRsvp,
            rsvpCount: evt.isUserRsvp ? evt.rsvpCount - 1 : evt.rsvpCount + 1,
          };
        }
        return evt;
      })
    );
  };

  const handleToggleJoinGroup = (groupId: string) => {
    setStudyGroups(prev =>
      prev.map(grp => {
        if (grp.id === groupId) {
          return {
            ...grp,
            isJoined: !grp.isJoined,
            membersCount: grp.isJoined ? grp.membersCount - 1 : grp.membersCount + 1,
          };
        }
        return grp;
      })
    );
  };

  const handleCreateGroup = (group: StudyGroup) => {
    setStudyGroups(prev => [group, ...prev]);
  };

  const handleAddExpense = (item: Omit<ExpenseItem, 'id'>) => {
    const newItem: ExpenseItem = {
      ...item,
      id: `exp-${Date.now()}`,
    };
    setExpenses(prev => [newItem, ...prev]);
  };

  const handleBookCounselor = (booking: CounselorBooking) => {
    setBookings(prev => [booking, ...prev]);
  };

  // Helper for tab titles
  const getTabTitle = () => {
    switch (activeMobileTab) {
      case 'academic':
        return 'Academic Hub';
      case 'study':
        return 'Focus & Study Engine';
      case 'campus':
        return 'Campus & Community';
      case 'wellness':
        return 'Wellness & Support';
      case 'profile':
        return 'Student Profile';
      default:
        return 'CampusPulse';
    }
  };

  const pendingAssignmentsCount = assignments.filter(a => a.status !== 'completed').length;

  // The mobile phone screen content
  const renderMobileContent = () => (
    <div className="flex flex-col min-h-full">
      <TopHeader
        profile={profile}
        activeTabTitle={getTabTitle()}
        onOpenNotifications={() => alert(`You have ${pendingAssignmentsCount} pending academic deliverables this week.`)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
      />

      <main className="flex-1 px-4 py-3">
        {activeMobileTab === 'academic' && (
          <AcademicHubTab
            courses={courses}
            assignments={assignments}
            documents={documents}
            onToggleAssignment={handleToggleAssignment}
            onOpenAddAssignment={() => setIsAddAssignmentOpen(true)}
          />
        )}

        {activeMobileTab === 'study' && (
          <StudyToolsTab decks={decks} />
        )}

        {activeMobileTab === 'campus' && (
          <CampusCommunityTab
            facilities={facilities}
            events={events}
            studyGroups={studyGroups}
            onToggleRsvp={handleToggleRsvp}
            onToggleJoinGroup={handleToggleJoinGroup}
            onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
          />
        )}

        {activeMobileTab === 'wellness' && (
          <WellnessSupportTab
            counselors={counselors}
            expenses={expenses}
            weeklyBudget={profile.weeklyBudget}
            onAddExpense={handleAddExpense}
            onBookCounselor={handleBookCounselor}
            bookings={bookings}
          />
        )}

        {activeMobileTab === 'profile' && (
          <ProfileTab
            profile={profile}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode(!darkMode)}
          />
        )}
      </main>

      <BottomNav
        activeTab={activeMobileTab}
        onSelectTab={setActiveMobileTab}
        pendingDeliverablesCount={pendingAssignmentsCount}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      {/* Top Bar Contract (Section 2) */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-xs shrink-0">
            CP
          </div>
          <a href="/" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0">
            CampusPulse
          </a>
        </div>

        {/* Zone 2: Navigation Links & View Mode Segmented Switch */}
        <nav className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          <button
            onClick={() => setViewMode('studio')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              viewMode === 'studio'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            Side-by-Side Studio
          </button>
          <button
            onClick={() => setViewMode('simulator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              viewMode === 'simulator'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile Simulator
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              viewMode === 'blueprint'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Product Blueprint Spec
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Theme Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light' : 'Switch to Dark'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Setup Profile
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col">
        {/* MODE 1: SIDE-BY-SIDE STUDIO (Presentation Mode) */}
        {viewMode === 'studio' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-60px)]">
            {/* Left 7 Columns: Product Blueprint Document Viewer */}
            <div className="lg:col-span-7 xl:col-span-7 border-r border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[calc(100vh-60px)]">
              <BlueprintView
                onSwitchToSimulator={() => setViewMode('simulator')}
                onOpenOnboarding={() => setIsOnboardingOpen(true)}
              />
            </div>

            {/* Right 5 Columns: Live Interactive Mobile Device Frame */}
            <div className="lg:col-span-5 xl:col-span-5 bg-slate-100/60 dark:bg-slate-900/40 p-4 flex flex-col items-center justify-start overflow-y-auto max-h-[calc(100vh-60px)]">
              <div className="mb-2 text-xs text-slate-500 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Interactive Mobile Device Simulator (Touch-Enabled)</span>
              </div>
              <MobileDeviceFrame
                isFramed={isDeviceFramed}
                onToggleFrame={() => setIsDeviceFramed(!isDeviceFramed)}
              >
                {renderMobileContent()}
              </MobileDeviceFrame>
            </div>
          </div>
        )}

        {/* MODE 2: FULL MOBILE SIMULATOR */}
        {viewMode === 'simulator' && (
          <div className="flex-1 py-4 flex flex-col items-center justify-center">
            <div className="mb-3 flex items-center gap-3">
              <button
                onClick={() => setIsDeviceFramed(!isDeviceFramed)}
                className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
              >
                {isDeviceFramed ? 'Switch to Full Mobile Canvas' : 'Show iPhone Hardware Frame'}
              </button>
              <span className="text-xs text-slate-400 font-mono">
                Tab: {getTabTitle()}
              </span>
            </div>
            <MobileDeviceFrame
              isFramed={isDeviceFramed}
              onToggleFrame={() => setIsDeviceFramed(!isDeviceFramed)}
            >
              {renderMobileContent()}
            </MobileDeviceFrame>
          </div>
        )}

        {/* MODE 3: FULL PRODUCT BLUEPRINT SPEC */}
        {viewMode === 'blueprint' && (
          <div className="flex-1">
            <BlueprintView
              onSwitchToSimulator={() => setViewMode('simulator')}
              onOpenOnboarding={() => setIsOnboardingOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Interactive Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        initialProfile={profile}
        onSaveProfile={newProfile => setProfile(newProfile)}
      />

      <AddAssignmentModal
        isOpen={isAddAssignmentOpen}
        onClose={() => setIsAddAssignmentOpen(false)}
        courses={courses}
        onAddAssignment={handleAddAssignment}
      />

      <CreateStudyGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        courses={courses}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}
