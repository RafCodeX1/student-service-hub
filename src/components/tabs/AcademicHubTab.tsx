import React, { useState } from 'react';
import { Course, Assignment, CourseDocument } from '../../types/student';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Circle,
  FileText,
  Sliders,
  ChevronRight,
  Plus,
  BookOpen,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface AcademicHubTabProps {
  courses: Course[];
  assignments: Assignment[];
  documents: CourseDocument[];
  onToggleAssignment: (id: string) => void;
  onOpenAddAssignment: () => void;
}

export const AcademicHubTab: React.FC<AcademicHubTabProps> = ({
  courses,
  assignments,
  documents,
  onToggleAssignment,
  onOpenAddAssignment,
}) => {
  const [activeSection, setActiveSection] = useState<'schedule' | 'assignments' | 'gpa' | 'docs'>('schedule');
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Mon');
  const [docFilter, setDocFilter] = useState<string>('all');
  
  // Interactive GPA Estimator State
  const [anticipatedScores, setAnticipatedScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    courses.forEach(c => {
      initial[c.id] = c.currentGrade;
    });
    return initial;
  });

  const getDaySchedule = () => {
    return courses
      .filter(course => course.schedule.days.includes(selectedDay))
      .sort((a, b) => a.schedule.startTime.localeCompare(b.schedule.startTime));
  };

  // Calculate projected GPA
  const calculateProjectedGpa = () => {
    let totalQualityPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const score = anticipatedScores[c.id] ?? c.currentGrade;
      let gpaValue = 4.0;
      if (score >= 93) gpaValue = 4.0;
      else if (score >= 90) gpaValue = 3.7;
      else if (score >= 87) gpaValue = 3.3;
      else if (score >= 83) gpaValue = 3.0;
      else if (score >= 80) gpaValue = 2.7;
      else if (score >= 77) gpaValue = 2.3;
      else gpaValue = 2.0;

      totalQualityPoints += gpaValue * c.credits;
      totalCredits += c.credits;
    });

    return totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '3.80';
  };

  const daySchedule = getDaySchedule();

  const filteredDocs = docFilter === 'all'
    ? documents
    : documents.filter(d => d.category === docFilter);

  const pendingAssignments = assignments.filter(a => a.status !== 'completed');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  return (
    <div className="space-y-4 pb-20">
      {/* Module Navigation Tabs (Segmented Control) */}
      <div className="p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveSection('schedule')}
          className={`flex-1 min-w-[70px] py-2 px-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSection === 'schedule'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          Schedule
        </button>
        <button
          onClick={() => setActiveSection('assignments')}
          className={`flex-1 min-w-[75px] py-2 px-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSection === 'assignments'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Tasks ({pendingAssignments.length})
        </button>
        <button
          onClick={() => setActiveSection('gpa')}
          className={`flex-1 min-w-[70px] py-2 px-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSection === 'gpa'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          GPA Calc
        </button>
        <button
          onClick={() => setActiveSection('docs')}
          className={`flex-1 min-w-[65px] py-2 px-2.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSection === 'docs'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Docs
        </button>
      </div>

      {/* 1. CLASS SCHEDULE MANAGEMENT */}
      {activeSection === 'schedule' && (
        <div className="space-y-3">
          {/* Next Up Urgent Alert Card */}
          <div className="p-3.5 bg-gradient-to-r from-indigo-50 to-indigo-100/60 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-200/60 dark:border-indigo-800/50 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200 font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
                Next Class in 35m
              </span>
              <span className="font-mono tabular-nums">10:00 AM – 11:15 AM</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">CS 106B · Data Structures</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              Gates Hall 104 · Prof. Katherine Vance
            </p>
          </div>

          {/* Day of Week Selector */}
          <div className="flex items-center justify-between gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                  selectedDay === day
                    ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule List */}
          <div className="space-y-2.5">
            {daySchedule.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No scheduled lectures on {selectedDay}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Perfect time for focused deep study or group review.</p>
              </div>
            ) : (
              daySchedule.map(course => (
                <div
                  key={course.id}
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: course.color }}
                        />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                          {course.code}
                        </span>
                        <span className="text-xs text-slate-400">·</span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {course.credits} Credits
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                        {course.name}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono tabular-nums">
                        {course.currentGrade}%
                      </span>
                      <p className="text-[10px] text-slate-500">Current Grade</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.schedule.startTime} – {course.schedule.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {course.room}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 2. ASSIGNMENT TRACKER */}
      {activeSection === 'assignments' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Deliverables</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Deadlines synced with LMS syllabus</p>
            </div>
            <button
              onClick={onOpenAddAssignment}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Task
            </button>
          </div>

          {/* Pending Tasks */}
          <div className="space-y-2">
            {pendingAssignments.map(asg => {
              const course = courses.find(c => c.id === asg.courseId);
              return (
                <div
                  key={asg.id}
                  className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <button
                    onClick={() => onToggleAssignment(asg.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <Circle className="w-5 h-5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[11px] font-semibold uppercase tracking-wider font-mono"
                        style={{ color: course?.color || '#6366f1' }}
                      >
                        {course?.code || 'GEN'}
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Weight: {asg.weight}%
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 truncate">
                      {asg.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 font-mono">
                      <span>Due {asg.dueDate} · {asg.dueTime}</span>
                      <span>~{asg.estimatedHours}h est.</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completed Deliverables */}
          {completedAssignments.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
              <h4 className="text-xs font-semibold text-slate-500 mb-2">Completed Tasks</h4>
              <div className="space-y-1.5 opacity-70">
                {completedAssignments.map(asg => (
                  <div
                    key={asg.id}
                    className="p-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5"
                  >
                    <button
                      onClick={() => onToggleAssignment(asg.id)}
                      className="text-emerald-600 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-600 dark:text-slate-400 line-through truncate flex-1">
                      {asg.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Earned {asg.weight}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. INTERACTIVE GPA & GRADE ESTIMATOR WIDGET */}
      {activeSection === 'gpa' && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl shadow-sm border border-indigo-800/40">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-indigo-300 font-medium">Projected Cumulative GPA</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold font-mono tracking-tight text-white">
                    {calculateProjectedGpa()}
                  </span>
                  <span className="text-xs text-indigo-300">/ 4.00</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-indigo-200 bg-indigo-500/20 px-2 py-0.5 rounded-md font-mono">
                  Target: 3.85
                </span>
                <p className="text-[10px] text-indigo-300 mt-1">14 Enrolled Credits</p>
              </div>
            </div>
            <p className="text-[11px] text-indigo-200/90 mt-3 pt-2.5 border-t border-indigo-800/60">
              Adjust your expected final exam scores below to see the mathematical impact on course letter grades and overall term GPA.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Course Grade Simulation Sliders
            </h4>

            {courses.map(course => {
              const val = anticipatedScores[course.id] ?? course.currentGrade;
              return (
                <div
                  key={course.id}
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {course.code}
                      </span>
                      <span className="text-xs text-slate-500 ml-1.5 truncate">
                        ({course.name.slice(0, 24)}...)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                        {val}%
                      </span>
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        {val >= 93 ? 'A' : val >= 90 ? 'A-' : val >= 87 ? 'B+' : val >= 83 ? 'B' : 'B-'}
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="65"
                    max="100"
                    step="1"
                    value={val}
                    onChange={e => {
                      const num = Number(e.target.value);
                      setAnticipatedScores(prev => ({ ...prev, [course.id]: num }));
                    }}
                    className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Base: {course.currentGrade}%</span>
                    <span>Goal: {course.targetGrade}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. COURSE DOCUMENT REPOSITORY */}
      {activeSection === 'docs' && (
        <div className="space-y-3">
          {/* Doc Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'All Files' },
              { id: 'syllabus', label: 'Syllabi' },
              { id: 'lecture_notes', label: 'Lectures' },
              { id: 'exam_prep', label: 'Study Guides' },
              { id: 'problem_set', label: 'Problem Sets' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDocFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  docFilter === tab.id
                    ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {filteredDocs.map(doc => {
              const course = courses.find(c => c.id === doc.courseId);
              return (
                <div
                  key={doc.id}
                  className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {doc.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {course?.code} · {doc.fileSize} · {doc.updatedAt}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Opened document: ${doc.title}`);
                    }}
                    className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    title="View Document"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
