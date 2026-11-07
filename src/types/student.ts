export type AcademicLevel = 'undergraduate' | 'high_school' | 'graduate';

export interface Course {
  id: string;
  code: string;
  name: string;
  instructor: string;
  room: string;
  building: string;
  credits: number;
  color: string;
  currentGrade: number; // percentage
  targetGrade: number; // percentage
  schedule: {
    days: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri')[];
    startTime: string;
    endTime: string;
  };
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string; // ISO date string
  dueTime: string;
  weight: number; // % of total course grade
  status: 'pending' | 'in_progress' | 'completed';
  estimatedHours: number;
  priority: 'low' | 'medium' | 'high';
}

export interface CourseDocument {
  id: string;
  courseId: string;
  title: string;
  category: 'syllabus' | 'lecture_notes' | 'problem_set' | 'lab_manual' | 'exam_prep';
  fileSize: string;
  updatedAt: string;
  fileType: 'pdf' | 'docx' | 'slides';
}

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  hint?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed?: string;
  repetitionLevel: number; // 0 to 5 (Leitner box)
}

export interface FlashcardDeck {
  id: string;
  courseId: string;
  title: string;
  cardCount: number;
  masteryPercentage: number;
  tags: string[];
}

export interface CampusFacility {
  id: string;
  name: string;
  type: 'library' | 'dining' | 'study_lounge' | 'lab' | 'gym' | 'health_clinic';
  building: string;
  currentOccupancy: number; // 0 - 100 percentage
  status: 'open' | 'closing_soon' | 'closed';
  hours: string;
  quietLevel: 'silent' | 'moderate' | 'collaborative';
  amenities: string[];
  coordinates: { x: number; y: number }; // percentage on interactive map canvas
}

export interface CampusEvent {
  id: string;
  title: string;
  organizer: string;
  category: 'academic' | 'career' | 'social' | 'wellness' | 'club';
  date: string;
  time: string;
  location: string;
  rsvpCount: number;
  isUserRsvp: boolean;
  description: string;
}

export interface StudyGroup {
  id: string;
  courseCode: string;
  courseName: string;
  topic: string;
  meetingTime: string;
  location: string;
  membersCount: number;
  maxMembers: number;
  hostName: string;
  isJoined: boolean;
  tags: string[];
}

export interface Counselor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  availableModes: ('in_person' | 'telehealth')[];
  rating: number;
  avatarSeed: string;
  nextAvailable: string;
}

export interface CounselorBooking {
  id: string;
  counselorId: string;
  counselorName: string;
  date: string;
  time: string;
  mode: 'in_person' | 'telehealth';
  reason: string;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
}

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: 'dining' | 'supplies' | 'transport' | 'entertainment' | 'housing';
  date: string;
}

export interface StudentProfile {
  name: string;
  email: string;
  institution: string;
  academicLevel: AcademicLevel;
  major: string;
  minor?: string;
  term: string; // e.g. "Fall 2026"
  targetGpa: number;
  currentGpa: number;
  weeklyBudget: number;
  wellnessGoals: string[];
  preferences: {
    studySessionLength: number; // minutes
    notificationsEnabled: boolean;
    quietHours: boolean;
    darkMode: boolean;
  };
  onboardingCompleted: boolean;
}
